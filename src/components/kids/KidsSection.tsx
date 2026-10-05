import React, { useState } from 'react';
import { Varnamala } from './Varnamala';
import { EnglishAlphabet } from './EnglishAlphabet';
import { NumbersCounting } from './NumbersCounting';
import { Rhymes } from './Rhymes';
import { KidsCategories } from './KidsCategories';
import { DrawingPad } from './DrawingPad';
import { KidsQuiz } from './KidsQuiz';
import { Worksheets } from './Worksheets';
import { 
  Baby, 
  BookOpen, 
  Sparkles, 
  Music, 
  Palette, 
  HelpCircle, 
  Printer, 
  Globe2, 
  Compass, 
  Star 
} from 'lucide-react';

export const KidsSection: React.FC = () => {
  const [activeKidsTab, setActiveKidsTab] = useState<
    'varnamala' | 'alphabet' | 'numbers' | 'rhymes' | 'categories' | 'drawing' | 'quiz' | 'worksheets'
  >('varnamala');

  return (
    <div className="space-y-6">
      {/* Hero Kids Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 p-6 sm:p-8 text-white shadow-xl border border-amber-400/30">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/40 text-amber-200 text-xs font-extrabold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            <span>0 से 5 वर्ष संपूर्ण बाल शिक्षण माला (Early Learning Hub)</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black font-['Baloo_2',sans-serif] tracking-tight text-white drop-shadow-sm">
            IOIS बाल विद्यापीठ - नन्हें बच्चों का संपूर्ण अध्ययन
          </h2>
          <p className="text-xs sm:text-sm text-amber-100 font-medium leading-relaxed">
            हिंदी वर्णमाला (स्वर-व्यंजन), English Alphabets & Phonics, 1-100 गिनती, मनोरंजक बालगीत, सामान्य ज्ञान, आर्ट कैनवास एवं प्रिंटेबल अभ्यास वर्कशीट।
          </p>
        </div>

        {/* Decorative Floating Emoticons */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-3 text-5xl opacity-80 pointer-events-none select-none">
          <span className="animate-bounce" style={{ animationDuration: '2s' }}>🍎</span>
          <span className="animate-bounce" style={{ animationDuration: '2.4s', animationDelay: '0.2s' }}>🦚</span>
          <span className="animate-bounce" style={{ animationDuration: '1.8s', animationDelay: '0.4s' }}>⭐</span>
          <span className="animate-bounce" style={{ animationDuration: '2.2s', animationDelay: '0.6s' }}>🦁</span>
        </div>
      </div>

      {/* Nav Pills for Kids Modules */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
        {[
          { id: 'varnamala', label: 'हिंदी वर्णमाला', icon: '🪷', color: 'hover:border-amber-400' },
          { id: 'alphabet', label: 'English ABC', icon: '🔤', color: 'hover:border-sky-400' },
          { id: 'numbers', label: 'गिनती 1-100', icon: '🔢', color: 'hover:border-emerald-400' },
          { id: 'rhymes', label: 'बालगीत व राइम्स', icon: '🎵', color: 'hover:border-rose-400' },
          { id: 'categories', label: 'ज्ञान संसार', icon: '🌍', color: 'hover:border-indigo-400' },
          { id: 'drawing', label: 'चित्रकला पैड', icon: '🎨', color: 'hover:border-pink-400' },
          { id: 'quiz', label: 'बाल क्विज', icon: '🧠', color: 'hover:border-yellow-400' },
          { id: 'worksheets', label: 'वर्कशीट प्रिंट', icon: '📄', color: 'hover:border-purple-400' },
        ].map((tab) => {
          const isSelected = activeKidsTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveKidsTab(tab.id as any)}
              className={`p-3 rounded-2xl border transition-all duration-200 flex flex-col items-center justify-center gap-1.5 text-center cursor-pointer ${
                isSelected
                  ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-extrabold shadow-lg shadow-amber-500/15 scale-[1.03]'
                  : 'bg-slate-900/90 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-850'
              }`}
            >
              <span className="text-2xl">{tab.icon}</span>
              <span className="text-xs font-bold font-['Baloo_2',sans-serif] whitespace-nowrap">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Tab View */}
      <div className="mt-4">
        {activeKidsTab === 'varnamala' && <Varnamala />}
        {activeKidsTab === 'alphabet' && <EnglishAlphabet />}
        {activeKidsTab === 'numbers' && <NumbersCounting />}
        {activeKidsTab === 'rhymes' && <Rhymes />}
        {activeKidsTab === 'categories' && <KidsCategories />}
        {activeKidsTab === 'drawing' && <DrawingPad />}
        {activeKidsTab === 'quiz' && <KidsQuiz />}
        {activeKidsTab === 'worksheets' && <Worksheets />}
      </div>
    </div>
  );
};
