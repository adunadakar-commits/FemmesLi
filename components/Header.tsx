
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">L</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 leading-none">Femmes de la Ligue</h1>
            <p className="text-[10px] text-emerald-600 font-semibold tracking-widest uppercase mt-0.5">Islamique de France</p>
          </div>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="#profiles" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">Portraits</a>
          <a href="#resources" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">Ressources</a>
          <button className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-slate-800 transition-all">
            Nous rejoindre
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
