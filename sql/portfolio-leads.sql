-- ============================================================================
-- Portfolio inbox: رسائل فورم التواصل بتتخزن هنا، وأنت بتقرأها من admin.html
-- بحساب المطور بتاع مدار.
--
-- الملف ده بيتشغّل مرة واحدة في Supabase → SQL Editor (نفس مشروع مدار).
--
-- التصميم (نفس أسلوب sql/portfolio-metrics.sql بالظبط):
--   • الجدول في schema اسمه portfolio، و PostgREST مكشوفش للـ anon/authenticated،
--     فمستحيل حد يلمسه من الـ REST API أو الـ JS client مباشرة.
--   • كل الوصول بيحصل من دوال عامة (public.*) شغالين بـ security definer:
--       portfolio_submit_lead(...)  → عام، بيستخدمه الفورم.
--       portfolio_leads(...)        → حساب المطور بس (public.is_developer()).
--       portfolio_lead_status(...)  → حساب المطور بس.
--       portfolio_delete_lead(...)  → حساب المطور بس.
--   • التحقق من البيانات حاصل مرتين: في الدالة وفي قيود العمود، فلو حد
--     استدعى الدالة بإيدة غلط الجدول بيرفض برضه.
--   • خانة الطُعم (honeypot): البوت بيملّها، فالسطر مابيتسجلش والدالة بترد
--     نجاح عشان البوت مافهمش إن ده طُعم.
-- ============================================================================

create schema if not exists portfolio;
revoke all on schema portfolio from anon, authenticated;

create table if not exists portfolio.leads (
    id           uuid primary key default gen_random_uuid(),
    full_name    text not null check (char_length(btrim(full_name)) between 1 and 120),
    email        text not null check (
                   char_length(email) between 3 and 254
                   and email ~ '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'
                 ),
    phone        text check (phone is null or char_length(btrim(phone)) <= 40),
    message      text not null check (char_length(btrim(message)) between 1 and 4000),
    lang         text not null default 'en' check (lang in ('ar', 'en')),
    page         text,
    status       text not null default 'new' check (status in ('new', 'read', 'archived')),
    note         text,
    created_at   timestamptz not null default now(),
    updated_at   timestamptz not null default now()
);

create index if not exists portfolio_leads_created_idx
    on portfolio.leads (created_at desc);
create index if not exists portfolio_leads_status_idx
    on portfolio.leads (status, created_at desc);
create index if not exists portfolio_leads_email_recent_idx
    on portfolio.leads (lower(email), created_at desc);

alter table portfolio.leads enable row level security;

/* ---------- الإرسال: عام، بس مقفول بقواعد التحقق والخنق ---------- */
create or replace function portfolio.submit(
    p_full_name text,
    p_email     text,
    p_phone     text,
    p_message   text,
    p_lang      text,
    p_page      text,
    p_honeypot  text
) returns jsonb
language plpgsql
security definer
set search_path = portfolio, public
as $$
declare
    v_name    text := btrim(coalesce(p_full_name, ''));
    v_email   text := lower(btrim(coalesce(p_email, '')));
    v_phone   text := nullif(btrim(coalesce(p_phone, '')), '');
    v_message text := btrim(coalesce(p_message, ''));
    v_id      uuid;
begin
    -- طُعم البوت: لو الخانة المخفية دي اتملّت، بنرد نجاح من غير ما نسجل حاجة.
    if coalesce(p_honeypot, '') <> '' then
        return jsonb_build_object('ok', true, 'filtered', true);
    end if;

    if char_length(v_name) < 1 or char_length(v_name) > 120 then
        raise exception 'LEAD_NAME_INVALID';
    end if;

    if v_email !~ '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$' then
        raise exception 'LEAD_EMAIL_INVALID';
    end if;

    if char_length(v_message) < 1 or char_length(v_message) > 4000 then
        raise exception 'LEAD_MESSAGE_INVALID';
    end if;

    -- نفس الإيميل مابعتش رسالة تانية قبل دقيقتين.
    if exists (
        select 1 from portfolio.leads l
        where lower(l.email) = v_email and l.created_at > now() - interval '2 minutes'
    ) then
        raise exception 'LEAD_THROTTLED';
    end if;

    -- سقف عام في الساعة: بيوقف السبام الموزّع على إيميلات عشوائية.
    if (select count(*) from portfolio.leads where created_at > now() - interval '1 hour') >= 40 then
        raise exception 'LEAD_RATE_LIMIT';
    end if;

    insert into portfolio.leads (full_name, email, phone, message, lang, page)
    values (
        v_name,
        v_email,
        v_phone,
        v_message,
        case when p_lang = 'ar' then 'ar' else 'en' end,
        nullif(left(coalesce(p_page, '/'), 200), '')
    )
    returning id into v_id;

    return jsonb_build_object('ok', true, 'id', v_id);
end;
$$;

/* ---------- القراءة: حساب المطور بس ---------- */
create or replace function portfolio.read(p_status text)
returns jsonb
language plpgsql
stable
security definer
set search_path = portfolio, public
as $$
declare
    v_filter text := nullif(btrim(coalesce(p_status, '')), '');
    v_items  jsonb;
    v_new    int;
    v_total  int;
begin
    if not public.is_developer() then
        raise exception 'LEAD_FORBIDDEN';
    end if;

    select coalesce(jsonb_agg(row_to_json(l)::jsonb order by l.created_at desc), '[]'::jsonb)
      into v_items
      from portfolio.leads l
      where v_filter is null or l.status = v_filter;

    select count(*) into v_new   from portfolio.leads where status = 'new';
    select count(*) into v_total from portfolio.leads;

    return jsonb_build_object('items', v_items, 'new_count', v_new, 'total', v_total);
end;
$$;

/* ---------- تغيير الحالة أو إضافة ملاحظة ---------- */
create or replace function portfolio.set_status(p_id uuid, p_status text, p_note text)
returns jsonb
language plpgsql
security definer
set search_path = portfolio, public
as $$
declare
    v_status text := btrim(coalesce(p_status, ''));
    -- لو p_note جاية null يبقى المستخدم ملامسش الملاحظة؛ الفاضي يعني امسحها.
    v_note   text := case when p_note is null then null else btrim(p_note) end;
begin
    if not public.is_developer() then
        raise exception 'LEAD_FORBIDDEN';
    end if;

    if v_status not in ('new', 'read', 'archived') then
        raise exception 'LEAD_STATUS_INVALID';
    end if;

    update portfolio.leads
       set status = v_status,
           updated_at = now(),
           note = case
                    when v_note is null then note
                    when v_note = '' then null
                    else left(v_note, 1000)
                  end
     where id = p_id;

    return jsonb_build_object('ok', true, 'updated', found);
end;
$$;

/* ---------- الحذف ---------- */
create or replace function portfolio.remove(p_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = portfolio, public
as $$
begin
    if not public.is_developer() then
        raise exception 'LEAD_FORBIDDEN';
    end if;

    delete from portfolio.leads where id = p_id;
    return jsonb_build_object('ok', true, 'deleted', found);
end;
$$;

/* ---------- الواجهة العامة للدوال (PostgREST) ---------- */
create or replace function public.portfolio_submit_lead(
    p_full_name text,
    p_email     text,
    p_phone     text default null,
    p_message   text default '',
    p_lang      text default 'en',
    p_page      text default null,
    p_honeypot  text default null
) returns jsonb
language sql
security definer
set search_path = portfolio, public
as $$
    select portfolio.submit(p_full_name, p_email, p_phone, p_message, p_lang, p_page, p_honeypot);
$$;

create or replace function public.portfolio_leads(p_status text default null)
returns jsonb
language sql
stable
security definer
set search_path = portfolio, public
as $$ select portfolio.read(p_status); $$;

create or replace function public.portfolio_lead_status(p_id uuid, p_status text, p_note text default null)
returns jsonb
language sql
security definer
set search_path = portfolio, public
as $$ select portfolio.set_status(p_id, p_status, p_note); $$;

create or replace function public.portfolio_delete_lead(p_id uuid)
returns jsonb
language sql
security definer
set search_path = portfolio, public
as $$ select portfolio.remove(p_id); $$;

-- الأذنين: مفيش one size fits all — النشر عام، والباكي للمطور من جوه الدالة.
revoke all on function public.portfolio_submit_lead(text, text, text, text, text, text, text) from public;
revoke all on function public.portfolio_leads(text) from public;
revoke all on function public.portfolio_lead_status(uuid, text, text) from public;
revoke all on function public.portfolio_delete_lead(uuid) from public;

grant execute on function public.portfolio_submit_lead(text, text, text, text, text, text, text) to anon, authenticated;
grant execute on function public.portfolio_leads(text) to authenticated;
grant execute on function public.portfolio_lead_status(uuid, text, text) to authenticated;
grant execute on function public.portfolio_delete_lead(uuid) to authenticated;

-- يخلي PostgREST يعيد قراءة الـ schema من غير ما تستنى دقيقة.
notify pgrst, 'reload schema';

-- فحص سريع: آخر نتيجة في المحرر بتقولّي السكريبت اتعمل فعلاً ولا لأ.
-- المفروض عمود result يطلّع "OK — الدوال الستة اتعملت".
select case when count(*) >= 6 then 'OK — الدوال الستة اتعملت'
            else 'ناقص ' || (6 - count(*))::text || ' — السكريبت مبيتشغّلش على المشروع ده'
       end as result,
       string_agg(p.proname, ', ' order by p.proname) as funcs
  from pg_proc p
  join pg_namespace n on n.oid = p.pronamespace
 where n.nspname = 'public' and p.proname like 'portfolio%';
