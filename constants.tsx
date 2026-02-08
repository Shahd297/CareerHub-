
import React from 'react';
import { 
  Calculator, 
  Megaphone, 
  Briefcase, 
  TrendingUp, 
  Rocket, 
  PieChart,
  Coins
} from 'lucide-react';
import { Specialization, SpecializationInfo } from './types';

const createRoadmap = (specId: Specialization) => {
  if (specId === Specialization.ENTREPRENEURSHIP) {
    return [
      { id: 1, title: 'المستوى الأول: التأسيس الشامل', modules: ['أساسيات المحاسبة لرواد الأعمال', 'مبادئ التسويق وبناء العلامة', 'التمويل الذاتي والاستثمار الأولي'] },
      { id: 2, title: 'المستوى الثاني: إدارة النمو', modules: ['إدارة العمليات والفرق', 'استراتيجيات التوسع في السوق', 'التحليل المالي المتقدم'] },
      { id: 3, title: 'المستوى الثالث: الاستدامة والخروج', modules: ['جولات الاستثمار VC', 'إدارة الشركات وحوكمتها', 'مشروع التخرج: إطلاق الشركة'] },
    ];
  }
  return [
    { id: 1, title: 'Level 1: Fundamentals', modules: ['Module 1: Introduction', 'Module 2: Core Concepts', 'Module 3: Practical Basics'] },
    { id: 2, title: 'Level 2: Intermediate', modules: ['Module 1: Advanced Tools', 'Module 2: Case Studies', 'Module 3: Industry Standards'] },
    { id: 3, title: 'Level 3: Expert', modules: ['Module 1: Professional Mastery', 'Module 2: Leadership', 'Module 3: Final Project'] },
  ];
};

export const getIconForSpec = (specId: Specialization) => {
  switch (specId) {
    case Specialization.ACCOUNTING: return <Calculator className="w-full h-full" />;
    case Specialization.DIGITAL_MARKETING: return <Megaphone className="w-full h-full" />;
    case Specialization.PROJECT_MANAGEMENT: return <Briefcase className="w-full h-full" />;
    case Specialization.BUSINESS_DEVELOPMENT: return <TrendingUp className="w-full h-full" />;
    case Specialization.ENTREPRENEURSHIP: return <Rocket className="w-full h-full" />;
    case Specialization.FINANCE: return <PieChart className="w-full h-full" />;
    case Specialization.INVESTMENT: return <Coins className="w-full h-full" />;
    default: return <Briefcase className="w-full h-full" />;
  }
};

export const SPECIALIZATIONS: SpecializationInfo[] = [
  {
    id: Specialization.ENTREPRENEURSHIP,
    title: { ar: 'ريادة الأعمال', en: 'Entrepreneurship' },
    description: { ar: 'برنامج شامل يغطي المحاسبة، التسويق، والتمويل لبناء شركات ناشئة قوية.', en: 'Comprehensive program covering accounting, marketing, and finance to build strong startups.' },
    responsibilities: { 
      ar: 'رائد الأعمال في CareerHub يتعلم كيف يكون المدير التنفيذي الشامل؛ يفهم الأرقام المحاسبية، يحلل الميزانيات، يضع خطط التسويق، ويدير الفرق. هذا التخصص مصمم ليجعلك قادراً على إدارة كل جوانب شركتك بفهم عميق للسوق.',
      en: 'The Entrepreneur at CareerHub learns to be a versatile CEO; understanding accounting numbers, analyzing budgets, setting marketing plans, and managing teams. This track is designed to make you capable of managing all aspects of your company with deep market understanding.'
    },
    demand2026: { ar: 'نمو هائل في قطاع الشركات الناشئة المبتكرة.', en: 'Massive growth in the innovative startup sector.' },
    careerPath: { ar: ['مؤسس شركة ناشئة', 'مدير تنفيذي (CEO)', 'مستشار تطوير أعمال'], en: ['Startup Founder', 'CEO', 'Business Development Consultant'] },
    skills: ['Business Model Canvas', 'Financial Planning', 'Growth Hacking', 'Leadership'],
    roadmap: createRoadmap(Specialization.ENTREPRENEURSHIP)
  },
  {
    id: Specialization.ACCOUNTING,
    title: { ar: 'المحاسبة', en: 'Accounting' },
    description: { ar: 'إتقان السجلات المالية والتحليل الضريبي.', en: 'Mastering financial records and tax analysis.' },
    responsibilities: { 
      ar: 'المحاسب هو قلب الشركة المالي؛ مسؤول عن تسجيل كل قرش يدخل أو يخرج، إعداد القوائم المالية، التأكد من سداد الضرائب في موعدها، ومساعدة الإدارة في اتخاذ قرارات بناءً على الأرقام الحقيقية.',
      en: 'The accountant is the financial heart; responsible for recording every penny, preparing financial statements, ensuring timely tax payments, and helping management make data-driven decisions.'
    },
    demand2026: { ar: 'نمو بنسبة 15% في التحول الرقمي المالي.', en: '15% growth in digital financial transformation.' },
    careerPath: { ar: ['محاسب قانوني', 'مدقق مالي'], en: ['Chartered Accountant', 'Financial Auditor'] },
    skills: ['ERP', 'Tax Laws', 'Excel'],
    roadmap: createRoadmap(Specialization.ACCOUNTING)
  },
  {
    id: Specialization.DIGITAL_MARKETING,
    title: { ar: 'التسويق الرقمي', en: 'Digital Marketing' },
    description: { ar: 'بناء الوعي بالعلامة التجارية وزيادة المبيعات.', en: 'Building brand awareness and increasing sales.' },
    responsibilities: { 
      ar: 'المسوق الرقمي هو صوت الشركة في العالم الافتراضي؛ يخطط للحملات الإعلانية، يدير منصات التواصل، يحلل سلوك العملاء لزيادة المبيعات، ويصمم استراتيجيات تجعل العلامة التجارية في المقدمة.',
      en: 'The digital marketer is the company\'s voice online; planning ad campaigns, managing social platforms, analyzing customer behavior to boost sales, and designing strategies for brand leadership.'
    },
    demand2026: { ar: 'نمو هائل بنسبة 25% مع الذكاء الاصطناعي.', en: '25% growth with AI integration.' },
    careerPath: { ar: ['خبير سيو', 'مدير محتوى'], en: ['SEO Expert', 'Content Manager'] },
    skills: ['SEO', 'Ads', 'Analytics'],
    roadmap: createRoadmap(Specialization.DIGITAL_MARKETING)
  },
  {
    id: Specialization.PROJECT_MANAGEMENT,
    title: { ar: 'إدارة المشاريع', en: 'Project Management' },
    description: { ar: 'قيادة الفرق وتسليم المشاريع في الوقت المحدد.', en: 'Leading teams and delivering projects on time.' },
    responsibilities: { 
      ar: 'مدير المشروع هو المايسترو؛ يربط بين جميع الأقسام لضمان تنفيذ المهام في وقتها وبأقل تكلفة، يدير المخاطر، ويحل المشكلات التي تواجه الفريق لضمان خروج المشروع للنور بنجاح.',
      en: 'The project manager is the maestro; connecting all departments to ensure tasks are done on time and within budget, managing risks, and solving team issues for successful project delivery.'
    },
    demand2026: { ar: 'زيادة الطلب على مديري المشاريع الرشيقة.', en: 'Increasing demand for Agile project managers.' },
    careerPath: { ar: ['مدير مشروع', 'منسق مشاريع'], en: ['Project Manager', 'Project Coordinator'] },
    skills: ['Agile', 'Scrum', 'Planning'],
    roadmap: createRoadmap(Specialization.PROJECT_MANAGEMENT)
  },
  {
    id: Specialization.BUSINESS_DEVELOPMENT,
    title: { ar: 'تطوير الأعمال', en: 'Business Development' },
    description: { ar: 'خلق قيمة طويلة الأجل للمؤسسة.', en: 'Creating long-term value for the organization.' },
    responsibilities: { 
      ar: 'مطور الأعمال هو صائد الفرص؛ يبحث عن شراكات جديدة، يحلل أسواقاً لم تدخلها الشركة بعد، ويبني علاقات قوية مع العملاء الكبار لضمان نمو الشركة المستقبلي وزيادة أرباحها.',
      en: 'The business developer is an opportunity hunter; seeking new partnerships, analyzing untapped markets, and building strong relations with key clients for future growth.'
    },
    demand2026: { ar: 'تركيز متزايد على الشراكات الاستراتيجية.', en: 'Increased focus on strategic partnerships.' },
    careerPath: { ar: ['مدير تطوير أعمال', 'محلل شراكات'], en: ['Business Development Manager', 'Partnerships Analyst'] },
    skills: ['Sales', 'Negotiation', 'Strategy'],
    roadmap: createRoadmap(Specialization.BUSINESS_DEVELOPMENT)
  },
  {
    id: Specialization.FINANCE,
    title: { ar: 'المالية', en: 'Finance' },
    description: { ar: 'إدارة الأصول وتحليل الاستثمارات المالية.', en: 'Managing assets and analyzing financial investments.' },
    responsibilities: { 
      ar: 'محلل المالية هو مهندس الثروة؛ يدرس التدفقات النقدية، يقيم الاستثمارات المقترحة، يتنبأ بالمخاطر المالية، ويضع خططاً تضمن استدامة السيولة ونمو قيمة الشركة في السوق.',
      en: 'The finance analyst is the wealth engineer; studying cash flows, evaluating investments, forecasting financial risks, and planning for liquidity and market value growth.'
    },
    demand2026: { ar: 'تحول كبير نحو التكنولوجيا المالية (FinTech).', en: 'Major shift towards Financial Technology (FinTech).' },
    careerPath: { ar: ['محلل مالي', 'مدير خزانة'], en: ['Financial Analyst', 'Treasury Manager'] },
    skills: ['Valuation', 'Forecasting', 'Risk Management'],
    roadmap: createRoadmap(Specialization.FINANCE)
  }
];
