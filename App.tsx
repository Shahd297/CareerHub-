
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import SpecializationDetail from './pages/SpecializationDetail';
import Assessment from './pages/Assessment';
import Portfolio from './pages/Portfolio';
import Projects from './pages/Projects';
import Layout from './components/Layout';
import Header from './components/Header';
import AIBot from './components/AIBot';
import { User, Specialization, Language } from './types';
import { SPECIALIZATIONS, getIconForSpec } from './constants';

// Fixed: Moved ProtectedRoute outside to avoid re-definition and correctly type children prop
const ProtectedRoute: React.FC<{ user: User | null; children: React.ReactNode }> = ({ user, children }) => {
  if (!user) return <Navigate to="/auth" replace />;
  return <>{children}</>;
};

const AppContent: React.FC<{
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  onLogout: () => void;
  toggleLanguage: () => void;
  language: Language;
}> = ({ user, setUser, onLogout, toggleLanguage, language }) => {
  const navigate = useNavigate();
  const [pendingSpec, setPendingSpec] = useState<Specialization | null>(null);

  const handleSelectSpecialization = (specId: Specialization) => {
    setPendingSpec(specId);
    if (!user) {
      navigate('/auth');
    } else {
      navigate('/assessment');
    }
  };

  const handleCompleteAssessment = (score: number, level: number) => {
    const selectedSpec = pendingSpec;
    if (user && selectedSpec) {
      setUser({
        ...user,
        selectedSpecialization: selectedSpec,
        assessmentScore: score,
        level: level
      });
      navigate('/dashboard');
      setTimeout(() => setPendingSpec(null), 500);
    }
  };

  const handleCompleteTask = (title: string, feedback: string, score: number) => {
    if (user) {
      setUser({
        ...user,
        completedTasks: [...user.completedTasks, { title, feedback, score }]
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Header user={user || { name: 'زائر', language, level: 0 }} onLanguageToggle={toggleLanguage} />
      <div className="flex-1">
        <Layout>
          <Routes>
            <Route path="/" element={
              <LandingPage 
                user={user} 
                onLogin={() => navigate('/auth')} 
              />
            } />
            
            <Route path="/discover" element={
              <div className="max-w-7xl mx-auto py-8">
                <div className="mb-12 text-center md:text-right">
                  <h1 className="text-4xl font-black text-indigo-900 mb-4 tracking-tight">
                    {language === 'ar' ? 'اكتشف تخصصك المناسب' : 'Discover Your Track'}
                  </h1>
                  <p className="text-slate-500 italic">Experience work before you work</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {SPECIALIZATIONS.map(spec => (
                    <div 
                      key={spec.id} 
                      onClick={() => navigate(`/discover/${spec.id}`)}
                      className="p-10 rounded-[2rem] border-2 transition-all cursor-pointer bg-white group hover:scale-[1.02] border-slate-100 hover:border-indigo-200 shadow-sm"
                    >
                      <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all mb-6">
                        {getIconForSpec(spec.id)}
                      </div>
                      <h3 className="text-2xl font-bold mb-3 text-slate-900">
                        {language === 'ar' ? spec.title.ar : spec.title.en}
                      </h3>
                      <p className="text-sm text-slate-500 leading-relaxed line-clamp-3 mb-6">
                        {language === 'ar' ? spec.description.ar : spec.description.en}
                      </p>
                      <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
                        {language === 'ar' ? 'عرض التفاصيل والمسار' : 'View Details & Path'}
                        <ArrowRight className={`w-4 h-4 ${language === 'ar' ? 'rotate-180' : ''}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            } />
            <Route path="/discover/:id" element={
              <SpecializationDetail 
                onSelect={handleSelectSpecialization}
                language={language}
              />
            } />
            
            <Route path="/auth" element={
              <AuthPage onLogin={(userData) => {
                setUser({ ...userData, language });
                if (pendingSpec) navigate('/assessment');
                else navigate('/dashboard');
              }} />
            } />

            <Route path="/dashboard" element={<ProtectedRoute user={user}><Dashboard user={user!} onCompleteTask={handleCompleteTask} /></ProtectedRoute>} />
            <Route path="/assessment" element={
              <ProtectedRoute user={user}>
                <Assessment specialization={pendingSpec || user?.selectedSpecialization!} onComplete={handleCompleteAssessment} language={language} />
              </ProtectedRoute>
            } />
            <Route path="/tasks" element={<ProtectedRoute user={user}><Dashboard user={user!} onCompleteTask={handleCompleteTask} /></ProtectedRoute>} />
            <Route path="/projects" element={<ProtectedRoute user={user}><Projects user={user!} /></ProtectedRoute>} />
            <Route path="/portfolio" element={<ProtectedRoute user={user}><Portfolio user={user!} /></ProtectedRoute>} />
            
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
      </div>
      {user?.selectedSpecialization && <AIBot specialization={user.selectedSpecialization} language={language} />}
    </div>
  );
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [language, setLanguage] = useState<Language>('ar');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ar' ? 'en' : 'ar');
  };

  return (
    <Router>
      <AppContent 
        user={user} 
        setUser={setUser} 
        onLogout={() => setUser(null)} 
        toggleLanguage={toggleLanguage} 
        language={language}
      />
    </Router>
  );
};

export default App;
