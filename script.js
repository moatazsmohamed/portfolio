/* ============================================================================
   PORTFOLIO — M & M · Moataz Mohamed
   الملف: script.js  (ملف الجافاسكربت الرئيسي والوحيد)
   ============================================================================

   ⚠️  قبل أي تعديل، اقرا الفهرس ده كويس — كل قسم مكتوب عنده رقمه.

   ----------------------------------------------------------------------------
   فهرس الأقسام (بالترتيب جوه الملف)
   ----------------------------------------------------------------------------
     1)  الترجمة (Translations)            — قاموس عربي/إنجليزي
     2)  بيانات المشاريع (Project Data)     — مصفوفة المشاريع الثلاثة
     3)  مراجع عناصر الصفحة (DOM Refs)      — بنمسك العناصر مرة واحدة
     4)  أدوات مساعدة (Helpers)            — دوال صغيرة بيستخدمها الباقي
     5)  الهيدر (Header Scroll State)      — تغيير شكل الشريط عند النزول
     6)  البحث (Search)                   — بحث في الصفحة + تمييز النتائج
     7)  الثيم (Theme)                    — الوضع الأساسي / الأبيض
     8)  كارت المشاريع (Portfolio Card)     — التنقل بين المشاريع
     9)  الترجمة التطبيقية (Language)       — تبديل اللغة وتطبيقها
    10)  تسجيل الدخول (Sign In Modal)      — النافذة المنبثقة
    11)  تسجيلات المطور (Developer Panel)  — لوحة سرية للمطور
    12)  إرسال نموذج الدخول (Sign In Submit)
    13)  التنقل وسلايدر الشهادات (Navigation)
    14)  شاشة التحميل + شاشة الاسم (Preloader / Name Intro)
    15)  التشغيل الأولي (Init)              — بيتنفّذ في آخر الملف
       15.0  ظهور المحتوى عند النزول (Scroll Reveal)
       15.1  (محذوف) توهج الماوس القديم — اتشال
       15.2  الخلفية التفاعلية (Living Background) + المؤشر المخصص

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
    signin: 'تسجيل الدخول',
    search: 'بحث...',
    experienceNav: 'الخبرات',
    skillsNav: 'المهارات',
    summaryNav: 'النبذة',
    socialsTitle: 'مواقع التواصل',
    socialsSubtitle: 'تلاقيني على المنصات دي — دايمًا مبسوط أتعرف على ناس جديدة.',

    /* نافذة تسجيل الدخول */
    signinTitle: 'تسجيل الدخول',
    signinSubtitle: 'استخدم بريدك الإلكتروني أو رقم الهاتف للمتابعة.',
    signinFieldLabel: 'البريد الإلكتروني أو رقم الهاتف',
    signinPlaceholder: 'البريد الإلكتروني أو رقم الهاتف',
    signinSubmit: 'متابعة',
    signinError: 'يرجى إدخال بريد إلكتروني أو رقم هاتف صحيح.',
    signinSuccess: 'تم تسجيل الدخول بنجاح.',

    /* لوحة المطور */
    developerTitle: 'تسجيلات المطور',
    developerClear: 'مسح',

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
    projectTag: 'أول مشروع',
    projectName: 'موقع الملف الشخصي',
    projectDescription: 'موقع شخصي حديث بتصميم متجاوب، إمكانية تبديل اللغة، وقسم عرض الشهادات.',
    viewProject: 'عرض المشروع',
    githubProject: 'جيت هاب',
    changeProject: 'تغيير المشروع',

    /* التواصل */
    contactKicker: 'دعنا نتواصل',
    contactTitle: 'هل تحتاج إلى مشروع أو تعاون أو مجرد دردشة سريعة؟',
    contactButton: 'تواصل معي',

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
    aiError: 'تعذر الاتصال بالمساعد، تحقق من اتصال الإنترنت وحاول تاني.',
    aiOffline: 'المساعد غير متاح حاليًا.',

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
    signin: 'Sign In',
    search: 'Search...',
    experienceNav: 'Experience',
    skillsNav: 'Skills',
    summaryNav: 'Summary',
    socialsTitle: 'Social Links',
    socialsSubtitle: 'Find me on these platforms — always happy to connect.',

    /* Sign In modal */
    signinTitle: 'Sign In',
    signinSubtitle: 'Use your email or phone number to continue.',
    signinFieldLabel: 'Email or phone number',
    signinPlaceholder: 'Email or phone number',
    signinSubmit: 'Continue',
    signinError: 'Please enter a valid email or phone number.',
    signinSuccess: 'You have signed in successfully.',

    /* Developer panel */
    developerTitle: 'Developer Registrations',
    developerClear: 'Clear',

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
    projectTag: 'First Project',
    projectName: 'Portfolio Website',
    projectDescription: 'A modern personal portfolio with a responsive interface, language switcher, and certificate display section.',
    viewProject: 'View Project',
    githubProject: 'GitHub',
    changeProject: 'Change Project',

    /* Contact */
    contactKicker: "Let's Connect",
    contactTitle: 'Need a project, collaboration, or just a quick chat?',
    contactButton: 'Contact Me',

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
    aiError: 'Could not reach the assistant. Check your connection and try again.',
    aiOffline: 'The assistant is unavailable right now.',

    /* Settings */
    primaryMode: 'Primary Mode',
    whiteMode: 'White Mode'
  }
};

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
  /* --- المشروع الأول: موقع الملف الشخصي --- */
  {
    tag: { ar: 'الأول', en: 'First' },
    name: { ar: 'موقع الملف الشخصي', en: 'Portfolio Website' },
    description: {
      ar: 'موقع شخصي حديث بتصميم متجاوب، إمكانية تبديل اللغة، وقسم عرض الشهادات.',
      en: 'A modern personal portfolio with a responsive interface, language switcher, and certificate display section.'
    },
    primaryText: { ar: 'عرض المشروع', en: 'View Project' },
    primaryLink: 'index.html',
    secondaryText: { ar: 'جيت هاب', en: 'GitHub' },
    secondaryLink: 'https://github.com/',
    previewImage: 'img/Screenshot 2026-09-25 123513.png'
  },

  /* --- المشروع الثاني: تافرا (متجر أزياء) --- */
  {
    tag: { ar: 'الثاني', en: 'Second' },
    name: { ar: 'تافرا - متجر أزياء', en: 'TAFRA - Fashion Store' },
    description: {
      ar: 'متجر أزياء إلكتروني بهوية بصرية فاخرة، يعرض تشكيلة تافرا مع تصميم عصري ومتجاوب.',
      en: 'An e-commerce fashion store with a luxury visual identity, showcasing the TAFRA collection with a modern, responsive design.'
    },
    primaryText: { ar: 'عرض المشروع', en: 'View Project' },
    primaryLink: 'https://portfolio-moataz.vercel.app/12.tafra/',
    secondaryText: { ar: 'جيت هاب', en: 'GitHub' },
    secondaryLink: 'https://github.com/mtzm2225-ship-it/12.tafra',
    previewImage: 'img/Screenshot 2026-09-16 164001.png'
  },

  /* --- مشروع سيتم إضافته لاحقًا --- */
  {
    tag: { ar: 'قريبًا', en: 'Coming Soon' },
    name: { ar: 'قريبًا', en: 'Coming Soon' },
    description: {
      ar: 'سيتم إضافة هذا المشروع قريبًا.',
      en: 'This project will be added soon.'
    },
    primaryText: { ar: 'قريبًا', en: 'Coming Soon' },
    primaryLink: '#portfolio',
    secondaryText: { ar: 'قريبًا', en: 'Coming Soon' },
    secondaryLink: '#portfolio'
  }
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
const navLinks = document.querySelectorAll('.nav-links a');
const langButtons = document.querySelectorAll('.lang-btn');
const nightModeButton = document.querySelector('.night-mode-btn');

/* --- البحث --- */
const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.search-btn');

/* --- تسجيل الدخول --- */
const signInButton = document.querySelector('.signin-btn');
const signInModal = document.querySelector('#signin-modal');
const signInForm = document.querySelector('#signin-form');
const signInInput = document.querySelector('#signin-identifier');
const signInMessage = document.querySelector('#signin-message');
const signInClose = document.querySelector('.signin-close');

/* --- لوحة المطور --- */
const developerToggle = document.querySelector('#developer-toggle');
const developerPanel = document.querySelector('#developer-panel');
const developerList = document.querySelector('#developer-list');
const developerClose = document.querySelector('.developer-close');
const developerClear = document.querySelector('.developer-clear');

/* --- عناصر الترجمة --- */
const i18nElements = document.querySelectorAll('[data-i18n]');
const i18nPlaceholders = document.querySelectorAll('[data-i18n-placeholder]');

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

/**
 * التحقق من صحة البريد الإلكتروني
 * @param {string} value - القيمة المدخلة
 * @returns {boolean} صحيح أم لا
 */
function isValidEmail(value) {
    if (!value || typeof value !== 'string') return false;
    
    // تعبير نمطي بسيط ومباشر بدون التراجع العكسي (Non-backtracking Regex)
    const emailRegex = /^[\w.-]+@[\w.-]+\.\w+$/;
    return emailRegex.test(value.trim());
}

/**س
 * التحقق من صحة رقم الهاتف
 * (من 10 إلى 15 رقم، ولا يكون كل الأرقام متشابهة)
 * @param {string} value - القيمة المدخلة
 * @returns {boolean} صحيح أم لا
 */
function isValidPhoneNumber(value) {
  const normalized = value.replace(/[\s\-+()]/g, '');

  /* لازم يكون أرقام فقط */
  if (!/^\d+$/.test(normalized)) {
    return false;
  }

  /* الطول المسموح به */
  if (normalized.length < 10 || normalized.length > 15) {
    return false;
  }

  /* رفض الأرقام المتكررة زي 1111 */
  if (/^(\d)\1+$/.test(normalized)) {
    return false;
  }

  return true;
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

/* زر "تغيير المشروع" — بينقل للمشروع اللي بعده */
if (projectChangeButton) {
  projectChangeButton.addEventListener('click', function () {
    currentProjectIndex = (currentProjectIndex + 1) % projectData.length;
    updateProjectCard();
  });
}

/* أسهم التنقل بين المشاريع (السابق / التالي) */
if (projectPrevButton && projectNextButton) {
  projectPrevButton.addEventListener('click', function () {
    currentProjectIndex = (currentProjectIndex - 1 + projectData.length) % projectData.length;
    updateProjectCard();
  });

  projectNextButton.addEventListener('click', function () {
    currentProjectIndex = (currentProjectIndex + 1) % projectData.length;
    updateProjectCard();
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

  /* تحديد زر اللغة النشط */
  langButtons.forEach(function (button) {
    button.classList.toggle('active', button.dataset.lang === language);
  });

  /* نحفظ اللغة الأول عشان updateProjectCard تقراها صح */
  localStorage.setItem('portfolioLanguage', language);

  /* تحديث كارت المشروع + لغة الصفحة + نص زر الوضع */
  updateProjectCard(language);
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
   10) تسجيل الدخول (Sign In Modal)
   ----------------------------------------------------------------------------
   نافذة منبثقة بتفتح بالضغط على زر "تسجيل الدخول" في الهيدر.

   ⚠️ مهم توضيح: ده تسجيل دخول محلي بالكامل (Front-end only).
      مفيش أي سيرفر التقاء أو قاعدة بيانات — المدخلات بتتحفظ في
      localStorage على جهاز الزائر بس.
      الغرض منه عرض تسجيلات المطور في لوحة المطور (قسم 11)،
      مش مصادقة حقيقية.

   طرق غلق النافذة:
     • زر × في الكورنر
     • الضغط على أي مكان فاضي ورا النافذة (الخلفية المعتمة)
     • الضغط على مفتاح Escape
   ============================================================================ */

/** فتح نافذة تسجيل الدخول */
function openSignInModal() {
  if (!signInModal) {
    return;
  }

  signInModal.classList.remove('hidden');
  signInModal.setAttribute('aria-hidden', 'false');

  /* نركّز على خانة الإدخال بعد ظهور النافذة */
  if (signInInput) {
    setTimeout(function () {
      signInInput.focus();
    }, 50);
  }
}

/** إغلاق نافذة تسجيل الدخول */
function closeSignInModal() {
  if (!signInModal) {
    return;
  }

  signInModal.classList.add('hidden');
  signInModal.setAttribute('aria-hidden', 'true');
}

if (signInButton) {
  signInButton.addEventListener('click', openSignInModal);
}

if (signInClose) {
  signInClose.addEventListener('click', closeSignInModal);
}

/* الإغلاق بالضغط على الخلفية المعتمة */
if (signInModal) {
  signInModal.addEventListener('click', function (event) {
    if (event.target === signInModal) {
      closeSignInModal();
    }
  });
}

/* ============================================================================
   11) تسجيلات المطور (Developer Registrations)
   ----------------------------------------------------------------------------
   لوحة سرية بتعرض كل اللي سجّلوا دخول على الموقع من على الجهاز ده.

   كيف بتفتح؟
     • مفتاح اختصار: Ctrl + Shift + R
     • أو بكتابة الكود السري في نافذة تسجيل الدخول (شوف قسم 12)
     • زر يختبئ في الصفحة (لو موجود #developer-toggle)

   البيانات بتتقرا من localStorage — كل تسجيل بيتخزن ككائن فيه
   البيانات والوقت.

   فيه كمان زر "مسح" بيفضّي القايمة خالص بعد تأكيد من المطوّر.

   ملاحظة أمنية: اللوحة دي للعرض بس على جهاز المطوّر وتجربة العميل —
   مفيش أي بيانات حقيقية متجمّعة من أي سيرفر.
   ============================================================================ */

/**
 * قراءة التسجيلات المحفوظة من المتصفح
 * @returns {Array} مصفوفة التسجيلات
 */
function getRegistrations() {
  try {
    const saved = localStorage.getItem('portfolioRegistrations');
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    /* لو البيانات محفوظة بشكل غلط نرجّع مصفوفة فاضية بدل ما الكود يقع */
    return [];
  }
}

/**
 * حفظ التسجيلات في المتصفح
 * @param {Array} registrations - مصفوفة التسجيلات
 */
function saveRegistrations(registrations) {
  localStorage.setItem('portfolioRegistrations', JSON.stringify(registrations));
}

/** عرض كل التسجيلات داخل لوحة المطور */
function renderDeveloperRegistrations() {
  if (!developerList) {
    return;
  }

  const registrations = getRegistrations();
  developerList.innerHTML = '';

  /* لو مفيش تسجيلات نعرض رسالة */
  if (!registrations.length) {
    const emptyItem = document.createElement('li');
    emptyItem.textContent = 'No registrations yet.';
    emptyItem.className = 'developer-empty';
    developerList.appendChild(emptyItem);
    return;
  }

  registrations.forEach(function (entry, index) {
    const item = document.createElement('li');
    item.className = 'developer-item';

    const label = document.createElement('span');
    label.textContent = '#' + (index + 1) + ' - ' + entry.identifier;

    /* بنحدد نوع رابط التواصل حسب المدخل (إيميل ولا رقم واتساب) */
    let actionLink = null;
    const trimmedIdentifier = (entry.identifier || '').trim();

    if (isValidEmail(trimmedIdentifier)) {
      actionLink = document.createElement('a');
      actionLink.href = 'mailto:' + trimmedIdentifier;
      actionLink.textContent = 'Email';
      actionLink.target = '_blank';
      actionLink.rel = 'noopener noreferrer';
      actionLink.className = 'developer-action';
    } else {
      const normalizedPhone = trimmedIdentifier.replace(/[^\d]/g, '');

      if (normalizedPhone.length >= 10 && normalizedPhone.length <= 15 && !/^(\d)\1+$/.test(normalizedPhone)) {
        actionLink = document.createElement('a');
        actionLink.href = 'https://wa.me/' + normalizedPhone;
        actionLink.textContent = 'WhatsApp';
        actionLink.target = '_blank';
        actionLink.rel = 'noopener noreferrer';
        actionLink.className = 'developer-action';
      }
    }

    item.appendChild(label);

    if (actionLink) {
      item.appendChild(actionLink);
    }

    developerList.appendChild(item);
  });
}

/** فتح لوحة المطور وعرض التسجيلات */
function openDeveloperPanel() {
  if (developerToggle) {
    developerToggle.classList.remove('hidden');
  }

  if (!developerPanel) {
    return;
  }

  developerPanel.classList.remove('hidden');
  developerPanel.setAttribute('aria-hidden', 'false');
  renderDeveloperRegistrations();
}

/** إغلاق لوحة المطور */
function closeDeveloperPanel() {
  if (!developerPanel) {
    return;
  }

  developerPanel.classList.add('hidden');
  developerPanel.setAttribute('aria-hidden', 'true');
}

if (developerToggle) {
  developerToggle.addEventListener('click', openDeveloperPanel);
}

if (developerClose) {
  developerClose.addEventListener('click', closeDeveloperPanel);
}

/* زر مسح كل التسجيلات */
if (developerClear) {
  developerClear.addEventListener('click', function () {
    saveRegistrations([]);
    renderDeveloperRegistrations();
  });
}

/* الإغلاق بالضغط على الخلفية المعتمة */
if (developerPanel) {
  developerPanel.addEventListener('click', function (event) {
    if (event.target === developerPanel) {
      closeDeveloperPanel();
    }
  });
}

/* اختصار لوحة المطور: Ctrl + Shift + R */
document.addEventListener('keydown', function (event) {
  const isDeveloperShortcut = (event.ctrlKey || event.metaKey) &&
    event.shiftKey &&
    event.key.toLowerCase() === 'r';

  if (isDeveloperShortcut) {
    event.preventDefault();
    openDeveloperPanel();
  }
});

/* ============================================================================
   12) إرسال نموذج تسجيل الدخول (Sign In Submit)
   ----------------------------------------------------------------------------
   بيتعامل مع ثلاث احتمالات للمدخل اللي الزائر كتبه:

     1) كود المطور السري  → يفتح لوحة المطور (قسم 11) ويقفل النافذة
     2) إيميل صحيح        → نسجّله ونجاح
     3) رقم موبايل صحيح   → نسجّله ونجاح
   التحقق من الرقم: 10 لـ 15 رقم بعد ما نشيل الرموز (+, مسافات، -، ()).
   بنرفض كمان الأرقام المتكررة زي 1111 أو 0000 (مش أرقام حقيقية).

   الرسائل بتظهر تحت النموذج:
     • رسالة خطأ حمرا لو المدخل غلط
     • رسالة نجاح خضرا لو تمام
   بعد أي محاولة ناجحة بنفضّي الحقل ونقفل النافذة بعد فترة قصيرة.
   ============================================================================ */
if (signInForm && signInInput && signInMessage) {
  signInForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const identifier = signInInput.value.trim();
    const dictionary = getDictionary(getCurrentLanguage());

    /* كود المطور السري: بيفتح لوحة التسجيلات بدل تسجيل الدخول العادي */
    if (identifier === '23121975') {
      signInInput.value = '';
      closeSignInModal();
      openDeveloperPanel();
      return;
    }

    const isValidIdentifier = isValidEmail(identifier) || isValidPhoneNumber(identifier);

    /* لو المدخل غير صالح نعرض رسالة خطأ */
    if (!identifier || !isValidIdentifier) {
      signInMessage.textContent = dictionary.signinError;
      signInMessage.style.color = '#fca5a5';
      return;
    }

    /* نحفظ التسجيل الجديد (بحد أقصى 50 تسجيل) */
    const registrations = getRegistrations();
    registrations.unshift({ identifier: identifier, createdAt: new Date().toISOString() });
    saveRegistrations(registrations.slice(0, 10000));

    localStorage.setItem('portfolioUser', identifier);
    signInMessage.textContent = dictionary.signinSuccess;
    signInMessage.style.color = '#86efac';
    signInInput.value = '';

    /* نقفل النافذة بعد ثانية وربع */
    setTimeout(function () {
      closeSignInModal();
      signInMessage.textContent = '';
    }, 1200);
  });
}

/* ============================================================================
   13) شريط التنقل وسلايدر الشهادات (Navigation & Certificates Slider)
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
   14) شاشة التحميل (Preloader) + شاشة الاسم اللامع (Name Intro)
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
const NAME_INTRO_AUTO_HIDE = 2200;    /* اختفاء تلقائي لو الزائر ما داسش */
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
   15) التشغيل الأولي (Init)
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
   15.0) ظهور المحتوى عند النزول (Scroll Reveal)
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
   15.1) (تمت إزالة تفاعل توهج الماوس مع الخلفية)
   الصفحة مافيهاش أي عنصر عائم أو توهج بيتبع الماوس — أسرع وأنضف.
   ============================================================================ */
/* ============================================================================
   15.2) الخلفية التفاعلية «الخيالية البرمجية» (Living Background)
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
   16) مساعد الذكاء الاصطناعي (AI Assistant / Chat)
   ----------------------------------------------------------------------------
   فيه حاجتين هنا:
     1) الزر العائم (.ai-fab) اللي بيفتح ويقفل لوحة الشات (#aiPanel)
     2) إرسال السؤال للـ Cloudflare Worker (الملف worker.js في نفس المجلد)
        والـ Worker هو اللي بيمسك مفتاح الـ AI وبيكلم Gemini.
        السبب: لو المفتاح اتحط هنا في script.js هيبقى مكشوف لأي زائر.

   الـ Worker لازم يرجّع JSON بالشكل:  { "reply": "..." }  أو  { "error": "..." }
   ============================================================================ */

/* رابط الـ Worker (نفس الـ Worker المفروض يكون منشور من ملف worker.js) */
const AI_WORKER_URL = 'https://restless-frog-eb20.mtzm2225.workers.dev';

/* أقصى مدة نستنى فيها رد السيرفر (40 ثانية) */
const AI_REQUEST_TIMEOUT = 40000;

/* أقصى عدد رسائل نحتفظ بيها كسياق عشان المساعد يفتكر المحادثة */
const AI_MAX_HISTORY = 6;

/* تاريخ المحادثة — بيتبعت مع كل سؤال */
const aiConversationHistory = [];

/* --- مراجع عناصر واجهة المساعد --- */
const aiInput = document.getElementById('userInput');
const aiResponse = document.getElementById('aiResponse');
const aiSendButton = document.getElementById('aiSendButton');
const aiToggle = document.getElementById('aiToggle');
const aiPanel = document.getElementById('aiPanel');
const aiCloseButton = document.querySelector('.ai-close');

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

/** التحقق إن الرد جاي من الـ Worker بالشكل المتفق عليه */
function isAiPayload(data) {
  return data && typeof data === 'object' && typeof data.reply === 'string' && data.reply.trim();
}

/**
 * إرسال سؤال للـ Worker وإرجاع الإجابة
 * @param {string} userMessage - سؤال المستخدم
 * @returns {Promise<string>} إجابة الذكاء الاصطناعي
 */
async function askAI(userMessage) {
  const dictionary = getDictionary(getCurrentLanguage());

  /* لو الجهاز مش متصل بالنت من الأساس مش محتاجين نستنى */
  if (navigator.onLine === false) {
    return dictionary.aiError;
  }

  /* مؤقت لإلغاء الطلب لو أخد وقت طويل */
  const controller = new AbortController();
  const timeoutId = setTimeout(function () {
    controller.abort();
  }, AI_REQUEST_TIMEOUT);

  try {
    const response = await fetch(AI_WORKER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: userMessage,
        history: aiConversationHistory.slice(-AI_MAX_HISTORY)
      }),
      signal: controller.signal
    });

    /* بنقرا JSON حتى مع ردود الأخطاء عشان الـ Worker بيرجّع { error: "..." } */
    let data = null;
    try {
      data = await response.json();
    } catch (parseError) {
      data = null;
    }

    if (response.ok && isAiPayload(data)) {
      return data.reply.trim();
    }

    /* رسالة الخطأ الآتية من السيرفر */
    if (data && typeof data.error === 'string' && data.error.trim()) {
      return data.error.trim();
    }

    return dictionary.aiOffline;
  } catch (error) {
    console.error('[AI] فشل الاتصال بالـ Worker:', error);
    return dictionary.aiError;
  } finally {
    clearTimeout(timeoutId);
  }
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

  /* نحفظ سؤال المستخدم في تاريخ المحادثة قبل ما نبعته */
  aiConversationHistory.push({ role: 'user', content: userText });

  const aiReply = await askAI(userText);

  /* لو رجع أي رسالة خطأ معروفة نعتبرها خطأ */
  const isError = aiReply === dictionary.aiError || aiReply === dictionary.aiOffline;

  /* نحفظ رد المساعد لو كان رد حقي */
  if (!isError) {
    aiConversationHistory.push({ role: 'assistant', content: aiReply });

    /* نقلّم التاريخ لو كبر عن الحد */
    if (aiConversationHistory.length > AI_MAX_HISTORY) {
      aiConversationHistory.splice(0, aiConversationHistory.length - AI_MAX_HISTORY);
    }
  }

  showAiReply(aiReply, isError);
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
   17) زر مواقع التواصل + نافذتها (Social Links Popup)
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
   18) رمز QR (QR Code)
   ----------------------------------------------------------------------------
   ملاحظة: الكود الفعلي للـ QR وال��شاركة نزل في القسم 19 فوق
   (initShareCard). القسم ده محجوز كمرجع للمكتبة المستخدمة.
   ============================================================================ */
/* ============================================================================
   19) كارت المشاركة ورمز QR
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
   20) روبوت الهيرو — بيتابع الماوس بعينيه وراسه
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
   21) روبوت الهيرو — فقاعة الترحيب (الضغط عليها)
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
