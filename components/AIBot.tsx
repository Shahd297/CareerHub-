
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, User as UserIcon, Sparkles } from 'lucide-react';
import { geminiService } from '../services/gemini';
import { Specialization } from '../types';

interface AIBotProps {
  specialization?: Specialization;
  language: 'ar' | 'en';
}

const AIBot: React.FC<AIBotProps> = ({ specialization, language }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'bot' | 'user'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const isAr = language === 'ar';

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !specialization) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const response = await geminiService.chatWithMentor(specialization, userMsg, language);
    setMessages(prev => [...prev, { role: 'bot', text: response || '' }]);
    setIsLoading(false);
  };

  if (!specialization) return null;

  return (
    <div className="fixed bottom-6 left-6 z-[100] font-['Cairo']" dir={isAr ? 'rtl' : 'ltr'}>
      {isOpen ? (
        <div className="w-80 md:w-96 bg-white rounded-3xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
          <div className="p-4 bg-indigo-600 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-tighter">EduCareer AI Mentor</p>
                <p className="text-[10px] opacity-70 italic">Experience work before you work</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div ref={scrollRef} className="h-96 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.length === 0 && (
              <div className="text-center py-10 space-y-3">
                <Sparkles className="w-8 h-8 text-indigo-200 mx-auto" />
                <p className="text-sm text-slate-400">
                  {isAr ? 'مرحباً! أنا مدربك الذكي في EduCareer، كيف يمكنني مساعدتك في تخصصك اليوم؟' : 'Hi! I am your EduCareer AI Mentor, how can I help you today?'}
                </p>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                  m.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-bl-none' 
                  : 'bg-white border text-slate-700 shadow-sm rounded-br-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border p-3 rounded-2xl animate-pulse flex gap-1">
                  <div className="w-1.5 h-1.5 bg-slate-300 rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-slate-300 rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-slate-300 rounded-full"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-3 bg-white border-t flex gap-2">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder={isAr ? 'اسأل المدرب...' : 'Ask the mentor...'}
              className="flex-1 bg-slate-100 border-none rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center hover:bg-indigo-700 disabled:opacity-50 transition-all"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-indigo-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all animate-bounce"
        >
          <MessageSquare className="w-7 h-7" />
        </button>
      )}
    </div>
  );
};

export default AIBot;
