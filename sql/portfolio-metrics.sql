-- Anonymous visit counter for the portfolio site.
-- No IP addresses, cookies or personal data: each browser stores a random UUID locally
-- and the database only keeps that id, the path, and timestamps.
-- Tables live in the `portfolio` schema, which PostgREST does not expose; only the
-- two security-definer wrappers in `public` are callable with the publishable key.

create schema if not exists portfolio;
revoke all on schema portfolio from anon, authenticated;

create table if not exists portfolio.visitors (
    id uuid primary key,
    first_seen timestamptz not null default now(),
    last_seen timestamptz not null default now()
);

create table if not exists portfolio.visits (
    id bigint generated always as identity primary key,
    visitor_id uuid not null references portfolio.visitors(id) on delete cascade,
    path text check (char_length(path) <= 120),
    created_at timestamptz not null default now()
);

create index if not exists portfolio_visits_created_idx
    on portfolio.visits (created_at desc);
create index if not exists portfolio_visits_visitor_idx
    on portfolio.visits (visitor_id, created_at desc);

create or replace function portfolio.snapshot()
returns jsonb
language sql
stable
security definer
set search_path = portfolio, public
as $$
    select jsonb_build_object(
        'views', (select count(*) from portfolio.visits),
        'visitors', (select count(*) from portfolio.visitors),
        'views_24h', (select count(*) from portfolio.visits
                      where created_at > now() - interval '24 hours'),
        'visitors_24h', (select count(distinct visitor_id) from portfolio.visits
                         where created_at > now() - interval '24 hours')
    );
$$;

create or replace function portfolio.track(p_visitor uuid, p_path text)
returns jsonb
language plpgsql
security definer
set search_path = portfolio, public
as $$
begin
    if p_visitor is null then
        raise exception 'visitor id is required';
    end if;

    insert into portfolio.visitors (id)
    values (p_visitor)
    on conflict (id) do update set last_seen = now();

    -- One counted visit per browser per 30 minutes, so refreshes don't inflate totals.
    if not exists (
        select 1 from portfolio.visits
        where visitor_id = p_visitor
          and created_at > now() - interval '30 minutes'
    ) then
        insert into portfolio.visits (visitor_id, path)
        values (p_visitor, left(coalesce(p_path, '/'), 120));
    end if;

    return portfolio.snapshot();
end;
$$;

create or replace function public.portfolio_stats()
returns jsonb
language sql
stable
security definer
set search_path = portfolio, public
as $$ select portfolio.snapshot(); $$;

create or replace function public.portfolio_track(p_visitor uuid, p_path text default null)
returns jsonb
language sql
security definer
set search_path = portfolio, public
as $$ select portfolio.track(p_visitor, p_path); $$;

revoke all on function public.portfolio_stats() from public;
revoke all on function public.portfolio_track(uuid, text) from public;
grant execute on function public.portfolio_stats() to anon, authenticated;
grant execute on function public.portfolio_track(uuid, text) to anon, authenticated;
