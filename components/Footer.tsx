
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-emerald-600 rounded flex items-center justify-center">
                <span className="font-bold">L</span>
              </div>
              <span className="text-xl font-bold">Femmes de la Ligue</span>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed">
              Le portail de référence pour l'empouvoirement des femmes musulmanes en France. 
              Parce que la compétence n'a pas de frontières religieuses.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-emerald-500">Navigation</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">Portraits</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Ressources</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Annuaire</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Événements</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-emerald-500">Contact</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li>Ligue Islamique de France</li>
              <li>femmes@ligue-islamique.org</li>
              <li>Paris, France</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
          <p>© 2025 Ligue Islamique de France. Tous droits réservés.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white">Mentions légales</a>
            <a href="#" className="hover:text-white">Confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
