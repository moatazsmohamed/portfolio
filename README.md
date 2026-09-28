# 🚀 Personal Portfolio Website

موقع أعمال شخصي بتصميم استجابي سريع، تم بناؤه باستخدام **Vanilla JavaScript** وتأمين خادم التطوير الداخلي واجتياز اختبارات الجودة والأمان بنسبة 100%.

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

* **🤖 مساعد ذكاء اصطناعي تفاعلي (AI Assistant UI):** واجهة محادثة متكاملة مدمجة داخل الموقع.
* **🔒 تأمين الخادم (Path Traversal Protection):** معالجة مسارات الملفات في `serve.js` باستخدام `path.resolve` والتحقق الصارم لمنع الوصول غير المصرّح به.
* **♿ سهولة الوصول (Accessibility - A11y):** دعم كامل لقارئات الشاشة باستخدام وسم `<label>` مع كلاسات `sr-only` وتطبيق معايير ARIA.
* **⚡ أداء معزز (Performance Optimization):** كتابة تعبيرات نمطية (Regex) محسّنة تمنع مشكلة التراجع العكسي (Backtracking).

---

## 🛠️ التقنيات المستخدمة (Tech Stack)

* **Frontend:** HTML5, CSS3, JavaScript (ES6+)
* **Tooling & Static Analysis:** SonarQube Cloud, Node.js
* **Icons & Fonts:** FontAwesome

---

## 💻 التشغيل المحلي (Local Setup)

لتشغيل خادم التطوير المحلي على جهازك:

```bash
# 1. استنساخ المستودع
git clone [https://github.com/mtzm2225-ship-it/portfolio.git](https://github.com/mtzm2225-ship-it/portfolio.git)

# 2. الانتقال لمجلد المشروع
cd portfolio

# 3. تشغيل الخادم المحلي
node serve.js