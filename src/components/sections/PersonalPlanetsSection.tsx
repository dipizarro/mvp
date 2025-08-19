import React from 'react';
import { useState, useEffect } from 'react';

type Profile = 'professional' | 'spiritual' | 'psychological' | 'youth';

type PlanetData = {
  sign: string;
  profiles: Record<Profile, string>;
};

type PersonalPlanetsProps = {
  data?: {
    mercury?: PlanetData;
    venus?: PlanetData;
    mars?: PlanetData;
  };
  profile: Profile;
  name?: string;
};

export default function PersonalPlanetsSection({ data, profile }: PersonalPlanetsProps) {
  const [expandAll, setExpandAll] = useState(false);
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (!data) return null;

  const toggleAll = () => {
    const keys = ['mercury', 'venus', 'mars'];
    const newState: { [key: string]: boolean } = {};
    keys.forEach(key => newState[key] = !expandAll);
    setOpenItems(newState);
    setExpandAll(!expandAll);
  };

  const toggleItem = (key: string) => {
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const renderItem = (label: string, key: 'mercury' | 'venus' | 'mars', icon: string, delay: number, item?: PlanetData) => {
    if (!item) return null;
    const isOpen = openItems[key];
    
    return (
      <div 
        className={`border border-white/30 rounded-2xl overflow-hidden bg-white/10 backdrop-blur-md shadow-lg transition-all duration-500 transform hover:scale-[1.02] hover:shadow-xl ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        style={{ 
          animationDelay: `${delay}ms`,
          boxShadow: isOpen ? '0 8px 32px 0 rgba(0, 255, 255, 0.1)' : '0 4px 16px 0 rgba(0, 0, 0, 0.1)'
        }}
      >
        <button
          onClick={() => toggleItem(key)}
          className={`w-full text-left px-6 py-4 font-bold text-lg transition-all duration-300 flex items-center gap-3 group ${
            isOpen 
              ? 'bg-gradient-to-r from-teal-600/20 to-blue-600/20 border-b border-white/20' 
              : 'bg-gradient-to-r from-white/5 to-white/10 hover:from-teal-500/20 hover:to-blue-500/20'
          }`}
        >
          <span className="text-2xl group-hover:scale-110 transition-transform duration-300">{icon}</span>
          <span className="flex-1">{label} en <span className="text-teal-300 font-extrabold">{item.sign}</span></span>
          <span className={`text-white/60 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>
        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-6 pb-6 pt-2 text-white/90 text-base leading-relaxed bg-gradient-to-br from-white/5 to-transparent">
            {item.profiles?.[profile] ?? 'Sin interpretación.'}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="personales" className={`mb-12 space-y-6 transition-all duration-1000 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    }`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-2xl">🪐</span>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-teal-200 bg-clip-text text-transparent">
            Planetas Personales
          </h2>
        </div>
        <button
          onClick={toggleAll}
          className="text-sm bg-gradient-to-r from-teal-600 to-blue-600 hover:from-blue-600 hover:to-teal-600 text-white px-4 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          {expandAll ? '🔽 Contraer todo' : '🔼 Expandir todo'}
        </button>
      </div>
      
      <div className="space-y-4">
        {renderItem('☿ Mercurio', 'mercury', '☿', 100, data.mercury)}
        {renderItem('♀ Venus', 'venus', '♀', 200, data.venus)}
        {renderItem('♂ Marte', 'mars', '♂', 300, data.mars)}
      </div>
    </section>
  );
}
