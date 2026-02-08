
import React, { useState } from 'react';
import { Briefcase, Mail, Lock, User as UserIcon, ArrowLeft } from 'lucide-react';

interface AuthPageProps {
  onLogin: (user: any) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({
      id: '1',
      name: name || 'طالب EduCareer',
      email: email || 'user@educareer.com',
      level: 1,
      completedTasks: [],
      portfolio: []
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        <div className="p-8 bg-indigo-900 text-white text-center">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/20">
            <Briefcase className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold">EduCareer</h1>
          <p className="text-indigo-200 text-sm mt-2">مرحباً بك في مستقبل مسارك المهني</p>
        </div>

        <div className="p-8">
          <div className="flex gap-4 mb-8">
            <button 
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 rounded-xl font-bold transition-all ${isLogin ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-slate-50 text-slate-400'}`}
            >
              تسجيل دخول
            </button>
            <button 
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 rounded-xl font-bold transition-all ${!isLogin ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-slate-50 text-slate-400'}`}
            >
              إنشاء حساب
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-700">الاسم بالكامل</label>
                <div className="relative">
                  <UserIcon className="absolute right-4 top-3.5 w-5 h-5 text-slate-400" />
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="أدخل اسمك" 
                    className="w-full pr-12 pl-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  />
                </div>
              </div>
            )}
            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-700">البريد الإلكتروني</label>
              <div className="relative">
                <Mail className="absolute right-4 top-3.5 w-5 h-5 text-slate-400" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com" 
                  className="w-full pr-12 pl-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-700">كلمة المرور</label>
              <div className="relative">
                <Lock className="absolute right-4 top-3.5 w-5 h-5 text-slate-400" />
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full pr-12 pl-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
            >
              {isLogin ? 'دخول' : 'بدء الرحلة'}
              <ArrowLeft className="w-5 h-5" />
            </button>
          </form>

          <p className="text-center text-slate-400 text-sm mt-6">
            بتسجيلك أنت توافق على شروط الخدمة وسياسة الخصوصية لـ EduCareer
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
