# 🚀 Personal Portfolio Website

موقع أعمال شخصي بتصميم استجابي سريع، تم بناؤه باستخدام **Vanilla JavaScript** — بدون أي خطوة بناء.

🌐 **رابط المعاينة المباشرة (Live Demo):** [Moataz Mohamed Portfolio](https://portfolio-moataz.vercel.app/)  
💻 **المستودع (Repository):** [GitHub Repository](https://github.com/moatazsmohamed/portfolio)

---

## 📊 معايير الجودة والأمان (SonarQube Assessment)

تم فحص ومراجعة الكود باستخدام منصة **SonarQube Cloud** واجتياز كافة اختبارات الجودة:

- 🛡️ **Security Vulnerabilities:** 0 (Rating A)
- 🐛 **Bugs & Reliability:** 0 (Rating A)
- 🧹 **Code Smells & Maintainability:** 0 (Rating A)
- 🔥 **Security Hotspots Reviewed:** 100%

---

## ✨ المميزات الرئيسية (Key Features)

* **📥 صندوق رسائل العملاء (Lead Inbox):** فورم التواصل بيخزّن الرسائل في Supabase (جدول `portfolio.leads`)، وكل رسايلك بتظهرلك في صفحة `admin.html` بحساب المطور بتاع مدار — مع فلترة وبحث وملاحظات وتصدير CSV. التفاصيل تحت في قسم **صندوق الرسائل**.
* **🤖 مساعد ذكاء اصطناعي محلي (Local AI Assistant):** واجهة محادثة بالعربي والإنجليزي تعمل بالكامل داخل المتصفح من قاعدة معرفة مكتوبة في `script.js` — بدون سيرفر أو مفتاح API. لغة الرد بتتحدد من **لغة الرسالة نفسها**، فاللي يكتب عربي يتجاوب بالعربي حتى لو الموقع مفتح إنجليزي، مع أزرار أسئلة سريعة.
* **🖼️ معرض مشاريع تفاعلي (Project Carousel):** عدّاد للمشاريع، نقاط تنقل قابلة للضغط، سحب باللمس، وتنقل بأسهم الكيبورد (يدعم RTL).
* **🔗 مشاريع حقيقية موثّقة:** مدار (منصة إدارة فرق العمل)، MS Woodworks، TAFRA، وهذا الموقع — مع روابط مباشرة وصور معاينة.
* **🔒 تأمين خادم التطوير (Path Traversal Protection):** معالجة مسارات الملفات في `tests/serve.js` باستخدام `path.resolve` والتحقق الصارم لمنع الوصول غير المصرّح به.
* **♿ سهولة الوصول (Accessibility - A11y):** دعم كامل لقارئات الشاشة باستخدام وسم `<label>` مع كلاسات `sr-only` وتطبيق معايير ARIA.
* **⚡ أداء معزز (Performance Optimization):** كتابة تعبيرات نمطية (Regex) محسّنة تمنع مشكلة التراجع العكسي (Backtracking).

---

## 📥 صندوق الرسائل (Lead Inbox)

**الوصول:** `https://portfolio-moataz.vercel.app/admin.html` — الصفحة مش متلينكاها من الموقع عليها `noindex` وممنوعة في `robots.txt`.

**الدخول:** نفس الإيميل وكلمة السر بتاع **حساب المطور في مدار** (تسجيل دخول Supabase Auth عادي). مفيش حساب جديد ولا سر جديد.

**التخزين:** `sql/portfolio-leads.sql` بيعمل schema مقفول اسمه `portfolio` فيه جدول `leads`، و4 دوال عامة بس اللي مكشوفة للـ API:

| الدالة | لمين | بتعمل إيه |
|---|---|---|
| `portfolio_submit_lead(...)` | عام (anon) | تسجّل رسالة من الفورم بعد التحقق من الأطوال والصيغة |
| `portfolio_leads(p_status)` | حساب المطور بس | تجيب الرسايل + عدّاد الجديد |
| `portfolio_lead_status(p_id, p_status, p_note)` | حساب المطور بس | تغيير الحالة أو حفظ ملاحظة |
| `portfolio_delete_lead(p_id)` | حساب المطور بس | حذف رسالة |

**الحماية المتعمّدة:**
- الجدول في schema مش مكشوف على PostgREST — مافيش أي طريق تاني لغيره غير الدوال.
- كل دالة خاصة بتنادي `public.is_developer()` (موجودة من مدار) — فلو أي حساب تاني دخل، بيترفض ويرجع `LEAD_FORBIDDEN`.
- خانة طُعم `site` مخفية في الفورم: البوت بيملّها والدالة بترد نجاح وهمي من غير ما تسجّل حاجة.
- تقييد تكرار: نفس الإيميل مابعتش رسالة تانية قبل دقيقتين (`LEAD_THROTTLED`).
- حدود أطوال في قيود العمود نفسه (اسم 120، إيميل 254، رسالة 4000) فمفيش حشو.
- `admin.js` بيرسّم كل نص بـ `textContent` — رسالة العميل مستحيل تحقن HTML.

**التشغيل لأول مرة:** افتح [Supabase → SQL Editor لمشروع مدار](https://supabase.com/dashboard/project/ppihzxabbysozbdmweje/sql/new)، اعمل **Ctrl+A** في المحرر (Supabase بيشتغل على المحدّد فقط)، الصق كل محتوى `sql/portfolio-leads.sql` واعمل **Run**. آخر عمود `result` في النتيجة لازم يطلّع `OK — الدوال الستة اتعملت`.

---

## 🛠️ التقنيات المستخدمة (Tech Stack)

* **Frontend:** HTML5, CSS3, JavaScript (ES6+)
* **Tooling & Static Analysis:** SonarQube Cloud, Node.js
* **Icons & Fonts:** FontAwesome
* **Hosting:** Vercel

---

## 💻 التشغيل المحلي (Local Setup)

الموقع ملفات ثابتة، فممكن تفتحه بأي خادم ملفات بسيط:

```bash
# 1. استنساخ المستودع
git clone https://github.com/moatazsmohamed/portfolio.git

# 2. الانتقال لمجلد المشروع
cd portfolio

# 3. تشغيل خادم محلي
python -m http.server 4310
```

بعدها افتح `http://127.0.0.1:4310/` في المتصفح.
