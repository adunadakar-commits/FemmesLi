
import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import VoiceAssistant from './components/VoiceAssistant';
import Profiles from './components/Profiles';
import ResourcesSection from './components/ResourcesSection';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">
      <Header />
      
      <main className="flex-grow">
        <Hero onStartVoice={() => setIsVoiceOpen(true)} />
        
        <section id="profiles" className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                Portraits d'Excellence
              </h2>
              <p className="text-lg text-slate-600">
                Découvrez des femmes musulmanes qui redéfinissent les standards par leur travail, 
                leur expertise et leur leadership au quotidien.
              </p>
            </div>
            <Profiles />
          </div>
        </section>

        <section id="resources" className="py-20 bg-emerald-50/50">
          <div className="container mx-auto px-6">
            <ResourcesSection />
          </div>
        </section>
      </main>

      <Footer />

      {/* Floating Voice Assistant Trigger */}
      <button 
        onClick={() => setIsVoiceOpen(true)}
        className="fixed bottom-8 right-8 bg-emerald-600 text-white p-4 rounded-full shadow-2xl hover:bg-emerald-700 transition-all transform hover:scale-110 z-40 group"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
        <span className="absolute right-full mr-4 bg-slate-800 text-white px-3 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Parler avec Amira
        </span>
      </button>

      {/* Full-screen Voice Assistant Overlay */}
      {isVoiceOpen && (
        <VoiceAssistant onClose={() => setIsVoiceOpen(false)} />
      )}
    </div>
  );
};

export default App;
