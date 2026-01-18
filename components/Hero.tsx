
import React from 'react';

interface HeroProps {
  onStartVoice: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartVoice }) => {
  return (
    <div className="relative pt-12 pb-20 overflow-hidden">
      <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-emerald-50/50 rounded-bl-[100px] hidden lg:block"></div>
      
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Faire briller la compétence</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 leading-[1.1] mb-8">
              La Femme Musulmane : <br/>
              <span className="text-emerald-600 underline decoration-emerald-200 decoration-8 underline-offset-8">Libre & Compétente.</span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-10 leading-relaxed">
              Loin des préjugés et des clichés réducteurs, nous célébrons celles qui bâtissent, 
              entreprennent et rayonnent par leur savoir-faire au cœur de la cité.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                onClick={onStartVoice}
                className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-emerald-700 transition-all flex items-center justify-center space-x-3 shadow-xl shadow-emerald-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
                <span>Parler avec Amira</span>
              </button>
              <button className="bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all shadow-sm">
                Découvrir l'annuaire
              </button>
            </div>
          </div>
          
          <div className="flex-1 relative">
            <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl">
              <img 
                src="https://picsum.photos/seed/muslim-woman-business/800/1000" 
                alt="Femme musulmane au travail" 
                className="w-full aspect-[4/5] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <p className="text-lg font-medium italic">"Ma compétence est mon identité. Mon voile n'est pas un frein, c'est mon équilibre."</p>
                <p className="mt-4 font-bold">— Dr. Safia, Ingénieure & Chercheuse</p>
              </div>
            </div>
            
            {/* Decor elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-emerald-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
