import React, { useState } from 'react';
import { Volume2, Trophy, Star, Sparkles, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { speakWord } from '../../data/kidsData';

interface QuizQuestion {
  questionHi: string;
  questionEn: string;
  correctEmoji: string;
  correctName: string;
  options: { emoji: string; name: string }[];
  hint: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    questionHi: 'फलों का राजा कौन सा है?',
    questionEn: 'Which fruit is known as King of Fruits?',
    correctEmoji: '🥭',
    correctName: 'आम (Mango)',
    options: [
      { emoji: '🥭', name: 'आम (Mango)' },
      { emoji: '🍎', name: 'सेब (Apple)' },
      { emoji: '🍌', name: 'केला (Banana)' },
      { emoji: '🍇', name: 'अंगूर (Grapes)' }
    ],
    hint: 'यह पीला और बहुत मीठा होता है!'
  },
  {
    questionHi: 'भारत का राष्ट्रीय पक्षी कौन सा है?',
    questionEn: 'Which is the National Bird of India?',
    correctEmoji: '🦚',
    correctName: 'मोर (Peacock)',
    options: [
      { emoji: '🦜', name: 'तोता (Parrot)' },
      { emoji: '🦚', name: 'मोर (Peacock)' },
      { emoji: '🦆', name: 'बत्तख (Duck)' },
      { emoji: '🦉', name: 'उल्लू (Owl)' }
    ],
    hint: 'इसके पंख रंग-बिरंगे होते हैं और यह बारिश में नाचता है!'
  },
  {
    questionHi: 'जंगल का राजा कौन सा जानवर कहलाता है?',
    questionEn: 'Which animal is the King of the Jungle?',
    correctEmoji: '🦁',
    correctName: 'शेर (Lion)',
    options: [
      { emoji: '🐘', name: 'हाथी (Elephant)' },
      { emoji: '🐅', name: 'बाघ (Tiger)' },
      { emoji: '🦁', name: 'शेर (Lion)' },
      { emoji: '🐻', name: 'भालू (Bear)' }
    ],
    hint: 'यह ज़ोर से दहाड़ता है!'
  },
  {
    questionHi: 'इनमें से कौन सा रंग "लाल" (Red) है?',
    questionEn: 'Which of these represents Red color?',
    correctEmoji: '🔴',
    correctName: 'लाल (Red)',
    options: [
      { emoji: '🔵', name: 'नीला (Blue)' },
      { emoji: '🟢', name: 'हरा (Green)' },
      { emoji: '🔴', name: 'लाल (Red)' },
      { emoji: '🟡', name: 'पीला (Yellow)' }
    ],
    hint: 'टमाटर और सेब इसी रंग के होते हैं!'
  },
  {
    questionHi: '2 + 3 कितने होते हैं?',
    questionEn: 'How much is 2 + 3?',
    correctEmoji: '🖐️',
    correctName: '5 (पाँच)',
    options: [
      { emoji: '4️⃣', name: '4 (चार)' },
      { emoji: '5️⃣', name: '5 (पाँच)' },
      { emoji: '6️⃣', name: '6 (छह)' },
      { emoji: '3️⃣', name: '3 (तीन)' }
    ],
    hint: 'हाथ की उंगलियां गिनें!'
  }
];

export const KidsQuiz: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [stars, setStars] = useState(0);
  const [selectedAns, setSelectedAns] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const q = QUIZ_QUESTIONS[currentIdx];

  const handleSelectOption = (name: string) => {
    if (selectedAns !== null) return; // already answered
    setSelectedAns(name);
    
    if (name === q.correctName) {
      setIsCorrect(true);
      setScore(prev => prev + 10);
      setStars(prev => prev + 1);
      speakWord(`शाबाश! बिल्कुल सही जवाब! यह है ${q.correctName}`, 'hi-IN');
      confetti({ particleCount: 40, spread: 70 });
    } else {
      setIsCorrect(false);
      speakWord(`ओहो! सही उत्तर है ${q.correctName}`, 'hi-IN');
    }
  };

  const handleNext = () => {
    setSelectedAns(null);
    setIsCorrect(null);
    if (currentIdx + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIdx(prev => prev + 1);
      speakWord(QUIZ_QUESTIONS[currentIdx + 1].questionHi, 'hi-IN');
    } else {
      setCurrentIdx(0);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/80 border border-slate-800 p-4 sm:p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🧠</span>
            <h2 className="text-xl sm:text-2xl font-black text-amber-300 font-['Baloo_2',sans-serif]">
              नन्हे बच्चों का मजेदार क्विज (Kids Audio Quiz)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            चित्र देखकर सही विकल्प पहचानें और ढेर सारे सितारे व ट्रॉफियां जीतें!
          </p>
        </div>

        {/* Score & Stars Badge */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 font-black text-sm">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>{stars} सितारे</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-black text-sm">
            <Trophy className="w-4 h-4 text-emerald-400" />
            <span>{score} अंक</span>
          </div>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border-2 border-indigo-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6 text-center">
        <div className="flex items-center justify-center gap-2">
          <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
            प्रश्न {currentIdx + 1} / {QUIZ_QUESTIONS.length}
          </span>
          <button
            onClick={() => speakWord(q.questionHi, 'hi-IN')}
            className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-amber-300 transition cursor-pointer"
            title="प्रश्न दोबारा सुनें"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>

        <h3 className="text-2xl sm:text-3xl font-black text-white font-['Baloo_2',sans-serif]">
          {q.questionHi}
        </h3>
        <p className="text-sm text-slate-400 italic">
          {q.questionEn}
        </p>

        {/* Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto pt-4">
          {q.options.map((opt, idx) => {
            let btnClass = 'bg-slate-950/80 border-slate-800 hover:border-indigo-400 hover:bg-slate-900';
            if (selectedAns !== null) {
              if (opt.name === q.correctName) {
                btnClass = 'bg-emerald-600/30 border-emerald-400 text-emerald-300 font-bold';
              } else if (opt.name === selectedAns) {
                btnClass = 'bg-red-600/30 border-red-500 text-red-300';
              }
            }

            return (
              <button
                key={idx}
                disabled={selectedAns !== null}
                onClick={() => handleSelectOption(opt.name)}
                className={`p-4 rounded-2xl border-2 transition-all flex items-center gap-4 text-left cursor-pointer active:scale-95 ${btnClass}`}
              >
                <span className="text-4xl p-2 rounded-xl bg-slate-900 border border-slate-800">
                  {opt.emoji}
                </span>
                <span className="text-base sm:text-lg font-extrabold text-white font-['Baloo_2',sans-serif]">
                  {opt.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Feedback & Next Button */}
        {selectedAns !== null && (
          <div className="pt-4 flex flex-col items-center gap-3 animate-fadeIn">
            <p className={`text-base sm:text-lg font-black font-['Baloo_2',sans-serif] ${
              isCorrect ? 'text-emerald-400' : 'text-amber-400'
            }`}>
              {isCorrect ? '🎉 शाबाश! बहुत खूब! (Excellent answer)' : `💡 कोई बात नहीं! सही उत्तर है: ${q.correctName}`}
            </p>

            <button
              onClick={handleNext}
              className="px-8 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-base shadow-lg transition active:scale-95 cursor-pointer"
            >
              {currentIdx + 1 < QUIZ_QUESTIONS.length ? 'अगला प्रश्न (Next Question) ➡️' : 'फिर से खेलें (Restart Quiz) 🔄'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
