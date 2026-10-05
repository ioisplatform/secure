import React, { useState } from 'react';
import { PdfJpgConverter } from './PdfJpgConverter';
import { PhotoCompressor } from './PhotoCompressor';
import { ImageEnhancer } from './ImageEnhancer';
import { ArrowRightLeft, Sliders, Sparkles, FileText, Image, Layers, ShieldCheck } from 'lucide-react';

interface ToolsHubProps {
  initialSubTab?: 'pdf-jpg' | 'photo-compress' | 'image-enhance';
}

export const ToolsHub: React.FC<ToolsHubProps> = ({ initialSubTab = 'pdf-jpg' }) => {
  const [subTab, setSubTab] = useState<'pdf-jpg' | 'photo-compress' | 'image-enhance'>(initialSubTab);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 p-6 sm:p-8 text-white shadow-xl border border-blue-400/30">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/40 text-blue-200 text-xs font-extrabold backdrop-blur-md">
            <Layers className="w-3.5 h-3.5 fill-current" />
            <span>IOIS डिजिटल कन्वर्ट टूल्स केंद्र (All-in-One Utility Hub)</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white drop-shadow-sm">
            PDF, JPG एवं फोटो कन्वर्ट व कंप्रेस टूल्स
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 font-medium leading-relaxed">
            JPG से PDF बनाना, PDF से JPG निकालना, सरकारी फॉर्म हेतु 20KB/50KB फोटो कंप्रेशन, और धुंधली फोटो को साफ़ व HD बनाने के सभी टूल्स एक ही स्थान पर।
          </p>
        </div>
      </div>

      {/* Tools Menu Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          onClick={() => setSubTab('pdf-jpg')}
          className={`p-4 rounded-2xl border transition-all flex items-center gap-4 text-left cursor-pointer ${
            subTab === 'pdf-jpg'
              ? 'bg-blue-600/20 border-blue-400 shadow-lg shadow-blue-500/15'
              : 'bg-slate-900/90 border-slate-800 hover:border-slate-700 text-slate-300'
          }`}
        >
          <div className="p-3 rounded-xl bg-blue-500/20 text-blue-400">
            <ArrowRightLeft className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-white text-base">PDF ⇄ JPG कनवर्टर</h3>
            <p className="text-xs text-slate-400">JPG से PDF बनाएं या PDF से JPG</p>
          </div>
        </button>

        <button
          onClick={() => setSubTab('photo-compress')}
          className={`p-4 rounded-2xl border transition-all flex items-center gap-4 text-left cursor-pointer ${
            subTab === 'photo-compress'
              ? 'bg-amber-600/20 border-amber-400 shadow-lg shadow-amber-500/15'
              : 'bg-slate-900/90 border-slate-800 hover:border-slate-700 text-slate-300'
          }`}
        >
          <div className="p-3 rounded-xl bg-amber-500/20 text-amber-400">
            <Sliders className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-white text-base">फोटो कंप्रेशन टूल</h3>
            <p className="text-xs text-slate-400">20KB, 50KB, 100KB सरकारी फॉर्म साइज</p>
          </div>
        </button>

        <button
          onClick={() => setSubTab('image-enhance')}
          className={`p-4 rounded-2xl border transition-all flex items-center gap-4 text-left cursor-pointer ${
            subTab === 'image-enhance'
              ? 'bg-emerald-600/20 border-emerald-400 shadow-lg shadow-emerald-500/15'
              : 'bg-slate-900/90 border-slate-800 hover:border-slate-700 text-slate-300'
          }`}
        >
          <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-white text-base">लो से हाई क्वालिटी (HD)</h3>
            <p className="text-xs text-slate-400">धुंधली फोटो साफ व 2X/4X HD अपस्केलर</p>
          </div>
        </button>
      </div>

      {/* Render Active Tool */}
      <div className="mt-4">
        {subTab === 'pdf-jpg' && <PdfJpgConverter />}
        {subTab === 'photo-compress' && <PhotoCompressor />}
        {subTab === 'image-enhance' && <ImageEnhancer />}
      </div>
    </div>
  );
};
