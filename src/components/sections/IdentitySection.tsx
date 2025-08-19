import React from 'react';
import { useState, useEffect } from 'react';

type Profile = 'professional' | 'spiritual' | 'psychological' | 'youth';

type ProfiledItem = {
  sign: string;
  profiles: Record<Profile, string>;
};

type IdentityProps = {
  data?: {
    sun?: ProfiledItem;
    moon?: ProfiledItem;
    ascendant?: ProfiledItem;
  };
  profile: Profile;
  name: string;
};

export default function IdentitySection({ data, profile, name }: IdentityProps) {
  const [expandAll, setExpandAll] = useState(false);
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (!data) return null;

  const toggleAll = () => {
    const keys = ['sun', 'moon', 'ascendant'];
    const newState: { [key: string]: boolean } = {};
    keys.forEach(key => newState[key] = !expandAll);
    setOpenItems(newState);
    setExpandAll(!expandAll);
  };

  const toggleItem = (key: string) => {
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const renderItem = (label: string, key: 'sun' | 'moon' | 'ascendant', icon: string, delay: number, item?: ProfiledItem) => {
    if (!item) return null;
    const isOpen = openItems[key];
    
    return (
      <div 
        className={`border border-white/30 rounded-2xl overflow-hidden bg-white/10 backdrop-blur-md shadow-lg transition-all duration-500 transform hover:scale-[1.02] hover:shadow-xl ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        style={{ 
          animationDelay: `${delay}ms`,
          boxShadow: isOpen ? '0 8px 32px 0 rgba(255, 255, 255, 0.1)' : '0 4px 16px 0 rgba(0, 0, 0, 0.1)'
        }}
      >
        <button
          onClick={() => toggleItem(key)}
          className={`w-full text-left px-6 py-4 font-bold text-lg transition-all duration-300 flex items-center gap-3 group ${
            isOpen 
              ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-b border-white/20' 
              : 'bg-gradient-to-r from-white/5 to-white/10 hover:from-purple-500/20 hover:to-pink-500/20'
          }`}
        >
          <span className="text-2xl group-hover:scale-110 transition-transform duration-300">{icon}</span>
          <span className="flex-1">{label} en <span className="text-purple-300 font-extrabold">{item.sign}</span></span>
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
    <section id="identidad" className={`mb-12 space-y-6 transition-all duration-1000 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    }`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-2xl">🌟</span>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            ¡Hola, {name}! Esta es tu Identidad Astral
          </h2>
        </div>
        <button
          onClick={toggleAll}
          className="text-sm bg-gradient-to-r from-purple-600 to-pink-600 hover:from-pink-600 hover:to-purple-600 text-white px-4 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          {expandAll ? '🔽 Contraer todo' : '🔼 Expandir todo'}
        </button>
      </div>
      
      <div className="space-y-4">
        {renderItem(`☉ Sol de ${name}`, 'sun', '☉', 100, data.sun)}
        {renderItem(`☽ Luna de ${name}`, 'moon', '☽', 200, data.moon)}
        {renderItem(`ASC Ascendente de ${name}`, 'ascendant', '⬆', 300, data.ascendant)}
      </div>
    </section>
  );
}
