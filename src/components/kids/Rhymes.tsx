import React, { useState } from 'react';
import { RHYMES_LIST, speakWord } from '../../data/kidsData';
import { RhymeItem } from '../../types';
import { Volume2, Play, Square, Sparkles, Music } from 'lucide-react';
import confetti from 'canvas-confetti';

export const Rhymes: React.FC = () => {
  const [selectedRhyme, setSelectedRhyme] = useState<RhymeItem>(RHYMES_LIST[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeLineIdx, setActiveLineIdx] = useState<number | null>(null);

  const handlePlayRhyme = (rhyme: RhymeItem) => {
    setSelectedRhyme(rhyme);
    setIsPlaying(true);
    confetti({ particleCount: 30, spread: 60 });

    const fullText = rhyme.lyrics.join('. ');
    speakWord(fullText, rhyme.language === 'hi' ? 'hi-IN' : 'en-US');

    // Simulate lines progress
    let curr = 0;
    setActiveLineIdx(0);
    const interval = setInterval(() => {
      curr++;
      if (curr < rhyme.lyrics.length) {
        setActiveLineIdx(curr);
      } else {
        clearInterval(interval);
        setIsPlaying(false);
        setActiveLineIdx(null);
      }
    }, 2800);
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setActiveLineIdx(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 p-4 sm:p-6 rounded-2xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎵</span>
            <h2 className="text-xl sm:text-2xl font-black text-rose-300 font-['Baloo_2',sans-serif]">
              बालगीत एवं कविताएँ (Kids Rhymes & Poems)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            मनोरंजक हिंदी बालगीत और अंग्रेजी नर्सरी राइम्स - स्पष्ट संगीत स्वर एवं बोल सहित।
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isPlaying ? (
            <button
              onClick={handleStop}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm shadow-md transition active:scale-95 cursor-pointer"
            >
              <Square className="w-4 h-4 fill-current" />
              <span>रोकें (Stop Audio)</span>
            </button>
          ) : (
            <button
              onClick={() => handlePlayRhyme(selectedRhyme)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-400 hover:to-pink-500 text-white font-bold text-xs sm:text-sm shadow-md transition active:scale-95 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>कविता गाएं (Sing Along)</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Lyrics Showcase Stage */}
      {selectedRhyme && (
        <div className="bg-gradient-to-br from-slate-900 via-rose-950/30 to-purple-950/30 border-2 border-rose-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden text-center">
          <div className="inline-flex p-4 rounded-3xl bg-slate-950 border border-rose-500/40 text-5xl sm:text-6xl mb-4 shadow-lg animate-bounce">
            {selectedRhyme.bannerEmoji}
          </div>

          <h3 className="text-2xl sm:text-4xl font-black text-white font-['Baloo_2',sans-serif] tracking-tight">
            {selectedRhyme.titleHindi}
          </h3>
          <p className="text-rose-300 text-sm sm:text-base font-semibold mt-1">
            {selectedRhyme.title} ({selectedRhyme.category})
          </p>

          {/* Lyrics lines */}
          <div className="mt-8 space-y-3 max-w-xl mx-auto">
            {selectedRhyme.lyrics.map((line, idx) => {
              const isCurrent = activeLineIdx === idx;
              return (
                <p
                  key={idx}
                  className={`text-lg sm:text-2xl font-bold transition-all duration-300 py-1.5 px-4 rounded-xl font-['Baloo_2',sans-serif] ${
                    isCurrent
                      ? 'bg-rose-500 text-slate-950 scale-105 shadow-lg'
                      : 'text-slate-200'
                  }`}
                >
                  {line}
                </p>
              );
            })}
          </div>

          {/* Player controls */}
          <div className="mt-8 flex justify-center gap-3">
            <button
              onClick={() => handlePlayRhyme(selectedRhyme)}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-400 hover:to-pink-400 text-white font-black text-base shadow-lg shadow-rose-500/25 active:scale-95 transition cursor-pointer"
            >
              <Volume2 className="w-5 h-5" />
              <span>आवाज में सुनें</span>
            </button>
          </div>
        </div>
      )}

      {/* Rhymes Selector Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {RHYMES_LIST.map((rhyme) => {
          const isSelected = selectedRhyme.id === rhyme.id;
          return (
            <div
              key={rhyme.id}
              onClick={() => {
                setSelectedRhyme(rhyme);
                handlePlayRhyme(rhyme);
              }}
              className={`p-5 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-4 cursor-pointer group ${
                isSelected
                  ? 'bg-rose-500/15 border-rose-400 shadow-md shadow-rose-500/20'
                  : 'bg-slate-900/90 border-slate-800 hover:border-rose-500/50 hover:bg-slate-850'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <span className="text-4xl p-2.5 rounded-2xl bg-slate-950 border border-slate-800 group-hover:scale-110 transition">
                  {rhyme.bannerEmoji}
                </span>
                <div>
                  <h4 className="font-extrabold text-white text-base font-['Baloo_2',sans-serif]">
                    {rhyme.titleHindi}
                  </h4>
                  <p className="text-xs text-rose-300 font-medium">
                    {rhyme.title}
                  </p>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 mt-1 inline-block">
                    {rhyme.category}
                  </span>
                </div>
              </div>

              <div className="w-9 h-9 rounded-full bg-slate-800 group-hover:bg-rose-500 flex items-center justify-center text-slate-300 group-hover:text-slate-950 transition">
                <Play className="w-4 h-4 fill-current ml-0.5" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
