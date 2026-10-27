/* ============================================================================
   PORTFOLIO — منطق صندوق رسائل العملاء (admin.js)
   ----------------------------------------------------------------------------
   • الدخول بحساب Supabase نفسه المستخدم في مدار (حساب المطور).
   • كل البيانات بتيجي من دوال عامة في Supabase:
       portfolio_leads(p_status)              → قراءة الرسايل
       portfolio_lead_status(p_id,p_status)   → تغيير الحالة أو حفظ ملاحظة
       portfolio_delete_lead(p_id)            → حذف
     والصلاحيات دي متأكد منها جوه الدالة نفسها (public.is_developer())،
     فلو أي حساب تاني فتح الصفحة دي هيشوف رسالة "مش حساب المطور".
   • الرسايل بتترسم بـ textContent دوم (مفيش innerHTML بيحقن نص المستخدم)،
     فمفيش XSS من نص الرسالة أو الاسم.
   ============================================================================ */

'use strict';

const ADMIN_SUPABASE_URL = 'https://ppihzxabbysozbdmweje.supabase.co';
const ADMIN_SUPABASE_KEY = 'sb_publishable_7Re-MNRopMsOjopgV2YNjg_fN0yUDiL';
const ADMIN_SUPABASE_ESM = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
const ADMIN_AUTH_KEY = 'portfolio-admin-auth';
const ADMIN_LANG_KEY = 'portfolioAdminLang';
const ADMIN_REFRESH_MS = 60000;

/* ---------------------------------------------------------------- الترجمة */
const adminTranslations = {
  ar: {
    loginTitle: 'صندوق رسائل العملاء',
    loginHint: 'ادخل بحساب المطور بتاع مدار (نفس الإيميل وكلمة السر).',
    emailLabel: 'البريد الإلكتروني',
    passwordLabel: 'كلمة السر',
    loginBtn: 'دخول',
    loggingIn: 'بيتأكد...',
    badLogin: 'الإيميل أو كلمة السر غلط.',
    notDev: 'الحساب ده دخول بيه، بس هو مش حساب المطور — الرسايل مقفولة.',
    loadErr: 'مفهمناش نجيب الرسايل. اتأكد من الإنترنت أو إن الجدول اتعمل.',
    inboxTitle: 'رسائل العملاء',
    refreshBtn: 'تحديث',
    csvBtn: 'تصدير CSV',
    siteLink: 'الموقع',
    logoutBtn: 'خروج',
    tabAll: 'الكل',
    tabNew: 'جديدة',
    tabRead: 'مقروءة',
    tabArchived: 'مؤرشفة',
    searchPh: 'دوّر بالاسم أو الإيميل أو نص الرسالة',
    empty: 'مافيش رسايل هنا.',
    emptySearch: 'مافيش نتيجة للبحث ده.',
    counter: '@total@ رسالة · @new@ جديدة',
    statusNew: 'جديدة',
    statusRead: 'مقروءة',
    statusArchived: 'مؤرشفة',
    markRead: 'علّمها مقروءة',
    archive: 'أرشفة',
    restore: 'رجّعها جديدة',
    deleteBtn: 'حذف',
    confirmDelete: 'متأكد إنك عايز يحذف الرسالة دي نهائيًا؟',
    reply: 'رد بالإيميل',
    whatsapp: 'واتساب',
    call: 'مكالمة',
    noteLabel: 'ملاحظة (بتتحفظ عندك انت بس)',
    saveNote: 'حفظ الملاحظة',
    saved: 'اتحفظت.',
    deleted: 'اتمسحت.',
    justNow: 'دلوقتي',
    minutesAgo: 'من @n@ دقيقة',
    hoursAgo: 'من @n@ ساعة',
    daysAgo: 'من @n@ يوم'
  },
  en: {
    loginTitle: 'Client messages',
    loginHint: 'Sign in with the Madar developer account (same email and password).',
    emailLabel: 'Email',
    passwordLabel: 'Password',
    loginBtn: 'Sign in',
    loggingIn: 'Checking...',
    badLogin: 'Wrong email or password.',
    notDev: 'You are signed in, but this account is not the developer account.',
    loadErr: 'Could not load messages. Check the connection or that the table exists.',
    inboxTitle: 'Client messages',
    refreshBtn: 'Refresh',
    csvBtn: 'Export CSV',
    siteLink: 'Site',
    logoutBtn: 'Sign out',
    tabAll: 'All',
    tabNew: 'New',
    tabRead: 'Read',
    tabArchived: 'Archived',
    searchPh: 'Search by name, email or message',
    empty: 'No messages here.',
    emptySearch: 'Nothing matches this search.',
    counter: '@total@ messages · @new@ new',
    statusNew: 'New',
    statusRead: 'Read',
    statusArchived: 'Archived',
    markRead: 'Mark read',
    archive: 'Archive',
    restore: 'Back to new',
    deleteBtn: 'Delete',
    confirmDelete: 'Delete this message permanently?',
    reply: 'Reply by email',
    whatsapp: 'WhatsApp',
    call: 'Call',
    noteLabel: 'Private note (only you see it)',
    saveNote: 'Save note',
    saved: 'Saved.',
    deleted: 'Deleted.',
    justNow: 'just now',
    minutesAgo: '@n@ min ago',
    hoursAgo: '@n@ h ago',
    daysAgo: '@n@ d ago'
  }
};

/* ------------------------------------------------------------- عناصر الصفحة */
const loginView = document.getElementById('loginView');
const inboxView = document.getElementById('inboxView');
const loginForm = document.getElementById('loginForm');
const loginBtn = document.getElementById('loginBtn');
const loginMsg = document.getElementById('loginMsg');
const inboxMsg = document.getElementById('inboxMsg');
const leadsEl = document.getElementById('leads');
const counterEl = document.getElementById('counter');
const searchInput = document.getElementById('searchInput');
const tabsEl = document.getElementById('tabs');
const langBtn = document.getElementById('langBtn');
const refreshBtn = document.getElementById('refreshBtn');
const csvBtn = document.getElementById('csvBtn');
const logoutBtn = document.getElementById('logoutBtn');

/* ------------------------------------------------------------------ الحالة */
let adminClient = null;
let allLeads = [];
let currentFilter = '';
let searchPhrase = '';
let openLeads = Object.create(null);
let refreshTimer = null;
let adminLang = localStorage.getItem(ADMIN_LANG_KEY) === 'en' ? 'en' : 'ar';

/**
 * نص الترجمة الحالية.
 * @param {string} key
 * @returns {string}
 */
function t(key) {
  const table = adminTranslations[adminLang] || adminTranslations.en;
  return table[key] || adminTranslations.en[key] || key;
}

/**
 * ترجمة فيها أرقام بين @@ زي @total@.
 * @param {string} key
 * @param {Object} values
 * @returns {string}
 */
function tf(key, values) {
  return Object.keys(values).reduce(function (text, name) {
    return text.replace('@' + name + '@', values[name]);
  }, t(key));
}

/** تطبيق اللغة على الصفحة كلها وعلى اتجاه RTL/LTR */
function applyAdminLanguage() {
  document.documentElement.lang = adminLang;
  document.documentElement.dir = adminLang === 'ar' ? 'rtl' : 'ltr';

  document.querySelectorAll('[data-i18n]').forEach(function (element) {
    element.textContent = t(element.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(function (element) {
    element.placeholder = t(element.dataset.i18nPlaceholder);
  });

  langBtn.textContent = adminLang === 'ar' ? 'EN' : 'عربي';
  document.title = (newCount() > 0 ? '(' + newCount() + ') ' : '') + t('inboxTitle');
  renderCounter();
  renderLeads();
}

function newCount() {
  return allLeads.reduce(function (total, lead) {
    return lead.status === 'new' ? total + 1 : total;
  }, 0);
}

function renderCounter() {
  counterEl.textContent = allLeads.length
    ? tf('counter', { total: allLeads.length, new: newCount() })
    : '';
}

/**
 * سطر رسالة للحالة (فاضي = مسح).
 * @param {HTMLElement} element
 * @param {string} key
 * @param {string} tone - 'ok' أو 'err'
 */
function setNotice(element, key, tone) {
  element.textContent = key ? t(key) : '';
  element.className = tone ? 'msg ' + tone : 'msg';
}

/* ------------------------------------------------------------ Supabase */
/**
 * عميل Supabase واحد للصفحة دي، بمفتاح الجلسة بتاعها.
 * @returns {Promise<Object>}
 */
function getAdminClient() {
  if (!adminClient) {
    adminClient = import(ADMIN_SUPABASE_ESM)
      .then(function (module) {
        return module.createClient(ADMIN_SUPABASE_URL, ADMIN_SUPABASE_KEY, {
          auth: {
            persistSession: true,
            storageKey: ADMIN_AUTH_KEY,
            autoRefreshToken: true,
            detectSessionInUrl: false
          }
        });
      });
    adminClient = adminClient.catch(function (error) {
      adminClient = null;
      throw error;
    });
  }

  return adminClient;
}

/**
 * نداء دالة في Supabase، بيرمي خطأ لو رجعت error.
 * @param {string} name
 * @param {Object} args
 * @returns {Promise<Object>}
 */
function callRpc(name, args) {
  return getAdminClient().then(function (client) {
    return client.rpc(name, args).then(function (result) {
      if (result.error) {
        throw result.error;
      }
      return result.data;
    });
  });
}

/**
 * الرسالة اللي بترجع من الدالة دي بتكون كود ثابت.
 * @param {Error|{message?: string}} error
 * @returns {string} مفتاح الترجمة
 */
function adminErrorKey(error) {
  const message = String((error && error.message) || error || '');
  if (message.indexOf('LEAD_FORBIDDEN') !== -1) {
    return 'notDev';
  }
  return 'loadErr';
}

/* ------------------------------------------------------------ عرض الرسايل */
/**
 * شكل التاريخ النسبي.
 * @param {string} iso
 * @returns {string}
 */
function relativeTime(iso) {
  if (!iso) {
    return '';
  }

  const then = new Date(iso).getTime();
  if (isNaN(then)) {
    return '';
  }

  const minutes = Math.round((Date.now() - then) / 60000);
  if (minutes < 2) {
    return t('justNow');
  }
  if (minutes < 60) {
    return tf('minutesAgo', { n: minutes });
  }
  if (minutes < 60 * 24) {
    return tf('hoursAgo', { n: Math.round(minutes / 60) });
  }
  return tf('daysAgo', { n: Math.round(minutes / (60 * 24)) });
}

/** @returns {Array<Object>} الرسايل بعد تطبيق البحث */
function visibleLeads() {
  if (!searchPhrase) {
    return allLeads;
  }

  const needle = searchPhrase.toLowerCase();
  return allLeads.filter(function (lead) {
    return [lead.full_name, lead.email, lead.phone, lead.message, lead.note]
      .filter(Boolean)
      .join('\n')
      .toLowerCase()
      .indexOf(needle) !== -1;
  });
}

/** إنشاء عنصر بسيط بنص آمن */
function make(tag, className, text) {
  const element = document.createElement(tag);
  if (className) {
    element.className = className;
  }
  if (text !== undefined) {
    element.textContent = text;
  }
  return element;
}

/** حوّل رقم تليفون لصيغة مقبولة في الروابط */
function phoneHref(phone) {
  return 'tel:' + String(phone).replace(/[^\d+]/g, '');
}

/**
 * رقم دولي لواتساب: أرقام محلية مصرية بتتحوّل لـ 20….
 * @param {string} phone
 * @returns {string}
 */
function whatsappHref(phone) {
  const digits = String(phone).replace(/\D/g, '');
  let international = digits;

  if (international.indexOf('00') === 0) {
    international = international.slice(2);
  } else if (international.indexOf('0') === 0) {
    international = '20' + international.slice(1);
  } else if (international.length === 10 && international.indexOf('20') !== 0) {
    international = '20' + international;
  }

  return 'https://wa.me/' + international;
}

/**
 * رسم كارت رسالة واحدة، مع التفاصيل لما تكون مفتوحة.
 * @param {Object} lead
 * @returns {HTMLElement}
 */
function leadCard(lead) {
  const card = make('article', 'card lead' + (lead.status === 'new' ? ' is-new' : ''));

  const head = make('div', 'lead-head');
  head.tabIndex = 0;
  head.setAttribute('role', 'button');
  head.addEventListener('click', function () {
    toggleLead(lead.id);
  });
  head.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleLead(lead.id);
    }
  });

  const left = make('div');
  left.appendChild(make('div', 'lead-name', lead.full_name));

  const meta = make('div', 'lead-meta', lead.email + (lead.phone ? ' · ' + lead.phone : ''));
  left.appendChild(meta);

  const right = make('div');
  right.style.textAlign = 'end';
  const statusKey = lead.status === 'new' ? 'statusNew' : lead.status === 'read' ? 'statusRead' : 'statusArchived';
  right.appendChild(make('span', 'pill ' + lead.status, t(statusKey)));
  right.appendChild(make('div', 'lead-date', [relativeTime(lead.created_at), String(lead.lang || '').toUpperCase()].filter(Boolean).join(' · ')));
  head.appendChild(left);
  head.appendChild(right);
  card.appendChild(head);

  if (openLeads[lead.id]) {
    card.appendChild(leadDetails(lead));
  }

  return card;
}

/**
 * جسم الكارت المفتوح: النص + أزرار التواصل + الأزرار + الملاحظة.
 * @param {Object} lead
 * @returns {HTMLElement}
 */
function leadDetails(lead) {
  const body = make('div', 'lead-body');
  body.appendChild(make('p', 'lead-text', lead.message));

  const links = make('div', 'lead-contact');

  const mail = make('a', 'btn ghost', t('reply'));
  mail.href = 'mailto:' + lead.email + '?subject=' + encodeURIComponent('Re: ' + (lead.full_name || 'your message'));
  links.appendChild(mail);

  if (lead.phone) {
    const call = make('a', 'btn ghost', t('call'));
    call.href = phoneHref(lead.phone);
    links.appendChild(call);

    const wa = make('a', 'btn ghost', t('whatsapp'));
    wa.href = whatsappHref(lead.phone);
    wa.target = '_blank';
    wa.rel = 'noopener noreferrer';
    links.appendChild(wa);
  }
  body.appendChild(links);

  const actions = make('div', 'lead-contact');

  if (lead.status !== 'read') {
    actions.appendChild(actionButton(t('markRead'), function () {
      setLeadStatus(lead.id, 'read');
    }));
  }
  if (lead.status === 'new') {
    actions.appendChild(actionButton(t('archive'), function () {
      setLeadStatus(lead.id, 'archived');
    }));
  } else if (lead.status === 'archived') {
    actions.appendChild(actionButton(t('restore'), function () {
      setLeadStatus(lead.id, 'new');
    }));
  }

  const remove = actionButton(t('deleteBtn'), function () {
    if (window.confirm(t('confirmDelete'))) {
      deleteLead(lead.id);
    }
  });
  remove.classList.add('danger');
  actions.appendChild(remove);
  body.appendChild(actions);

  const noteLabel = make('label', '', t('noteLabel'));
  noteLabel.htmlFor = 'note-' + lead.id;
  const noteInput = make('textarea');
  noteInput.id = 'note-' + lead.id;
  noteInput.rows = 2;
  noteInput.maxLength = 1000;
  noteInput.value = lead.note || '';
  body.appendChild(noteLabel);
  body.appendChild(noteInput);

  const saveNote = actionButton(t('saveNote'), function () {
    setLeadStatus(lead.id, lead.status, noteInput.value.trim().slice(0, 1000));
  });
  saveNote.classList.add('gold');
  body.appendChild(saveNote);

  return body;
}

function actionButton(label, onClick) {
  const button = make('button', 'btn ghost', label);
  button.type = 'button';
  button.addEventListener('click', onClick);
  return button;
}

/** فتح/قفل تفاصيل رسالة */
function toggleLead(id) {
  openLeads[id] = !openLeads[id];
  renderLeads();
}

/** رسم القائمة كلها */
function renderLeads() {
  leadsEl.textContent = '';

  if (!allLeads.length) {
    leadsEl.appendChild(make('p', 'empty card', t('empty')));
    return;
  }

  const items = visibleLeads();
  if (!items.length) {
    leadsEl.appendChild(make('p', 'empty card', t('emptySearch')));
    return;
  }

  items.forEach(function (lead) {
    leadsEl.appendChild(leadCard(lead));
  });
}

/* --------------------------------------------------------------- العمليات */
/** جلب الرسايل من الدالة العامة */
function loadLeads() {
  return callRpc('portfolio_leads', { p_status: currentFilter || null })
    .then(function (data) {
      allLeads = (data && data.items) || [];
      setNotice(inboxMsg, '', '');
      renderCounter();
      renderLeads();
      document.title = (newCount() > 0 ? '(' + newCount() + ') ' : '') + t('inboxTitle');
    })
    .catch(function (error) {
      allLeads = [];
      renderCounter();
      renderLeads();
      setNotice(inboxMsg, adminErrorKey(error), 'err');
    });
}

/**
 * تغيير حالة رسالة أو حفظ ملاحظة عليها.
 * @param {string} id
 * @param {string} status
 * @param {string} [note]
 */
function setLeadStatus(id, status, note) {
  return callRpc('portfolio_lead_status', {
    p_id: id,
    p_status: status,
    p_note: note === undefined ? null : note
  })
    .then(function () {
      setNotice(inboxMsg, 'saved', 'ok');
      return loadLeads();
    })
    .catch(function (error) {
      setNotice(inboxMsg, adminErrorKey(error), 'err');
    });
}

/** حذف رسالة بعد تأكيد المستخدم */
function deleteLead(id) {
  return callRpc('portfolio_delete_lead', { p_id: id })
    .then(function () {
      delete openLeads[id];
      setNotice(inboxMsg, 'deleted', 'ok');
      return loadLeads();
    })
    .catch(function (error) {
      setNotice(inboxMsg, adminErrorKey(error), 'err');
    });
}

/** تصدير CSV للرسايل الظاهرة حاليًا */
function exportCsv() {
  const rows = [['created_at', 'status', 'name', 'email', 'phone', 'lang', 'message', 'note']];
  visibleLeads().forEach(function (lead) {
    rows.push([
      lead.created_at,
      lead.status,
      lead.full_name,
      lead.email,
      lead.phone || '',
      lead.lang,
      lead.message,
      lead.note || ''
    ]);
  });

  const csv = rows.map(function (row) {
    return row.map(function (cell) {
      return '"' + String(cell).replace(/"/g, '""') + '"';
    }).join(',');
  }).join('\r\n');

  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = make('a');
  link.href = url;
  link.download = 'portfolio-leads-' + new Date().toISOString().slice(0, 10) + '.csv';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/* ------------------------------------------------------------------ الدخول */
/**
 * تسجيل الدخول بحساب المطور.
 * @param {SubmitEvent} event
 */
function onAdminLogin(event) {
  event.preventDefault();

  const email = document.getElementById('loginEmail').value.trim().toLowerCase();
  const password = document.getElementById('loginPassword').value;

  if (!email || !password) {
    setNotice(loginMsg, 'badLogin', 'err');
    return;
  }

  loginBtn.disabled = true;
  loginBtn.textContent = t('loggingIn');
  setNotice(loginMsg, '', '');

  getAdminClient()
    .then(function (client) {
      return client.auth.signInWithPassword({ email: email, password: password });
    })
    .then(function (result) {
      if (result.error) {
        throw result.error;
      }
      setNotice(loginMsg, '', '');
      document.getElementById('loginPassword').value = '';
      return showInbox();
    })
    .catch(function () {
      setNotice(loginMsg, 'badLogin', 'err');
    })
    .then(function () {
      loginBtn.disabled = false;
      loginBtn.textContent = t('loginBtn');
    });
}

/** خروج وقفل الصندوق */
function onAdminLogout() {
  stopAutoRefresh();
  getAdminClient()
    .then(function (client) {
      return client.auth.signOut();
    })
    .then(function () {
      allLeads = [];
      openLeads = Object.create(null);
      showLogin();
    });
}

function showLogin() {
  inboxView.classList.add('hidden');
  loginView.classList.remove('hidden');
}

function showInbox() {
  loginView.classList.add('hidden');
  inboxView.classList.remove('hidden');
  return loadLeads().then(startAutoRefresh);
}

function startAutoRefresh() {
  stopAutoRefresh();
  refreshTimer = window.setInterval(function () {
    if (!document.hidden) {
      loadLeads();
    }
  }, ADMIN_REFRESH_MS);
}

function stopAutoRefresh() {
  if (refreshTimer) {
    window.clearInterval(refreshTimer);
    refreshTimer = null;
  }
}

/* ----------------------------------------------------------------- الربط */
if (loginForm) {
  loginForm.addEventListener('submit', onAdminLogin);
}

if (tabsEl) {
  tabsEl.addEventListener('click', function (event) {
    const tab = event.target.closest('.tab');
    if (!tab) {
      return;
    }

    currentFilter = tab.dataset.filter || '';
    tabsEl.querySelectorAll('.tab').forEach(function (button) {
      button.classList.toggle('active', button === tab);
    });
    loadLeads();
  });
}

if (searchInput) {
  searchInput.addEventListener('input', function () {
    searchPhrase = searchInput.value.trim();
    renderLeads();
  });
}

if (langBtn) {
  langBtn.addEventListener('click', function () {
    adminLang = adminLang === 'ar' ? 'en' : 'ar';
    localStorage.setItem(ADMIN_LANG_KEY, adminLang);
    applyAdminLanguage();
  });
}

if (refreshBtn) {
  refreshBtn.addEventListener('click', loadLeads);
}

if (csvBtn) {
  csvBtn.addEventListener('click', exportCsv);
}

if (logoutBtn) {
  logoutBtn.addEventListener('click', onAdminLogout);
}

/* أول تشغيل: لو فيه جلسةكم محفوظة بنكمل على الصندوق على طول */
applyAdminLanguage();

getAdminClient()
  .then(function (client) {
    return client.auth.getSession();
  })
  .then(function (result) {
    if (result.data && result.data.session) {
      return showInbox();
    }
    showLogin();
  })
  .catch(function () {
    showLogin();
  });
