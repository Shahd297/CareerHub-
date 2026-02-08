
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Rocket, 
  Briefcase, 
  Search, 
  Target, 
  ClipboardCheck, 
  BookOpen, 
  Cpu, 
  Star,
  ChevronLeft
} from 'lucide-react';
import { User } from '../types';

interface LandingPageProps {
  user: User | null;
  onLogin: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ user, onLogin }) => {
  const navigate = useNavigate();
  const isAr = !user || user.language === 'ar';

  const steps = [
    {
      id: 1,
      icon: <Search className="w-8 h-8" />,
      title: isAr ? 'استكشف التخصصات' : 'Explore Tracks',
      desc: isAr ? 'تعرف على المجالات الأكثر طلباً والتي تناسب طموحاتك المهنية.' : 'Discover the most in-demand fields that match your professional ambitions.'
    },
    {
      id: 2,
      icon: <Target className="w-8 h-8" />,
      title: isAr ? 'اختر مسارك' : 'Choose Your Path',
      desc: isAr ? 'حدد المجال الذي تود احترافه لنبدأ معك رحلة التدريب العملي.' : 'Select the field you want to master to start your practical training journey.'
    },
    {
      id: 3,
      icon: <ClipboardCheck className="w-8 h-8" />,
      title: isAr ? 'تحديد المستوى' : 'Placement Test',
      desc: isAr ? 'اختبار ذكي يحدد نقطة انطلاقك بناءً على مهاراتك التي تمتلكها الآن.' : 'A smart test that determines your starting point based on the skills you have now.'
    },
    {
      id: 4,
      icon: <BookOpen className="w-8 h-8" />,
      title: isAr ? 'تعلم بالتطبيق' : 'Learning by Doing',
      desc: isAr ? 'نبتعد عن الجمود النظري؛ موديولاتنا تركز على الممارسة التي تخدم العمل.' : 'We avoid theoretical rigidity; our modules focus on practice that serves the job.'
    },
    {
      id: 5,
      icon: <Cpu className="w-8 h-8" />,
      title: isAr ? 'محاكاة الوظيفة' : 'Job Simulation',
      desc: isAr ? 'مارس مهاماً يومية حقيقية تماماً كما لو كنت موظفاً في شركة كبرى.' : 'Practice real daily tasks exactly as if you were an employee in a major company.'
    },
    {
      id: 6,
      icon: <Star className="w-8 h-8" />,
      title: isAr ? 'جاهزية التوظيف' : 'Job Readiness',
      desc: isAr ? 'ابنِ بورتفوليو قوياً يثبت خبرتك العملية ويجعلك الخيار الأول للموظفين.' : 'Build a strong portfolio that proves your practical experience and makes you the first choice.'
    }
  ];

  return (
    <div className="min-h-screen bg-white font-['Cairo']">
      {/* Hero Section */}
      <section className="relative py-32 px-6 bg-gradient-to-br from-indigo-950 via-indigo-900 to-indigo-950 text-white overflow-hidden flex flex-col items-center justify-center text-center">
        <div className="max-w-4xl mx-auto relative z-10 space-y-10">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 text-indigo-300 text-sm border border-white/10 backdrop-blur-sm mx-auto">
            <Rocket className="w-4 h-4" />
            <span className="font-bold tracking-wide">EduCareer - Learning by Doing</span>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight">
              EduCareer
            </h1>
            <p className="text-xl md:text-2xl font-medium text-indigo-400 italic">
              Experience work before you work
            </p>
          </div>

          <p className="text-2xl md:text-4xl text-indigo-100/95 leading-relaxed max-w-5xl mx-auto font-medium">
            {isAr 
              ? "في EduCareer مش بنشرحلك كلام نظري احنا بندربك ازاي تشتغل من قبل حتي ما تشتغل"
              : "At EduCareer, we don't just explain theoretical concepts; we train you on how to work before you even start working."}
          </p>
          
          <div className="flex flex-wrap gap-6 pt-8 justify-center">
            <button 
              onClick={() => navigate('/discover')}
              className="px-14 py-5 bg-white text-indigo-950 rounded-2xl font-bold text-xl hover:shadow-[0_0_50px_rgba(255,255,255,0.25)] hover:scale-105 transition-all flex items-center gap-3"
            >
              {isAr ? 'ابدأ تجربتك العملية' : 'Start Your Experience'}
              <ArrowLeft className={`w-6 h-6 ${isAr ? '' : 'rotate-180'}`} />
            </button>
            <button 
              onClick={user ? () => navigate('/dashboard') : onLogin}
              className="px-14 py-5 bg-indigo-500/10 text-white border border-indigo-400/30 rounded-2xl font-bold text-xl hover:bg-indigo-500/20 backdrop-blur-md transition-all"
            >
              {user 
                ? (isAr ? 'لوحة التحكم' : 'Go to Dashboard') 
                : (isAr ? 'سجل دخولك' : 'Login')}
            </button>
          </div>
        </div>
        
        {/* Background blobs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-30">
            <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-indigo-500 rounded-full blur-[140px] -mr-48 -mt-48"></div>
            <div className="absolute bottom-0 left-0 w-[700px] h-[600px] bg-blue-500 rounded-full blur-[140px] -ml-48 -mb-48"></div>
        </div>
      </section>

      {/* The Journey Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto" id="journey">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            {isAr ? 'كيف نحوّلك من طالب إلى محترف؟' : 'How we turn you into a pro?'}
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-xl font-medium">
            {isAr 
              ? 'رحلة تدريبية مكثفة تعتمد على الفعل لا القول، تضعك في قلب سوق العمل من اليوم الأول.' 
              : 'An intensive training journey based on action, placing you at the heart of the job market from day one.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-slate-100 -translate-y-1/2 z-0"></div>

          {steps.map((step, index) => (
            <div 
              key={step.id} 
              className="relative z-10 bg-white p-10 rounded-[3rem] border border-slate-100 hover:border-indigo-200 transition-all hover:shadow-[0_20px_60px_rgba(79,70,229,0.08)] group flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 rounded-[1.5rem] bg-indigo-50 text-indigo-600 flex items-center justify-center mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 shadow-sm relative">
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center text-sm font-black border-4 border-white">
                  {step.id}
                </div>
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">
                {step.title}
              </h3>
              <p className="text-slate-500 leading-relaxed font-medium">
                {step.desc}
              </p>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute -left-5 top-1/2 -translate-y-1/2 text-slate-200">
                  <ChevronLeft className="w-8 h-8" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
           <button 
             onClick={() => navigate('/discover')}
             className="px-16 py-6 bg-indigo-600 text-white rounded-[2rem] font-black text-2xl hover:bg-indigo-700 hover:scale-105 transition-all shadow-2xl shadow-indigo-200 flex items-center gap-4 mx-auto"
           >
             {isAr ? 'ابدأ خطوتك الأولى' : 'Start Your First Step'}
             <ArrowLeft className={`w-8 h-8 ${isAr ? '' : 'rotate-180'}`} />
           </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-white py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="space-y-6 text-center md:text-right">
            <div className="flex items-center gap-3 justify-center md:justify-start">
               <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                  <Briefcase className="w-6 h-6 text-white" />
               </div>
               <span className="text-3xl font-bold tracking-tight">EduCareer</span>
            </div>
            <p className="text-slate-400 max-w-xs font-medium leading-relaxed">
              منصة التدريب العملي الأولى التي تمكنك من ممارسة مهنتك قبل دخول سوق العمل.
            </p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-3">
            <div className="text-indigo-400 font-bold text-lg italic tracking-wide">Experience work before you work</div>
            <div className="flex gap-6 text-slate-500 text-sm font-bold">
               <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
               <a href="#" className="hover:text-white transition-colors">Twitter</a>
               <a href="#" className="hover:text-white transition-colors">Instagram</a>
            </div>
            <p className="text-slate-600 text-sm mt-4 font-medium">جميع الحقوق محفوظة © 2024 - EduCareer</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
