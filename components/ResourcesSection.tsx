
import React from 'react';

const RESOURCES = [
  {
    title: "Guide : Entreprendre quand on est musulmane en France",
    category: "Business",
    desc: "Toutes les étapes pour lancer son projet sereinement.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    title: "Vos droits au travail : Guide juridique complet",
    category: "Légal",
    desc: "Connaître le cadre légal pour mieux se défendre.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 01-6.001 0M18 7l-3 9m3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    )
  },
  {
    title: "Leadership et confiance en soi",
    category: "Mindset",
    desc: "Déconstruire le syndrome de l'imposteur au féminin.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    )
  },
  {
    title: "Réseautage Stratégique",
    category: "Carrière",
    desc: "Comment bâtir un carnet d'adresses puissant et bienveillant.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  }
];

const ResourcesSection: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-16">
      <div className="lg:w-1/3">
        <h2 className="text-4xl font-bold text-slate-900 mb-6">Boîte à outils</h2>
        <p className="text-lg text-slate-600 mb-8">
          Des ressources concrètes pour soutenir votre ambition et protéger votre intégrité professionnelle.
        </p>
        <button className="text-emerald-600 font-bold flex items-center group">
          <span>Toutes les ressources</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>
      
      <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
        {RESOURCES.map((res, i) => (
          <div key={i} className="group bg-white p-8 rounded-3xl shadow-sm border border-emerald-100 hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 text-emerald-100 group-hover:text-emerald-500/10 transition-colors">
              <div className="scale-[2.5] transform -rotate-12">
                {res.icon}
              </div>
            </div>
            
            <div className="relative z-10">
              <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                {res.icon}
              </div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">{res.category}</span>
              <h3 className="text-xl font-bold text-slate-900 mt-2 mb-4 group-hover:text-emerald-700 transition-colors">{res.title}</h3>
              <p className="text-slate-500 mb-6 line-clamp-2">{res.desc}</p>
              
              <div className="flex items-center text-sm font-semibold text-slate-400 group-hover:text-emerald-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Télécharger PDF</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourcesSection;
