
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  user?: any;
  onLogout?: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-full bg-slate-50 text-slate-900">
      <main className="max-w-7xl mx-auto p-4 md:p-10">
        {children}
      </main>
    </div>
  );
};

export default Layout;
