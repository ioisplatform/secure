import React, { useState } from 'react';
import { ENGLISH_ALPHABET, speakWord } from '../../data/kidsData';
import { AlphabetLetter } from '../../types';
import { Volume2, Sparkles, Music } from 'lucide-react';
import confetti from 'canvas-confetti';

export const EnglishAlphabet: React.FC = () => {
  const [selectedLetter, setSelectedLetter] = useState<AlphabetLetter>(ENGLISH_ALPHABET[0]);

  const handleCardClick = (letter: AlphabetLetter) => {
    setSelectedLetter(letter);
    speakWord(letter.audioPrompt, 'en-US');

    if (Math.random() > 0.6) {
      confetti({
        particleCount: 20,
        spread: 50,
        origin: { y: 0.7 }
      });
    }
  };

  const playSong = () => {
    speakWord('A B C D E F G, H I J K L M N O P, Q R S, T U V, W X, Y and Z, Now I know my ABCs, Next time won\'t you sing with me!', 'en-US');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 p-4 sm:p-6 rounded-2xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🔤</span>
            <h2 className="text-xl sm:text-2xl font-black text-sky-300">
              English Alphabet & Phonics (A to Z)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Capital and small letters, picture association, phonics sounds, and pronunciation for kids aged 0 to 5.
          </p>
        </div>

        <button
          onClick={playSong}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs sm:text-sm shadow-md transition active:scale-95 cursor-pointer"
        >
          <Music className="w-4 h-4" />
          <span>Sing ABC Song 🎶</span>
        </button>
      </div>

      {/* Featured Card */}
      {selectedLetter && (
        <div className="bg-gradient-to-br from-sky-950/40 via-slate-900 to-indigo-950/40 border-2 border-sky-500/40 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center gap-6 z-10 text-center sm:text-left">
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center shadow-2xl border-4 border-sky-200 shrink-0">
              <span className="text-5xl sm:text-6xl font-black text-white">
                {selectedLetter.char}
              </span>
              <span className="text-3xl sm:text-4xl font-extrabold text-sky-100 ml-1">
                {selectedLetter.lower}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-center sm:justify-start gap-3">
                <span className="text-4xl sm:text-5xl">{selectedLetter.imageEmoji}</span>
                <span className="text-3xl sm:text-4xl font-black text-white">
                  {selectedLetter.char} for {selectedLetter.word}
                </span>
              </div>
              <p className="text-sky-300 text-sm sm:text-base font-semibold">
                Phonics Sound: {selectedLetter.phonics}
              </p>
              <p className="text-slate-300 text-xs sm:text-sm italic">
                "{selectedLetter.audioPrompt}"
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 z-10">
            <button
              onClick={() => speakWord(selectedLetter.audioPrompt, 'en-US')}
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-300 hover:to-blue-400 text-slate-950 font-black text-base shadow-lg shadow-sky-500/20 active:scale-95 transition cursor-pointer"
            >
              <Volume2 className="w-6 h-6 animate-pulse" />
              <span>Pronounce & Listen</span>
            </button>
            <span className="text-[11px] text-slate-400">Click any card to explore</span>
          </div>
        </div>
      )}

      {/* Grid of A-Z */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-3 sm:gap-4">
        {ENGLISH_ALPHABET.map((item, idx) => {
          const isSelected = selectedLetter.char === item.char;
          return (
            <button
              key={idx}
              onClick={() => handleCardClick(item)}
              className={`p-3 sm:p-4 rounded-2xl border transition-all duration-200 flex flex-col items-center justify-between text-center relative group cursor-pointer ${
                isSelected
                  ? 'bg-sky-500/20 border-sky-400 shadow-lg shadow-sky-500/20 scale-105'
                  : 'bg-slate-900/90 border-slate-800 hover:border-sky-500/50 hover:bg-slate-850'
              }`}
            >
              <span className="text-2xl sm:text-3xl mb-1">{item.imageEmoji}</span>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-black text-sky-300 group-hover:scale-110 transition">
                  {item.char}
                </span>
                <span className="text-xl font-bold text-sky-400">
                  {item.lower}
                </span>
              </div>
              <span className="text-xs font-bold text-white mt-1">
                {item.word}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
