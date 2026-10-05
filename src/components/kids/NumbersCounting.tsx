import React, { useState } from 'react';
import { NUMBERS_1_TO_20, speakWord } from '../../data/kidsData';
import { Volume2, Plus, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export const NumbersCounting: React.FC = () => {
  const [selectedNum, setSelectedNum] = useState(NUMBERS_1_TO_20[0]);
  const [activeMode, setActiveMode] = useState<'visual' | 'hundred' | 'math'>('visual');

  // Simple math quiz state
  const [numA, setNumA] = useState(2);
  const [numB, setNumB] = useState(3);
  const [userMathAns, setUserMathAns] = useState<number | null>(null);
  const [mathFeedback, setMathFeedback] = useState<string | null>(null);

  const handleNumClick = (item: typeof NUMBERS_1_TO_20[0]) => {
    setSelectedNum(item);
    speakWord(`${item.num}. ${item.wordEnglish}. हिंदी में ${item.wordHindi}`, 'hi-IN');
  };

  const handleMathCheck = (ans: number) => {
    setUserMathAns(ans);
    if (ans === numA + numB) {
      setMathFeedback('शाबाश! बिल्कुल सही जवाब! 🎉 (Superb! Correct!)');
      speakWord(`बिल्कुल सही! ${numA} और ${numB} होते हैं ${numA + numB}!`, 'hi-IN');
      confetti({ particleCount: 30, spread: 60 });
      setTimeout(() => {
        setNumA(Math.floor(Math.random() * 5) + 1);
        setNumB(Math.floor(Math.random() * 5) + 1);
        setUserMathAns(null);
        setMathFeedback(null);
      }, 2000);
    } else {
      setMathFeedback('ओहो! दोबारा गिन कर कोशिश करें! (Try counting again)');
      speakWord('दोबारा गिन कर कोशिश करें', 'hi-IN');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 p-4 sm:p-6 rounded-2xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🔢</span>
            <h2 className="text-xl sm:text-2xl font-black text-emerald-300 font-['Baloo_2',sans-serif]">
              गिनती एवं बाल अंकगणित (1 to 100 Numbers & Counting)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            संख्या ज्ञान, सचित्र वस्तुओं की गिनती, हिंदी-अंग्रेजी उच्चारण और आसान बाल जोड़।
          </p>
        </div>

        {/* View switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800">
          <button
            onClick={() => setActiveMode('visual')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              activeMode === 'visual'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            सचित्र गिनती (1-20)
          </button>
          <button
            onClick={() => setActiveMode('hundred')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              activeMode === 'hundred'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            1 से 100 चार्ट
          </button>
          <button
            onClick={() => setActiveMode('math')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              activeMode === 'math'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            बाल खेल (Fun Math)
          </button>
        </div>
      </div>

      {activeMode === 'visual' && (
        <div className="space-y-6">
          {/* Big Number Card */}
          <div className="bg-gradient-to-br from-emerald-950/40 via-slate-900 to-teal-950/40 border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-6xl sm:text-7xl font-black text-slate-950 shadow-2xl border-4 border-emerald-200 shrink-0 font-['Baloo_2',sans-serif]">
                {selectedNum.num}
              </div>

              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <span className="text-3xl sm:text-4xl font-black text-white font-['Baloo_2',sans-serif]">
                    {selectedNum.wordHindi} ({selectedNum.wordEnglish})
                  </span>
                </div>

                {/* Visual emoji representation */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 pt-2 max-w-md">
                  {Array.from({ length: selectedNum.num }).map((_, i) => (
                    <span key={i} className="text-2xl sm:text-3xl animate-bounce" style={{ animationDelay: `${i * 100}ms` }}>
                      {selectedNum.emojis[0] || '⭐'}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => speakWord(`${selectedNum.num}. ${selectedNum.wordEnglish}. हिंदी में ${selectedNum.wordHindi}`, 'hi-IN')}
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-300 hover:to-teal-400 text-slate-950 font-black text-base shadow-lg shadow-emerald-500/20 active:scale-95 transition cursor-pointer"
            >
              <Volume2 className="w-6 h-6 animate-pulse" />
              <span>सुनें (Pronounce)</span>
            </button>
          </div>

          {/* Grid 1 to 20 */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3 sm:gap-4">
            {NUMBERS_1_TO_20.map((item) => {
              const isSelected = selectedNum.num === item.num;
              return (
                <button
                  key={item.num}
                  onClick={() => handleNumClick(item)}
                  className={`p-4 rounded-2xl border transition flex flex-col items-center justify-center text-center cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-500/20 border-emerald-400 scale-105 shadow-lg shadow-emerald-500/20'
                      : 'bg-slate-900/90 border-slate-800 hover:border-emerald-500/50'
                  }`}
                >
                  <span className="text-4xl font-black text-emerald-300 font-['Baloo_2',sans-serif]">
                    {item.num}
                  </span>
                  <span className="text-sm font-bold text-white mt-1">
                    {item.wordHindi}
                  </span>
                  <span className="text-xs text-slate-400">
                    {item.wordEnglish}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {activeMode === 'hundred' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-bold text-amber-300">
              1 से 100 तक गिनती बोर्ड (Click any number to hear sound)
            </h3>
            <span className="text-xs text-slate-400">टच करें और सुनें</span>
          </div>

          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
            {Array.from({ length: 100 }).map((_, i) => {
              const val = i + 1;
              return (
                <button
                  key={val}
                  onClick={() => speakWord(String(val), 'hi-IN')}
                  className="p-2 sm:p-3 rounded-xl bg-slate-950 hover:bg-emerald-500/20 hover:border-emerald-400 border border-slate-800 text-slate-200 hover:text-emerald-300 font-bold text-sm sm:text-base transition active:scale-95 cursor-pointer font-['Baloo_2',sans-serif]"
                >
                  {val}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {activeMode === 'math' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 text-center">
          <h3 className="text-xl sm:text-2xl font-black text-emerald-300 font-['Baloo_2',sans-serif]">
            नन्हें बच्चों का आसान जोड़ (Visual Fruit Counting)
          </h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            सेब को गिनें और सही संख्या पर क्लिक करें!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 p-6 rounded-2xl bg-slate-950/80 border border-slate-800 max-w-xl mx-auto">
            {/* Group 1 */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex gap-1 text-3xl">
                {Array.from({ length: numA }).map((_, i) => (
                  <span key={i}>🍎</span>
                ))}
              </div>
              <span className="text-2xl font-black text-amber-400">{numA}</span>
            </div>

            <span className="text-3xl font-black text-slate-400">+</span>

            {/* Group 2 */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex gap-1 text-3xl">
                {Array.from({ length: numB }).map((_, i) => (
                  <span key={i}>🍎</span>
                ))}
              </div>
              <span className="text-2xl font-black text-amber-400">{numB}</span>
            </div>

            <span className="text-3xl font-black text-slate-400">=</span>

            {/* Question Mark */}
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border-2 border-dashed border-emerald-400 flex items-center justify-center text-3xl font-black text-emerald-300">
              ?
            </div>
          </div>

          {/* Option buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[numA + numB - 1, numA + numB, numA + numB + 1, numA + numB + 2]
              .sort(() => Math.random() - 0.5)
              .map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleMathCheck(opt)}
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 hover:from-emerald-500 hover:to-teal-600 hover:text-slate-950 border border-slate-700 text-2xl font-black text-white shadow-lg transition active:scale-90 cursor-pointer"
                >
                  {opt}
                </button>
              ))}
          </div>

          {mathFeedback && (
            <p className="text-base font-bold text-amber-300 animate-bounce">
              {mathFeedback}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
