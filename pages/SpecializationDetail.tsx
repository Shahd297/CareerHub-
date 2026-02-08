
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowRight, Target, Sparkles, Building, Rocket, TrendingUp, BookOpen, Clock, Users, ShieldCheck } from 'lucide-react';
import { SPECIALIZATIONS, getIconForSpec } from '../constants';
import { Specialization, Language } from '../types';

interface SpecializationDetailProps {
  onSelect: (specId: Specialization) => void;
  language: Language;
}

const SpecializationDetail: React.FC<SpecializationDetailProps> = ({ onSelect, language }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const spec = SPECIALIZATIONS.find(s => s.id === id);
  const isAr = language === 'ar';

  if (!spec) return <div className="p-20 text-center font-bold">{isAr ? 'التخصص غير موجود' : 'Track not found'}</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20 pt-8">
      <button 
        onClick={() => navigate('/discover')}
        className="flex items-center gap-2 text-indigo-600 font-bold hover:gap-3 transition-all"
      >
        <ArrowRight className={`w-5 h-5 ${isAr ? '' : 'rotate-180'}`} />
        {isAr ? 'العودة لجميع التخصصات' : 'Back to all tracks'}
      </button>

      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row items-center gap-12 bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="w-32 h-32 rounded-3xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border-4 border-white shadow-xl relative z-10">
          {getIconForSpec(spec.id)}
        </div>
        <div className="space-y-4 flex-1 text-center lg:text-right relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-4">
            <h1 className="text-4xl font-extrabold text-slate-900">{isAr ? spec.title.ar : spec.title.en}</h1>
            <span className="bg-green-100 text-green-700 text-xs px-4 py-1.5 rounded-full font-bold flex items-center gap-2 border border-green-200">
              <TrendingUp className="w-4 h-4" />
              {isAr ? 'طلب مرتفع في 2026' : 'High demand in 2026'}
            </span>
          </div>
          <p className="text-slate-600 leading-relaxed text-xl max-w-3xl">
            {isAr ? spec.description.ar : spec.description.en}
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full -mr-32 -mt-32 blur-3xl opacity-50"></div>
      </div>

      {/* New Section: Role in Company */}
      <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
        <div className="flex items-center gap-4 border-b border-slate-50 pb-6">
           <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
              <Building className="w-6 h-6" />
           </div>
           <div>
              <h2 className="text-2xl font-black text-slate-900">{isAr ? `ما هو دور متخصص الـ ${spec.title.ar} في الشركة؟` : `What is the role of a ${spec.title.en} specialist?`}</h2>
              <p className="text-slate-500 text-sm">{isAr ? 'فهم عميق للمسؤوليات اليومية والتأثير المؤسسي' : 'Deep understanding of daily responsibilities and impact'}</p>
           </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
           <div className="space-y-4">
              <p className="text-lg leading-loose text-slate-700 font-medium">
                {isAr ? spec.responsibilities.ar : spec.responsibilities.en}
              </p>
              <div className="flex gap-4 pt-4">
                 <div className="flex-1 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <Users className="w-5 h-5 text-indigo-600 mb-2" />
                    <p className="text-xs font-bold text-slate-800">{isAr ? 'التعاون مع الفرق' : 'Team Collaboration'}</p>
                    <p className="text-[10px] text-slate-500 mt-1">{isAr ? 'يعمل مع كل الأقسام لضمان سلاسة العمل.' : 'Works with all departments.'}</p>
                 </div>
                 <div className="flex-1 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <ShieldCheck className="w-5 h-5 text-green-600 mb-2" />
                    <p className="text-xs font-bold text-slate-800">{isAr ? 'اتخاذ القرار' : 'Decision Making'}</p>
                    <p className="text-[10px] text-slate-500 mt-1">{isAr ? 'يوفر البيانات اللازمة لنمو المؤسسة.' : 'Provides data for growth.'}</p>
                 </div>
              </div>
           </div>
           <div className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden group">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Rocket className="w-6 h-6 text-indigo-400" />
                {isAr ? 'التأثير المباشر' : 'Direct Impact'}
              </h3>
              <ul className="space-y-4 relative z-10">
                 {[
                   isAr ? 'تحويل الخطط إلى واقع ملموس' : 'Turning plans into reality',
                   isAr ? 'زيادة كفاءة الموارد المتاحة' : 'Boosting resource efficiency',
                   isAr ? 'خلق قيمة مضافة للعملاء والمساهمين' : 'Creating value for stakeholders'
                 ].map((item, i) => (
                   <li key={i} className="flex items-center gap-3 text-sm font-medium">
                     <div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div>
                     {item}
                   </li>
                 ))}
              </ul>
              <Sparkles className="absolute bottom-4 right-4 w-24 h-24 text-white/5 group-hover:scale-110 transition-transform" />
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Market Analysis */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-indigo-900 text-white p-8 rounded-[2rem] shadow-xl relative overflow-hidden h-full">
            <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-indigo-400" />
              {isAr ? 'حالة السوق 2026' : 'Market Status 2026'}
            </h3>
            <p className="text-indigo-100 leading-relaxed text-sm">
              {isAr ? spec.demand2026.ar : spec.demand2026.en}
            </p>
            <div className="mt-6 pt-6 border-t border-white/10">
               <h4 className="font-bold text-indigo-400 mb-4">{isAr ? 'المسار الوظيفي' : 'Career Path'}</h4>
               <ul className="space-y-4">
                 {(isAr ? spec.careerPath.ar : spec.careerPath.en).map((path, i) => (
                   <li key={i} className="flex items-center gap-3 text-sm">
                     <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
                     {path}
                   </li>
                 ))}
               </ul>
            </div>
          </div>
        </div>

        {/* Roadmap */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
           <h3 className="font-bold text-2xl mb-8 flex items-center gap-3 text-indigo-900">
              <BookOpen className="w-7 h-7" />
              {isAr ? 'خارطة الطريق التعليمية' : 'Educational Roadmap'}
           </h3>
           
           <div className="space-y-12">
              {spec.roadmap.map((level) => (
                <div key={level.id} className="relative roadmap-step">
                  <div className="flex items-center gap-4 mb-6 relative z-10">
                    <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center font-bold shadow-lg">
                      {level.id}
                    </div>
                    <h4 className="text-xl font-bold text-indigo-900">{isAr ? `المستوى ${level.id}` : `Level ${level.id}`}</h4>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mr-0 md:mr-16 rtl:md:mr-16 ltr:md:ml-16">
                    {level.modules.map((moduleName, i) => (
                      <div key={i} className="bg-slate-50 p-5 rounded-2xl border border-slate-100 group hover:bg-white hover:border-indigo-300 transition-all hover:shadow-md">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 mb-3 group-hover:text-indigo-600 transition-colors shadow-sm">
                          <BookOpen className="w-5 h-5" />
                        </div>
                        <h5 className="font-bold text-sm mb-2">{moduleName}</h5>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <Clock className="w-3 h-3" />
                          {isAr ? 'مديول تعليمي' : 'Learning Module'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* Action CTA */}
      <div className="text-center space-y-6 bg-gradient-to-br from-indigo-600 to-indigo-800 p-12 rounded-[3rem] shadow-2xl relative overflow-hidden">
        <div className="relative z-10 space-y-4">
          <h2 className="text-3xl font-black text-white">
            {isAr ? `هل تخصص ${spec.title.ar} هو شغفك؟` : `Is ${spec.title.en} your passion?`}
          </h2>
          <p className="text-indigo-100 text-lg max-w-2xl mx-auto">
            {isAr ? 'سجل دخولك الآن وابدأ اختبار تحديد المستوى لتصل إلى الموديولات والمهام اليومية.' : 'Log in now and start the placement test to access modules and daily tasks.'}
          </p>
          <button 
            onClick={() => onSelect(spec.id)}
            className="mt-6 px-16 py-5 bg-white text-indigo-900 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-xl flex items-center gap-3 mx-auto group"
          >
            {isAr ? 'ابدأ اختبار تحديد المستوى' : 'Start Placement Test'}
            <Target className="w-6 h-6 group-hover:rotate-45 transition-transform" />
          </button>
        </div>
        <Rocket className="absolute -bottom-10 -right-10 w-60 h-60 text-white/10 -rotate-12" />
      </div>
    </div>
  );
};

export default SpecializationDetail;
