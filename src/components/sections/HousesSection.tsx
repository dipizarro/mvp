import React from 'react';
import { useState, useEffect } from 'react';

type Profile = 'professional' | 'spiritual' | 'psychological' | 'youth';

type HouseData = {
  sign: string;
  profiles: Record<Profile, string>;
};

type HousesProps = {
  data?: {
    [key: string]: HouseData;
  };
  profile: Profile;
  name?: string;
};

export default function HousesSection({ data, profile }: HousesProps) {
  const [expandAll, setExpandAll] = useState(false);
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (!data) return null;

  const houseLabels: { [key: string]: string } = {
    house_1: "🏠 Casa 1",
    house_2: "💰 Casa 2",
    house_3: "📚 Casa 3",
    house_4: "🏡 Casa 4",
    house_5: "🎭 Casa 5",
    house_6: "⚕️ Casa 6",
    house_7: "💕 Casa 7",
    house_8: "💀 Casa 8",
    house_9: "🌍 Casa 9",
    house_10: "👑 Casa 10",
    house_11: "👥 Casa 11",
    house_12: "🔮 Casa 12"
  };

  const toggleAll = () => {
    const newState: { [key: string]: boolean } = {};
    for (const key in data) {
      newState[key] = !expandAll;
    }
    setOpenItems(newState);
    setExpandAll(!expandAll);
  };

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const renderHouse = (house: string, value: HouseData, index: number) => {
    const isOpen = openItems[house];
    const delay = (index + 1) * 50;
    
    return (
      <div 
        key={house}
        className={`border border-white/30 rounded-2xl overflow-hidden bg-white/10 backdrop-blur-md shadow-lg transition-all duration-500 transform hover:scale-[1.02] hover:shadow-xl ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        style={{ 
          animationDelay: `${delay}ms`,
          boxShadow: isOpen ? '0 8px 32px 0 rgba(239, 68, 68, 0.1)' : '0 4px 16px 0 rgba(0, 0, 0, 0.1)'
        }}
      >
        <button
          onClick={() => toggleItem(house)}
          className={`w-full text-left px-6 py-4 font-bold text-lg transition-all duration-300 flex items-center gap-3 group ${
            isOpen 
              ? 'bg-gradient-to-r from-red-600/20 to-coral-600/20 border-b border-white/20' 
              : 'bg-gradient-to-r from-white/5 to-white/10 hover:from-red-500/20 hover:to-coral-500/20'
          }`}
        >
          <span className="text-xl group-hover:scale-110 transition-transform duration-300">
            {houseLabels[house]?.split(' ')[0] || '🏠'}
          </span>
          <span className="flex-1">
            {houseLabels[house]?.split(' ').slice(1).join(' ') || house} en 
            <span className="text-red-300 font-extrabold ml-1">{value.sign}</span>
          </span>
          <span className={`text-white/60 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>
        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-6 pb-6 pt-2 text-white/90 text-base leading-relaxed bg-gradient-to-br from-white/5 to-transparent">
            {value.profiles?.[profile] ?? 'Sin interpretación.'}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="casas" className={`mb-12 space-y-6 transition-all duration-1000 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    }`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-coral-500 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-2xl">🏛️</span>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent">
            Casas Astrológicas
          </h2>
        </div>
        <button
          onClick={toggleAll}
          className="text-sm bg-gradient-to-r from-red-600 to-coral-600 hover:from-coral-600 hover:to-red-600 text-white px-4 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          {expandAll ? '🔽 Contraer todo' : '🔼 Expandir todo'}
        </button>
      </div>
      
      <div className="space-y-4">
        {Object.entries(data).map(([house, value], index) => 
          renderHouse(house, value, index)
        )}
      </div>
    </section>
  );
}
