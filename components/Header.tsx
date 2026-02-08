
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Briefcase, LayoutDashboard, Compass, Award, User as UserIcon, Globe, CheckCircle, FolderKanban } from 'lucide-react';
import { Language } from '../types';

interface HeaderProps {
  user: any;
  onLanguageToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLanguageToggle }) => {
  const location = useLocation();
  const isAr = user.language === 'ar';
  const isLoggedIn = user.level > 0;

  const navItems = [
    { name: isAr ? 'الرئيسية' : 'Home', path: '/', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: isAr ? 'التخصصات' : 'Tracks', path: '/discover', icon: <Compass className="w-5 h-5" /> },
    { name: isAr ? 'المهام اليومية' : 'Daily Tasks', path: '/tasks', icon: <CheckCircle className="w-5 h-5" /> },
    { name: isAr ? 'المشاريع' : 'Projects', path: '/projects', icon: <FolderKanban className="w-5 h-5" /> },
    { name: isAr ? 'البورتفوليو' : 'Portfolio', path: '/portfolio', icon: <Award className="w-5 h-5" /> },
  ];

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
              <Briefcase className="w-6 h-6" />
            </div>
            <span className="text-2xl font-black text-indigo-900 tracking-tighter">EduCareer</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link 
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl font-bold text-sm transition-all ${
                  location.pathname === item.path 
                  ? 'bg-indigo-50 text-indigo-600' 
                  : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={onLanguageToggle}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all"
          >
            <Globe className="w-4 h-4" />
            {isAr ? 'English' : 'العربية'}
          </button>
          
          {isLoggedIn ? (
            <>
              <div className="text-left hidden sm:block">
                <p className="text-sm font-bold text-slate-900 leading-none">{user.name}</p>
                <p className="text-xs text-indigo-600 font-medium mt-1">
                  {isAr ? 'المستوى' : 'Level'} {user.level}
                </p>
              </div>
              <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 border border-slate-200">
                <UserIcon className="w-6 h-6" />
              </div>
            </>
          ) : (
            <Link to="/auth" className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all">
              {isAr ? 'دخول' : 'Login'}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
