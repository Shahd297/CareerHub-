
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Clock, Video, FileText, Sparkles, Send, BrainCircuit, Star, Compass, PlayCircle, BookOpen, GraduationCap } from 'lucide-react';
import { User } from '../types';
import { geminiService } from '../services/gemini';
import { SPECIALIZATIONS } from '../constants';

interface DashboardProps {
  user: User;
  onCompleteTask: (taskTitle: string, feedback: string, score: number) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onCompleteTask }) => {
  const [dailyTask, setDailyTask] = useState<any>(null);
  const [loadingTask, setLoadingTask] = useState(false);
  const [submission, setSubmission] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [feedback, setFeedback] = useState<any>(null);

  const isAr = user.language === 'ar';
  const specInfo = SPECIALIZATIONS.find(s => s.id === user.selectedSpecialization);

  useEffect(() => {
    if (user.selectedSpecialization) {
      loadDailyTask();
    }
  }, [user.selectedSpecialization, user.language]);

  const loadDailyTask = async () => {
    setLoadingTask(true);
    const task = await geminiService.generateDailyTask(user.selectedSpecialization!, user.level, user.language);
    setDailyTask(task);
    setLoadingTask(false);
  };

  const handleSumbit = async () => {
    if (!submission.trim()) return;
    setAnalyzing(true);
    const result = await geminiService.analyzeTaskSubmission(
      user.selectedSpecialization!, 
      dailyTask.title, 
      submission, 
      user.language
    );
    setFeedback(result);
    setAnalyzing(false);
  };

  const confirmCompletion = () => {
    onCompleteTask(dailyTask.title, feedback.feedback, feedback.score);
    setDailyTask(null);
    setFeedback(null);
    setSubmission('');
    loadDailyTask();
  };

  if (!user.selectedSpecialization) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-8 text-center px-6">
        <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 animate-bounce">
          <Compass className="w-12 h-12" />
        </div>
        <div className="space-y-4 max-w-md">
          <h2 className="text-3xl font-black text-indigo-900">
            {isAr ? 'ابدأ رحلتك باختيار تخصص' : 'Choose a track to start'}
          </h2>
          <p className="text-slate-500 text-lg">
            {isAr 
              ? 'لكي نتمكن من عرض الموديولات والمهام اليومية، يجب أولاً تحديد المجال الذي ترغب في الاحتراف به.' 
              : 'To show modules and daily tasks, you must first select the field you wish to master.'}
          </p>
        </div>
        <Link 
          to="/discover"
          className="px-12 py-4 bg-indigo-600 text-white rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-xl shadow-indigo-100 flex items-center gap-3"
        >
          {isAr ? 'اكتشف التخصصات' : 'Discover Tracks'}
          <Sparkles className="w-6 h-6" />
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Header Info */}
      <div className="bg-indigo-900 rounded-3xl p-8 text-white flex flex-col md:flex-row justify-between items-center gap-6 shadow-xl relative overflow-hidden">
        <div className="space-y-2 relative z-10">
          <div className="flex items-center gap-2 mb-2">
             <GraduationCap className="w-6 h-6 text-indigo-400" />
             <span className="text-sm font-bold uppercase tracking-widest text-indigo-300">{isAr ? 'رحلة تعلمك في EduCareer' : 'Your Learning Journey'}</span>
          </div>
          <h1 className="text-4xl font-black">
            {isAr ? specInfo?.title.ar : specInfo?.title.en}
          </h1>
          <p className="opacity-80 text-lg">
            {isAr ? 'أنت الآن في مرحلة المحاكاة العملية للمستوى' : 'You are now in the practical simulation for'} {user.level}
          </p>
        </div>
        <div className="flex gap-4 relative z-10">
          <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/20 text-center min-w-[120px]">
             <div className="text-[10px] uppercase font-bold opacity-60 mb-1">{isAr ? 'المستوى' : 'Level'}</div>
             <div className="text-3xl font-black">{user.level}</div>
          </div>
          <div className="bg-indigo-500/30 p-4 rounded-2xl backdrop-blur-md border border-white/10 text-center min-w-[120px]">
             <div className="text-[10px] uppercase font-bold opacity-60 mb-1">{isAr ? 'النقاط' : 'Score'}</div>
             <div className="text-3xl font-black">{user.assessmentScore || 0}</div>
          </div>
        </div>
        <Sparkles className="absolute -bottom-10 -right-10 w-60 h-60 text-white/5 rotate-12" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Modules (Lectures) */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
             <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                   <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                      <PlayCircle className="w-7 h-7" />
                   </div>
                   <div>
                      <h2 className="text-2xl font-black text-slate-900">{isAr ? 'الموديولات التعليمية' : 'Learning Modules'}</h2>
                      <p className="text-sm text-slate-500">{isAr ? 'محاضرات تأسيسية لبناء خبرتك' : 'Foundational lectures to build your expertise'}</p>
                   </div>
                </div>
                <span className="bg-slate-100 px-4 py-1.5 rounded-full text-xs font-bold text-slate-600">
                  {isAr ? 'المستوى الحالي' : 'Current Level'}: {user.level}
                </span>
             </div>

             <div className="grid grid-cols-1 gap-4">
                {specInfo?.roadmap.find(r => r.id === user.level)?.modules.map((mod, i) => (
                  <div key={i} className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100 group hover:border-indigo-300 hover:bg-white transition-all cursor-pointer shadow-sm hover:shadow-md">
                     <div className="flex items-center gap-5">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center font-black text-indigo-600 border border-slate-100 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                           {i + 1}
                        </div>
                        <div>
                           <h4 className="font-bold text-slate-900 text-lg">{mod}</h4>
                           <div className="flex items-center gap-2 mt-1">
                              <Clock className="w-3.5 h-3.5 text-slate-400" />
                              <span className="text-xs text-slate-500">{isAr ? '45 دقيقة من التعلم المكثف' : '45 mins intensive learning'}</span>
                           </div>
                        </div>
                     </div>
                     <PlayCircle className="w-8 h-8 text-slate-300 group-hover:text-indigo-600 transition-all" />
                  </div>
                ))}
             </div>
          </section>

          {/* Daily Task Simulation */}
          <section className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/10 text-indigo-400 rounded-2xl flex items-center justify-center border border-white/10">
                       <BrainCircuit className="w-7 h-7" />
                    </div>
                    <h2 className="text-2xl font-black">{isAr ? 'المهمة اليومية للمحاكاة' : 'Daily Simulation Task'}</h2>
                 </div>
                 {loadingTask && <div className="animate-spin text-white"><Sparkles className="w-5 h-5" /></div>}
              </div>

              {dailyTask && !feedback && (
                <div className="space-y-6">
                  <div className="bg-white/5 p-6 rounded-3xl border border-white/10 backdrop-blur-sm">
                    <h3 className="font-bold text-xl mb-2 text-indigo-300">{dailyTask.title}</h3>
                    <p className="text-slate-300 text-sm mb-4 leading-relaxed">{dailyTask.description}</p>
                    <div className="inline-flex items-center gap-2 text-xs font-bold bg-indigo-600/30 px-3 py-1.5 rounded-full text-indigo-200 border border-indigo-500/30">
                      <Sparkles className="w-3 h-3" />
                      {isAr ? 'المهارة المستهدفة' : 'Target Skill'}: {dailyTask.skill}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-sm font-bold text-slate-300 block">{isAr ? 'أدخل حلك العملي للمهمة:' : 'Submit your practical solution:'}</label>
                    <textarea 
                      value={submission}
                      onChange={(e) => setSubmission(e.target.value)}
                      className="w-full h-40 p-5 bg-white/5 border border-white/10 rounded-3xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-white placeholder:text-slate-500"
                      placeholder={isAr ? 'اكتب حلك هنا ليقوم الوكيل بتحليله وإعطائك فيدباك...' : 'Write your solution here for AI feedback...'}
                    />
                    <button 
                      onClick={handleSumbit}
                      disabled={analyzing || !submission.trim()}
                      className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-indigo-700 transition-all disabled:opacity-50 shadow-xl shadow-indigo-900/50"
                    >
                      {analyzing ? (isAr ? 'جاري تحليل إجابتك...' : 'Analyzing submission...') : (isAr ? 'إرسال لتقييم الوكيل الذكي' : 'Submit for AI Review')}
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {feedback && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                   <div className="flex items-center gap-6 bg-white/5 p-8 rounded-3xl border border-white/10">
                      <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center border-4 border-indigo-400 shrink-0 shadow-lg">
                         <span className="text-3xl font-black">{feedback.score}</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-indigo-300 text-xl mb-1">{isAr ? 'تقييم وملاحظات الوكيل' : 'AI Mentor Feedback'}</h3>
                        <p className="text-sm text-slate-300 leading-relaxed">{feedback.feedback}</p>
                      </div>
                   </div>

                   <div className="space-y-4">
                      <h4 className="font-bold text-indigo-300 flex items-center gap-2">
                        <Star className="w-5 h-5 text-amber-400" />
                        {isAr ? 'كيف تحسن أداءك مستقبلاً؟' : 'How to improve in the future?'}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         {feedback.suggestions.map((s: string, i: number) => (
                           <div key={i} className="text-sm text-slate-300 flex items-start gap-3 bg-white/5 p-4 rounded-2xl border border-white/10">
                              <div className="w-2 h-2 rounded-full bg-indigo-500 mt-1.5 shrink-0"></div>
                              {s}
                           </div>
                         ))}
                      </div>
                   </div>

                   <button 
                    onClick={confirmCompletion}
                    className="w-full py-5 bg-white text-slate-900 rounded-2xl font-black text-lg hover:bg-indigo-50 transition-all shadow-xl"
                   >
                     {isAr ? 'فهمت الملاحظات، أعطني مهمة جديدة' : 'Got it, give me a new task'}
                   </button>
                </div>
              )}
            </div>
            <BrainCircuit className="absolute -bottom-20 -left-20 w-80 h-80 text-white/5 -rotate-12" />
          </section>
        </div>

        {/* Right Column: Support & Progress */}
        <div className="space-y-6">
           <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm">
              <h3 className="font-bold mb-6 flex items-center gap-2 text-slate-900">
                <BookOpen className="w-5 h-5 text-indigo-600" />
                {isAr ? 'موارد إضافية للموديول' : 'Module Resources'}
              </h3>
              <div className="space-y-4">
                 <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl hover:bg-indigo-50 transition-colors cursor-pointer group">
                    <FileText className="w-6 h-6 text-slate-400 group-hover:text-indigo-600" />
                    <div>
                       <p className="text-sm font-bold text-slate-800">{isAr ? 'ملخص المحاضرة (PDF)' : 'Lecture Summary'}</p>
                       <p className="text-[10px] text-slate-500">2.4 MB • {isAr ? 'جاهز للتحميل' : 'Ready to download'}</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl hover:bg-indigo-50 transition-colors cursor-pointer group">
                    <Video className="w-6 h-6 text-slate-400 group-hover:text-indigo-600" />
                    <div>
                       <p className="text-sm font-bold text-slate-800">{isAr ? 'رابط المحاضرة اللايف' : 'Live Session Link'}</p>
                       <p className="text-[10px] text-slate-500">{isAr ? 'يوم الخميس القادم 8 مساءً' : 'Next Thursday 8 PM'}</p>
                    </div>
                 </div>
              </div>
           </div>

           <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-[2rem] p-6 text-white relative overflow-hidden shadow-lg">
             <div className="relative z-10">
                <h3 className="font-bold text-lg mb-2">{isAr ? 'فرصة التدريب العملي' : 'Internship Opportunity'}</h3>
                <p className="text-xs text-indigo-100 leading-relaxed mb-4">
                  {isAr 
                    ? 'بإنهائك 10 مهام أخرى وإكمال موديولات هذا المستوى بنجاح، ستصبح مرشحاً لتدريبات الشركات الشريكة في EduCareer.' 
                    : 'By finishing 10 more tasks and completing this levels modules, you will be eligible for partner internships at EduCareer.'}
                </p>
                <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                   <div className="w-1/3 h-full bg-white rounded-full"></div>
                </div>
                <p className="text-[10px] mt-2 text-indigo-200">{isAr ? 'تبقي 33% للوصول للمستوى التالي' : '33% left to reach next level'}</p>
             </div>
             <Trophy className="absolute -bottom-4 -right-4 w-20 h-20 text-white/10 -rotate-12" />
           </div>

           <div className="bg-amber-50 rounded-[2rem] p-6 border border-amber-200">
             <div className="flex items-center gap-2 mb-3">
                <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                <h3 className="font-bold text-amber-900">{isAr ? 'نصيحة مدربك' : 'Mentors Tip'}</h3>
             </div>
             <p className="text-xs text-amber-800 leading-relaxed italic">
               {isAr 
                 ? '"تذكر أن الممارسة هي جوهر EduCareer. لا تكتفي بمشاهدة الموديولات، بل طبق كل مهارة في المهمة اليومية لتحصل على أفضل تقييم."' 
                 : '"Remember, practice is the heart of EduCareer. Dont just watch modules, apply every skill in the daily task for the best feedback."'}
             </p>
           </div>
        </div>
      </div>
    </div>
  );
};

// Simple Trophy icon component for reuse
const Trophy = ({ className }: { className: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 22V18"/><path d="M14 22V18"/><path d="M18 4H6a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"/><path d="m9 12 3 3 3-3"/></svg>
);

export default Dashboard;
