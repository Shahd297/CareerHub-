
import React from 'react';
import { User, Specialization } from '../types';
import { FolderKanban, Users, User as UserIcon, Lock, CheckCircle2, Star, Sparkles } from 'lucide-react';

interface ProjectsProps {
  user: User;
}

const Projects: React.FC<ProjectsProps> = ({ user }) => {
  const isAr = user.language === 'ar';

  return (
    <div className="space-y-12 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-indigo-900 flex items-center gap-3">
            <FolderKanban className="w-8 h-8" />
            {isAr ? 'المشاريع العملية' : 'Practical Projects'}
          </h1>
          <p className="text-slate-500 mt-2">
            {isAr ? 'طبق مهاراتك من خلال مشاريع فردية وجماعية تحاكي بيئة العمل.' : 'Apply your skills through individual and group projects.'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Individual Projects Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
              <UserIcon className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">{isAr ? 'المشاريع الفردية' : 'Individual Projects'}</h2>
          </div>

          <div className="space-y-4">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group">
               <div className="flex justify-between items-start mb-4">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">{isAr ? 'متاح الآن' : 'Available'}</span>
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
               </div>
               <h3 className="font-bold text-lg mb-2">{isAr ? 'مشروع بناء الخطة الاستراتيجية' : 'Strategic Plan Project'}</h3>
               <p className="text-sm text-slate-500 leading-relaxed mb-6">
                 {isAr ? 'قم ببناء خطة كاملة لمشروعك بناءً على ما تعلمته في محاضرات التأسيس.' : 'Build a full plan for your project based on foundation lectures.'}
               </p>
               <button className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all">
                 {isAr ? 'ابدأ المشروع' : 'Start Project'}
               </button>
            </div>

            <div className="bg-slate-100 p-6 rounded-3xl border border-dashed border-slate-300 opacity-60">
               <div className="flex justify-between items-start mb-4">
                  <span className="bg-slate-200 text-slate-500 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    {isAr ? 'مغلق' : 'Locked'}
                  </span>
               </div>
               <h3 className="font-bold text-lg mb-2 text-slate-600">{isAr ? 'مشروع التحليل المالي المتقدم' : 'Advanced Finance Project'}</h3>
               <p className="text-sm text-slate-400">{isAr ? 'يفتح في المستوى الثاني.' : 'Unlocks at Level 2.'}</p>
            </div>
          </div>
        </section>

        {/* Group Projects Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">{isAr ? 'المشاريع الجماعية' : 'Group Projects'}</h2>
          </div>

          <div className="bg-indigo-900 p-8 rounded-[2.5rem] text-white space-y-6 relative overflow-hidden">
             <div className="relative z-10">
               <div className="flex items-center gap-2 mb-4">
                 <Sparkles className="w-5 h-5 text-indigo-400" />
                 <span className="text-sm font-bold text-indigo-300 uppercase tracking-wider">{isAr ? 'تجربة المحاكاة الكبرى' : 'Mega Simulation'}</span>
               </div>
               <h3 className="text-2xl font-bold mb-4">{isAr ? 'تحدي الشركات الناشئة' : 'Startup Challenge'}</h3>
               <p className="text-indigo-100 text-sm leading-relaxed mb-8 opacity-80">
                 {isAr 
                   ? 'انضم إلى فريق من 5 طلاب من تخصصات مختلفة (محاسبة، تسويق، إدارة) لإنشاء نموذج عمل حقيقي.' 
                   : 'Join a team of 5 students from different tracks (Accounting, Marketing, Management) to create a real business model.'}
               </p>
               
               <div className="flex -space-x-3 rtl:space-x-reverse mb-8">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-indigo-800 bg-indigo-700 flex items-center justify-center overflow-hidden">
                       <img src={`https://picsum.photos/seed/p${i}/40/40`} alt="Member" />
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-indigo-800 bg-indigo-600 flex items-center justify-center text-[10px] font-bold">
                    +12
                  </div>
               </div>

               <div className="bg-white/10 p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
                  <p className="text-xs text-indigo-200 mb-2">{isAr ? 'متطلب الدخول:' : 'Entry Requirement:'}</p>
                  <div className="flex items-center gap-2 text-sm font-bold">
                     <CheckCircle2 className="w-4 h-4 text-green-400" />
                     {isAr ? 'إتمام 10 مهام يومية بنسبة نجاح 80%' : 'Finish 10 daily tasks with 80% success'}
                  </div>
               </div>
             </div>
             <Users className="absolute -bottom-10 -right-10 w-48 h-48 text-white/5 -rotate-12" />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Projects;
