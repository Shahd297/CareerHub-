
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Rocket, GraduationCap, Building2, Trophy, Briefcase } from 'lucide-react';
import { SPECIALIZATIONS, getIconForSpec } from '../constants';

const LandingPage: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white font-['Cairo']">
      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
          <div className="flex-1 space-y-6 text-center md:text-right">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-indigo-100 text-sm border border-white/20">
              <Rocket className="w-4 h-4" />
              <span>CareerHub Platform</span>
            </div>
            
            <div className="space-y-2">
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter">
                CareerHub
              </h1>
              <p className="text-2xl md:text-3xl font-bold text-indigo-400 italic">
                Experience work before you work
              </p>
            </div>

            <p className="text-lg md:text-xl text-indigo-100 max-w-2xl leading-relaxed mx-auto md:mx-0">
              منصة توفر لك محاكاة كاملة لسوق العمل؛ اقرأ عن التخصصات، خض الاختبارات، واستلم مهامك اليومية والمشاريع لتكون جاهزاً تماماً للتوظيف في كبرى الشركات.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4 justify-center md:justify-start">
              <button 
                onClick={() => navigate('/discover')}
                className="px-8 py-4 bg-white text-indigo-900 rounded-2xl font-bold text-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2"
              >
                استكشف التخصصات
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={onLogin}
                className="px-8 py-4 bg-indigo-700/50 text-white border border-indigo-400/30 rounded-2xl font-bold text-lg hover:bg-indigo-700/70 transition-all"
              >
                ابدأ الآن
              </button>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="absolute inset-0 bg-indigo-500 blur-[120px] opacity-20 rounded-full"></div>
            <img 
              src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80" 
              alt="Professional Work Environment" 
              className="rounded-3xl shadow-2xl border-4 border-white/10 relative z-10 hover:scale-[1.02] transition-transform duration-500 object-cover aspect-video md:aspect-auto"
            />
          </div>
        </div>
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>
      </section>

      {/* Specializations Grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto" id="specs">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">تخصصاتنا المهنية</h2>
          <p className="text-slate-500 max-w-2xl mx-auto italic text-lg">نحن لا نعلمك فقط، نحن نجعلك تعمل فعلياً داخل بيئة محاكاة.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SPECIALIZATIONS.map((spec) => (
            <div 
              key={spec.id} 
              className="p-10 rounded-[2.5rem] border border-slate-100 hover:border-indigo-500 transition-all hover:shadow-2xl group bg-white relative overflow-hidden"
            >
              <div className="w-20 h-20 rounded-3xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                {getIconForSpec(spec.id)}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">{spec.title.ar}</h3>
              <p className="text-slate-600 leading-relaxed mb-8">
                {spec.description.ar}
              </p>
              <button 
                onClick={() => navigate(`/discover/${spec.id}`)}
                className="text-indigo-600 font-bold flex items-center gap-2 group-hover:gap-4 transition-all"
              >
                استكشف الدور الوظيفي
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-slate-50 rounded-full group-hover:bg-indigo-50 transition-colors"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="space-y-4 text-center md:text-right">
            <div className="flex items-center gap-3 justify-center md:justify-start">
               <Briefcase className="w-10 h-10 text-indigo-400" />
               <span className="text-3xl font-black tracking-tighter">CareerHub</span>
            </div>
            <p className="text-slate-400 max-w-xs">المنصة الأولى لتدريب الطلاب من خلال محاكاة حقيقية لبيئة العمل.</p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-2">
            <div className="text-indigo-400 font-black text-xl italic uppercase">Experience work before you work</div>
            <p className="text-slate-500 text-sm">جميع الحقوق محفوظة © 2024 - CareerHub</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
