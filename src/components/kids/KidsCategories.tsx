import React, { useState } from 'react';
import { DISCOVERY_CATEGORIES, speakWord } from '../../data/kidsData';
import { DiscoveryCategory } from '../../types';
import { Volume2, Sparkles } from 'lucide-react';

export const KidsCategories: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<DiscoveryCategory>(DISCOVERY_CATEGORIES[0]);

  const handleItemClick = (soundText: string) => {
    speakWord(soundText, 'hi-IN');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/80 border border-slate-800 p-4 sm:p-6 rounded-2xl">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌍</span>
          <h2 className="text-xl sm:text-2xl font-black text-amber-300 font-['Baloo_2',sans-serif]">
            बाल ज्ञान संसार (Kids General Knowledge & Discovery)
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 mt-1">
          पशु, पक्षी, फल, सब्जियां, रंग, आकार, शरीर के अंग एवं अच्छी आदतें - सचित्र व ध्वनि सहित।
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {DISCOVERY_CATEGORIES.map((cat) => {
          const isSelected = activeCategory.id === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md font-extrabold'
                  : 'bg-slate-900/90 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              <span className="text-base">{cat.icon}</span>
              <span>{cat.nameHi}</span>
            </button>
          );
        })}
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
        {activeCategory.items.map((item, idx) => (
          <div
            key={idx}
            onClick={() => handleItemClick(item.soundText)}
            className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-amber-400/60 hover:bg-slate-850 hover:shadow-lg hover:shadow-amber-500/10 transition-all duration-200 flex flex-col items-center justify-between text-center cursor-pointer group active:scale-95"
          >
            <span className="text-5xl sm:text-6xl mb-3 group-hover:scale-110 transition drop-shadow-md">
              {item.emoji}
            </span>
            <div className="space-y-1">
              <h4 className="font-extrabold text-white text-sm sm:text-base font-['Baloo_2',sans-serif]">
                {item.hi}
              </h4>
              <p className="text-xs text-amber-300 font-medium">
                {item.en}
              </p>
            </div>
            <div className="mt-3 w-8 h-8 rounded-full bg-slate-950 flex items-center justify-center text-slate-400 group-hover:text-amber-400 group-hover:bg-amber-500/10 transition">
              <Volume2 className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
