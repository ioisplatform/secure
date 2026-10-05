import React, { useState } from 'react';
import { Copy, CheckCircle2, Code, Globe, Github, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export const EmbedExportModal: React.FC = () => {
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const currentAppUrl = window.location.href.split('?')[0];

  const googleSitesEmbedCode = `<!-- IOIS PLATFORM - GOOGLE SITES FULL RESPONSIVE EMBED -->
<div style="position: relative; width: 100%; height: 100vh; min-height: 800px; overflow: hidden; border-radius: 16px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);">
  <iframe 
    src="${currentAppUrl}" 
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;" 
    allow="camera; microphone; clipboard-read; clipboard-write; display-capture; autoplay"
    loading="lazy"
    title="IOIS Indian Publication Platform">
  </iframe>
</div>`;

  const githubIndexHtmlCode = `<!doctype html>
<html lang="hi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>IOIS PLATFORM - Indian Publication & Multi-Tool Studio</title>
    <meta name="description" content="IOIS Indian Publication - 0-5 Years Kid Study Material, Document Generators and PDF/Photo Conversion Tools." />
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body, html { width: 100%; height: 100%; overflow: hidden; background: #020617; font-family: sans-serif; }
      iframe { width: 100%; height: 100%; border: none; }
    </style>
  </head>
  <body>
    <iframe 
      src="${currentAppUrl}" 
      allow="camera; microphone; clipboard-read; clipboard-write; fullscreen"
      title="IOIS Platform">
    </iframe>
  </body>
</html>`;

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
    confetti({ particleCount: 25, spread: 50 });
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/80 border border-slate-800 p-4 sm:p-6 rounded-2xl">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌐</span>
          <h2 className="text-xl sm:text-2xl font-black text-purple-300">
            Google Sites एवं GitHub Pages एक्सपोर्ट कोड (Export Codes)
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 mt-1">
          अपने IOIS Platform को अपनी स्वयं की Google Site या GitHub Pages रिपोजिटरी पर सीधे लाइव करने के लिए रेडी-टू-यूज़ कोड कॉपी करें।
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Google Sites Box */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <Globe className="w-5 h-5" />
                <span>1. Google Sites के लिए एम्बेड कोड (Embed Code)</span>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300">
                HTML Embed
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Google Site पर जाकर <b>Insert ➔ Embed ➔ Embed Code</b> में यह कोड पेस्ट करें।
            </p>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto max-h-48">
              <pre>{googleSitesEmbedCode}</pre>
            </div>
          </div>

          <button
            onClick={() => handleCopy(googleSitesEmbedCode, 'gsite')}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2 transition cursor-pointer"
          >
            {copiedType === 'gsite' ? <CheckCircle2 className="w-4 h-4 text-emerald-950" /> : <Copy className="w-4 h-4" />}
            <span>{copiedType === 'gsite' ? 'Google Sites कोड कॉपी हो गया!' : 'Google Sites कोड कॉपी करें'}</span>
          </button>
        </div>

        {/* GitHub Pages Box */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sky-400 font-bold text-base">
                <Github className="w-5 h-5" />
                <span>2. GitHub Pages के लिए index.html</span>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300">
                index.html
              </span>
            </div>
            <p className="text-xs text-slate-400">
              अपनी GitHub Repository की मुख्य डायरेक्टरी में <b>index.html</b> नाम से नई फाइल बनाकर यह कोड पेस्ट करें।
            </p>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto max-h-48">
              <pre>{githubIndexHtmlCode}</pre>
            </div>
          </div>

          <button
            onClick={() => handleCopy(githubIndexHtmlCode, 'github')}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-black text-sm flex items-center justify-center gap-2 transition cursor-pointer"
          >
            {copiedType === 'github' ? <CheckCircle2 className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
            <span>{copiedType === 'github' ? 'GitHub index.html कॉपी हो गया!' : 'GitHub index.html कोड कॉपी करें'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
