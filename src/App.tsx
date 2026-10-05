/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { SecurityGate, OFFICIAL_PORTAL_PASSWORD } from './components/SecurityGate';
import { Navbar } from './components/Navbar';
import { KidsSection } from './components/kids/KidsSection';
import { ToolsHub } from './components/tools/ToolsHub';
import { IdCardGenerator } from './components/generators/IdCardGenerator';
import { ShadiCardGenerator } from './components/generators/ShadiCardGenerator';
import { PassportPhotoMaker } from './components/generators/PassportPhotoMaker';
import { BioDataResumeMaker } from './components/generators/BioDataResumeMaker';
import { LetterApplicationMaker } from './components/generators/LetterApplicationMaker';
import { EmbedExportModal } from './components/embed/EmbedExportModal';
import { SavedProjectsModal } from './components/user/SavedProjectsModal';
import { ActiveTab, UserSavedItem } from './types';
import { auth, db, testConnection, handleFirestoreError, OperationType } from './firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { 
  Baby, 
  Wrench, 
  IdCard, 
  Heart, 
  Camera, 
  FileText, 
  Mail, 
  ShieldCheck, 
  Sparkles,
  Layers,
  Code
} from 'lucide-react';

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    return Boolean(localStorage.getItem('iois_portal_auth'));
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>('kids-home');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [savedCount, setSavedCount] = useState<number>(0);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState<boolean>(false);

  // Initialize and check Firestore connection
  useEffect(() => {
    testConnection();
  }, []);

  // Track Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Listen to user's saved items count in Firestore
  useEffect(() => {
    if (!currentUser) {
      setSavedCount(0);
      return;
    }

    const colPath = `users/${currentUser.uid}/savedItems`;
    const q = query(collection(db, 'users', currentUser.uid, 'savedItems'));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setSavedCount(snapshot.size);
      },
      (error) => {
        console.warn('Saved items listener note:', error.message);
      }
    );

    return () => unsubscribe();
  }, [currentUser]);

  const handleLockPortal = () => {
    localStorage.removeItem('iois_portal_auth');
    setIsUnlocked(false);
  };

  // If not unlocked, render the secure password gate
  if (!isUnlocked) {
    return <SecurityGate onUnlock={() => setIsUnlocked(true)} />;
  }

  const isGenTab = ['gen-id-card', 'gen-shadi-card', 'gen-passport-photo', 'gen-biodata-cv', 'gen-letter-app'].includes(activeTab);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-amber-500 selection:text-slate-950">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLock={handleLockPortal}
        currentUser={currentUser}
        onOpenSavedModal={() => setIsSavedModalOpen(true)}
        savedCount={savedCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* If in Generators view, show quick sub-tabs for Card & Document makers */}
        {isGenTab && (
          <div className="bg-slate-900/90 border border-slate-800 p-2 rounded-2xl flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {[
              { id: 'gen-id-card', label: 'ID कार्ड मेकर', icon: IdCard },
              { id: 'gen-shadi-card', label: 'शादी कार्ड मेकर', icon: Heart },
              { id: 'gen-passport-photo', label: 'पासपोर्ट फोटो', icon: Camera },
              { id: 'gen-biodata-cv', label: 'बायोडाटा व CV', icon: FileText },
              { id: 'gen-letter-app', label: 'आवेदन पत्र जनरेटर', icon: Mail }
            ].map((sub) => {
              const Icon = sub.icon;
              const isSelected = activeTab === sub.id;
              return (
                <button
                  key={sub.id}
                  onClick={() => setActiveTab(sub.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-500 text-slate-950 shadow-md font-extrabold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{sub.label}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Tab Routing */}
        {activeTab.startsWith('kids-') && <KidsSection />}
        {activeTab === 'tools-hub' && <ToolsHub />}
        {activeTab === 'gen-id-card' && <IdCardGenerator />}
        {activeTab === 'gen-shadi-card' && <ShadiCardGenerator />}
        {activeTab === 'gen-passport-photo' && <PassportPhotoMaker />}
        {activeTab === 'gen-biodata-cv' && <BioDataResumeMaker />}
        {activeTab === 'gen-letter-app' && <LetterApplicationMaker />}
        {activeTab === 'embed-export' && <EmbedExportModal />}
      </main>

      {/* Saved Items Modal (Firebase Cloud Database) */}
      <SavedProjectsModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        currentUser={currentUser}
      />

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/90 py-8 px-4 sm:px-6 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 font-black flex items-center justify-center text-xs">
              IOIS
            </div>
            <div>
              <p className="font-bold text-white text-sm">
                IOIS INDIAN PUBLICATION (भारतीय प्रकाशन)
              </p>
              <p className="text-[11px] text-slate-400">
                0-5 वर्ष बाल शिक्षा सामग्री • कनवर्टर टूल्स • शादी व ID कार्ड स्टूडियो
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px]">
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Firebase Cloud DB एन्क्रिप्टेड</span>
            </span>
            <button
              onClick={() => setActiveTab('embed-export')}
              className="text-amber-400 hover:underline cursor-pointer flex items-center gap-1"
            >
              <Code className="w-3.5 h-3.5" />
              <span>Google Sites & GitHub कोड</span>
            </button>
            <button
              onClick={handleLockPortal}
              className="text-slate-400 hover:text-white cursor-pointer"
            >
              🔒 पोर्टल लॉक करें
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
