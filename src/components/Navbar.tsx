import React from 'react';
import { ActiveTab } from '../types';
import { 
  Baby, 
  Wrench, 
  IdCard, 
  Code, 
  Lock, 
  FolderHeart, 
  LogIn, 
  LogOut, 
  Sparkles,
  CloudCheck
} from 'lucide-react';
import { auth, googleProvider, syncUserProfile } from '../firebase';
import { signInWithPopup, signOut, User } from 'firebase/auth';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onLock: () => void;
  currentUser: User | null;
  onOpenSavedModal: () => void;
  savedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onLock,
  currentUser,
  onOpenSavedModal,
  savedCount
}) => {
  const isKidsActive = activeTab.startsWith('kids-');
  const isToolsActive = activeTab.startsWith('tool-') || activeTab === 'tools-hub';
  const isGenActive = activeTab.startsWith('gen-');
  const isEmbedActive = activeTab === 'embed-export';

  const handleGoogleLogin = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      if (res.user) {
        await syncUserProfile(res.user);
      }
    } catch (err: any) {
      console.error('Login error:', err);
      // Fallback alert or toast
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800">
      {/* Tricolor top border accent */}
      <div className="h-1 w-full flex">
        <div className="h-full w-1/3 bg-orange-500" />
        <div className="h-full w-1/3 bg-white" />
        <div className="h-full w-1/3 bg-green-600" />
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-2">
          {/* Brand */}
          <div 
            onClick={() => setActiveTab('kids-home')}
            className="flex items-center space-x-2.5 cursor-pointer shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 via-amber-500 to-amber-400 p-0.5 shadow-md shadow-orange-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-black text-amber-400 text-sm tracking-tight border border-amber-500/40">
                IOIS
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-white">
                  IOIS <span className="text-amber-400">PUBLICATION</span>
                </span>
                <span className="hidden md:inline-block text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                  भारतीय
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block">
                0-5 Yrs Study • Converters • Card Studio
              </p>
            </div>
          </div>

          {/* Nav Categories */}
          <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar py-1">
            <button
              onClick={() => setActiveTab('kids-home')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition whitespace-nowrap cursor-pointer ${
                isKidsActive
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900 border border-transparent'
              }`}
            >
              <Baby className="w-4 h-4 text-amber-400" />
              <span>0-5 वर्ष बाल शिक्षा</span>
            </button>

            <button
              onClick={() => setActiveTab('tools-hub')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition whitespace-nowrap cursor-pointer ${
                isToolsActive
                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900 border border-transparent'
              }`}
            >
              <Wrench className="w-4 h-4 text-blue-400" />
              <span>कन्वर्ट टूल्स (PDF/Image)</span>
            </button>

            <button
              onClick={() => setActiveTab('gen-id-card')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition whitespace-nowrap cursor-pointer ${
                isGenActive
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900 border border-transparent'
              }`}
            >
              <IdCard className="w-4 h-4 text-emerald-400" />
              <span>कार्ड & बायोडाटा मेकर</span>
            </button>

            <button
              onClick={() => setActiveTab('embed-export')}
              className={`hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition whitespace-nowrap cursor-pointer ${
                isEmbedActive
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900 border border-transparent'
              }`}
            >
              <Code className="w-4 h-4 text-purple-400" />
              <span>Google Site & GitHub</span>
            </button>
          </nav>

          {/* Right actions: Firebase Auth, Saved Drawer, Lock */}
          <div className="flex items-center gap-2 shrink-0">
            {/* User Saved items button */}
            <button
              onClick={onOpenSavedModal}
              className="relative p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-amber-400 border border-slate-800 transition cursor-pointer flex items-center gap-1"
              title="सहेजे गए प्रोजेक्ट और फोटो (Firebase Database)"
            >
              <FolderHeart className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline text-xs font-medium">डॉक्यूमेंट्स</span>
              {savedCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-500 text-slate-950">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Firebase Auth Google user profile */}
            {currentUser ? (
              <div className="flex items-center gap-2 pl-1">
                {currentUser.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt={currentUser.displayName || 'User'}
                    className="w-8 h-8 rounded-full border-2 border-emerald-500"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-emerald-600 font-bold text-white flex items-center justify-center text-xs">
                    {(currentUser.displayName || currentUser.email || 'U')[0].toUpperCase()}
                  </div>
                )}
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-xl bg-slate-900 hover:bg-red-950/60 text-slate-400 hover:text-red-400 border border-slate-800 transition cursor-pointer"
                  title="लॉगआउट (Logout)"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleGoogleLogin}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-md transition cursor-pointer"
                title="Google से सुरक्षित लॉगिन करें ताकि आपकी फाइल्स Firebase में सेव रहें"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Google लॉगिन</span>
              </button>
            )}

            {/* Lock Portal Button */}
            <button
              onClick={onLock}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-amber-400 border border-slate-800 transition cursor-pointer"
              title="पोर्टल सुरक्षित लॉक करें (Lock Portal)"
            >
              <Lock className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
