
import React from 'react';
// Fixed: Removed PortfolioItem which is not exported from types
import { User, Specialization, Language } from '../types';
import { Briefcase, Award, CheckCircle, Download, FileText, Share2, User as UserIcon, Sparkles } from 'lucide-react';
import { SPECIALIZATIONS } from '../constants';

interface PortfolioProps {
  user: User;
}

const Portfolio: React.FC<PortfolioProps> = ({ user }) => {
  const spec = SPECIALIZATIONS.find(s => s.id === user.selectedSpecialization);
  const isAr = user.language === 'ar';

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20">
      {/* Portfolio Header */}
      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col md:flex-row gap-8 items-center">
        <div className="w-32 h-32 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 shrink-0 border-4 border-white shadow-lg">
          {/* Use UserIcon to avoid collision with User type */}
          <UserIcon className="w-16 h-16" />
        </div>
        <div className="flex-1 text-center md:text-right space-y-3">
          <h1 className="text-3xl font-bold">{user.name}</h1>
          <div className="flex flex-wrap justify-center md:justify-start gap-3">
            {/* Fix: Access multilingual title property of spec object */}
            <span className="bg-indigo-600 text-white px-4 py-1.5 rounded-full text-sm font-bold">
              {isAr ? spec?.title.ar : spec?.title.en}
            </span>
            <span className="bg-slate-100 text-slate-700 px-4 py-1.5 rounded-full text-sm font-bold">
              {isAr ? `المستوى ${user.level}` : `Level ${user.level}`}
            </span>
          </div>
          <p className="text-slate-500 max-w-2xl">بورتفوليو مهني يحتوي على جميع المهام والمشاريع المنجزة خلال فترة التدريب في منصة مسار.</p>
        </div>
        <div className="flex gap-2">
           <button className="p-3 rounded-xl bg-slate-50 border hover:bg-slate-100 text-slate-600"><Download className="w-5 h-5" /></button>
           <button className="p-3 rounded-xl bg-slate-50 border hover:bg-slate-100 text-slate-600"><Share2 className="w-5 h-5" /></button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Progress Stats */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-indigo-900 text-white p-6 rounded-3xl shadow-xl space-y-6">
            <h3 className="font-bold text-lg border-b border-white/10 pb-4">مؤشرات الأداء</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>إتمام المهام</span>
                  <span>{Math.round((user.completedTasks.length / 30) * 100)}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-400" style={{ width: `${(user.completedTasks.length / 30) * 100}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>المشاريع الجماعية</span>
                  <span>1 / 3</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-400" style={{ width: '33%' }}></div>
                </div>
              </div>
            </div>
            <div className="pt-4">
               <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/10">
                  <Award className="w-8 h-8 text-amber-400" />
                  <div>
                    <p className="text-xs opacity-70">أعلى إنجاز</p>
                    <p className="font-bold">توب 10 في {spec?.id === Specialization.ENTREPRENEURSHIP ? 'الابتكار' : 'الدقة'}</p>
                  </div>
               </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
             <h3 className="font-bold">الشركات الشريكة المتابعة</h3>
             <div className="flex -space-x-3 rtl:space-x-reverse justify-center">
               {[1,2,3,4].map(i => (
                 <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 overflow-hidden">
                    <img src={`https://picsum.photos/seed/company${i}/40/40`} alt="Company" />
                 </div>
               ))}
             </div>
             <p className="text-xs text-center text-slate-500">يطلع هؤلاء الشركاء على بورتفوليو الطلاب الأفضل أداءً.</p>
          </div>
        </div>

        {/* Portfolio Feed */}
        <div className="lg:col-span-2 space-y-6">
           <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Briefcase className="w-6 h-6 text-indigo-600" />
                سجل الأعمال (Portfolio)
              </h2>
           </div>

           {user.completedTasks.length === 0 ? (
             <div className="bg-white p-20 rounded-3xl border border-dashed border-slate-300 text-center space-y-4">
                <FileText className="w-16 h-16 text-slate-200 mx-auto" />
                <p className="text-slate-400">لم تنجز أي مهام بعد. ابدأ اليوم لبناء مستقبلك!</p>
             </div>
           ) : (
             <div className="space-y-4">
               {/* Fix: Correctly access the title property of each task object in the array */}
               {user.completedTasks.map((task, i) => (
                 <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex justify-between items-center group">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center">
                        <CheckCircle className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">{task.title}</h4>
                        <p className="text-xs text-slate-500">تم الإنجاز في المستوى {user.level}</p>
                      </div>
                   </div>
                   <button className="opacity-0 group-hover:opacity-100 transition-all text-indigo-600 font-bold text-sm">عرض العمل</button>
                 </div>
               ))}
             </div>
           )}

           <div className="bg-amber-50 p-6 rounded-3xl border border-amber-200">
             <h3 className="font-bold text-amber-900 mb-2 flex items-center gap-2">
               <Sparkles className="w-5 h-5" />
               ملاحظة المدرب
             </h3>
             <p className="text-sm text-amber-800 italic leading-relaxed">
               "لدى {user.name} دقة ملحوظة في تحليل السوق، أنصح بالتركيز أكثر على الجوانب التطبيقية للميزانية في المستوى القادم لزيادة فرصه في التدريب العملي."
             </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
