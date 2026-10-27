# 🚀 Personal Portfolio Website

موقع أعمال شخصي بتصميم استجابي سريع، تم بناؤه باستخدام **Vanilla JavaScript** — بدون أي خطوة بناء.

🌐 **رابط المعاينة المباشرة (Live Demo):** [Moataz Mohamed Portfolio](https://portfolio-moataz.vercel.app/)  
💻 **المستودع (Repository):** [GitHub Repository](https://github.com/mtzm2225-ship-it/portfolio)

---

## 📊 معايير الجودة والأمان (SonarQube Assessment)

تم فحص ومراجعة الكود باستخدام منصة **SonarQube Cloud** واجتياز كافة اختبارات الجودة:

- 🛡️ **Security Vulnerabilities:** 0 (Rating A)
- 🐛 **Bugs & Reliability:** 0 (Rating A)
- 🧹 **Code Smells & Maintainability:** 0 (Rating A)
- 🔥 **Security Hotspots Reviewed:** 100%

---

## ✨ المميزات الرئيسية (Key Features)

* **🤖 مساعد ذكاء اصطناعي محلي (Local AI Assistant):** واجهة محادثة بالعربي والإنجليزي تعمل بالكامل داخل المتصفح من قاعدة معرفة مكتوبة في `script.js` — بدون سيرفر أو مفتاح API، مع أزرار أسئلة سريعة.
* **🖼️ معرض مشاريع تفاعلي (Project Carousel):** عدّاد للمشاريع، نقاط تنقل قابلة للضغط، سحب باللمس، وتنقل بأسهم الكيبورد (يدعم RTL).
* **🔗 مشاريع حقيقية موثّقة:** مدار (منصة إدارة فرق العمل)، MS Woodworks، TAFRA، وهذا الموقع — مع روابط مباشرة وصور معاينة.
* **🔒 تأمين خادم التطوير (Path Traversal Protection):** معالجة مسارات الملفات في `tests/serve.js` باستخدام `path.resolve` والتحقق الصارم لمنع الوصول غير المصرّح به.
* **♿ سهولة الوصول (Accessibility - A11y):** دعم كامل لقارئات الشاشة باستخدام وسم `<label>` مع كلاسات `sr-only` وتطبيق معايير ARIA.
* **⚡ أداء معزز (Performance Optimization):** كتابة تعبيرات نمطية (Regex) محسّنة تمنع مشكلة التراجع العكسي (Backtracking).

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
git clone https://github.com/mtzm2225-ship-it/portfolio.git

# 2. الانتقال لمجلد المشروع
cd portfolio

# 3. تشغيل خادم محلي
python -m http.server 4310
```

بعدها افتح `http://127.0.0.1:4310/` في المتصفح.
