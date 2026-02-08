
import React, { useState, useEffect } from 'react';
import { geminiService } from '../services/gemini';
import { Specialization } from '../types';
import { Loader2, ArrowLeft, ArrowRight, CheckCircle2, Target, Trophy, Award, TrendingUp } from 'lucide-react';

interface AssessmentProps {
  specialization: Specialization;
  onComplete: (score: number, level: number) => void;
  language: 'ar' | 'en';
}

const Assessment: React.FC<AssessmentProps> = ({ specialization, onComplete, language }) => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [finished, setFinished] = useState(false);
  const [finalResult, setFinalResult] = useState<{score: number, level: number, label: string} | null>(null);
  
  const isAr = language === 'ar';

  useEffect(() => {
    const load = async () => {
      const q = await geminiService.generateAssessment(specialization, language);
      setQuestions(q);
      setLoading(false);
    };
    load();
  }, [specialization]);

  const handleSelect = (idx: number) => {
    const newAnswers = [...answers];
    newAnswers[currentIdx] = idx;
    setAnswers(newAnswers);
  };

  const next = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      calculateResult();
    }
  };

  const calculateResult = () => {
    let score = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.correctAnswerIndex) score++;
    });

    // Score Logic for 10 questions: 
    // 0-3 -> Beginner (Lvl 1), 4-7 -> Intermediate (Lvl 2), 8-10 -> Advanced (Lvl 3)
    let recommendedLevel = 1;
    let label = isAr ? 'مبتدئ' : 'Beginner';
    
    if (score >= 8) {
      recommendedLevel = 3;
      label = isAr ? 'متقدم' : 'Advanced';
    } else if (score >= 4) {
      recommendedLevel = 2;
      label = isAr ? 'متوسط' : 'Intermediate';
    }

    setFinalResult({ score, level: recommendedLevel, label });
    setFinished(true);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
        <p className="text-slate-500 font-bold">
          {isAr ? 'جاري تحضير 10 أسئلة لتقييم مستواك...' : 'Preparing 10 questions for your assessment...'}
        </p>
      </div>
    );
  }

  if (finished && finalResult) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8 text-center animate-in zoom-in duration-500 max-w-xl mx-auto">
        <div className="w-24 h-24 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center shadow-lg animate-bounce">
          <Trophy className="w-12 h-12" />
        </div>
        <div className="space-y-2">
          <h2 className="text-4xl font-black text-slate-900">{isAr ? 'رائع! انتهيت' : 'Awesome! Done'}</h2>
          <p className="text-slate-500 text-lg">
            {isAr ? 'لقد قمنا بتحليل إجاباتك وتحديد مستواك بدقة.' : 'We analyzed your answers and determined your level.'}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <p className="text-xs font-bold text-slate-400 uppercase mb-1">{isAr ? 'الدرجة' : 'Score'}</p>
            <p className="text-3xl font-black text-indigo-600">{finalResult.score} / 10</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <p className="text-xs font-bold text-slate-400 uppercase mb-1">{isAr ? 'المستوى المستحق' : 'Qualified Level'}</p>
            <p className="text-2xl font-black text-green-600">{finalResult.label}</p>
          </div>
        </div>

        <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100 w-full flex items-center gap-4">
           <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-indigo-600">
              <TrendingUp className="w-6 h-6" />
           </div>
           <p className="text-sm text-indigo-900 font-bold text-right leading-relaxed">
             {isAr 
               ? `بناءً على نتيجتك، ستبدأ الكورس من المستوى ${finalResult.level}. حظاً موفقاً في رحلتك!` 
               : `Based on your result, you will start the course from Level ${finalResult.level}. Good luck!`}
           </p>
        </div>

        <button 
          onClick={() => onComplete(finalResult.score, finalResult.level)}
          className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-xl shadow-indigo-100 flex items-center justify-center gap-3"
        >
          {isAr ? 'ابدأ رحلة التعلم الآن' : 'Start Learning Now'}
          <ArrowRight className={`w-6 h-6 ${isAr ? 'rotate-180' : ''}`} />
        </button>
      </div>
    );
  }

  const q = questions[currentIdx];

  return (
    <div className="max-w-2xl mx-auto py-12 space-y-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold text-indigo-900 flex items-center gap-2">
          <Award className="w-6 h-6" />
          {isAr ? 'تحديد المستوى الذكي' : 'Smart Placement'}
        </h2>
        <span className="text-sm font-bold bg-slate-100 px-4 py-1.5 rounded-full text-slate-600">
          {currentIdx + 1} / 10
        </span>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 left-0 h-1.5 bg-slate-100">
           <div 
            className="h-full bg-indigo-600 transition-all duration-300" 
            style={{ width: `${((currentIdx + 1) / 10) * 100}%` }}
           />
        </div>

        <div className="flex items-center gap-2 mb-2">
          <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
            q.difficulty === 'advanced' ? 'bg-red-100 text-red-600' : 
            q.difficulty === 'intermediate' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'
          }`}>
            {q.difficulty}
          </span>
        </div>
        <h3 className="text-xl font-bold leading-relaxed text-slate-900">{q.question}</h3>
        <div className="space-y-3">
          {q.options.map((opt: string, i: number) => (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              className={`w-full text-right p-5 rounded-2xl border-2 transition-all font-bold ${
                answers[currentIdx] === i 
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-900 shadow-md scale-[1.01]' 
                  : 'border-slate-100 hover:border-slate-300 bg-slate-50 text-slate-600'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        <button 
          disabled={answers[currentIdx] === undefined}
          onClick={next}
          className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg disabled:opacity-50 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 mt-4"
        >
          {currentIdx === questions.length - 1 ? (isAr ? 'عرض النتيجة النهائية' : 'Show Results') : (isAr ? 'السؤال التالي' : 'Next Question')}
          {isAr ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
};

export default Assessment;
