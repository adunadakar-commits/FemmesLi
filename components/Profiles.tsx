
import React from 'react';
import { Profile } from '../types';

const PROFILES: Profile[] = [
  {
    id: '1',
    name: 'Sarah Benali',
    role: 'Architecte Senior',
    description: 'Expertise en urbanisme durable. Dirige son propre cabinet à Lyon depuis 10 ans.',
    image: 'https://picsum.photos/seed/p1/400/500',
    tags: ['Architecture', 'Leadership']
  },
  {
    id: '2',
    name: 'Leila Mansour',
    role: 'Ingénieure DevOps',
    description: 'Spécialiste du Cloud et de la cybersécurité. Mentor pour les jeunes femmes en tech.',
    image: 'https://picsum.photos/seed/p2/400/500',
    tags: ['Tech', 'Innovation']
  },
  {
    id: '3',
    name: 'Myriam Driss',
    role: 'Avocate au Barreau',
    description: 'Défend les droits civiques et le droit du travail. Engagée pour l\'égalité des chances.',
    image: 'https://picsum.photos/seed/p3/400/500',
    tags: ['Droit', 'Engagement']
  },
  {
    id: '4',
    name: 'Sonia Taleb',
    role: 'Chef d\'Entreprise',
    description: 'Fondatrice d\'une startup en e-santé. Lauréate de plusieurs prix d\'innovation.',
    image: 'https://picsum.photos/seed/p4/400/500',
    tags: ['Startup', 'Santé']
  }
];

const Profiles: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {PROFILES.map((profile) => (
        <div key={profile.id} className="group bg-slate-50 rounded-3xl overflow-hidden hover:bg-white hover:shadow-xl transition-all duration-300">
          <div className="aspect-[4/5] overflow-hidden">
            <img 
              src={profile.image} 
              alt={profile.name} 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100"
            />
          </div>
          <div className="p-6">
            <div className="flex gap-2 mb-3">
              {profile.tags.map(tag => (
                <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  {tag}
                </span>
              ))}
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-1">{profile.name}</h3>
            <p className="text-emerald-600 font-medium text-sm mb-3">{profile.role}</p>
            <p className="text-slate-600 text-sm leading-relaxed">{profile.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Profiles;
