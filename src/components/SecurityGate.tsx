import React, { useState } from 'react';
import { Lock, Eye, EyeOff, ShieldCheck, KeyRound, Sparkles, BookOpen, Layers } from 'lucide-react';

interface SecurityGateProps {
  onUnlock: () => void;
}

export const OFFICIAL_PORTAL_PASSWORD = 'IOISIN01DIA';

export const SecurityGate: React.FC<SecurityGateProps> = ({ onUnlock }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError(true);
      setErrorMessage('कृपया सुरक्षा पासवर्ड दर्ज करें (Please enter security password)');
      return;
    }

    if (password.trim() === OFFICIAL_PORTAL_PASSWORD) {
      setError(false);
      localStorage.setItem('iois_portal_auth', 'unlocked_' + Date.now());
      onUnlock();
    } else {
      setError(true);
      setShake(true);
      setErrorMessage('गलत पासवर्ड! कृपया सही अधिकृत पासवर्ड दर्ज करें।');
      setTimeout(() => setShake(false), 600);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white flex flex-col justify-between relative overflow-hidden select-none">
      {/* Decorative Indian Tricolor Aura & Glows */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      {/* Header Bar */}
      <header className="px-6 py-5 border-b border-slate-800/80 bg-slate-950/60 backdrop-blur-md flex items-center justify-between z-10">
        <div className="flex items-center space-x-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 via-orange-600 to-amber-700 flex items-center justify-center shadow-lg shadow-orange-500/20 border border-amber-300/40 font-bold text-white text-lg tracking-wider">
            IOIS
          </div>
          <div>
            <h1 className="font-extrabold text-lg sm:text-xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-amber-200">
              IOIS INDIAN PUBLICATION
            </h1>
            <p className="text-xs text-slate-400 font-medium">
              भारतीय प्रकाशन, बाल शिक्षा एवं बहुउद्देश्यीय डिजिटल टूल्स
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs text-amber-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>256-Bit SSL Encrypted Gateway</span>
        </div>
      </header>

      {/* Center Gate Card */}
      <main className="flex-1 flex items-center justify-center p-4 z-10 my-8">
        <div 
          className={`w-full max-w-md bg-slate-900/90 border border-slate-800/90 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative transition-transform ${
            shake ? 'animate-bounce' : ''
          }`}
        >
          {/* Top Tricolor Strip */}
          <div className="h-1.5 w-full rounded-t-3xl overflow-hidden flex absolute top-0 left-0 right-0">
            <div className="h-full w-1/3 bg-orange-500" />
            <div className="h-full w-1/3 bg-white" />
            <div className="h-full w-1/3 bg-green-600" />
          </div>

          <div className="text-center mt-2 mb-6">
            <div className="inline-flex p-3.5 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-amber-400 mb-3 shadow-inner">
              <Lock className="w-8 h-8 text-amber-400 animate-pulse" />
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              अधिकृत सुरक्षा गेटवे
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              सुरक्षा कारणों से यह पोर्टल पासवर्ड द्वारा संरक्षित है। कृपया अंदर प्रवेश के लिए मुख्य सुरक्षा कुंजी दर्ज करें।
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                  सुरक्षा पासवर्ड (Security Key)
                </span>
                <span className="text-[11px] text-slate-400">गोपनीय इनपुट</span>
              </label>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError(false);
                  }}
                  placeholder="••••••••••••"
                  autoComplete="off"
                  className={`w-full px-4 py-3.5 pr-12 rounded-xl bg-slate-950/80 border ${
                    error ? 'border-red-500 ring-2 ring-red-500/20' : 'border-slate-700/80 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20'
                  } text-white font-mono text-center tracking-widest placeholder:tracking-normal placeholder:text-slate-600 outline-none transition text-base`}
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1 transition"
                  title={showPassword ? "पासवर्ड छिपाएं" : "पासवर्ड देखें"}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {error && (
                <div className="text-xs text-red-400 mt-2 flex items-center justify-center gap-1.5 font-medium animate-fadeIn">
                  <span>⚠️</span> {errorMessage}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-bold tracking-wide shadow-lg shadow-orange-500/25 transition active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base"
            >
              <Sparkles className="w-4 h-4 text-slate-950 fill-current" />
              पोर्टल अनलॉक करें / Enter Portal
            </button>
          </form>

          {/* Quick info badges */}
          <div className="mt-6 pt-5 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-[11px] text-slate-400">
            <div className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-950/40 border border-slate-800">
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>0-5 वर्ष बाल सामग्री</span>
            </div>
            <div className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-950/40 border border-slate-800">
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
              <span>ID, शादी कार्ड & टूल्स</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-4 border-t border-slate-800/80 bg-slate-950/80 text-center text-xs text-slate-400 z-10 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>© 2026 IOIS INDIAN PUBLICATION. All Rights Reserved. (भारतीय प्रकाशन)</p>
        <p className="text-slate-400">सुरक्षित क्लाउड डेटाबेस एवं एन्क्रिप्टेड एक्सेस</p>
      </footer>
    </div>
  );
};
