import React, { useState } from 'react';
import { HINDI_SWAR, HINDI_VYANJAN, speakWord } from '../../data/kidsData';
import { VarnamalaLetter } from '../../types';
import { Volume2, Sparkles, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

export const Varnamala: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'swar' | 'vyanjan'>('swar');
  const [selectedLetter, setSelectedLetter] = useState<VarnamalaLetter>(HINDI_SWAR[0]);
  const [starCount, setStarCount] = useState(0);

  const currentList = activeTab === 'swar' ? HINDI_SWAR : HINDI_VYANJAN;

  const handleCardClick = (item: VarnamalaLetter) => {
    setSelectedLetter(item);
    speakWord(item.audioText, 'hi-IN');
    setStarCount(prev => prev + 1);

    if (Math.random() > 0.7) {
      confetti({
        particleCount: 25,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 p-4 sm:p-6 rounded-2xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🪷</span>
            <h2 className="text-xl sm:text-2xl font-black text-amber-300 font-['Baloo_2',sans-serif]">
              हिंदी वर्णमाला (स्वर एवं व्यंजन)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            0 से 5 वर्ष के नन्हे बच्चों के लिए सचित्र, स्पष्ट उच्चारण और ध्वनि सहित हिंदी वर्णमाला।
          </p>
        </div>

        {/* Tab switcher: Swar vs Vyanjan */}
        <div className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-950 border border-slate-800">
          <button
            onClick={() => {
              setActiveTab('swar');
              setSelectedLetter(HINDI_SWAR[0]);
            }}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition cursor-pointer ${
              activeTab === 'swar'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            स्वर (अ से अः - 13)
          </button>
          <button
            onClick={() => {
              setActiveTab('vyanjan');
              setSelectedLetter(HINDI_VYANJAN[0]);
            }}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition cursor-pointer ${
              activeTab === 'vyanjan'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            व्यंजन (क से ज्ञ - 36)
          </button>
        </div>
      </div>

      {/* Featured Big Interactive Display Card */}
      {selectedLetter && (
        <div className="bg-gradient-to-br from-amber-950/40 via-slate-900 to-orange-950/30 border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center gap-6 z-10 text-center sm:text-left">
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-6xl sm:text-7xl font-black text-slate-950 shadow-2xl border-4 border-amber-300 font-['Baloo_2',sans-serif] shrink-0">
              {selectedLetter.letter}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="text-3xl sm:text-4xl">{selectedLetter.imageEmoji}</span>
                <span className="text-3xl sm:text-4xl font-black text-white font-['Baloo_2',sans-serif]">
                  {selectedLetter.letter} से {selectedLetter.word}
                </span>
              </div>
              <p className="text-amber-300 text-sm sm:text-base font-semibold">
                {selectedLetter.audioText}
              </p>
              <p className="text-slate-400 text-xs sm:text-sm">
                Meaning: <span className="text-slate-200 font-medium">{selectedLetter.meaning}</span> ({selectedLetter.transliteration})
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 z-10">
            <button
              onClick={() => speakWord(selectedLetter.audioText, 'hi-IN')}
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black text-base shadow-lg shadow-amber-500/20 active:scale-95 transition cursor-pointer"
            >
              <Volume2 className="w-6 h-6 animate-pulse" />
              <span>आवाज़ सुनें (Listen)</span>
            </button>
            <span className="text-[11px] text-slate-400">कार्ड पर क्लिक करके भी सुन सकते हैं</span>
          </div>
        </div>
      )}

      {/* Grid of Letters */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-3 sm:gap-4">
        {currentList.map((item, idx) => {
          const isSelected = selectedLetter.letter === item.letter;
          return (
            <button
              key={idx}
              onClick={() => handleCardClick(item)}
              className={`p-3 sm:p-4 rounded-2xl border transition-all duration-200 flex flex-col items-center justify-between text-center relative group cursor-pointer ${
                isSelected
                  ? 'bg-amber-500/20 border-amber-400 shadow-lg shadow-amber-500/20 scale-105'
                  : 'bg-slate-900/90 border-slate-800 hover:border-amber-500/50 hover:bg-slate-850'
              }`}
            >
              <span className="text-2xl sm:text-3xl mb-1">{item.imageEmoji}</span>
              <span className="text-3xl sm:text-4xl font-extrabold text-amber-300 font-['Baloo_2',sans-serif] group-hover:scale-110 transition">
                {item.letter}
              </span>
              <span className="text-xs font-bold text-slate-200 mt-1 line-clamp-1">
                {item.word}
              </span>
              <span className="text-[10px] text-slate-400">
                {item.meaning}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
