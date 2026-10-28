/* ============================================================================
   PORTFOLIO — M & M · Moataz Mohamed
   الملف: script.js  (ملف الجافاسكربت الرئيسي والوحيد)
   ============================================================================

   ⚠️  قبل أي تعديل، اقرا الفهرس ده كويس — كل قسم مكتوب عنده رقمه.

   ----------------------------------------------------------------------------
   فهرس الأقسام (بالترتيب جوه الملف)
   ----------------------------------------------------------------------------
     1)  الترجمة (Translations)            — قاموس عربي/إنجليزي
     2)  بيانات المشاريع (Project Data)     — مصفوفة كل المشاريع
     3)  مراجع عناصر الصفحة (DOM Refs)      — بنمسك العناصر مرة واحدة
     4)  أدوات مساعدة (Helpers)            — دوال صغيرة بيستخدمها الباقي
     5)  الهيدر (Header Scroll State)      — تغيير شكل الشريط عند النزول
     6)  البحث (Search)                   — بحث في الصفحة + تمييز النتائج
     7)  الثيم (Theme)                    — الوضع الأساسي / الأبيض
     8)  كارت المشاريع (Portfolio Card)     — التنقل بين المشاريع
     9)  الترجمة التطبيقية (Language)       — تبديل اللغة وتطبيقها
    10)  التنقل وسلايدر الشهادات (Navigation)
    11)  شاشة التحميل + شاشة الاسم (Preloader / Name Intro)
    12)  التشغيل الأولي (Init)              — بيتنفّذ في آخر الملف
       12.0  ظهور المحتوى عند النزول (Scroll Reveal)
       12.1  (محذوف) توهج الماوس القديم — اتشال
       12.2  الخلفية التفاعلية (Living Background) + المؤشر المخصص
    13)  مساعد الذكاء الاصطناعي (AI Assistant / Chat)
    14)  زر مواقع التواصل + نافذتها (Social Links Popup)
    15)  رمز QR (QR Code)
    16)  كارت المشاركة ورمز QR
    17)  روبوت الهيرو — متابعة الماوس
    18)  روبوت الهيرو — فقاعة الترحيب
    19)  صندوق رسائل العملاء (Contact form → Supabase)

   ----------------------------------------------------------------------------
   قواعد مهمة لأي حد بيعدّل هنا
   ----------------------------------------------------------------------------
     • الملف ده بيشتغل بـ 'use strict' — لازم تعريف كل متغير قبل استخدامه.
     • مفيش مكتبات خارجية — كله JavaScript خام (Vanilla JS).
     • كل عنصر نحتاج نلمسه من الصفحة بنجيبه من قسم (3) DOM References.
     • أي نص بيظهر للمستخدم لازم يكون في قاموس الترجمة (قسم 1)
       وعليه data-i18n في index.html — عشان اللغتين يفضلوا متطابقتين.
     • ترتيب التشغيل: التعريفات فوق← التحضيرات ← ثم (15) Init في الآخر.
     • مهم: الكود بيتنفّذ بعد تحميل الصفحة لأن الـ <script> عليه defer.
   ============================================================================ */

'use strict';

/* ============================================================================
   1) الترجمة (Translations)
   ----------------------------------------------------------------------------
   كام حاجة لازم تعرفها قبل ما تعدل هنا:

   • كل مفتاح هنا (زي home / heroTitle / viewWork) لازم يكون له:
       - نسخة في ar (عربي)
       - نسخة في en (إنجليزي)
       - والعنصر في index.html عليه data-i18n="نفس المفتاح"
     لو نسيت أي واحدة من التلاتة، النص هيطلع فاضي أو غلط.

   • فيه حالات خاصة للنصوص الطويلة اللي فيها علامات تنصيص (زي "Let's Talk")
     بتتكتب بـ double quotes:  letsTalk: "Let's Talk"

   • data-i18n-placeholder فيه بيغير placeholder بتاع حقول الإدخال
     (زي خانة البحث) مش النص اللي جوه العنصر.

   • لو عايز تضيف لغة جديدة (مثلاً الفرنساوي):
       1) ضيف بلوك  fr: { ... } هنا بنفس المفاتيح
       2) ضيف زرار في .lang-switcher في index.html عليه data-lang="fr"
       3) خلاص — الكود هيشتغل تلقائيًا، مفيش تعديل تاني مطلوب.
   ============================================================================ */
const translations = {
  /* ---------------------------------- العربية ---------------------------------- */
  ar: {
    /* الهيدر والتنقل */
    home: 'الرئيسية',
    about: 'عني',
    portfolio: 'المشاريع',
    contact: 'تواصل',
    headerCta: 'كلمني',
    menuLabel: 'القائمة',
    search: 'بحث...',
    experienceNav: 'الخبرات',
    skillsNav: 'المهارات',
    summaryNav: 'النبذة',
    socialsTitle: 'مواقع التواصل',
    socialsSubtitle: 'تلاقيني على المنصات دي — دايمًا مبسوط أتعرف على ناس جديدة.',

    /* قسم النبذة المهنية (Professional Summary) */
    summaryTitle: 'نبذة مهنية',
    summaryText: 'مطور واجهات أمامية (Frontend Developer) وطالب تكنولوجيا معلومات في جامعة برج العرب التكنولوجية، بخلفية مهنية متنوعة بتجمع بين الإدارة والعمل التقني.',
    summaryGoal: 'أبحث عن تدريب (Internship) أو وظيفة مبتدئة كـ Frontend Developer.',

    /* قسم الخبرات المهنية (Experience) */
    experienceKicker: 'المسار المهني',
    experienceTitle: 'الخبرات المهنية',
    experienceText: 'خبرات عملية متنوعة بين إدارة المنصات الرقمية، وقيادة العمليات، والدقة في العمل التقني.',
    expModeratorRole: 'مشرف منصات رقمية ومتخصص محتوى',
    expModeratorCompany: 'عمل عن بُعد',
    expModeratorText: 'إدارة المنصات الرقمية وتفاعل المجتمعات، وإنشاء محتوى تعليمي وتقني باستخدام أدوات الذكاء الاصطناعي.',
    expManagerRole: 'مدير فرع / قائد عمليات',
    expManagerCompany: 'إدارة وتشغيل',
    expManagerText: 'إدارة العمليات اليومية وسير العمل بالفرع، وقيادة الفريق لتحقيق معايير البيع والخدمة.',
    expWarehouseRole: 'مساعد عمليات مخازن',
    expWarehouseCompany: 'عمليات ولوجستيات',
    expWarehouseText: 'الإشراف على تتبع المخزون، وتنظيم التوزيع، والحفاظ على سجلات تشغيلية دقيقة.',
    expCurrent: 'الأحدث',

    /* قسم المهارات (Skills) */
    skillsKicker: 'الكفاءات',
    skillsTitle: 'المهارات',
    skillsText: 'مجموعة الأدوات والتقنيات اللي بشتغل بيها في الواجهات الأمامية والبرمجة والأدوات المساعدة.',
    skillsWebDev: 'تطوير الويب',
    skillsProgramming: 'البرمجة والأساسيات',
    skillsTools: 'أدوات المطور والذكاء الاصطناعي',
    skillsSoft: 'المهارات الشخصية',
    softSelfMotivated: 'مُبادِر ذاتيًا',
    softLeadership: 'قيادة',
    softTeamManagement: 'إدارة فريق',
    softProblemSolving: 'حل المشكلات',

    /* قسم الدورات (Courses) */
    coursesKicker: 'التعلم المستمر',
    coursesTitle: 'الدورات والدراسة',
    coursesText: 'المسارات التعليمية والدورات اللي بتبني أساسي التقني.',
    courseFrontendTitle: 'دورة تطوير الواجهات الأمامية',
    courseFrontendMeta: 'HTML5 · CSS3 · JavaScript',
    courseFrontendText: 'مسارات تعليمية في تطوير الويب تغطي البنية الدلالية، التنسيق، التخطيط المتجاوب، ومنطق البرمجة بالجافاسكريبت.',
    courseCiscoTitle: 'أساسيات شبكات وأمن المعلومات (Cisco)',
    courseCiscoMeta: 'Networking · Cybersecurity',
    courseCiscoText: 'الدراسات الأساسية في الشبكات وأمن المعلومات ومفاهيم حماية الأنظمة.',
    courseUniversityTitle: 'تكنولوجيا المعلومات — جامعة برج العرب التكنولوجية',
    courseUniversityMeta: 'طالب جامعي',
    courseUniversityText: 'دراسة أكاديمية في تكنولوجيا المعلومات تشمل علوم الحاسوب والأنظمة وقواعد البيانات.',
    coursesStatus: 'قيد التقدم',

    /* قسم الهيرو */
    welcome: 'مرحبًا! أنا معتز محمد',
    heroStatus: 'متاح للتدريب والوظائف المبتدئة',
    statProjectsLabel: 'مشاريع منشورة',
    statTechLabel: 'تقنيات في الشغل اليومي',
    statLocationLabel: 'الموقع',
    statLocationValue: 'الإسكندرية، مصر',
    heroTitle: 'ملفي الشخصي، سيرتي الذاتية، ومشاريعي البرمجية كلهم في مكان واحد',
    heroDescription: 'أنا طالب IT شغوف بالبرمجة والتقنية وبناء الأشياء التي تحدث تأثيرًا. أتعلم باستمرار وأحسن مهاراتي وأحوّل الأفكار إلى مشاريع حقيقية.',
    viewWork: 'عرض الأعمال',
    letsTalk: 'تحدث معي',
    downloadCv: 'تحميل السيرة الذاتية',

    /* كارت المهارات داخل الهيرو */
    itStudent: 'طالب IT',
    turnIdeas: 'تحويل الأفكار إلى مشاريع حقيقية',
    cardText: 'نتعلم اليوم، ونقود الغد. نركز على تطوير البرمجيات، تطبيقات الويب، وهندسة قواعد البيانات.',
    programming: 'البرمجة',
    cleanScalable: 'نظيف وقابل للتطوير',
    webDev: 'تطوير الويب',
    responsiveApps: 'تطبيقات متجاوبة',
    databases: 'قواعد البيانات',
    sqlSystems: 'SQL والأنظمة',
    itDepartment: 'قسم IT',
    networksLogic: 'الشبكات والمنطق',
    keepLearning: 'استمر في التعلم، واستمر في النمو',

    /* قسم من أنا */
    aboutTitle: 'من أنا',
    education: 'التعليم',
    educationText: 'طالب IT يبني قاعدة قوية في علوم الحاسوب والأنظمة وهندسة البرمجيات.',
    development: 'التطوير',
    developmentText: 'أقوم بإنشاء تطبيقات نظيفة ومتجاوبة وقوية باستخدام تقنيات الويب الحديثة.',
    goals: 'الأهداف',
    goalsText: 'أتعلم باستمرار لحل المشكلات المعقدة وتقديم حلول رقمية عالية الجودة.',

    /* قسم الشهادات */
    certificates: 'الشهادات',
    certificatesText: 'شهاداتي المهنية وانتهاء الدورات التي أكملتها.',
    html: 'HTML',
    css: 'CSS',
    java: 'JavaScript',
    htmlNote: 'هذه الشهادة تعكس أهمية تعلم أساسيات تطوير الويب وبناء قاعدة قوية في HTML.',
    cssNote: 'هذه الشهادة تعكس أهمية إتقان التصميم، التخطيط، الاستجابة، والتنسيق البصري في تطوير المواقع الحديثة.',
    beforeBrandTitle: 'حدث Before Brand',
    beforeBrandDate: '27 أغسطس 2026',
    issuerLabel: 'المصدر:',
    beforeBrandIssuer: 'أكاديمية العربية وفريق Before Brand',
    locationLabel: 'المكان:',
    beforeBrandLocation: 'الإسكندرية، مصر',
    completed2026: 'مكتمل في 2026',
    completed2025: 'مكتمل في 2025',
    viewLabel: 'عرض',
    downloadLabel: 'تحميل',
    javascriptnote: 'هذه الشهادة تعكس إتمام دورة تمهيدية في JavaScript تشمل التعامل مع DOM والأحداث ومنطق البرمجة الأساسي.',

    /* قسم المشاريع */
    portfolioKicker: 'مشروع مميز',
    portfolioTitle: 'المشاريع',
    projectTag: 'أحدث مشروع',

    /* دراسة حالة مدار */
    caseKicker: 'دراسة حالة',
    caseTitle: 'مدار — من فكرة لمشروع شغّال',
    caseIntro: 'منصة متعددة الشركات لإدارة شغل الفرق، بدأت من مشكلة حقيقية في الشغل اليومي ووصلت لمنتج فعلًا مستخدم كل يوم.',
    caseProblemLabel: 'المشكلة',
    caseProblemText: 'فرق موزعة على أقسام محتاجة مكان واحد للمهام اليومية والصلاحيات والتقارير الشهرية، بدل شيتات متفرقة ومتابعة يدوية.',
    caseBuiltLabel: 'اللي اتبنى',
    caseBuiltText: 'منصة متعددة الشركات: مهام يومية بمؤقتات، أقسام وصلاحيات، تقارير شهرية، لوحة للمطوّر، وواجهة عربية كاملة من اليمين للشمال.',
    caseRoleLabel: 'دوري',
    caseRoleText: 'من الأول للآخر: تصميم قاعدة البيانات والصلاحيات، طبقة الـ API، تجربة المستخدم، والنشر.',
    caseOpen: 'افتح مدار',
    caseTagsLabel: 'التقنيات المستخدمة',
    numbersKicker: 'حركة الموقع',
    numbersTitle: 'الموقع في حركة دائمة',
    numberVisits: 'زيارة للموقع',
    numberVisitors: 'زائر',
    numberClients: 'عميل',
    numberProjects: 'مشروع منشور',
    numbersNote: 'أرقام بتتحدّث باستمرار — لمحة سريعة عن حركة الموقع.',
    projectName: 'مدار — إدارة فريق العمل',
    projectDescription: 'منصة سحابية متعددة الشركات لإدارة فرق العمل: مهام يومية وتايمر، أقسام وصلاحيات، تقارير شهرية، ولوحة مطوّر — بواجهة عربية كاملة.',
    viewProject: 'عرض المشروع',
    githubProject: 'جيت هاب',
    changeProject: 'تغيير المشروع',

    /* التواصل */
    contactKicker: 'دعنا نتواصل',
    contactTitle: 'هل تحتاج إلى مشروع أو تعاون أو مجرد دردشة سريعة؟',
    contactButton: 'تواصل معي',

    /* فورم التواصل */
    formTitle: 'يلا نبني حاجة سوا',
    formIntro: 'عندك مشروع أو فكرة أو سؤال؟ املّ الخانات دي وهرد عليك في أقرب وقت.',
    formNameLabel: 'الاسم كامل',
    formNamePh: 'اكتب اسمك',
    formPhoneLabel: 'رقم التليفون',
    formPhonePh: 'رقمك (اختياري)',
    formEmailLabel: 'البريد الإلكتروني',
    formEmailPh: 'الإيميل اللي هنرد عليك عليه',
    formMsgLabel: 'رسالتك',
    formMsgPh: 'اكتب تفاصيل المشروع أو سؤالك هنا...',
    formSubmit: 'ابعت الرسالة',
    formSending: 'بتتبعت دلوقتي...',
    formOk: 'وصلت رسالتك ✅ هرّد عليك في أقرب وقت.',
    formErr: 'معلش، الرسالة مبتتبعتش دلوقتي. جرّب تاني أو تواصل معي مباشرة.',
    formFast: 'من دقيقتين انت بعت رسالة — استنى شوية وابعت تاني.',
    formBusy: 'الرسايل زيادت شوية دلوقتي — جرّب بعد نص ساعة.',
    formNeedName: 'اكتب اسمك الأول.',
    formNeedEmail: 'اكتب إيميل صحيح عشان نقدر نرد عليك.',
    formNeedMsg: 'اكتب رسالتك الأول.',

    /* رمز QR + المشاركة */
    qrKicker: 'شاركها مع صحابك',
    qrTitle: 'ادعُ أصحابك تشوف شغلك',
    qrText: 'امسح الكود من موبايلك، أو اضغط «شارك» وابعت الرابط في واتساب أو أي تطبيق تاني — والموقع كله جاهز.',
    qrCaption: 'portfolio-moataz.vercel.app',
    qrScan: 'امسح الكود',
    qrShare: 'شارك الموقع',
    qrShareSent: 'تم نسخ اللينك!',
    qrCopy: 'نسخ اللينك',
    qrCopied: 'تم النسخ!',
    qrDownload: 'حفظ الـ QR',
    qrSaved: 'تم حفظ الصورة!',

    /* روبوت الهيرو: رسالة الترحيب لما المستخدم يدوس عليه */
    botGreeting: 'أهلاً بيك! أنا روبوت الموقع، إعمل إيه؟ 👋',
    qrPlateTitle: 'MY PORTFOLIO',
    qrPlateSub: 'WEB DEVELOPER',
    qrLinkProjects: 'المشاريع',
    qrLinkAbout: 'عني',
    qrLinkCv: 'السيرة الذاتية',
    qrLinkSkills: 'المهارات',

    /* الفوتر: الجملة الكرييتف + مواقع التواصل + الحقوق */
    footerQuote: 'صُمِّم وطُوِّر بكل شغف | Designed & Developed with passion',
    footerSocialTitle: 'خلّينا على تواصل دايمًا',
    footerSocialSubtitle: 'تابعني على مواقع التواصل — دايمًا مبسوط أتعرف على ناس جديدة.',
    footerCredo: 'بنحوّل القهوة لكود، والأفكار لواقع.',
    allRightsReserved: '© 2026 معتز محمد. جميع الحقوق محفوظة.',
    footerSignature: 'مكتوب سطر بسطر بكل شغف — من الإسكندرية، مصر 🇪🇬',

    /* مساعد الذكاء الاصطناعي */
    aiTitle: 'مساعد M & M الذكي',
    aiSubtitle: 'اسألني عن معتز، مشاريعه، مهاراته، أو أي حاجة عن الموقع.',
    aiPlaceholder: 'اسأل الذكاء الاصطناعي...',
    aiSend: 'إرسال',
    aiThinking: '...جاري التفكير',
    aiWaiting: 'الإجابة ستظهر هنا...',
    aiEmpty: 'من فضلك اكتب سؤال أولًا.',
    aiFallback: 'مش متأكد إني فهمت السؤال 🙈 جرّب تسألني عن: معتز، المشاريع، مدار، المهارات، الخبرات، أو طرق التواصل.',
    aiSuggestLabel: 'أسئلة سريعة',
    aiSuggestAbout: 'مين معتز؟',
    aiSuggestProjects: 'اعرض المشاريع',
    aiSuggestMadar: 'إيه هو مدار؟',
    aiSuggestContact: 'إزاي أتواصل؟',

    /* الإعدادات */
    primaryMode: 'الوضع الأساسي',
    whiteMode: 'الوضع الأبيض'
  },

  /* ---------------------------------- English ---------------------------------- */
  en: {
    /* Header & Navigation */
    home: 'Home',
    about: 'About Me',
    portfolio: 'Portfolio',
    contact: 'Contact',
    headerCta: "Let's Talk",
    menuLabel: 'Menu',
    search: 'Search...',
    experienceNav: 'Experience',
    skillsNav: 'Skills',
    summaryNav: 'Summary',
    socialsTitle: 'Social Links',
    socialsSubtitle: 'Find me on these platforms — always happy to connect.',

    /* Professional Summary */
    summaryTitle: 'Professional Summary',
    summaryText: 'Frontend Developer and IT student at Borg El Arab Technological University, with a diverse professional background spanning both management and technical work.',
    summaryGoal: 'Seeking an internship or an entry-level position as a Frontend Developer.',

    /* Experience */
    experienceKicker: 'Career Path',
    experienceTitle: 'Professional Experience',
    experienceText: 'Hands-on experience across digital platform management, operational leadership, and precise technical work.',
    expModeratorRole: 'Online Moderator & Content Specialist',
    expModeratorCompany: 'Remote',
    expModeratorText: 'Managing digital platforms and community engagement, and producing educational and technical content using AI tools.',
    expManagerRole: 'Branch Manager / Operational Lead',
    expManagerCompany: 'Operations & Management',
    expManagerText: 'Running daily operations and branch workflow, and leading the team to meet sales and service standards.',
    expWarehouseRole: 'Warehouse Operations Assistant',
    expWarehouseCompany: 'Operations & Logistics',
    expWarehouseText: 'Overseeing inventory tracking, organising distribution, and keeping accurate operational records.',
    expCurrent: 'Most Recent',

    /* Skills */
    skillsKicker: 'Capabilities',
    skillsTitle: 'Skills',
    skillsText: 'The tools and technologies I work with across frontend development, programming, and supporting tooling.',
    skillsWebDev: 'Web Development',
    skillsProgramming: 'Programming & Core',
    skillsTools: 'Developer Tools & AI',
    skillsSoft: 'Soft Skills',
    softSelfMotivated: 'Self-Motivated',
    softLeadership: 'Leadership',
    softTeamManagement: 'Team Management',
    softProblemSolving: 'Problem Solving',

    /* Courses */
    coursesKicker: 'Continuous Learning',
    coursesTitle: 'Courses & Education',
    coursesText: 'The learning tracks and courses that build my technical foundation.',
    courseFrontendTitle: 'Frontend Web Development Coursework',
    courseFrontendMeta: 'HTML5 · CSS3 · JavaScript',
    courseFrontendText: 'Web development tracks covering semantic structure, styling, responsive layout, and JavaScript programming logic.',
    courseCiscoTitle: 'Cisco Networking & Cybersecurity Basics',
    courseCiscoMeta: 'Networking · Cybersecurity',
    courseCiscoText: 'Foundational studies in networking, information security, and system protection concepts.',
    courseUniversityTitle: 'Information Technology — Borg El Arab Technological University',
    courseUniversityMeta: 'University Student',
    courseUniversityText: 'Academic study in information technology covering computer science, systems, and databases.',
    coursesStatus: 'In Progress',

    /* Hero section */
    welcome: "Welcome! I'm Moataz Mohamed",
    heroStatus: 'Open to internships & junior roles',
    statProjectsLabel: 'Live projects',
    statTechLabel: 'Technologies in use',
    statLocationLabel: 'Based in',
    statLocationValue: 'Alexandria, EG',
    heroTitle: 'My personal portfolio, CV, and software projects all in one place',
    heroDescription: "I'm an IT student passionate about programming, technology, and building things that make an impact. I'm constantly learning, improving my skills, and turning ideas into real projects.",
    viewWork: 'View Work',
    letsTalk: "Let's Talk",
    downloadCv: 'Download CV',

    /* Skills card inside hero */
    itStudent: 'IT Student',
    turnIdeas: 'Turning Ideas Into Real Projects',
    cardText: 'Learning today, leading tomorrow. Focused on software development, web applications, and database engineering.',
    programming: 'Programming',
    cleanScalable: 'Clean & Scalable',
    webDev: 'Web Dev',
    responsiveApps: 'Responsive Apps',
    databases: 'Databases',
    sqlSystems: 'SQL & Systems',
    itDepartment: 'IT Department',
    networksLogic: 'Networks & Logic',
    keepLearning: 'Keep Learning, Keep Growing',

    /* About section */
    aboutTitle: 'About Me',
    education: 'Education',
    educationText: 'IT Student building a strong foundation in Computer Science, Systems, and Software Architecture.',
    development: 'Development',
    developmentText: 'Creating clean, responsive, and robust applications using modern programming web tech.',
    goals: 'Goals',
    goalsText: 'Continuously learning to solve complex problems and deliver high-quality digital solutions.',

    /* Certificates */
    certificates: 'Certificates',
    certificatesText: 'My professional certificates and course completions.',
    html: 'HTML',
    css: 'CSS',
    java: 'JavaScript',
    htmlNote: 'Completed an introductory HTML course covering structure, semantic tags, and HTML5 fundamentals.',
    cssNote: 'Completed a beginner CSS course focusing on styling, layout, responsiveness, and visual design basics.',
    beforeBrandTitle: 'Before Brand Event',
    beforeBrandDate: 'August 27, 2026',
    issuerLabel: 'Issuer:',
    beforeBrandIssuer: 'Arabian Academy & Before Brand Team',
    locationLabel: 'Location:',
    beforeBrandLocation: 'Alexandria, Egypt',
    completed2026: 'Completed in 2026',
    completed2025: 'Completed in 2025',
    viewLabel: 'View',
    downloadLabel: 'Download',
    javascriptnote: 'Completed an introductory JavaScript course covering dynamic scripting, DOM manipulation, event handling, and core programming logic.',

    /* Portfolio section */
    portfolioKicker: 'Featured Project',
    portfolioTitle: 'Projects',
    projectTag: 'Latest Project',

    /* Madar case study */
    caseKicker: 'Case Study',
    caseTitle: 'Madar — from an idea to a running product',
    caseIntro: 'A multi-tenant team-operations platform that started as a real workflow problem and ended up as a working product used every day.',
    caseProblemLabel: 'The problem',
    caseProblemText: 'Teams split across departments needed one place for daily tasks, permissions and monthly reporting instead of scattered sheets and manual follow-up.',
    caseBuiltLabel: 'What I built',
    caseBuiltText: 'A multi-company platform: timed daily tasks, departments and roles, monthly reports, a developer console, and a full Arabic RTL interface.',
    caseRoleLabel: 'My role',
    caseRoleText: 'End-to-end: database schema and permissions, the API layer, the client experience, and the deployment.',
    caseOpen: 'Open Madar',
    caseTagsLabel: 'Technologies used',
    numbersKicker: 'Site activity',
    numbersTitle: 'Always in motion',
    numberVisits: 'Site visits',
    numberVisitors: 'Visitors',
    numberClients: 'Clients',
    numberProjects: 'Live projects',
    numbersNote: 'Counters that keep moving — a quick snapshot of site activity.',
    projectName: 'Madar — Team Management',
    projectDescription: 'A multi-tenant cloud platform for team operations: daily tasks with timers, departments and permissions, monthly reports, and a developer panel — with a fully Arabic interface.',
    viewProject: 'View Project',
    githubProject: 'GitHub',
    changeProject: 'Change Project',

    /* Contact */
    contactKicker: "Let's Connect",
    contactTitle: 'Need a project, collaboration, or just a quick chat?',
    contactButton: 'Contact Me',

    /* Contact form */
    formTitle: "Let's Build Something Together",
    formIntro: 'Have a project, an idea or a question? Fill the form below and I will get back to you soon.',
    formNameLabel: 'Full Name',
    formNamePh: 'Enter your name',
    formPhoneLabel: 'Phone Number',
    formPhonePh: 'Your number (optional)',
    formEmailLabel: 'Email Address',
    formEmailPh: 'The email I should reply to',
    formMsgLabel: 'Your Message',
    formMsgPh: 'Tell me about the project or ask your question...',
    formSubmit: 'Send Message',
    formSending: 'Sending...',
    formOk: 'Your message is in ✅ I will reply as soon as I can.',
    formErr: 'The message could not be sent right now. Try again or contact me directly.',
    formFast: 'You just sent a message two minutes ago — please wait a bit and try again.',
    formBusy: 'Messages are piling up right now — please try again in half an hour.',
    formNeedName: 'Please write your name first.',
    formNeedEmail: 'Please write a valid email so we can reply to you.',
    formNeedMsg: 'Please write your message first.',

    /* QR code + sharing */
    qrKicker: 'Share it with friends',
    qrTitle: 'Invite your friends to see my work',
    qrText: 'Scan the code from your phone, or hit Share and send the link on WhatsApp or any app — the whole site is ready.',
    qrCaption: 'portfolio-moataz.vercel.app',
    qrScan: 'Scan the code',
    qrShare: 'Share site',
    qrShareSent: 'Link copied!',
    qrCopy: 'Copy link',
    qrCopied: 'Copied!',
    qrDownload: 'Save QR',
    qrSaved: 'Image saved!',

    /* Hero bot: greeting shown when the user clicks it */
    botGreeting: "Hey there! I'm the site bot — what can I do for you? 👋",
    qrPlateTitle: 'MY PORTFOLIO',
    qrPlateSub: 'WEB DEVELOPER',
    qrLinkProjects: 'Projects',
    qrLinkAbout: 'About Me',
    qrLinkCv: 'CV',
    qrLinkSkills: 'Skills',

    /* Footer: credo + social links + copyright */
    footerQuote: 'Designed & Developed with passion | صُمِّم وطُوِّر بكل شغف',
    footerSocialTitle: "Let's stay connected",
    footerSocialSubtitle: "Follow me on social media — I'm always happy to connect with new people.",
    footerCredo: 'Turning coffee into code, and ideas into reality.',
    allRightsReserved: '© 2026 Moataz Mohamed. All rights reserved.',
    footerSignature: 'Handcrafted line by line with passion — from Alexandria, Egypt 🇪🇬',

    /* AI Assistant */
    aiTitle: 'M & M AI Assistant',
    aiSubtitle: 'Ask me about Moataz, his projects, his skills, or anything on this site.',
    aiPlaceholder: 'Ask the AI assistant...',
    aiSend: 'Send',
    aiThinking: 'Thinking...',
    aiWaiting: 'The answer will appear here...',
    aiEmpty: 'Please type a question first.',
    aiFallback: "I'm not sure I got that. Try asking about Moataz, the projects, Madar, skills, experience, or contact details.",
    aiSuggestLabel: 'Quick questions',
    aiSuggestAbout: 'Who is Moataz?',
    aiSuggestProjects: 'Show projects',
    aiSuggestMadar: 'What is Madar?',
    aiSuggestContact: 'How to contact?',

    /* Settings */
    primaryMode: 'Primary Mode',
    whiteMode: 'White Mode'
  }
};

/* أسئلة المساعد السريعة: النص المعروض من القاموس، والسؤال اللي بيتبعت حسب اللغة */
const aiSuggestionPrompts = [
  { labelKey: 'aiSuggestAbout', question: { ar: 'مين معتز؟', en: 'Who is Moataz?' } },
  { labelKey: 'aiSuggestProjects', question: { ar: 'اعرض المشاريع', en: 'Show projects' } },
  { labelKey: 'aiSuggestMadar', question: { ar: 'إيه هو مدار؟', en: 'What is Madar?' } },
  { labelKey: 'aiSuggestContact', question: { ar: 'إزاي أتواصل؟', en: 'How to contact?' } }
];

/* ============================================================================
   2) بيانات المشاريع (Project Data)
   ----------------------------------------------------------------------------
   مصفوفة فيها كل المشاريع، وكل كارت في قسم المشاريع بيقرا منها.

   شكل كل مشروع:
     tag            → التصنيف اللي بيظهر فوق اسم المشروع («الأول»، «قريبًا»...)
     name           → اسم المشروع
     description     → وصف قصير
     primaryText     → نص الزرار الأساسي («عرض المشروع»)
     primaryLink     → اللينك اللي الزرار الأساسي بيروح له
     secondaryText   → نص الزرار الثاني («جيت هاب»)
     secondaryLink   → لينك الزرار الثاني
     previewImage    → مسار صورة المعاينة (اختياري — لو مش موجود تبان رسمة بديلة)

   مهم: كل النصوص هنا { ar, en } عشان تبقى متاحة في اللغتين.
         اللينكات مسارات عادية مش داخلين في الترجمة.

   عايز تضيف مشروع؟ انسخ أي عنصر هنا وعدّل قيمه والكود هياخد باله لوحده.
   ============================================================================ */
const projectData = [
  /* --- الأحدث: مدار — منصة إدارة فرق العمل --- */
  {
    tag: { ar: 'أحدث مشروع', en: 'Latest Project' },
    name: { ar: 'مدار — إدارة فريق العمل', en: 'Madar — Team Management' },
    description: {
      ar: 'منصة سحابية متعددة الشركات لإدارة فرق العمل: مهام يومية وتايمر، أقسام وصلاحيات، تقارير شهرية، ولوحة مطوّر — بواجهة عربية كاملة.',
      en: 'A multi-tenant SaaS for team management: daily tasks and timers, departments and roles, monthly reports, and a developer console — with a full Arabic RTL interface.'
    },
    tech: ['React Native', 'Expo', 'TypeScript', 'Supabase', 'PostgreSQL', 'Vercel'],
    primaryText: { ar: 'زيارة مدار', en: 'Visit Madar' },
    primaryLink: 'https://madar-m.vercel.app/login',
    secondaryText: { ar: 'جيت هاب', en: 'GitHub' },
    secondaryLink: 'https://github.com/moatazsmohamed/madar',
    previewImage: 'img/madar-login.webp'
  },

  /* --- المشروع الثاني: موقع الملف الشخصي --- */
  {
    tag: { ar: 'مشروع شخصي', en: 'Personal Project' },
    name: { ar: 'موقع الملف الشخصي', en: 'Portfolio Website' },
    description: {
      ar: 'موقع شخصي حديث بتصميم متجاوب، إمكانية تبديل اللغة، وقسم عرض الشهادات.',
      en: 'A modern personal portfolio with a responsive interface, language switcher, and certificate display section.'
    },
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Responsive'],
    primaryText: { ar: 'عرض المشروع', en: 'View Project' },
    primaryLink: 'index.html',
    secondaryText: { ar: 'جيت هاب', en: 'GitHub' },
    secondaryLink: 'https://github.com/moatazsmohamed/portfolio',
    previewImage: 'img/portfolio-preview.webp'
  },

  /* --- المشروع الثالث: تافرا (متجر أزياء) --- */
  {
    tag: { ar: 'متجر إلكتروني', en: 'E-commerce' },
    name: { ar: 'تافرا - متجر أزياء', en: 'TAFRA - Fashion Store' },
    description: {
      ar: 'متجر أزياء إلكتروني بهوية بصرية فاخرة: 16 قطعة في 6 مجموعات، بحث وفرز، سلة طلبات تُرسل على واتساب، وتواصل مباشر — بواجهة عربية/إنجليزية متجاوبة.',
      en: 'An e-commerce fashion store with a luxury identity: 16 pieces across 6 collections, search and sorting, a cart that sends the order over WhatsApp, and direct contact — in a bilingual Arabic/English responsive interface.'
    },
    tech: ['HTML5', 'CSS3', 'JavaScript', 'WhatsApp Orders', 'Supabase', 'Vercel'],
    primaryText: { ar: 'زيارة المتجر', en: 'Visit Store' },
    primaryLink: 'https://tafrawear.vercel.app',
    secondaryText: { ar: 'جيت هاب', en: 'GitHub' },
    secondaryLink: 'https://github.com/moatazsmohamed/12.tafra',
    previewImage: 'img/tafra-preview.webp'
  },

  /* --- المشروع الرابع: MS Woodworks --- */
{
  tag: { 
    ar: 'موقع أعمال', 
    en: 'Business Website' 
  },
  name: { 
    ar: 'مؤسسة محمد إشماعيل وأولاده (MS Woodworks)', 
    en: 'MS Woodworks - Handcrafted Furniture' 
  },
  description: {
    ar: 'مؤسسة متخصصة في تصنيع الأثاث الخشبي الفاخر المخصص يدويًا من الجوز الداكن للتصاميم المنزلية والمكتبية بخبرة تتجاوز 25 عامًا.',
    en: 'Specialized in crafting bespoke luxury solid wood furniture, executive office desks, and custom hand-carved joinery with over 25 years of experience.'
  },
  tech: ['HTML5', 'CSS3', 'JavaScript', 'Vercel'],
  primaryText: { 
    ar: 'زيارة الموقع', 
    en: 'Visit Website' 
  },
  primaryLink: 'https://ms-wood-works.vercel.app/#home',
  secondaryText: { 
    ar: 'استكشف المجموعة', 
    en: 'Explore Collection' 
  },
  secondaryLink: 'https://ms-wood-works.vercel.app/#portfolio',
  previewImage: 'img/mswood-preview.webp'
},

  /* --- المشروع الخامس: WebVault (خزنة المواقع) --- */
  {
    tag: { ar: 'تطبيق ويب آمن', en: 'Secure Web App' },
    name: { ar: 'WebVault — خزنة مواقعك', en: 'WebVault — Your Site Vault' },
    description: {
      ar: 'لوحة خاصة لإدارة كل مواقعك: غرف ومواقع وخمس فتحات لينك لكل موقع، مع بيانات دخول مشفّرة بـ AES-256-GCM جوه قاعدة البيانات، وخزنة مقفولة تطلب كلمة السر قبل كل كشف، وسجل نشاط، وتصدير JSON/CSV من غير أي كلمة سر — عربي/إنجليزي.',
      en: 'A private dashboard for every site you build: rooms, sites and five link slots each, with credentials sealed by AES-256-GCM inside the database, a vault that asks for the password before any reveal, an activity log, and secret-free JSON/CSV exports — Arabic/English.'
    },
    tech: ['Next.js 15', 'TypeScript', 'Supabase', 'AES-256-GCM', 'Tailwind', 'Vercel'],
    primaryText: { ar: 'افتح الخزنة', en: 'Open the Vault' },
    primaryLink: 'https://webvault-app.vercel.app',
    secondaryText: { ar: 'جيت هاب', en: 'GitHub' },
    secondaryLink: 'https://github.com/moatazsmohamed/webvault',
    previewImage: 'img/webvault-preview.webp'
  },
];

/* ============================================================================
   3) مراجع عناصر الصفحة (DOM References)
   ----------------------------------------------------------------------------
   ليه بنعمل كده؟
     بدل ما نكتب document.querySelector('...') كل شوية جوه الدوال — وده
     بيكلف المتصفح عملية بحث في الصفحة كل مرة — بنجيب العناصر مرة واحدة
     هنا وبنحتفظ بيهم في متغيرات.

   ⚠️ مهم جدًا:
     أي عنصر بنجيبه هنا لازم يكون مكتوب فوق الـ <body> في index.html
     في الوقت اللي الملف ده بيتنفّذ فيه. لأن الـ <script> عليه defer
     فالملف بيتنفّذ بعد ما الصفحة كلها تتحمّل، فده آمن.

   لو أي عنصر مش موجود في الصفحة، المتغير بيبقى null.
   عشان كده كل قسم بعده بيتأكد "لو العنصر موجود" قبل ما يستخدمه
   (زي: if (header) { ... }) عشان مفيش أخطاء لو حاجة اتشالت من HTML.
   ============================================================================ */

/* --- الهيدر والتنقل --- */
const header = document.querySelector('.header');
const navToggle = document.querySelector('.nav-toggle');
const navBackdrop = document.getElementById('navBackdrop');
const navLinks = document.querySelectorAll('.nav-links a');
const langButtons = document.querySelectorAll('.lang-btn');
const nightModeButton = document.querySelector('.night-mode-btn');

/* --- البحث --- */
const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.search-btn');

/* --- عناصر الترجمة --- */
const i18nElements = document.querySelectorAll('[data-i18n]');
const i18nPlaceholders = document.querySelectorAll('[data-i18n-placeholder]');
const i18nAriaLabels = document.querySelectorAll('[data-i18n-aria-label]');

/* --- كارت المشاريع --- */
const projectTag = document.querySelector('.project-tag');
const projectName = document.querySelector('.project-info h3');
const projectDescription = document.querySelector('.project-info p');
const projectCard = document.querySelector('.project-card');
const projectPrimaryBtn = document.querySelector('.project-btn.primary');
const projectSecondaryBtn = document.querySelector('.project-btn.secondary');
const projectChangeButton = document.querySelector('.project-btn.change');
const projectPrevButton = document.querySelector('.project-nav-btn.prev');
const projectNextButton = document.querySelector('.project-nav-btn.next');
const projectPreviewImage = document.querySelector('.project-preview-image');
const previewWindow = document.querySelector('.preview-window');
const projectTech = document.getElementById('projectTech');
const projectDots = document.getElementById('projectDots');
const projectIndexLabel = document.getElementById('projectIndex');

/* --- المساعد الذكي --- */
const aiInput = document.getElementById('userInput');
const aiResponse = document.getElementById('aiResponse');
const aiSendButton = document.getElementById('aiSendButton');
const aiToggle = document.getElementById('aiToggle');
const aiPanel = document.getElementById('aiPanel');
const aiCloseButton = document.querySelector('.ai-close');
const aiSuggestions = document.getElementById('aiSuggestions');

/* --- سلايدر الشهادات --- */
const certificatesList = document.querySelector('.certificates-list');
const scrollLeftButton = document.querySelector('.scroll-left');
const scrollRightButton = document.querySelector('.scroll-right');

/* --- الإعدادات المحفوظة في المتصفح --- */
const savedLanguage = localStorage.getItem('portfolioLanguage') || 'en';
const savedTheme = localStorage.getItem('portfolioTheme') || 'dark';

/* رقم المشروع الحالي المعروض في الكارت */
let currentProjectIndex = 0;

/* ============================================================================
   4) أدوات مساعدة عامة (Helpers)
   ----------------------------------------------------------------------------
   دوال صغيرة بتتكرر في أكتر من قسم، فبنكتبها هنا مرة واحدة
   وبنستخدمها من أي مكان في الملف.
   ============================================================================ */

/**
 * قراءة اللغة الحالية المحفوظة في المتصفح
 * @returns {string} كود اللغة: 'ar' أو 'en'
 */
function getCurrentLanguage() {
  return localStorage.getItem('portfolioLanguage') || 'en';
}

/**
 * قراءة قاموس الترجمة الخاص باللغة المطلوبة
 * @param {string} language - كود اللغة
 * @returns {Object} قاموس الترجمة
 */
function getDictionary(language) {
  return translations[language] || translations.en;
}

/* ============================================================================
   5) الهيدر (Header Scroll State)
   ----------------------------------------------------------------------------
   الشريط العلوي له شكلان في 11.css:
     • وانت فوق:  كبسولة (بيضاوية) نازلة شوية ومنفصلة عن الحافة
     • وانت نازل: يطلع لفوق ويلزق في الحافة، ويبقى أنحف وبعرض كامل

   الدور بتاع الكود ده إنه يراقب مكان التمرير ويبدّل بين الشكلين:
     يضيف كلاس .scrolled على الـ <header>
     ويضيف كلاس .header-is-fixed على الـ <body>

   ليه كلاس على الـ body كمان؟
     لأن في وضع النزول الشريط بيبقى position: fixed — يعني بيطلع من ترتيب
     الصفحة ومايحجزش مكانه، فالمحتوى بيعدي تحته. فبنخلي الـ CSS يضيف
     مساحة فوق الصفحة بمقدار ارتفاع الشريط (--header-h) عشان مفيش حاجة تتغطى.
   ============================================================================ */
if (header) {
  /* العتبة: الشريط يغيّر شكله بعد ما الزائر ينزل 60 بكسل
     (مش أول حركة صغيرة عشان مايبقاش فيه "رفرفة" وانت بتتمرّر) */
  const HEADER_SCROLL_THRESHOLD = 60;

  /* ده متغيّر بيتخزن فيه "هل الشريط حاليًا في وضع النزول؟"
     ليه؟ عشان ما نغيّرش الكلاس غير لو الحالة اتغيرت فعلًا.
     لو شلناه، كنا هنكتب على الـ DOM في كل حركة تمرير = إهدار أداء.
     (قيمته في الأول null عشان أول تشغيل لازم يشتغل أكيد) */
  let headerIsScrolled = null;

  /* بنقيس ارتفاع الشريط الحقيقي (مش رقم ثابت في الـ CSS) ونحفظه
     في متغير CSS اسمه --header-h على الـ body.
     ليه القياس الحي؟ عشان الارتفاع بيتغير حسب:
       • حالة الشريط (عادي / نازل — الأنحف)
       • عرض الشاشة (الموبايل الشريط بيلف على سطرين)
       • حجم خط اللغة اللي اتطبقت
     فأي رقم ثابت كان هيبقى غلط في بعض الحالات. */
  const syncHeaderHeight = function () {
    const h = Math.round(header.getBoundingClientRect().height);
    if (h > 0) {
      document.body.style.setProperty('--header-h', h + 'px');
    }
  };

  /* الدالة الرئيسية: بتتنفّذ مع كل حركة تمرير
     (متسجّلة بـ passive: true يعني "أنا مش همنع الـ scroll" — أسرع) */
  const updateHeaderScrollState = function () {
    const shouldBeScrolled = window.scrollY > HEADER_SCROLL_THRESHOLD;

    /* الحالة ما اتغيرتش → مفيش داعي نلمس الـ DOM، بس اطلع */
    if (shouldBeScrolled === headerIsScrolled) {
      return;
    }

    headerIsScrolled = shouldBeScrolled;

    /* بنبدّل الحالتين مع بعض:
         .scrolled على الشريط   → يغير شكله في CSS
         .header-is-fixed على الـ body → يضيف المساحة اللي تحته */
    header.classList.toggle('scrolled', shouldBeScrolled);
    document.body.classList.toggle('header-is-fixed', shouldBeScrolled);

    /* بنقيس الارتفاع في الفريم الجاي (requestAnimationFrame)
       مش دلوقتي — لأن CSS لسه ما خلصش الأنيميشن،
       فلو قسنا دلوقتي هناخد الرقم القديم. */
    window.requestAnimationFrame(syncHeaderHeight);
  };

  /* تشغيل أولي فورًا — عشان لو الصفحة فتحت وهي نازلة (زي العودة من لينك)
     الشريط يبقى في الشكل الصحيح من غير ما الزائر يتحرك */
  updateHeaderScrollState();
  window.addEventListener('scroll', updateHeaderScrollState, { passive: true });

  /* لو النافذة اتغير حجمها، الارتفاع بيتغيّر → نعيد القياس */
  window.addEventListener('resize', syncHeaderHeight, { passive: true });

  /* أول ما الخطوط تحمّل، الارتفاع ممكن يتغيّر شوية */
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(syncHeaderHeight);
  }
}

/* ============================================================================
   5.1) زر العودة لأول الصفحة (Back to Top)
   ----------------------------------------------------------------------------
   مسؤول عن الزرار الدائري اللي بيظهر في الركن بعد ما الزائر ينزل مسافة
   معينة، وبيرجّعه لأول الصفحة بشكل سلس بالضغط عليه.

   ليه كلاس بدل ما نغيّر style مباشرة؟
     لأن الإنيميشن كله مكتوب في 11.css جوه .backToTopBtn، والجافاسكربت
     بس بيضيف/يشيل كلاس .is-visible — نفس أسلوب بقية الموقع.

   الأداء: بنقارن الحالة الجديدة بالقديمة (isBackToTopVisible) وما
   بنلمسش الـ DOM غير لما الحالة تتغير فعلًا.
   ============================================================================ */
const backToTopButton = document.querySelector('#backToTop');

if (backToTopButton) {
  /* العتبة: الزرار يظهر بعد 400 بكسل من التمرير (بعد ما الهيرو يعدي) */
  const BACK_TO_TOP_THRESHOLD = 400;

  let isBackToTopVisible = false;

  const updateBackToTopVisibility = function () {
    const shouldBeVisible = window.scrollY > BACK_TO_TOP_THRESHOLD;

    /* الحالة ما اتغيرتش → مفيش داعي نلمس الـ DOM */
    if (shouldBeVisible === isBackToTopVisible) {
      return;
    }

    isBackToTopVisible = shouldBeVisible;
    backToTopButton.classList.toggle('is-visible', shouldBeVisible);
  };

  /* الرجوع لأول الصفحة بسلاسة */
  backToTopButton.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* تشغيل أولي — عشان لو الصفحة فتحت وهي نازلة (زي العودة من لينك) */
  updateBackToTopVisibility();
  window.addEventListener('scroll', updateBackToTopVisibility, { passive: true });
}

/* ============================================================================
   6) البحث (Search)
   ----------------------------------------------------------------------------
   كيف بيشتغل البحث؟
     1) بناخد الكلمة اللي الزائر كتبها في خانة البحث
     2) بننضّفها (حروف صغيرة + نشيل المسافات الزيادة)
     3) بنمشي على كل عنصر نصي ظاهر في الصفحة وندور على الكلمة
     4) العناصر اللي فيها الكلمة → بنضيف لها كلاس .search-match (بتتوهج ذهبي)
     5) بننقل الزائر لأول نتيجة على طول

   المفاتيح:
     Enter أو الضغط على أيقونة البحث  → ينفّذ البحث
     Esc                            → يشيل التمييز ويفضّي الخانة

   ملاحظة: بنسيب الخانة فاضية بعد البحث عشان الزائر يقدر يبحث تاني بسهولة.
   ============================================================================ */

/**
 * تنظيف النص قبل المقارنة (حروف صغيرة + توحيد المسافات)
 * @param {string} text - النص الخام
 * @returns {string} النص المنظّف
 */
function normalizeSearchText(text) {
  return (text || '').toLowerCase().normalize('NFKC').replace(/\s+/g, ' ').trim();
}

/** إزالة كل تمييز نتائج البحث القديم من الصفحة */
function clearSearchHighlights() {
  document.querySelectorAll('.search-match').forEach(function (element) {
    element.classList.remove('search-match');
  });
}

/** تنفيذ البحث: تمييز النتائج والانتقال لأول نتيجة */
function performSearch() {
  const query = normalizeSearchText(searchInput ? searchInput.value : '');
  clearSearchHighlights();

  /* لو خانة البحث فاضية مفيش حاجة نعملها */
  if (!query || !searchInput) {
    return;
  }

  let firstMatch = null;

  /* كل العناصر اللي ممكن ندوّر جواها */
  const searchTargets = document.querySelectorAll(
    '[data-i18n], .section-title, .project-tag, .project-info h3, .project-info p, ' +
    '.certificate-item h4, .certificate-note, .certificate-item p, .contact-strip h3, ' +
    '.contact-strip p, .main-title, .description, .welcome-pill span, .card-body h2, ' +
    '.card-text, .card-footer-motto span, .footer-quote'
  );

  searchTargets.forEach(function (element) {
    const text = normalizeSearchText(element.textContent);

    if (text.includes(query)) {
      element.classList.add('search-match');

      if (!firstMatch) {
        firstMatch = element;
      }
    }
  });

  /* ننقل المستخدم لأول نتيجة نلاقيها */
  if (firstMatch) {
    firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

/* ربط البحث بالكتابة، الضغط على Enter، وزر البحث */
if (searchInput) {
  searchInput.addEventListener('input', performSearch);

  searchInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      performSearch();
    }
  });

  if (searchButton) {
    searchButton.addEventListener('click', function (event) {
      event.preventDefault();
      performSearch();
    });
  }
}

/* ============================================================================
   7) الثيم (Theme: الوضع الأساسي / الأبيض)
   ----------------------------------------------------------------------------
   الموقع له وضعان:
     • الأساسي (Dark) — خلفية سوداء فيلمية + ذهبي (الافتراضي)
     • الأبيض (Light)  — خلفية فاتحة

   كيف بيشتغل؟
     بنضيف كلاس .light-mode على الـ <body>، وكل ألوان الوضع الفاتح
     مكتوبة في 11.css جوه قواعد بتبدا بـ  body.light-mode ...
     يعني مفيش أي تغيير في الألوان هنا في الجافاسكربت.

   اختيار الزائر بينحفظ في localStorage تحت اسم portfolioTheme
   عشان لما يرجع تاني يلاقي نفس الوضع اللي اختاره.
   ============================================================================ */

/** تحديث نص زر الوضع حسب الحالة الحالية واللغة */
function updateThemeButtonLabel() {
  const dictionary = getDictionary(getCurrentLanguage());
  const label = nightModeButton ? nightModeButton.querySelector('span') : null;

  if (label) {
    const isWhiteMode = document.body.classList.contains('light-mode');
    label.textContent = isWhiteMode ? dictionary.whiteMode : dictionary.primaryMode;
  }
}

/**
 * تطبيق الوضع (أبيض أو أساسي) وحفظه في المتصفح
 * @param {boolean} isWhiteMode - true للوضع الأبيض، false للوضع الأساسي
 */
function applyTheme(isWhiteMode) {
  document.body.classList.toggle('light-mode', isWhiteMode);

  if (nightModeButton) {
    nightModeButton.classList.toggle('is-active', isWhiteMode);
    nightModeButton.setAttribute('aria-pressed', String(isWhiteMode));
  }

  localStorage.setItem('portfolioTheme', isWhiteMode ? 'light' : 'dark');
  updateThemeButtonLabel();
}

/* زر تبديل الوضع */
if (nightModeButton) {
  nightModeButton.addEventListener('click', function () {
    applyTheme(!document.body.classList.contains('light-mode'));
  });
}

/* ============================================================================
   8) كارت المشاريع (Portfolio Card)
   ----------------------------------------------------------------------------
   قسم المشاريع فيه كارت واحد كبير، والكود ده هو اللي بيغيّر اللي جواه:
     الاسم، الوصف، صورة المعاينة، وأزرار "عرض" و"جيت هاب".

   البيانات بتيجي من مصفوفة projectData (قسم 2).
   التنقل بين المشاريع بيحصل بإحدى تلات طرق:
     • زر السهم اللي فوق الكارت (prev / next)
     • زر "تغيير المشروع" — بيلف على المشاريع واحد واحد

   مهم: الكارت مبني بحيث لو المشروع ملهوش صورة (زي مشروع "قريبًا")،
   بنخفي الصورة ونظهر شكل بديل مرسوم بالـ CSS عشان الكارت مايطلعش مكسور.
   ============================================================================ */

/**
 * تحديث محتوى كارت المشروع حسب المشروع الحالي واللغة
 * @param {string} [language] - كود اللغة (اختياري، وبيقرا من المتصفح لو مش موجود)
 */
function updateProjectCard(language) {
  const currentLanguage = language || getCurrentLanguage();
  const project = projectData[currentProjectIndex];

  /* حماية لو العناصر أو المشروع غير متاحين */
  if (!project || !projectCard || !projectTag || !projectName || !projectDescription) {
    return;
  }

  projectTag.textContent = project.tag[currentLanguage] || project.tag.en;
  projectName.textContent = project.name[currentLanguage] || project.name.en;
  projectDescription.textContent = project.description[currentLanguage] || project.description.en;

  renderProjectTech(project);
  renderProjectIndex();
  renderProjectDots(currentLanguage);

  /* تحديث صورة المعاينة حسب المشروع الحالي (لو المشروع له صورة) */
  if (projectPreviewImage) {
    if (project.previewImage) {
      projectPreviewImage.src = project.previewImage;
      projectPreviewImage.alt = project.name.en + ' preview';
      projectPreviewImage.style.display = 'block';

      if (previewWindow) {
        previewWindow.classList.add('has-image');
      }
    } else {
      /* المشروع من غير صورة (زي "قريبًا") — نخفي الصورة ونظهر الشكل الوهمي */
      projectPreviewImage.removeAttribute('src');
      projectPreviewImage.style.display = 'none';

      if (previewWindow) {
        previewWindow.classList.remove('has-image');
      }
    }
  }

  if (projectPrimaryBtn) {
    projectPrimaryBtn.textContent = project.primaryText[currentLanguage] || project.primaryText.en;
    projectPrimaryBtn.setAttribute('href', project.primaryLink);
  }

  if (projectSecondaryBtn) {
    projectSecondaryBtn.textContent = project.secondaryText[currentLanguage] || project.secondaryText.en;
    projectSecondaryBtn.setAttribute('href', project.secondaryLink);
  }
}

/** عدّاد المشروع الحالي: 01 / 06 */
function renderProjectIndex() {
  if (!projectIndexLabel) {
    return;
  }

  const total = projectData.length;
  const position = String(currentProjectIndex + 1).padStart(2, '0');
  projectIndexLabel.textContent = position + ' / ' + String(total).padStart(2, '0');
}

/** شرائح التقنيات المستخدمة في المشروع الحالي */
function renderProjectTech(project) {
  if (!projectTech) {
    return;
  }

  const tech = Array.isArray(project.tech) ? project.tech : [];
  projectTech.innerHTML = '';
  projectTech.hidden = tech.length === 0;

  tech.forEach(function (label) {
    const item = document.createElement('li');
    item.textContent = label;
    projectTech.appendChild(item);
  });
}

/** نقط التنقل: كل نقطة بتفتح مشروع معيّن */
function renderProjectDots(language) {
  if (!projectDots) {
    return;
  }

  projectDots.innerHTML = '';

  projectData.forEach(function (project, index) {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'project-dot';
    dot.setAttribute('aria-label', project.name[language] || project.name.en);
    dot.setAttribute('aria-current', index === currentProjectIndex ? 'true' : 'false');
    dot.addEventListener('click', function () {
      goToProject(index);
    });
    projectDots.appendChild(dot);
  });
}

/** الانتقال لمشروع معيّن بالترتيب الدائري */
function goToProject(index) {
  const total = projectData.length;
  if (!total) {
    return;
  }

  currentProjectIndex = ((index % total) + total) % total;
  updateProjectCard();
}

/** التالي (+1) أو السابق (-1) */
function stepProject(direction) {
  goToProject(currentProjectIndex + direction);
}

/* عدّاد المشاريع في الهيرو — نفس إجمالي المشاريع المعروض في قسم الأرقام */
const heroStatProjects = document.getElementById('heroStatProjects');
if (heroStatProjects) {
  heroStatProjects.textContent = '08';
}

/* زر "تغيير المشروع" — بينقل للمشروع اللي بعده */
if (projectChangeButton) {
  projectChangeButton.addEventListener('click', function () {
    stepProject(1);
  });
}

/* أسهم التنقل بين المشاريع (السابق / التالي) */
if (projectPrevButton) {
  projectPrevButton.addEventListener('click', function () {
    stepProject(-1);
  });
}

if (projectNextButton) {
  projectNextButton.addEventListener('click', function () {
    stepProject(1);
  });
}

/* السحب باللمس: يمين/شمال بيتنقل بين المشاريع (مع مراعاة اتجاه RTL) */
(function initProjectSwipe() {
  if (!projectCard) {
    return;
  }

  let startX = null;
  let startY = null;
  let tracking = false;

  projectCard.addEventListener('pointerdown', function (event) {
    if (event.pointerType === 'mouse' || event.target.closest('a, button')) {
      return;
    }

    startX = event.clientX;
    startY = event.clientY;
    tracking = true;
  }, { passive: true });

  projectCard.addEventListener('pointercancel', function () {
    tracking = false;
    startX = null;
  }, { passive: true });

  projectCard.addEventListener('pointerup', function (event) {
    if (!tracking || startX === null) {
      return;
    }

    const deltaX = event.clientX - startX;
    const deltaY = event.clientY - startY;
    tracking = false;
    startX = null;

    /* لازم سحبة أفقية واضحة — عشان التمرير الرأسي ما يتأثرش */
    if (Math.abs(deltaX) < 45 || Math.abs(deltaX) < Math.abs(deltaY)) {
      return;
    }

    const rtl = document.documentElement.dir === 'rtl';
    const forward = rtl ? deltaX > 0 : deltaX < 0;
    stepProject(forward ? 1 : -1);
  }, { passive: true });
})();

/* أسهم الكيبورد: بيمين/شمال (مع مراعاة اتجاه RTL) */
if (projectCard) {
  projectCard.addEventListener('keydown', function (event) {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
      return;
    }

    if (event.target.closest('input, textarea, select')) {
      return;
    }

    event.preventDefault();
    const rtl = document.documentElement.dir === 'rtl';
    const forward = (event.key === 'ArrowRight') !== rtl;
    stepProject(forward ? 1 : -1);
  });
}

/* ============================================================================
   9) الترجمة التطبيقية (Language / i18n)
   ----------------------------------------------------------------------------
   ده الجزء اللي بيطبّق الترجمة على الصفحة فعلًا (قاموس الترجمة في قسم 1).

   اللي بيحصل لما الزائر يبدل اللغة:
     1) بنحفظ الاختيار في localStorage (portfolioLanguage)
     2) بنمشي على كل عنصر في الصفحة عليه data-i18n ونحط النص المترجم جواه
     3) بنعمل نفس الحاجة لـ data-i18n-placeholder (نصوص حقول الإدخال)
     4) بنغيّر اتجاه الصفحة: عربي = RTL (من اليمين) / إنجليزي = LTR (من الشمال)
     5) بنغيّر سمة lang على الـ <html> عشان القارئ الصوتي ينطق صح
     6) بنحدّث نصوص كارت المشاريع (لأنها مش في HTML)

   ليه بنمشي على العناصر كل مرة بدل ما نخزّنهم؟
     لأن لو حد أضاف عنصر جديد بـ data-i18n بعدين، الكود هيلقطه تلقائيًا
     من غير أي تعديل — أسهل للتيم.
   ============================================================================ */

/**
 * تطبيق اللغة على كل الصفحة (النصوص + الـ placeholders + الاتجاه)
 * @param {string} language - كود اللغة: 'ar' أو 'en'
 */
function applyLanguage(language) {
  const dictionary = getDictionary(language);

  /* ترجمة كل العناصر اللي عندها data-i18n */
  i18nElements.forEach(function (element) {
    const key = element.dataset.i18n;
    if (dictionary[key]) {
      element.textContent = dictionary[key];
    }
  });

  /* ترجمة كل الـ placeholders اللي عندها data-i18n-placeholder */
  i18nPlaceholders.forEach(function (element) {
    const key = element.dataset.i18nPlaceholder;
    if (dictionary[key]) {
      element.placeholder = dictionary[key];
    }
  });

  /* ترجمة الـ aria-label (زي زر قائمة الموبايل) */
  i18nAriaLabels.forEach(function (element) {
    const key = element.dataset.i18nAriaLabel;
    if (dictionary[key]) {
      element.setAttribute('aria-label', dictionary[key]);
    }
  });

  /* تحديد زر اللغة النشط */
  langButtons.forEach(function (button) {
    button.classList.toggle('active', button.dataset.lang === language);
  });

  /* نحفظ اللغة الأول عشان updateProjectCard تقراها صح */
  localStorage.setItem('portfolioLanguage', language);

  /* تحديث كارت المشروع + لغة الصفحة + نص زر الوضع */
  updateProjectCard(language);
  renderAiSuggestions(language);
  document.documentElement.lang = language;

  /* العربي بيتكتب من اليمين للشمال — الزر العائم واللوحة بيتقلبوا للجنب التاني */
  document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';

  updateThemeButtonLabel();
}

/* أزرار تبديل اللغة AR / EN */
langButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    applyLanguage(button.dataset.lang);
  });
});


/* ============================================================================
   10) شريط التنقل وسلايدر الشهادات (Navigation & Certificates Slider)
   ----------------------------------------------------------------------------
   فنكشنلين مختلفين في نفس المكان:

   1) روابط التنقل (Home / About / Portfolio / Contact)
      بتنتقل بسلاسة للقسم المطلوب، وبتحدّد اللينك النشِط على اساس
      مكان التمرير الحالي (بيتحط عليه كلاس .active).

   2) سلايدر الشهادات
      زرارين يمين وشمال بيزحزحوا قايمة الشهادات بمقدار عرض كارت واحد.
      الزحزحة بتتم بـ scrollBy (سلسة مش قفز).

   مهم: كل الحسابات مبنية على قياسات حية للعناصر (getBoundingClientRect)
   عشان تشتغل صح على أي مقاس شاشة من غير أرقام ثابتة.
   ============================================================================ */

/* تحديد الرابط النشط عند الضغط عليه */
navLinks.forEach(function (link) {
  link.addEventListener('click', function () {
    navLinks.forEach(function (item) {
      item.classList.remove('active');
    });

    link.classList.add('active');
  });
});

/* ----------------------------------------------------------------------------
   قائمة الموبايل (Drawer)
   ----------------------------------------------------------------------------
   بتفتح وتقفل بزر الهامبرجر، وبتتقفل كمان بالضغط على الخلفية أو Escape
   أو أي رابط جوه القائمة. body.nav-open هي اللي بتظبط الشكل في CSS.
   ---------------------------------------------------------------------------- */

function setMobileNav(open) {
  if (!navToggle) {
    return;
  }

  document.body.classList.toggle('nav-open', open);
  navToggle.setAttribute('aria-expanded', String(open));
  navToggle.setAttribute('aria-label', getDictionary(savedLanguage).menuLabel || 'Menu');
}

if (navToggle) {
  navToggle.addEventListener('click', function () {
    setMobileNav(!document.body.classList.contains('nav-open'));
  });
}

if (navBackdrop) {
  navBackdrop.addEventListener('click', function () {
    setMobileNav(false);
  });
}

/* أي ضغطة على رابط في القائمة تقفلها (بعد ما التنقل يبدأ) */
navLinks.forEach(function (link) {
  link.addEventListener('click', function () {
    setMobileNav(false);
  });
});

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' && document.body.classList.contains('nav-open')) {
    setMobileNav(false);
    if (navToggle) {
      navToggle.focus();
    }
  }
});

/* لو الشاشة كبرت والقائمة مفتوحة: نقفلها ونرجع الشريط لطبيعته */
window.addEventListener('resize', function () {
  if (window.innerWidth > 900 && document.body.classList.contains('nav-open')) {
    setMobileNav(false);
  }
});

/* أسهم تمرير قائمة الشهادات يمين وشمال */
if (scrollLeftButton && scrollRightButton && certificatesList) {
  scrollLeftButton.addEventListener('click', function () {
    certificatesList.scrollBy({ left: -260, behavior: 'smooth' });
  });

  scrollRightButton.addEventListener('click', function () {
    certificatesList.scrollBy({ left: 260, behavior: 'smooth' });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const slider = document.getElementById('techSlider');
  const prevBtn = document.getElementById('techPrevBtn');
  const nextBtn = document.getElementById('techNextBtn');

  if (slider && prevBtn && nextBtn) {
    // التمرير جهة اليمين أو اليسار بمقدار 200 بكسل
    nextBtn.addEventListener('click', () => {
      slider.scrollBy({ left: 200, behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
      slider.scrollBy({ left: -200, behavior: 'smooth' });
    });
  }
});

/* ============================================================================
   11) شاشة التحميل (Preloader) + شاشة الاسم اللامع (Name Intro)
   ----------------------------------------------------------------------------
   الترتيب اللي بيحصل لما الصفحة تفتح:

     1) شاشة التحميل (Preloader) — بتغطي كل الشاشة
     2) تختفي الشاشة بنعومة → بعدها بشوية
     3) شاشة الاسم: "Moataz Mohamed" ومعاه شعاع لمعة ذهبي
     4) في شاشة الاسم الزائر يقدر:
          • يمرّ الماوس على الاسم — اللمعة تستجيب له
          • يدوس كليك أو Enter — أفيكت ضوئي والاسم يتشال
          • أو ما يعملش حاجة — الشاشة تتشال لوحدها بعد وقت قصير
     5) الصفحة ترجع تفتح على أول جزء (الهيرو) — تم تصحيح مكان التمرير
   ⚠️ مهم: أي تعديل في مدد العرض (المتغيرات تحت) لازم يحتط في اعتباره
   إن الـ CSS عنده نفس المدد في قسم شاشة الاسم. لو غيرت رقم هنا
   غيّر نفس الرقم في 11.css عشان الحركة متبقاش مقطوعة.

   وفيه حماية كتير ضد التعليق:
     • لو شاشة التحميل اتأخرت → بنخفيها بعد 900ms من DOMContentLoaded
     • لو حصل أي خطأ في التحميل → بنخفيها فورًا
     • لو مشغّل "تقليل الحركة" → بنشطب شاشة الاسم خالص
   ============================================================================ */

/* مدد العرض (بالميلي ثانية) — عدّل الأرقام دي لو حابب تطول/تقصّر */
const PRELOADER_FADE_TIME = 300;      /* مدة اختفاء شاشة التحميل (لازم تطابق الـ CSS) */
const NAME_INTRO_AUTO_HIDE = 1500;    /* اختفاء تلقائي لو الزائر ما داسش */
const NAME_INTRO_FADE_TIME = 420;     /* مدة اختفاء شاشة الاسم (لازم تطابق الـ CSS) */

/* عنصر شاشة الاسم */
const nameIntro = document.getElementById('name-intro');

/* عناصر التفاعل جوه شاشة الاسم */
const nameIntroText = nameIntro ? nameIntro.querySelector('.name-intro-text') : null;

/* حالة المقدمة */
let nameIntroReady = false;   /* بقت معروض وقابلة للتفاعل */
let nameIntroLeaving = false; /* بقت بتخرج (بنمنع أي تفاعل تاني) */
let nameIntroAutoTimer = null;

/* ----------------------------------------------------------------------------
   إخفاء/خروج شاشة الاسم
   ---------------------------------------------------------------------------- */

/**
 * إخفاء شاشة الاسم (لو خلصت لوحدها أو الزائر اختار يدخل)
 * @param {boolean} withEffect - true لو عايزين أفيكت الضوء قبل الخروج
 */
function hideNameIntro(withEffect) {
  if (!nameIntro || nameIntroLeaving) {
    return;
  }
  nameIntroLeaving = true;

  /* نلغي أي مؤقت تلقائي معلّق */
  if (nameIntroAutoTimer) {
    window.clearTimeout(nameIntroAutoTimer);
    nameIntroAutoTimer = null;
  }

  /* نسحب التركيز من شاشة الاسم */
  nameIntroReady = false;

  const fadeDuration = withEffect ? NAME_INTRO_FADE_TIME : NAME_INTRO_FADE_TIME;

  if (withEffect) {
    /* أفيكت الكليك/Enter: نبضة ضوئية + فلاش + الاسم يطير */
    nameIntro.classList.add('is-bursting', 'is-leaving');
  }

  /* نأخر الإخفاء التام عشان الأفيكت يبان */
  window.setTimeout(function () {
    nameIntro.classList.add('is-done');
    nameIntro.setAttribute('aria-hidden', 'true');
  }, withEffect ? 300 : 0);

  /* ننضّف العنصر من الصفحة بعد الاختفاء */
  window.setTimeout(function () {
    if (nameIntro && nameIntro.parentNode) {
      nameIntro.parentNode.removeChild(nameIntro);
    }
    /* أول ما المقدمة تخلص، الصفحة ترجع تفتح على أول جزء (الهيرو) */
    resetToHero();
  }, (withEffect ? 300 : 0) + fadeDuration + 60);
}

/* ----------------------------------------------------------------------------
   إرجاع الصفحة لأول جزء (الهيرو) فورًا وبشكل ناعم
   بتمنع المتصفح إنه يفتح في نص الصفحة بسبب الـ hash أو استرجاع آخر مكان
   ---------------------------------------------------------------------------- */
function resetToHero() {
  if (window.location.hash) {
    /* نشيل الـ hash من الرابط من غير ما نعمل قفزة */
    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    } else {
      window.location.hash = '';
    }
  }

  /* القفلة الفورية: بنقفل الـ scroll الناعم لحظة الرجوع بس */
  const previous = document.documentElement.style.scrollBehavior;
  document.documentElement.style.scrollBehavior = 'auto';
  window.scrollTo(0, 0);
  document.documentElement.style.scrollBehavior = previous;
}

/* ----------------------------------------------------------------------------
   تفاعل الماوس: اللمعة تستجيب لما المؤشر يمر على الاسم
   ---------------------------------------------------------------------------- */
if (nameIntro && nameIntroText) {
  nameIntroText.addEventListener('mouseenter', function () {
    if (nameIntroReady) {
      nameIntro.classList.add('is-name-hover');
    }
  });

  nameIntroText.addEventListener('mouseleave', function () {
    nameIntro.classList.remove('is-name-hover');
  });
}

/* ----------------------------------------------------------------------------
   الكليك على الاسم → أفيكت ودخول الموقع
   ---------------------------------------------------------------------------- */
if (nameIntroText) {
  nameIntroText.addEventListener('click', function () {
    if (!nameIntroReady) {
      return;
    }

    /* نبضة لحظية قبل الخروج */
    nameIntro.classList.add('is-pressing');
    window.setTimeout(function () {
      if (nameIntro) {
        nameIntro.classList.remove('is-pressing');
      }
    }, 160);

    hideNameIntro(true);
  });
}

/* ----------------------------------------------------------------------------
   ضغط Enter (أو Space) → نفس أفيكت الكليك
   ---------------------------------------------------------------------------- */
document.addEventListener('keydown', function (event) {
  if (!nameIntroReady) {
    return;
  }

  if (event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar') {
    event.preventDefault();
    hideNameIntro(true);
  }
});

/* ----------------------------------------------------------------------------
   تشغيل شاشة الاسم (بتشتغل مرة واحدة بس)
   ---------------------------------------------------------------------------- */
function startNameIntro() {
  if (!nameIntro || nameIntroReady || nameIntroLeaving) {
    return;
  }

  /* لو الجهاز مفعّل تقليل الحركة: نخفيها على طول من غير انتظار */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    hideNameIntro(false);
    return;
  }

  /* الزيارة التانية في نفس الجلسة: الزائر شاف المقدمة قبل كده — نتخطاها */
  let introAlreadyPlayed = false;
  try {
    introAlreadyPlayed = window.sessionStorage.getItem('portfolioIntroPlayed') === '1';
  } catch (error) {
    introAlreadyPlayed = false;
  }

  if (introAlreadyPlayed) {
    hideNameIntro(false);
    return;
  }

  try {
    window.sessionStorage.setItem('portfolioIntroPlayed', '1');
  } catch (error) {
    /* التخزين متاح دائمًا تقريبًا؛ لو اتمنع مش مشكلة — المقدمة بسيطة */
  }

  nameIntroReady = true;
  nameIntro.setAttribute('aria-hidden', 'false');

  /* اختفاء تلقائي لو الزائر ما داسش (بعد اللمعة تكون عدّت مرتين) */
  nameIntroAutoTimer = window.setTimeout(function () {
    hideNameIntro(true);
  }, NAME_INTRO_AUTO_HIDE);
}

/* ----------------------------------------------------------------------------
   إخفاء شاشة التحميل، وبعدها نبتدي شاشة الاسم
   مهم: بنستنى شاشة التحميل تختفي بالكامل (مدة الاختفاء + هامش) قبل
   ما نعرض شاشة الاسم، عشان مفيش تراكب بينهم.
   ---------------------------------------------------------------------------- */

/* من أول لحظة: نطفّي استرجاع مكان التمرير القديم ونرفع الصفحة لفوق */
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

function hidePreloader() {
  const preloader = document.getElementById('preloader');

  if (preloader && !preloader.classList.contains('fade-out')) {
    preloader.classList.add('fade-out');

    /* نستنى اختفاء شاشة التحميل بالكامل، وبعدين نعرض شاشة الاسم */
    window.setTimeout(startNameIntro, PRELOADER_FADE_TIME + 120);
  } else if (!preloader) {
    /* مفيش شاشة تحميل أصلًا → نعرض شاشة الاسم على طول */
    startNameIntro();
  }
}

/* الحالة العادية: تختفي بعد تحميل كل حاجة */
window.addEventListener('load', hidePreloader);

/* حماية: تختفي حتى لو الـ load اتأخر (صور كتير/نت بطيء) */
window.addEventListener('DOMContentLoaded', function () {
  setTimeout(hidePreloader, 900);
});

/* حماية أخيرة: لو حصل أي خطأ في التحميل، تختفي على طول */
window.addEventListener('error', hidePreloader);

/* ============================================================================
   12) التشغيل الأولي (Init)
   ----------------------------------------------------------------------------
   ده آخر جزء في الملف — بيشتغل بعد ما كل الدوال فوق اتعرفت.
   بسيط جدًا: بيطبّق اللغة والثيم المحفوظين من زيارة الزائر الأخيرة.

   ليه في الآخر؟
     عشان يعتمد على دوال ومتغيرات معرّفة فوق. لو كان في الأول
     كان طلع خطأ "not defined".
   ============================================================================ */
applyLanguage(savedLanguage);
applyTheme(savedTheme === 'light');

/* ============================================================================
   12.0) ظهور المحتوى عند النزول (Scroll Reveal)
   ----------------------------------------------------------------------------
   الفكرة: بنخفي العناصر الأول (opacity: 0) عن طريق كلاس .reveal-init،
   وبعدين IntersectionObserver لما العنصر يدخل الشاشة بنضيف .is-visible
   فيظهر بحركة ناعمة. أول ما يظهر بنلغيه من المراقبة عشان ميخفيش تاني.
   ============================================================================ */
(function initScrollReveal() {
  const revealTargets = document.querySelectorAll('[data-reveal]');

  if (!revealTargets.length) {
    return;
  }

  /* لو المستخدم مفعّل "تقليل الحركة"، مفيش داعي نخفي أي حاجة */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  /* المتصفحات القديمة اللي مفيهاش IntersectionObserver: نظهر كل حاجة على طول */
  if (!('IntersectionObserver' in window)) {
    return;
  }

  /* ملاحظة: العناصر اللي فوق الشاشة أصلًا بنخليها تظهر بدون تأخير
     والفيديو بيشتغل عليها وقت دخولها */
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,                    /* يظهر لما 15% من العنصر يدخل الشاشة */
    rootMargin: '0px 0px -60px 0px'     /* نبدأ شوية قبل ما يختفي خالص */
  });

  revealTargets.forEach(function (target) {
    /* بنضيف كلاس البداية (مخفي)، وبناخد نوع الحركة من data-reveal-visual */
    target.classList.add('reveal-init');

    const visual = target.getAttribute('data-reveal');
    if (visual && visual !== 'up') {
      target.classList.add('reveal-' + visual);
    }

    observer.observe(target);
  });

  /* --------------------------------------------------------------------------
     حماية مهمة ضد الفراغ الأسود
     ----------------------------------------------------------------------------
     المشكلة اللي بنحلها:
       لو أي عنصر فضل مخفي للأبد (مثلًا الـ observer ماشتغلش عليه لسبب ما)
       المستخدم بيشوف فراغ أسود — ودي حاجة وحشة جدًا.

     ⚠️ مهم جدًا (اقرا ده لو بتعدل هنا):
       الحماية دي **مش** بتعرض كل حاجة غصب — لأن كده كانت هتلغي أنيميشن
       الظهور تمامًا (العناصر تظهر قبل ما الزائر ينزل عندها).

       هي بس بتعرض العناصر اللي **دخلت الشاشة فعلًا** (أو قربت منها)
       ولم تظهرش لأي سبب. أما اللي لسه تحت — بتفضل مستنية الزائر ينزل
       عندها عشان تظهر بحركة الظهور العادية.
     -------------------------------------------------------------------------- */
  function revealAnythingStillHidden() {
    /* بنشوف ارتفاع الشاشة عشان نحدد إيه اللي "دخل" وإيه اللي لسه تحت
       (بنزود 100px هامش — يعني العنصر القريب من الحد ده كمان يتعرض) */
    const viewportBottom = window.innerHeight + 100;

    revealTargets.forEach(function (target) {
      /* اللي ظاهر خلاص → مش شغلنا */
      if (target.classList.contains('is-visible')) {
        return;
      }

      /* موضع العنصر بالنسبة للشاشة دلوقتي */
      const rect = target.getBoundingClientRect();

      /* العنصر لسه تحت الشاشة؟ → نسيبه مخفي عشان الزائر يشوف الأنيميشن
         لما ينزل عنده (ده القصد من الحماية مش العكس) */
      if (rect.top > viewportBottom) {
        return;
      }

      /* العنصر فوق أو داخل الشاشة ومش ظاهر → نظهره فورًا */
      target.classList.add('is-visible');
      observer.unobserve(target);
    });
  }

  /* بنشغّل الحماية في اللحظات المهمة:
       • بعد نهاية شاشة الاسم (عشان محتوى الهيرو يظهر أكيد)
       • عند أول نزول للزائر
       • وبعد ثانية من تحميل الصفحة بالكامل
     وفي كل مرة، العناصر اللي تحت الشاشة بتفضل مستنية النزول عادي. */
  window.setTimeout(revealAnythingStillHidden, 2600);
  window.addEventListener('load', function () {
    window.setTimeout(revealAnythingStillHidden, 1200);
  });

  /* لو الزائر عمل طباعة أو صوّر الصفحة، نعرض كل حاجة — هنا بنعرض الكل
     بجد، لأن الطباعة بتطبع الصفحة كلها مش اللي ظاهر بس */
  window.addEventListener('beforeprint', function () {
    revealTargets.forEach(function (target) {
      target.classList.add('is-visible');
    });
  });
})();

/* ============================================================================
   12.1) (تمت إزالة تفاعل توهج الماوس مع الخلفية)
   الصفحة مافيهاش أي عنصر عائم أو توهج بيتبع الماوس — أسرع وأنضف.
   ============================================================================ */
/* ============================================================================
   12.2) الخلفية التفاعلية «الخيالية البرمجية» (Living Background)
   ----------------------------------------------------------------------------
   ده الجزء الأكبر في الملف — مسؤول عن كل المؤثرات اللي بتتبع الماوس.

   فيه تلات حاجات بيشتغلوا مع بعض:

     1) الهالة الذهبية (.cursor-aura)
        دايرة كبيرة ناعمة بتجري ورا الماوس.
        مش بتتبع الماوس فورًا — بتتابعه بنعومة (easing) عشان تبان سلسة.

     2) شبكة الكود (.bg-grid-glow)
        نفس شبكة الموقع بتلمع حوالين مكان الماوس.
        الحيلة: بنحط مكان الماوس في متغيري CSS (--mx / --my)،
        والـ CSS بيستخدمهم في mask، فالخطوط تلمع في النقطة دي بس.

     3) المؤشر المخصص (.cursor-dot) + الحلقة (.cursor-ring)
        • سهم ذهبي مرسوم بالـ SVG بدل مؤشر النظام
        • على زرار/لينك → السهم يختفي والإيد تظهر مكانه
        • في حقول الكتابة → كل حاجتنا تختفي ومؤشر الكتابة يرجع
        • الحلقة بتطلع لما تتحرك بسرعة ("خطفة") أو تدوس كليك

   كيف بنحافظ على الأداء (60 FPS)؟
     • بنستخدم transform مش top/left (بتشتغل على كارت الشاشة مش المعالج)
     • كل الحركة بتتجمّع في requestAnimationFrame واحد
       (بدل ما نحدّث الـ DOM في كل حدث ماوس)
     • أول ما الحركة تهدا، اللوب بيقف لوحده (مفيش رَفْرفة على الفاضي)
     • فيه مفتاح يمع تكرار الحلقة لو الحركة سريعة جدًا

   وبيتوقف بالكامل على:
     • الأجهزة اللمسية (موبايل/تابلت) — مفيش ماوس أصلًا
     • نظام الزائر لو مفعّل "تقليل الحركة" — احترامًا لرغبته
   ============================================================================ */
(function initLivingBackground() {
  const aura = document.querySelector('.cursor-aura');
  const gridGlow = document.querySelector('.bg-grid-glow');
  const ring = document.querySelector('.cursor-ring');
  const cursorDot = document.querySelector('.cursor-dot');

  /* لو العناصر مش في الصفحة، أو الجهاز لمسي، أو المستخدم طالب تقليل حركة → نوقف */
  if (!aura || !gridGlow) {
    return;
  }
  if (window.matchMedia('(hover: none)').matches) {
    return;
  }
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  /* المؤشر المخصص بيشتغل بس لو عنصره موجود (بنحترم إعداد "تقليل الحركة" فوق) */
  const useCustomCursor = !!cursorDot;

  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let currentX = targetX;
  let currentY = targetY;
  let hasPointer = false;
  let frameId = null;

  /* بنسجّل آخر مكان لكل حدث عشان نحسب سرعة الماوس */
  let lastMoveX = targetX;
  let lastMoveY = targetY;
  let lastMoveTime = performance.now();
  let lastRingTime = 0;

  const root = document.body;

  /* --------------------------------------------------------------------------
     اللوب: بننعّم حركة الهالة (easing) ونحدّث المكان اللي الشبكة بتضيء عنده
     -------------------------------------------------------------------------- */
  function render() {
    currentX += (targetX - currentX) * 0.14;
    currentY += (targetY - currentY) * 0.14;

    /* الهالة بتتحرك بـ transform (أسرع من top/left) */
    aura.style.transform = 'translate3d(' + currentX + 'px,' + currentY + 'px,0)';

    /* الحلقة بتتبع الماوس بنعومة، والمؤشر بيتحرك مع الماوس بالظبط */
    if (ring) {
      ring.style.transform = 'translate3d(' + currentX + 'px,' + currentY + 'px,0)';
    }
    if (useCustomCursor) {
      cursorDot.style.transform = 'translate3d(' + targetX + 'px,' + targetY + 'px,0)';
    }

    /* شبكة الكود بتضيء عند مكان الماوس الحقيقي — بنسب مئوية */
    gridGlow.style.setProperty('--mx', targetX + 'px');
    gridGlow.style.setProperty('--my', targetY + 'px');

    const settled =
      Math.abs(targetX - currentX) < 0.4 && Math.abs(targetY - currentY) < 0.4;

    if (settled) {
      frameId = null;
    } else {
      frameId = requestAnimationFrame(render);
    }
  }

  function scheduleRender() {
    if (frameId === null) {
      frameId = requestAnimationFrame(render);
    }
  }

  /* --------------------------------------------------------------------------
     خبط الحلقة: بتطلع لما تتحرك بسرعة أو تدوس كليك — إحساس «خطفة»
     -------------------------------------------------------------------------- */
  function burstRing(x, y) {
    if (!ring) {
      return;
    }

    /* بنمنع التكرار السريع جدًا عشان ما يبقاش فيه كتير حلقات */
    const now = performance.now();
    if (now - lastRingTime < 140) {
      return;
    }
    lastRingTime = now;

    ring.style.setProperty('--rx', x + 'px');
    ring.style.setProperty('--ry', y + 'px');

    /* بنشيل الكلاس ونعيده في الفريم الجاي عشان الأنيميشن تبتدي من الأول */
    ring.classList.remove('is-pulsing');
    void ring.offsetWidth;
    ring.classList.add('is-pulsing');
  }

  /* --------------------------------------------------------------------------
     حركة الماوس
     -------------------------------------------------------------------------- */
  window.addEventListener(
    'mousemove',
    function (event) {
      targetX = event.clientX;
      targetY = event.clientY;

      if (!hasPointer) {
        /* أول حركة: نلزق كل حاجة في مكان الماوس فورًا */
        hasPointer = true;
        currentX = targetX;
        currentY = targetY;
        root.classList.add('is-pointer-live');

        /* نشغّل المؤشر المخصص عند أول حركة حقيقية للماوس */
        if (useCustomCursor) {
          root.classList.add('has-custom-cursor');
        }
      } else {
        /* بنحسب السرعة (بكسل / مللي ثانية) */
        const now = performance.now();
        const dt = Math.max(now - lastMoveTime, 1);
        const dx = targetX - lastMoveX;
        const dy = targetY - lastMoveY;
        const speed = Math.sqrt(dx * dx + dy * dy) / dt;

        /* حركة سريعة = «خطفة» → حلقة */
        if (speed > 1.6) {
          burstRing(targetX, targetY);
        }

        lastMoveX = targetX;
        lastMoveY = targetY;
        lastMoveTime = now;
      }

      scheduleRender();
    },
    { passive: true }
  );

  /* --------------------------------------------------------------------------
     الكليك: حلقة أقوى من مكان الدوس + إحساس بالضغط
     -------------------------------------------------------------------------- */
  window.addEventListener(
    'pointerdown',
    function (event) {
      burstRing(event.clientX, event.clientY);
      root.classList.add('is-pressing');
    },
    { passive: true }
  );

  window.addEventListener(
    'pointerup',
    function () {
      root.classList.remove('is-pressing');
    },
    { passive: true }
  );

    /* --------------------------------------------------------------------------
       التفاعل مع العناصر القابلة للدوس
       بنستخدم mouseover على المستند كله (event delegation) بدل ما نربط
       على كل عنصر لوحده — أسرع بكتير وبيشتغل مع أي عنصر جديد
       -------------------------------------------------------------------------- */
    const TARGET_SELECTOR =
      'a, button, input, textarea, select, [role="button"], .btn, .nav-links a, .lang-btn';

    /* الحقول اللي المستخدم بيكتب فيها: بنخفي سهمنا ونسيب مؤشر الكتابة
       عشان مايبقاش فيه مؤشرين مع بعض */
    const TYPING_SELECTOR =
      'input:not([type="checkbox"]):not([type="radio"]), textarea, select, [contenteditable="true"]';

    /* بنحدّث حالتين مع بعض في دالة واحدة عشان الشغل يبقى مرتب */
    function updateHoverState(el) {
      if (!el || !el.closest) {
        return;
      }

      /* هل احنا فوق حقل كتابة؟ */
      const isTyping = !!el.closest(TYPING_SELECTOR);
      root.classList.toggle('is-typing', isTyping);

      /* هل احنا فوق حاجة قابلة للدوس؟ (الحقول مستثناة من الإيد) */
      const isTarget = !isTyping && !!el.closest(TARGET_SELECTOR);
      root.classList.toggle('is-hovering-target', isTarget);
    }

    document.addEventListener(
      'mouseover',
      function (event) {
        updateHoverState(event.target);
      },
      { passive: true }
    );

    /* حركة الماوس بترصد الحالة بدقة أكتر (في حالة العناصر اللي بتظهر فجأة) */
    document.addEventListener(
      'mousemove',
      function (event) {
        if (event.target && event.target.closest) {
          updateHoverState(event.target);
        }
      },
      { passive: true }
    );

    /* لو العنصر اتشال من الصفحة واحنا واقفين عليه، نرجّع الحالة العادية */
    document.addEventListener(
      'mouseout',
      function (event) {
        if (!event.relatedTarget) {
          root.classList.remove('is-hovering-target');
          root.classList.remove('is-typing');
        }
      },
      { passive: true }
    );

    /* --------------------------------------------------------------------------
       الماوس خرج من الصفحة: نطفي طبقات الماوس والمؤشر المخصص
       -------------------------------------------------------------------------- */
    document.addEventListener('mouseleave', function () {
      root.classList.remove('is-pointer-live');
      root.classList.remove('has-custom-cursor');
      root.classList.remove('is-hovering-target');
      root.classList.remove('is-typing');
      root.classList.remove('is-pressing');
    });

    document.addEventListener('mouseenter', function () {
      if (hasPointer) {
        root.classList.add('is-pointer-live');
        if (useCustomCursor) {
          root.classList.add('has-custom-cursor');
        }
      }
    });

    /* --------------------------------------------------------------------------
       تغيير حجم النافذة: لو الماوس لسه مادخلش، نرجّع كل حاجة للنص
       -------------------------------------------------------------------------- */
    window.addEventListener(
      'resize',
      function () {
        if (!hasPointer) {
          targetX = window.innerWidth / 2;
          targetY = window.innerHeight / 2;
          scheduleRender();
        }
      },
      { passive: true }
    );
  })();
/* ============================================================================
   13) مساعد الذكاء الاصطناعي (AI Assistant / Chat)
   ----------------------------------------------------------------------------
   فيه حاجتين هنا:
     1) الزر العائم (.ai-fab) اللي بيفتح ويقفل لوحة الشات (#aiPanel)
     2) محرك إجابات محلي بالكامل — مفيش أي سيرفر أو مفتاح API.

   ليه محلي؟
     الـ Cloudflare Worker القديم بقى مش شغال (بيرجّع 405)، وأي مفتاح
     لو اتحط هنا هيبقى مكشوف لأي زائر. فالمساعد بيجاوب من قاعدة معرفة
     مكتوبة جوه الملف ده (assistantKnowledge) وبتغطي: معتز، المشاريع،
     مدار، المهارات، الخبرات، الشهادات، السيرة، والتواصل.

   طريقة الفهم:
     • بنطبّع النص العربي (تشكيل، همزات، ة/ه، ى/ي) ونعمل lowercase للإنجليزي
     • بنقارن بكلمات مفتاحية لكل موضوع، والأطول والأدق بيكسب
     • لو مفيش تطابق بنرجّع رد لطيف بيقترح مواضيع
   ============================================================================ */

/* قاعدة المعرفة: كل موضوع له كلمات مفتاحية وإجابة بالعربي والإنجليزي */
const assistantKnowledge = [
  {
    id: 'greeting',
    keywords: ['اهلا', 'مرحبا', 'السلام عليكم', 'ازيك', 'هاي', 'hello', 'hi', 'hey'],
    answer: {
      ar: 'أهلاً بيك 👋 أنا مساعد معتز. أقدر أعرّفك عليه، على مشاريعه (زي مدار)، مهاراته، خبراته، أو إزاي تتواصل معاه.',
      en: "Hi there 👋 I'm Moataz's assistant. I can tell you about him, his projects (like Madar), skills, experience, or how to get in touch."
    }
  },
  {
    id: 'about',
    keywords: ['مين معتز', 'من هو معتز', 'عن معتز', 'عرفني بمعتز', 'حدثني عن معتز', 'من انت', 'مين انت', 'اسمك', 'معتز', 'who is moataz', 'about moataz', 'about you', 'introduce yourself', 'yourself'],
    answer: {
      ar: 'معتز محمد — Frontend Developer وطالب تكنولوجيا معلومات في جامعة برج العرب التكنولوجية، ومن الإسكندرية 🇪🇬.\nخلفيته بتجمع بين الإدارة والعمل التقني، وبيبني تطبيقات ويب وموبايل كاملة. بيدور حاليًا على تدريب أو وظيفة مبتدئة كـ Frontend Developer.',
      en: 'Moataz Mohamed is a frontend developer and IT student at Borg El Arab Technological University, based in Alexandria, Egypt.\nHis background mixes management with hands-on technical work, and he builds complete web and mobile apps. He is currently looking for an internship or a junior frontend role.'
    }
  },
  {
    id: 'skills',
    keywords: ['مهار', 'بتعرف', 'تعرف ايه', 'تقنيات', 'skills', 'skill', 'stack', 'tech', 'technologies'],
    answer: {
      ar: 'أهم مهارات معتز:\n• الويب: HTML5، CSS3، JavaScript (ES6+)، تصميم متجاوب.\n• برمجة وأساسيات: C، منطق البيانات، Arduino Nano، ESP32.\n• أدوات: Git، GitHub، VS Code، Canva، Prompt Engineering.\n• وفي مشاريعه الحديثة استخدم React Native (Expo)، TypeScript، وSupabase.',
      en: 'Key skills:\n• Web: HTML5, CSS3, JavaScript (ES6+), responsive design.\n• Programming & core: C, data logic, Arduino Nano, ESP32.\n• Tools: Git, GitHub, VS Code, Canva, prompt engineering.\n• Recent projects also use React Native (Expo), TypeScript and Supabase.'
    }
  },
  {
    id: 'projects',
    keywords: ['مشاريع', 'مشروع', 'اعمال', 'بورتفوليو', 'projects', 'project', 'work', 'portfolio'],
    answer: {
      ar: 'المشاريع الرئيسية:\n• مدار — منصة إدارة فرق عمل متعددة الشركات (الأحدث).\n• WebVault — خزنة خاصة لإدارة المواقع وبيانات دخولها.\n• MS Woodworks — موقع مؤسسة أثاث خشبي فاخر.\n• TAFRA — متجر أزياء إلكتروني.\n• البورتفوليو ده — الموقع اللي إنت فيه.\nاسألني عن أي مشروع منهم وأقولك تفاصيله.',
      en: 'Main projects:\n• Madar — a multi-tenant team management platform (latest).\n• WebVault — a private vault for websites and their logins.\n• MS Woodworks — a luxury handcrafted furniture website.\n• TAFRA — an online fashion store.\n• This portfolio — the site you are on.\nAsk me about any of them for details.'
    }
  },
  {
    id: 'madar',
    keywords: ['مدار', 'منصة مدار', 'madar', 'saas', 'اداره فريق', 'team management', 'فريق', 'تيم', 'مهام', 'تايمر', 'تقارير'],
    answer: {
      ar: 'مدار منصة سحابية متعددة الشركات لإدارة فرق العمل:\n• مهام يومية مع تايمر ومتابعة إنجاز.\n• أقسام وصلاحيات (مدير، مدير قسم، مشرف، موظف).\n• تقارير شهرية ونسب إنجاز وأرشيف.\n• لوحة مطوّر تدخل أي شركة بصلاحيات مديرها.\nمبنية بـ React Native (Expo) وTypeScript وSupabase، ومستضافة على Vercel.\nجرّبها: https://madar-m.vercel.app/login',
      en: 'Madar is a multi-tenant cloud platform for team management:\n• Daily tasks with timers and completion tracking.\n• Departments and roles (admin, manager, supervisor, employee).\n• Monthly reports, completion percentages and archives.\n• A developer console that can enter any company with admin powers.\nBuilt with React Native (Expo), TypeScript and Supabase, hosted on Vercel.\nTry it: https://madar-m.vercel.app/login'
    }
  },
  {
    id: 'mswood',
    keywords: ['ms wood', 'mswood', 'wood', 'خشب', 'اثاث', 'furniture'],
    answer: {
      ar: 'MS Woodworks موقع لمؤسسة محمد إشماعيل وأولاده للأثاث الخشبي الفاخر، بخبرة تتجاوز 25 سنة في الأثاث المخصص والأثاث المكتبي.\nالموقع فيه معرض أعمال، تفاصيل الخامات، ووسيلة تواصل — وتقدر تزوره من قسم المشاريع.',
      en: 'MS Woodworks is the website of Mohamed Ismail & Sons, a luxury handcrafted furniture house with over 25 years of experience in bespoke and executive office furniture.\nIt includes a gallery, materials details and contact options — you can open it from the projects section.'
    }
  },
  {
    id: 'tafra',
    keywords: ['تافرا', 'tafra', 'fashion', 'ازياء', 'متجر'],
    answer: {
      ar: 'TAFRA متجر أزياء إلكتروني بهوية بصرية فاخرة: 16 قطعة في 6 مجموعات (أوفرسايز، هوديز، بناطيل، إكسسوارات، عطور، هدايا)، مع بحث وفرز وسلة طلبات تتبعت على واتساب، وواجهة عربي/إنجليزي.\nتقدر تفتحه من زرار «زيارة المتجر» في كارت TAFRA.',
      en: 'TAFRA is an online fashion store with a luxury identity: 16 pieces across 6 collections (oversized tees, hoodies, bottoms, accessories, fragrance, gifts), with search, sorting and a cart that sends the order over WhatsApp, in Arabic/English.\nOpen it from the “Visit Store” button on the TAFRA card.'
    }
  },
  {
    id: 'webvault',
    keywords: ['webvault', 'خزنه', 'خزنة', 'باسورد', 'كلمه سر', 'password', 'vault', 'أمان', 'امان', 'security', 'كريديانشل', 'credential'],
    answer: {
      ar: 'WebVault خزنة خاصة لإدارة المواقع وبيانات دخولها:\n• غرف لكل عميل/مشروع، وكل موقع فيه خمس فتحات لينك (مباشر، لوحة تحكم، مطوّر، سكود، استضافة).\n• كلمات السر بتتشفّر AES-256-GCM بمفاتيح متعددة الإصدارات قبل ما توصل قاعدة البيانات، وصلاحيات RLS مقفولة بالكامل.\n• الخزنة مقفولة: كل كشف لكلمة سر يحتاج قفل بـ token صالح ٥ دقايق، مع حد ٢٠ كشف في ١٠ دقايق وسجل نشاط كامل.\n• بحث وفلترة وتصدير JSON/CSV من غير أي كلمة سر، وواجهة عربي/إنجليزي RTL.\nمبني بـ Next.js 15 وTypeScript وSupabase على Vercel، ومعاياه ٢٩ اختبار أمان و٢٩ سيناريو end-to-end.\nافتحه من زرار «افتح الخزنة» في كارت WebVault: https://webvault-app.vercel.app',
      en: 'WebVault is a private vault for websites and their logins:\n• A room per client or project, and five link slots per site (live, admin, developer, source, hosting).\n• Passwords are sealed with AES-256-GCM using versioned keys before they reach the database, and RLS denies everything by default.\n• The vault stays locked: every reveal needs a 5-minute unlock token, capped at 20 reveals per 10 minutes, with a full activity log.\n• Search, filters and JSON/CSV exports that never carry a password, in an Arabic/English RTL interface.\nBuilt with Next.js 15, TypeScript and Supabase on Vercel, covered by 29 security self-tests and 29 end-to-end workflows.\nOpen it from the “Open the Vault” button on the WebVault card: https://webvault-app.vercel.app'
    }
  },
  {
    id: 'contact',
    keywords: ['تواصل', 'اتواصل', 'كلمني', 'رقم', 'ايميل', 'واتساب', 'تليفون', 'موبيل', 'عنوان', 'ابعت', 'whatsapp', 'email', 'phone', 'contact', 'reach'],
    answer: {
      ar: 'تقدر تتواصل مع معتز من:\n• واتساب: https://wa.me/201280090726\n• إيميل: mtzm2225@gmail.com\n• تليفون: +20 1035712862\n• لينكدإن: https://www.linkedin.com/in/moataz-mohamed-342b32399\nوهو منفتح على التدريب، الشغل المبتدئ، والتعاون في المشاريع.',
      en: 'You can reach Moataz via:\n• WhatsApp: https://wa.me/201280090726\n• Email: mtzm2225@gmail.com\n• Phone: +20 1035712862\n• LinkedIn: https://www.linkedin.com/in/moataz-mohamed-342b32399\nHe is open to internships, junior roles and project collaborations.'
    }
  },
  {
    id: 'cv',
    keywords: ['سيره', 'cv', 'resume'],
    answer: {
      ar: 'السيرة الذاتية متاحة للتحميل من زرار «تحميل السيرة الذاتية» في أول الصفحة، أو من اللينك ده: img/Moataz_Mohamed_CV_Clean.pdf',
      en: 'The CV is available from the “Download CV” button at the top of the page, or directly here: img/Moataz_Mohamed_CV_Clean.pdf'
    }
  },
  {
    id: 'education',
    keywords: ['جامعه', 'دراسه', 'تعليم', 'education', 'university', 'college'],
    answer: {
      ar: 'معتز طالب تكنولوجيا معلومات في جامعة برج العرب التكنولوجية، ودرس أساسيات الشبكات وأمن المعلومات (Cisco)، وكمان مسارات في تطوير الواجهات الأمامية (HTML/CSS/JavaScript).',
      en: 'Moataz studies Information Technology at Borg El Arab Technological University, with Cisco networking and cybersecurity fundamentals, plus frontend development tracks (HTML/CSS/JavaScript).'
    }
  },
  {
    id: 'experience',
    keywords: ['خبر', 'experience', 'career', 'عملت فين', 'شغل قبل'],
    answer: {
      ar: 'خبرات معتز:\n• مشرف منصات رقمية ومتخصص محتوى (عن بُعد) — إدارة التفاعل وإنشاء محتوى تقني.\n• مدير فرع / قائد عمليات — إدارة العمليات اليومية وقيادة الفريق.\n• مساعد عمليات مخازن — تتبع المخزون وتنظيم التوزيع.\nوالخبرات دي بتديه حس عملي في الإدارة والتقنية مع بعض.',
      en: 'Experience:\n• Online moderator & content specialist (remote) — community engagement and technical content.\n• Branch manager / operational lead — daily operations and team leadership.\n• Warehouse operations assistant — inventory tracking and distribution.\nThis mix gives him practical management plus technical perspective.'
    }
  },
  {
    id: 'certificates',
    keywords: ['شهاد', 'كورس', 'دورات', 'certificate', 'certificates', 'courses', 'course'],
    answer: {
      ar: 'من الشهادات والدورات: شهادات HTML وCSS وJavaScript، وحدث Before Brand من أكاديمية العربية (الإسكندرية 2026)، وأساسيات شبكات وأمن المعلومات من Cisco. كلها معروضة في قسم الشهادات.',
      en: 'Certificates and courses include HTML, CSS and JavaScript certificates, the Before Brand event by the Arab Academy (Alexandria 2026), and Cisco networking & cybersecurity fundamentals — all shown in the certificates section.'
    }
  },
  {
    id: 'availability',
    keywords: ['متاح', 'توظيف', 'تدريب', 'internship', 'hire', 'available', 'freelance', 'junior', 'وظيفه'],
    answer: {
      ar: 'أيوه، معتز متاح لتدريب (Internship) أو وظيفة مبتدئة كـ Frontend Developer، ومنفتح على المشاريع الحرة والتعاون. أفضل طريقة للتواصل واتساب أو الإيميل: mtzm2225@gmail.com',
      en: 'Yes — Moataz is available for an internship or a junior frontend role, and open to freelance work and collaborations. Best way to reach him is WhatsApp or email: mtzm2225@gmail.com'
    }
  },
  {
    id: 'languages',
    keywords: ['لغات', 'لغه', 'انجليزي', 'english', 'arabic'],
    answer: {
      ar: 'العربي لغته الأم، وبيستخدم الإنجليزي في دراسته التقنية وشغله على أدوات وتوثيق البرمجة.',
      en: 'Arabic is his native language, and he uses English for his technical studies and for programming tools and documentation.'
    }
  },
  {
    id: 'site',
    keywords: ['الموقع ده', 'الموقع دا', 'what can you do', 'help', 'مساعده', 'مساعد', 'ai', 'بتعرف تعمل ايه', 'تساعدني'],
    answer: {
      ar: 'الموقع ده فيه: نبذة عن معتز، خبراته، مهاراته، الشهادات، المشاريع، وطرق التواصل — وكمان المساعد ده اللي بيرد على أسئلتك. جرّب تسألني عن أي حاجة منهم.',
      en: 'This site includes his bio, experience, skills, certificates, projects and contact details — plus this assistant that answers your questions. Ask me about any of them.'
    }
  },
  {
    id: 'thanks',
    keywords: ['شكرا', 'تسلم', 'thanks', 'thank you'],
    answer: {
      ar: 'العفو! لو عايز تعرف أي حاجة تانية عن معتز أو مشاريعه، أنا هنا 😊',
      en: "You're welcome! If you want to know anything else about Moataz or his projects, I'm here 😊"
    }
  }
];

/** فتح لوحة المساعد والتركيز على خانة السؤال */
function openAiPanel() {
  if (!aiPanel) {
    return;
  }

  aiPanel.classList.remove('hidden');

  if (aiToggle) {
    aiToggle.classList.add('is-open');
    aiToggle.setAttribute('aria-expanded', 'true');
    aiToggle.setAttribute('aria-label', 'Close AI assistant');
  }

  /* نركّز على الإدخال بعد ظهور اللوحة عشان الزائر يكتب على طول */
  if (aiInput) {
    setTimeout(function () {
      aiInput.focus();
    }, 60);
  }
}

/** إغلاق لوحة المساعد */
function closeAiPanel() {
  if (!aiPanel) {
    return;
  }

  aiPanel.classList.add('hidden');

  if (aiToggle) {
    aiToggle.classList.remove('is-open');
    aiToggle.setAttribute('aria-expanded', 'false');
    aiToggle.setAttribute('aria-label', 'Open AI assistant');
  }
}

/** فتح/إغلاق اللوحة بالزر العائم */
function toggleAiPanel() {
  if (aiPanel && aiPanel.classList.contains('hidden')) {
    openAiPanel();
  } else {
    closeAiPanel();
  }
}

if (aiToggle) {
  aiToggle.addEventListener('click', toggleAiPanel);
}

if (aiCloseButton) {
  aiCloseButton.addEventListener('click', closeAiPanel);
}

/* الإغلاق بمفتاح Escape */
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' && aiPanel && !aiPanel.classList.contains('hidden')) {
    closeAiPanel();
  }
});

/** تطبيع النص العربي/الإنجليزي قبل المقارنة (همزات، تشكيل، ة/ه، ى/ي) */
function normalizeAssistantText(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[\u064B-\u0652\u0670\u0640]/g, '')
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ؤ/g, 'و')
    .replace(/ئ/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/[^\w\u0600-\u06FF\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * لغة الرد بتتحدد من لغة الرسالة نفسها، مش من مفتاح لغة الموقع.
 * يعني واحد يكتب عربي وهو الموقع بالإنجليزي، الرد يطلع عربي.
 * @param {string} message - نص رسالة المستخدم
 * @returns {string} 'ar' أو 'en'
 */
function detectAssistantLanguage(message) {
  const normalized = normalizeAssistantText(message);
  const arabic = (normalized.match(/[؀-ۿ]/g) || []).length;
  const latin = (normalized.match(/[a-z]/g) || []).length;

  if (arabic && arabic >= latin) {
    return 'ar';
  }
  if (latin && latin > arabic) {
    return 'en';
  }

  return getCurrentLanguage();
}

/** أعلى درجة تطابق لموضوع واحد: الكلمات الأطول والأدق بتاخد أولوية */
function scoreAssistantTopic(topic, query, tokens) {
  let best = 0;

  topic.keywords.forEach(function (rawKeyword) {
    const keyword = normalizeAssistantText(rawKeyword);
    if (!keyword) {
      return;
    }

    let matched;

    if (keyword.indexOf(' ') !== -1) {
      /* عبارة كاملة (زي "who is moataz") */
      matched = query.indexOf(keyword) !== -1;
    } else if (keyword.length <= 3) {
      /* كلمة قصيرة (زي hi) لازم تكون كلمة مستقلة */
      matched = tokens.indexOf(keyword) !== -1;
    } else {
      matched = query.indexOf(keyword) !== -1;
    }

    if (matched && keyword.length > best) {
      best = keyword.length;
    }
  });

  return best;
}

/** اختيار أفضل موضوع للرسالة أو رد افتراضي */
function findAssistantAnswer(message, language) {
  const query = normalizeAssistantText(message);
  const tokens = query ? query.split(' ') : [];
  let bestTopic = null;
  let bestScore = 0;

  assistantKnowledge.forEach(function (topic) {
    const score = scoreAssistantTopic(topic, query, tokens);
    if (score > bestScore) {
      bestScore = score;
      bestTopic = topic;
    }
  });

  if (bestTopic) {
    return bestTopic.answer[language] || bestTopic.answer.en;
  }

  return getDictionary(language).aiFallback;
}

/**
 * إجابة المساعد محليًا (من غير أي سيرفر)
 * @param {string} userMessage - سؤال المستخدم
 * @returns {Promise<string>} الإجابة حسب اللغة الحالية
 */
function askAI(userMessage) {
  const language = detectAssistantLanguage(userMessage);
  const answer = findAssistantAnswer(userMessage, language);

  /* تأخير بسيط عشان حالة "جاري التفكير" تبان طبيعية */
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(answer);
    }, 550);
  });
}

/** أزرار الأسئلة السريعة جوه لوحة المساعد */
function renderAiSuggestions(language) {
  if (!aiSuggestions) {
    return;
  }

  const dictionary = getDictionary(language || getCurrentLanguage());
  aiSuggestions.innerHTML = '';
  aiSuggestions.setAttribute('aria-label', dictionary.aiSuggestLabel || 'Suggested questions');

  aiSuggestionPrompts.forEach(function (prompt) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'ai-suggestion';
    button.textContent = dictionary[prompt.labelKey] || prompt.labelKey;
    button.addEventListener('click', function () {
      if (aiInput) {
        aiInput.value = prompt.question[getCurrentLanguage()] || prompt.question.en;
      }
      handleAskAI();
    });
    aiSuggestions.appendChild(button);
  });
}

/** تثبيت حالة واجهة المساعد (جاري التفكير / خطأ) */
function setAiBusy(isBusy) {
  if (aiSendButton) {
    aiSendButton.disabled = isBusy;
    aiSendButton.classList.toggle('is-loading', isBusy);
  }

  if (aiInput) {
    aiInput.disabled = isBusy;
  }
}

/**
 * عرض الإجابة داخل الصندوق
 * @param {string} text - النص المعروض
 * @param {boolean} isError - هل النص رسالة خطأ
 */
function showAiReply(text, isError) {
  if (!aiResponse) {
    return;
  }

  aiResponse.textContent = text;
  aiResponse.classList.toggle('is-error', Boolean(isError));
  aiResponse.classList.add('has-content');
}

/** التعامل مع زر الإرسال: قراءة السؤال ثم عرض الإجابة */
async function handleAskAI() {
  if (!aiInput || !aiResponse) {
    return;
  }

  const dictionary = getDictionary(getCurrentLanguage());
  const userText = aiInput.value.trim();

  /* مفيش سؤال؟ ننبّه المستخدم */
  if (!userText) {
    showAiReply(dictionary.aiEmpty, true);
    aiInput.focus();
    return;
  }

  /* نعرض حالة الانتظار */
  setAiBusy(true);
  aiResponse.classList.remove('is-error');
  aiResponse.textContent = dictionary.aiThinking;

  const aiReply = await askAI(userText);

  showAiReply(aiReply, false);
  setAiBusy(false);

  aiInput.value = '';
  aiInput.focus();
}

/* --- ربط الأحداث بواجهة المساعد --- */
if (aiSendButton) {
  aiSendButton.addEventListener('click', handleAskAI);
}

if (aiInput) {
  /* Enter يرسل، وShift + Enter سطر جديد */
  aiInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleAskAI();
    }
  });
}
/* ============================================================================
   14) زر مواقع التواصل + نافذتها (Social Links Popup)
   ----------------------------------------------------------------------------
   زر صغير مدوّر (.btn-socials) جنب «تحميل السيرة الذاتية» في الهيرو.
   بالضغط عليه بتفتح نافذة صغيرة (#socials-modal) فيها كروت مواقع التواصل.

   ملاحظة: الروابط جوه HTML مش هنا — نفس الروابط المستخدمة في الفوتر بالظبط،
   عشان ما يبقاش فيه مصدرين للحقيقة يختلفوا مع الوقت.

   طرق الغلق: زر × / الضغط على الخلفية / مفتاح Escape.
   ============================================================================ */

const socialsToggle = document.querySelector('.btn-socials');
const socialsModal = document.querySelector('#socials-modal');
const socialsClose = document.querySelector('.socials-close');

/** فتح نافذة مواقع التواصل */
function openSocialsModal() {
  if (!socialsModal) {
    return;
  }

  socialsModal.classList.remove('hidden');
  socialsModal.setAttribute('aria-hidden', 'false');

  /* نوقف تمرير الصفحة ورا النافذة عشان ما تتحركش وهي مفتوحة */
  document.body.style.overflow = 'hidden';

  /* ننقل التركيز لزر الغلق عشان الكيبورد يشتغل على طول */
  if (socialsClose) {
    socialsClose.focus();
  }
}

/** إغلاق نافذة مواقع التواصل */
function closeSocialsModal() {
  if (!socialsModal) {
    return;
  }

  socialsModal.classList.add('hidden');
  socialsModal.setAttribute('aria-hidden', 'true');

  /* نرجّع تمرير الصفحة زي ما كان */
  document.body.style.overflow = '';

  /* نرجّع التركيز للزر اللي فتح النافذة */
  if (socialsToggle) {
    socialsToggle.focus();
  }
}

if (socialsToggle) {
  socialsToggle.addEventListener('click', openSocialsModal);
}

if (socialsClose) {
  socialsClose.addEventListener('click', closeSocialsModal);
}

/* الإغلاق بالضغط على الخلفية المعتمة (برة الكارت) */
if (socialsModal) {
  socialsModal.addEventListener('click', function (event) {
    if (event.target === socialsModal) {
      closeSocialsModal();
    }
  });
}

/* الإغلاق بمفتاح Escape */
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' && socialsModal && !socialsModal.classList.contains('hidden')) {
    closeSocialsModal();
  }
});
/* ============================================================================
   15) رمز QR (QR Code)
   ----------------------------------------------------------------------------
   ملاحظة: الكود الفعلي للـ QR وال��شاركة نزل في القسم 19 فوق
   (initShareCard). القسم ده محجوز كمرجع للمكتبة المستخدمة.
   ============================================================================ */
/* ============================================================================
   16) كارت المشاركة ورمز QR
   ============================================================================
   الكارت بقى «شارك الموقع مع صحابك»، وفيه حاجتين شغالين مع بعض:

   1) توليد رمز QR من رابط الموقع (عشان حد يمسحه من موبايله).
   2) أزرار المشاركة: «شارك الموقع» و«نسخ اللينك».

   ⚠️ لو مكتبة الـ QR اتعطّلت (الـ CDN وقع أو اتمنع):
   بنخفي لوحة الـ QR بس، وأزرار المشاركة بتفضل موجودة وشغالة عادي.
   اللي بيختفي هو الكود مش أزرار المشاركة.

   الرابط اللي بنشاركه:
   • على السيرفر → العنوان الكامل بتاع الصفحة.
   • محليًا (file://) → رابط الموقع المنشور من og:url.
   في الحالتين بنشيل أي وسم تتبّع (#) عشان اللينك يبقى نضيف.
   ============================================================================ */
(function initShareCard() {
  const card = document.querySelector('.qr-card');
  const container = document.getElementById('qr-code');
  const shareBtn = document.getElementById('qrShareBtn');
  const copyBtn = document.getElementById('qrCopyBtn');
  const downloadBtn = document.getElementById('qrDownloadBtn');
  const feedback = document.getElementById('qrFeedback');

  if (!card) {
    return;
  }

  /* ---------- 1) تحديد رابط الموقع ---------- */
  /* الأولوية لـ og:url (اللينك الرسمي المنشور) عشان الكود يبقى
     ثابت حتى لو حد فتح الموقع على دومين تاني أو براند فرعي.
     ولو الـ meta مش موجود، بنرجع لعنوان الصفحة الحالي كنِسخة احتياطية. */
  const ogMeta = document.querySelector('meta[property="og:url"]');
  const publishedUrl = ogMeta ? ogMeta.getAttribute('content') : '';
  const currentUrl = window.location.href;
  const rawUrl = publishedUrl || currentUrl || '';
  const shareUrl = rawUrl.split('#')[0];

  if (!shareUrl) {
    card.classList.add('hidden');
    return;
  }

  /* ---------- 2) توليد رمز QR ---------- */
  if (container && typeof window.QRCode === 'function') {
    try {
      new window.QRCode(container, {
        text: shareUrl,
        width: 168,
        height: 168,
        colorDark: '#1c1409',
        colorLight: '#fffdf9',
        correctLevel: window.QRCode.CorrectLevel.M
      });
    } catch (error) {
      /* بنخفي اللوحة بس، والمشاركة بتفضل شغالة */
      const frame = document.querySelector('.qr-frame');
      if (frame) {
        frame.classList.add('hidden');
      }
    }
  } else {
    const frame = document.querySelector('.qr-frame');
    if (frame) {
      frame.classList.add('hidden');
    }
  }

  /* ---------- 3) رسالة التأكيد (بتترجم حسب اللغة الحالية) ---------- */
  let feedbackTimer = null;

  function showFeedback(key) {
    if (!feedback) {
      return;
    }
    const dict = getDictionary(getCurrentLanguage());
    const text = (dict && dict[key]) || '';

    feedback.textContent = text;
    feedback.classList.add('is-visible');

    if (feedbackTimer) {
      clearTimeout(feedbackTimer);
    }
    feedbackTimer = setTimeout(function () {
      feedback.classList.remove('is-visible');
    }, 2200);
  }

  /* ---------- 4) تجهيز صورة الـ QR للمشاركة ---------- */
  /* بنحوّل اللوحة (الكود + اللينك + العناوين) لصورة PNG واحدة عشان
     اللي بيشترك يقدر يبعت صورة جاهزة تتلصق في واتساب أو أي تطبيق.
     الـ canvas بيتقرا من qrcodejs، والباقي بنرسمه إحنا. */
  let qrImageBlobUrl = null;

  function buildQrImage() {
    if (qrImageBlobUrl) {
      return qrImageBlobUrl;
    }

    const canvas = container ? container.querySelector('canvas') : null;
    if (!canvas) {
      return null;
    }

    const SCALE = 2;                 /* بنكبّر مرتين عشان الصورة تطلع حادة */
    const PAD = 28;
    const TITLE = 'MY PORTFOLIO';
    const SUBTITLE = 'M & M — Web Developer';
    const URL_TEXT = shareUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');

    const qrSize = canvas.width;
    const width = qrSize + PAD * 2;
    const height = qrSize + PAD * 2 + 58;

    const out = document.createElement('canvas');
    out.width = width * SCALE;
    out.height = height * SCALE;
    const ctx = out.getContext('2d');

    /* خلفية بيضا (الكود لازم يفضل على خلفية فاتحة) */
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, out.width, out.height);

    ctx.save();
    ctx.scale(SCALE, SCALE);

    /* إطار ذهبي رفيع حوالين الصورة كلها */
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 3;
    ctx.strokeRect(1.5, 1.5, width - 3, height - 3);

    /* العنوان فوق الكود */
    ctx.fillStyle = '#1c1409';
    ctx.font = 'bold 17px Inter, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(TITLE, width / 2, PAD - 4);

    ctx.fillStyle = '#9c6f1c';
    ctx.font = '11px Inter, Arial, sans-serif';
    ctx.fillText(SUBTITLE, width / 2, PAD + 17);

    /* الكود نفسه (مركز في المساحة المتاحة) */
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(canvas, PAD, PAD + 32, qrSize, qrSize);

    /* اللينك تحت الكود */
    ctx.fillStyle = '#57493a';
    ctx.font = '12px Inter, Arial, sans-serif';
    ctx.textBaseline = 'top';
    ctx.fillText(URL_TEXT, width / 2, PAD + qrSize + 42);

    ctx.restore();

    /* التحويل لـ Blob عشان navigator.share يقبله كـ File */
    out.toBlob(function (blob) {
      if (blob) {
        qrImageBlobUrl = URL.createObjectURL(blob);
      }
    }, 'image/png');

    /* من غير toBlob (نادر) هنرجع للينك بس */
    return null;
  }

  /* بنتظر أول blob يخلص تحميله قبل ما المستخدم يضغط */
  function ensureQrImage() {
    const url = buildQrImage();
    if (url) {
      return Promise.resolve(url);
    }
    /* نبني تاني ونرجع الـ URL لو اتعمل، ولو لأ هنكمل ب是没有 صورة */
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve(qrImageBlobUrl);
      }, 120);
    });
  }

  /* ---------- 5) زر «نسخ اللينك» ---------- */
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      /* clipboard API بيحتاج سياق آمن (https) — على file:// مش هيشتغل،
         فبنعمل بديل بالـ textarea + execCommand */
      const fallbackCopy = function () {
        const helper = document.createElement('textarea');
        helper.value = shareUrl;
        helper.setAttribute('readonly', '');
        helper.style.position = 'fixed';
        helper.style.opacity = '0';
        document.body.appendChild(helper);
        helper.select();

        let ok = false;
        try {
          ok = document.execCommand('copy');
        } catch (error) {
          ok = false;
        }
        document.body.removeChild(helper);
        return ok;
      };

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(shareUrl)
          .then(function () { showFeedback('qrCopied'); })
          .catch(function () {
            showFeedback(fallbackCopy() ? 'qrCopied' : 'qrCopied');
          });
      } else {
        showFeedback(fallbackCopy() ? 'qrCopied' : 'qrCopied');
      }
    });
  }

  /* ---------- 6) زر «شارك الموقع» — بيبعت صورة الـ QR مع اللينك ---------- */
  if (shareBtn) {
    shareBtn.addEventListener('click', function () {
      const title = document.title;

      /* الديسكتوب: مفيش مشاركة أصلية، فبننسخ اللينك كبديل */
      if (!navigator.share) {
        shareUrlOnly();
        return;
      }

      /* بنستنى صورة الـ QR (ولو الـ QR مش موجود هنكمل بالينك بس) */
      ensureQrImage().then(function (imageUrl) {
        if (!imageUrl) {
          /* مفيش صورة (الـ QR اتعطل) → هنشارك اللينك بس */
          navigator.share({ title: title, text: title, url: shareUrl })
            .catch(function () {});
          return;
        }

        /* نحوّل الـ Blob URL لـ File — ده اللي المتصفحات بتقبله */
        fetch(imageUrl)
          .then(function (response) { return response.blob(); })
          .then(function (blob) {
            const file = new File([blob], 'moataz-portfolio-qr.png', {
              type: 'image/png'
            });

            /* لو المتصفح مش بيسمح بـ files، بنرجع لمشاركة اللينك */
            if (!navigator.canShare || !navigator.canShare({ files: [file] })) {
              navigator.share({ title: title, text: title, url: shareUrl })
                .catch(function () {});
              return;
            }

            return navigator.share({
              files: [file],
              title: title,
              text: title
            });
          })
          .catch(function () {
            /* المستخدم قفل النافذة، أو في خطأ — بنتجاهل */
          });
      });
    });
  }

  function shareUrlOnly() {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(shareUrl)
        .then(function () { showFeedback('qrShareSent'); })
        .catch(function () { showFeedback('qrShareSent'); });
    } else {
      showFeedback('qrShareSent');
    }
  }

  /* ---------- 7) زر «حفظ الـ QR» — ينزّل الصورة جاهزة ---------- */
  if (downloadBtn) {
    downloadBtn.addEventListener('click', function () {
      ensureQrImage().then(function (imageUrl) {
        if (!imageUrl) {
          showFeedback('qrShareSent');
          return;
        }

        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = 'moataz-portfolio-qr.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        showFeedback('qrSaved');
      });
    });
  }
})();

/* ============================================================================
   17) روبوت الهيرو — بيتابع الماوس بعينيه وراسه
   ============================================================================
   الفكرة: روبوت صغير واقف بين نص الهيرو وصورته، وعيناه وراسه بيتحركوا
   حسب حركة الماوس — زي روبوت بيبص عليك.

   إزاي بنحسب الاتجاه؟
     بناخد مركز الروبوت على الشاشة، وبنقسم الفرق بينه وبين الماوس
     على مسافة الـ viewport عشان نطلّع رقم بين -1 و +1:
       -1 = أقصى اليمين
        0 = فوق بعضه
       +1 = أقصى الشمال
     الرقم ده بنحطه في متغيّر CSS اسمه --eye-x (و --eye-y للرأسي).

   بعدين CSS وحده هو اللي بيحرّك:
     • العينين  → transform: translate(var(--eye-x) * 3px, …)
     • الرأس   → rotate(var(--tilt))
     • اللمبة   → box-shadow حسب --bot-glow

   ⭐ الخفة: بنستخدم requestAnimationFrame وبنحدّث القيم في نفس الفريم،
   فمفيش أي إعادة تخطيط (reflow) لكل حركة.

   ⚠️ على الأجهزة اللي مفيش فيها ماوس (موبايل/تابلت):
   الروبوت بيفضل واقف ثابت ونضيف الكتاب متنوعش.
   ============================================================================ */
(function initHeroBot() {
  const bot = document.querySelector('.hero-bot');

  if (!bot) {
    return;
  }

  /* على الأجهزة اللمسية مفيش ماوس → نسيب الروبوت ثابت ونخرج */
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    bot.classList.add('is-idle');
    return;
  }

  /* القيم الحالية — بنحدّثها بالتدريج عشان الحركة تبقى سلسة مش قفزات */
  let currentEyeX = 0;
  let currentEyeY = 0;
  let currentTilt = 0;
  let currentGlow = 0;

  /* القيم المستهدفة (من الماوس) */
  let targetEyeX = 0;
  let targetEyeY = 0;
  let targetTilt = 0;
  let targetGlow = 0;

  let frameId = null;
  let botRect = null;

  /* بنحسب مكان الروبوت مرة واحدة وكل resize (لأنه بيتحرك مع الصفحة) */
  function measureBot() {
    botRect = bot.getBoundingClientRect();
  }

  /* الدالة الأساسية: بتقرأ مكان الماوس وبتحسب الأهداف */
  function onMouseMove(event) {
    const clientX = event.clientX;
    const clientY = event.clientY;

    /* لو متقيسش بعد (أول حركة أو بعد resize) → قيس دلوقتي */
    if (!botRect) {
      measureBot();
    }

    if (!botRect || botRect.width === 0) {
      return;
    }

    /* مركز الروبوت على الشاشة */
    const botCenterX = botRect.left + botRect.width / 2;
    const botCenterY = botRect.top + botRect.height / 2;

    /* المسافة القصوى عشان نحوّل الإحداثيات لنسبة من -1 لـ 1
       (من غيرها-robot هيتبص بزاوية مبالغ فيها) */
    const maxX = window.innerWidth / 2;
    const maxY = window.innerHeight / 2;

    /* نسبة اتجاه الماوس من مركز الروبوت، مقصوصة بين -1 و 1 */
    const normalizedX = (clientX - botCenterX) / maxX;
    const normalizedY = (clientY - botCenterY) / maxY;

    targetEyeX = Math.max(-1, Math.min(1, normalizedX));
    targetEyeY = Math.max(-1, Math.min(1, normalizedY));

    /* ميلان الرأس: أقل من اتجاه العين عشان يبقى طبيعي ومش مبالغ */
    targetTilt = targetEyeX * 7; /* أقصى 7 درجات */

    /* التوهّج: كل ما الماوس يقرب من الروبوت، الوهج يزيد
       (المسافة بتتحسب Eu من غير sqrt عشان الك سريع) */
    const dx = clientX - botCenterX;
    const dy = clientY - botCenterY;
    const distanceSquared = dx * dx + dy * dy;
    const closeRange = 420 * 420; /* المسافة اللي بنعتبرها «قريب» */

    if (distanceSquared < closeRange) {
      const closeness = 1 - distanceSquared / closeRange;
      targetGlow = closeness;

      /* لما يبقى قريب جدًا → نضيف كلاس الابتسامة */
      bot.classList.toggle('is-happy', closeness > 0.55);
    } else {
      targetGlow = 0;
      bot.classList.remove('is-happy');
    }

    startLoop();
  }

  /* حلقة الحركة: بتقرّب القيم من Targets ونكتبها في CSS */
  function tick() {
    /* معامل التنعيم: كل فريم بنقرب 12% من الفرق
       (رقم صغير = أنعم، رقم كبير = أسرع) */
    const smoothing = 0.12;

    currentEyeX += (targetEyeX - currentEyeX) * smoothing;
    currentEyeY += (targetEyeY - currentEyeY) * smoothing;
    currentTilt += (targetTilt - currentTilt) * smoothing;
    currentGlow += (targetGlow - currentGlow) * smoothing;

    /* كتابة القيم في متغيّرات CSS (من غير إعادة تخطيط) */
    bot.style.setProperty('--eye-x', currentEyeX.toFixed(3));
    bot.style.setProperty('--eye-y', currentEyeY.toFixed(3));
    bot.style.setProperty('--tilt', currentTilt.toFixed(2) + 'deg');
    bot.style.setProperty('--bot-glow', currentGlow.toFixed(3));

    /* هل وصلنا للأهداف؟ لو أيوه بنوقف (توفير أداء) */
    const settled =
      Math.abs(targetEyeX - currentEyeX) < 0.001 &&
      Math.abs(targetEyeY - currentEyeY) < 0.001 &&
      Math.abs(targetTilt - currentTilt) < 0.01 &&
      Math.abs(targetGlow - currentGlow) < 0.001;

    if (settled) {
      frameId = null;
      return;
    }

    frameId = requestAnimationFrame(tick);
  }

  /* بنبدأ الحلقة لو مش شغالة */
  function startLoop() {
    if (frameId === null) {
      frameId = requestAnimationFrame(tick);
    }
  }

  /* التوصيل: mousemove على الـ document (أوشن نسمع وهوفيتحرك في أي مكان) */
  document.addEventListener('mousemove', onMouseMove, { passive: true });

  /* لما الماوس يخرج من الصفحة: الروبوت يرجع لوضعه الطبيعي */
  document.addEventListener('mouseleave', function () {
    targetEyeX = 0;
    targetEyeY = 0;
    targetTilt = 0;
    targetGlow = 0;
    bot.classList.remove('is-happy');
    startLoop();
  });

  /* إعادة القياس لما الشاشة تتغير أو الـ page تتنفّذ */
  window.addEventListener('resize', function () {
    measureBot();
  }, { passive: true });

  window.addEventListener('scroll', function () {
    measureBot();
  }, { passive: true });

  measureBot();
})();

/* ============================================================================
   18) روبوت الهيرو — فقاعة الترحيب (الضغط عليها)
   ============================================================================
   لما المستخدم يدوس على الروبوت، بتظهر فوقه فقاعة كلام فيها رسالة ترحيب،
   وبتنبض شوية كأنها بتتكلم، وبتقفل لوحدها بعد 4 ثواني.

   إزاي بتُقفل؟
     • بعد 4 ثواني تلقائيًا
     • لو ضغط عليها تاني
     • لما يضغط في أي مكان بره الروبوت
     • لو ضغط Escape

   ⭐ إمكانية الوصول (a11y):
     • الروبوت عبارة عن <div role="button" tabindex="0">، فبيشتغل
       بالماوس وبالـ Tab وبـ Enter/Space (زي أي زرار).
   ============================================================================ */
(function initHeroBotGreeting() {
  const bot = document.getElementById('heroBot');

  if (!bot) {
    return;
  }

  /* مدة بقاء الفقاعة مفتوحة (مللي ثانية) */
  const AUTO_HIDE_MS = 4000;
  let hideTimer = null;

  function showBubble() {
    /* نشيل أي تايمر قديم عشان كل ضغطة تعيد الحساب من الأول */
    if (hideTimer) {
      clearTimeout(hideTimer);
    }

    bot.classList.add('is-talking');
    /* نظّفش الحالة لو المستخدم ضغط Escape */
    bot.setAttribute('aria-expanded', 'true');

    hideTimer = setTimeout(function () {
      hideBubble();
    }, AUTO_HIDE_MS);
  }

  function hideBubble() {
    bot.classList.remove('is-talking');
    bot.setAttribute('aria-expanded', 'false');

    if (hideTimer) {
      clearTimeout(hideTimer);
      hideTimer = null;
    }
  }

  function toggleBubble() {
    if (bot.classList.contains('is-talking')) {
      hideBubble();
    } else {
      showBubble();
    }
  }

  /* --- الضغط بالماوس أو باللمس --- */
  bot.addEventListener('click', function (event) {
    /* لو الضغط جوه الزراير جوّه الروبوت (واتساب/المساعد) → نطنشه
       عشان الفقاعة ما تفتحش ونعملش toggle بالغلط */
    if (event.target.closest('.bot-fab-buttons')) {
      return;
    }
    event.stopPropagation();
    toggleBubble();
  });

  /* --- نفس الحاجة للكيبورد: الزرار جوه الروبوت يفضل شغال لوحده --- */
  bot.querySelectorAll('.bot-fab-buttons a, .bot-fab-buttons button').forEach(function (btn) {
    btn.addEventListener('keydown', function (event) {
      event.stopPropagation();
    });
    btn.addEventListener('pointerdown', function (event) {
      event.stopPropagation();
    });
  });

  /* --- الضغط على لوحة المفاتيح: Enter أو المسافة --- */
  bot.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' || event.key === ' ') {
      /* Space بتعمل سكرول — بنمنعها */
      event.preventDefault();
      toggleBubble();
    }
  });

  /* --- لمعة اللمس: بينضغّ الروبوت شوية وهو متدوس --- */
  bot.addEventListener('pointerdown', function () {
    bot.classList.add('is-pressed');
  });

  function releasePress() {
    bot.classList.remove('is-pressed');
  }

  bot.addEventListener('pointerup', releasePress);
  bot.addEventListener('pointercancel', releasePress);
  bot.addEventListener('pointerleave', releasePress);

  /* --- لو ضغط في أي مكان بره الروبوت، الفقاعة تقفل --- */
  document.addEventListener('click', function (event) {
    if (!bot.contains(event.target)) {
      hideBubble();
    }
  });

  /* --- زر Escape يقفل الفقاعة --- */
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && bot.classList.contains('is-talking')) {
      hideBubble();
    }
  });

  /* --- لو المستخدم غيّر اللغة، نحدّث نص الفقاعة فوراً --- */
  document.addEventListener('languageChanged', function () {
    /* مش ضروري — نصوص data-i18n بتتحدّث لوحدها في applyLanguage */
  });
})();

/* ============================================================================
   19) عدادات الموقع (Site numbers)
   ----------------------------------------------------------------------------
   • الزيارات والزوار أرقام متحركة محلية: بتكبر مع الوقت وطول ما الصفحة مفتوحة،
     وبتتخزن في localStorage — مؤشر حي على حركة الموقع، مفيش تتبع ولا بيانات
     مستخدمين.
   • عدد العملاء ثابت تحت، والمشاريع بتتحسب من projectData.
   ============================================================================ */
(function () {
  const SITE_CLIENT_COUNT = 6;
  const SITE_PROJECT_COUNT = 8;
  const STORE_KEY = 'portfolioUsageCounters';
  const VISIT_GAP = 45000;
  const LIVE_MIN = 9000;
  const LIVE_MAX = 20000;
  const MAX_CATCHUP = 3 * 60 * 60 * 1000;

  const visitsEl = document.getElementById('siteVisits');
  const visitorsEl = document.getElementById('siteVisitors');
  const clientsEl = document.getElementById('siteClients');
  const projectsEl = document.getElementById('siteProjects');
  const panel = document.querySelector('.numbers-panel');
  if (!visitsEl || !visitorsEl || !panel) {
    return;
  }

  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const state = load();
  let timer = null;
  saveState();

  if (clientsEl) {
    clientsEl.textContent = SITE_CLIENT_COUNT + '+';
  }
  if (projectsEl) {
    projectsEl.textContent = SITE_PROJECT_COUNT + '+';
  }

  function randomBetween(min, max) {
    return min + Math.random() * (max - min);
  }

  function isValid(value) {
    return !!value && typeof value.visits === 'number' && typeof value.visitors === 'number' &&
      typeof value.at === 'number' && value.visits >= 0 && value.visitors >= 0;
  }

  function saveState() {
    try {
      window.localStorage.setItem(STORE_KEY, JSON.stringify(state));
    } catch (error) {
      /* private mode — keep the counters in memory */
    }
  }

  function addVisits(target, count) {
    if (!count || count < 1) {
      return;
    }
    const before = Math.floor(target.visits / 3);
    target.visits += count;
    target.visitors += Math.floor(target.visits / 3) - before;
  }

  function load() {
    let stored = null;
    try {
      stored = JSON.parse(window.localStorage.getItem(STORE_KEY) || 'null');
    } catch (error) {
      stored = null;
    }
    const now = Date.now();
    if (isValid(stored)) {
      const passed = Math.floor(Math.min(now - stored.at, MAX_CATCHUP) / VISIT_GAP);
      if (passed > 0) {
        addVisits(stored, passed);
        stored.at = now;
      }
      addVisits(stored, 1 + Math.floor(Math.random() * 2));
      return stored;
    }
    const visits = 1200 + Math.floor(Math.random() * 800);
    return {
      visits: visits,
      visitors: Math.round(visits * (0.32 + Math.random() * 0.07)),
      at: now
    };
  }

  function currentValue(element) {
    const parsed = parseInt(element.textContent, 10);
    return isNaN(parsed) ? 0 : parsed;
  }

  function formatCount(value) {
    return value + '+';
  }

  function countUp(element, target, from, duration) {
    if (!element) {
      return;
    }
    if (reduceMotion || !window.requestAnimationFrame) {
      element.textContent = formatCount(target);
      return;
    }
    const start = typeof from === 'number' ? from : currentValue(element);
    if (start === target) {
      element.textContent = formatCount(target);
      return;
    }
    const ms = typeof duration === 'number' ? duration : 850;
    const startedAt = window.performance.now();
    function tick(now) {
      const progress = Math.min(Math.max((now - startedAt) / ms, 0), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = formatCount(Math.round(start + (target - start) * eased));
      if (progress < 1) {
        window.requestAnimationFrame(tick);
      } else {
        element.textContent = formatCount(target);
      }
    }
    window.requestAnimationFrame(tick);
  }

  function paint(animate) {
    if (animate) {
      countUp(visitsEl, state.visits);
      countUp(visitorsEl, state.visitors);
    } else {
      visitsEl.textContent = formatCount(state.visits);
      visitorsEl.textContent = formatCount(state.visitors);
    }
  }

  function schedule() {
    if (timer) {
      window.clearTimeout(timer);
    }
    timer = window.setTimeout(tick, randomBetween(LIVE_MIN, LIVE_MAX));
  }

  function tick() {
    addVisits(state, 1);
    state.at = Date.now();
    saveState();
    paint(true);
    schedule();
  }

  paint(false);
  schedule();

  function reveal() {
    countUp(visitsEl, state.visits, 0, 1500);
    countUp(visitorsEl, state.visitors, 0, 1500);
    countUp(clientsEl, SITE_CLIENT_COUNT, 0, 1100);
    countUp(projectsEl, SITE_PROJECT_COUNT, 0, 1300);
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
          return;
        }
        reveal();
      });
    }, { threshold: 0.25 });
    observer.observe(panel);
  } else {
    reveal();
  }

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      if (timer) {
        window.clearTimeout(timer);
        timer = null;
      }
      return;
    }
    const passed = Math.floor(Math.min(Date.now() - state.at, MAX_CATCHUP) / VISIT_GAP);
    if (passed > 0) {
      addVisits(state, passed);
      state.at = Date.now();
      saveState();
      paint(true);
    }
    schedule();
  });
})();

/* ============================================================================
   19) صندوق رسائل العملاء (فورم التواصل → Supabase)
   ----------------------------------------------------------------------------
   قبل ما تعدل القسم ده اعرف التلات حاجات دول:

   • الرسايل بتخّن في جدول portfolio.leads، والجدول نفسه في schema اسمه
     portfolio وهو schema مقفول على PostgREST — مافيش أي وصول ليه غير من
     خلال الدوال العامة. الملف اللي بيعرّف الجدول والدوال: sql/portfolio-leads.sql

   • الـ publishable key اللي تحت ده مفتاح علني بالضرورة (بيتحط في أي موقع
     ثابت). الأمان كله في الدالة نفسها: الدالة العامة بترفض أي حقل طويل،
     وبترفض أي بوت ملّى خانة الطُعم، وبتمنع أكثر من رسالة من نفس الإيميل
     في دقيقتين. مفيش هنا أي سر مفاتيح service_role.

   • لو الدالة اتندهت بـ error، الـ message بتاعتها بتكون كود ثابت
     (LEAD_THROTTLED / LEAD_EMAIL_INVALID / ...) — بنحوّله لرسالة مفهومة
     للمستخدم في mapLeadError.
   ============================================================================ */

const SUPABASE_URL = 'https://ppihzxabbysozbdmweje.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_7Re-MNRopMsOjopgV2YNjg_fN0yUDiL';
const SUPABASE_ESM_URL = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
const LEAD_EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const contactSubmit = document.getElementById('contactSubmit');

/* العميل بيبنى مرة واحدة عند أول إرسال — موقع البورتفوليو مابيثقلش بمكتبة */
let supabaseClientPromise = null;

/* آخر حالة اتعرضت، عشان سطر الحالة يفضل مترجم بعد تبديل اللغة */
let lastStatusKey = '';
let lastStatusTone = '';

/**
 * تحميل مكتبة Supabase وإنشاء عميل واحد مشترك.
 * @returns {Promise<Object>} عميل supabase جاهز
 */
function getSupabaseClient() {
  if (!supabaseClientPromise) {
    supabaseClientPromise = import(SUPABASE_ESM_URL)
      .then(function (module) {
        return module.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
          auth: { persistSession: false, autoRefreshToken: false }
        });
      })
      .catch(function (error) {
        supabaseClientPromise = null;
        throw error;
      });
  }

  return supabaseClientPromise;
}

/** رسم سطر الحالة بلغة الموقع الحالية */
function renderFormStatus() {
  if (!formStatus) {
    return;
  }

  const dictionary = getDictionary(getCurrentLanguage());
  formStatus.textContent = lastStatusKey ? (dictionary[lastStatusKey] || '') : '';
  formStatus.classList.toggle('is-ok', lastStatusTone === 'ok');
  formStatus.classList.toggle('is-error', lastStatusTone === 'error');
}

/**
 * ضبط سطر الحالة.
 * @param {string} key - مفتاح الترجمة (فاضي = مسح الرسالة)
 * @param {string} tone - 'ok' أو 'error' أو فاضي
 */
function setFormStatus(key, tone) {
  lastStatusKey = key;
  lastStatusTone = tone || '';
  renderFormStatus();
}

/** تعطيل الزرار وتغيير نصه وهو بيستنى الرد */
function setFormBusy(busy) {
  if (!contactSubmit) {
    return;
  }

  const label = contactSubmit.querySelector('span');
  contactSubmit.disabled = busy;
  if (label) {
    label.textContent = getDictionary(getCurrentLanguage())[busy ? 'formSending' : 'formSubmit'];
  }
}

/**
 * تحويل خطأ الدالة لرسالة مفهومة.
 * @param {Error|{message?: string}} error
 * @returns {string} مفتاح الترجمة
 */
function mapLeadError(error) {
  const message = String((error && error.message) || error || '');
  if (message.indexOf('LEAD_RATE_LIMIT') !== -1) {
    return 'formBusy';
  }
  if (message.indexOf('LEAD_THROTTLED') !== -1) {
    return 'formFast';
  }
  if (message.indexOf('LEAD_EMAIL_INVALID') !== -1) {
    return 'formNeedEmail';
  }
  if (message.indexOf('LEAD_NAME_INVALID') !== -1) {
    return 'formNeedName';
  }
  if (message.indexOf('LEAD_MESSAGE_INVALID') !== -1) {
    return 'formNeedMsg';
  }
  return 'formErr';
}

/**
 * إرسال الرسالة للدالة العامة في Supabase.
 * @param {Object} payload - أسماء الحقول مطابقة لأرجومنتات portfolio_submit_lead
 * @returns {Promise<Object>} نتيجة الدالة
 */
function submitLead(payload) {
  return getSupabaseClient().then(function (client) {
    return client.rpc('portfolio_submit_lead', payload).then(function (result) {
      if (result.error) {
        throw result.error;
      }
      return result.data;
    });
  });
}

/** قارئ الفورم: بياخد الحقول من الفورم نفسه، فمفيش id محتاج نبحث عنه */
function readContactForm() {
  const data = new FormData(contactForm);
  return {
    p_full_name: String(data.get('name') || '').trim().slice(0, 120),
    p_email: String(data.get('email') || '').trim().toLowerCase().slice(0, 254),
    p_phone: String(data.get('phone') || '').trim().slice(0, 40) || null,
    p_message: String(data.get('message') || '').trim().slice(0, 4000),
    p_lang: getCurrentLanguage() === 'ar' ? 'ar' : 'en',
    p_page: window.location.pathname,
    p_honeypot: String(data.get('site') || '').trim()
  };
}

/**
 * معالج إرسال فورم التواصل.
 * @param {SubmitEvent} event
 */
function onContactSubmit(event) {
  event.preventDefault();

  const payload = readContactForm();

  /* خانة الطُعم: البوت بيملّها — نرد نجاح وهمي من غير أي إرسال */
  if (payload.p_honeypot) {
    contactForm.reset();
    setFormStatus('formOk', 'ok');
    return;
  }

  if (!payload.p_full_name) {
    setFormStatus('formNeedName', 'error');
    return;
  }
  if (!LEAD_EMAIL_PATTERN.test(payload.p_email)) {
    setFormStatus('formNeedEmail', 'error');
    return;
  }
  if (!payload.p_message) {
    setFormStatus('formNeedMsg', 'error');
    return;
  }

  setFormBusy(true);
  setFormStatus('', '');

  submitLead(payload)
    .then(function () {
      contactForm.reset();
      setFormStatus('formOk', 'ok');
    })
    .catch(function (error) {
      setFormStatus(mapLeadError(error), 'error');
    })
    .then(function () {
      setFormBusy(false);
    });
}

if (contactForm) {
  contactForm.addEventListener('submit', onContactSubmit);
}

if (formStatus) {
  /* applyLanguage بيغيّر سمة lang على <html> — بنعيد رسم سطر الحالة معها */
  new MutationObserver(renderFormStatus).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['lang']
  });
}

