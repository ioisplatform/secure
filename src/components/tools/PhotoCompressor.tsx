import React, { useState, useRef } from 'react';
import { Upload, Download, Sparkles, Sliders, ArrowRight, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const PhotoCompressor: React.FC = () => {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [originalSizeKb, setOriginalSizeKb] = useState<number>(0);

  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [compressedSizeKb, setCompressedSizeKb] = useState<number>(0);
  const [targetKb, setTargetKb] = useState<number>(50);
  const [quality, setQuality] = useState<number>(0.8);
  const [isCompressing, setIsCompressing] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setOriginalFile(file);
    const url = URL.createObjectURL(file);
    setOriginalUrl(url);
    const sizeInKb = Math.round(file.size / 1024);
    setOriginalSizeKb(sizeInKb);

    // Initial compress
    compressImage(file, quality);
  };

  const compressImage = (file: File, q: number) => {
    setIsCompressing(true);
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      // Scale down slightly if image is massive to achieve target KB
      const maxDim = 1600;
      if (width > maxDim || height > maxDim) {
        if (width > height) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (!blob) return;
          const newUrl = URL.createObjectURL(blob);
          setCompressedUrl(newUrl);
          setCompressedSizeKb(Math.round(blob.size / 1024));
          setIsCompressing(false);
        },
        'image/jpeg',
        q
      );
    };
  };

  const applyPreset = (presetKb: number) => {
    setTargetKb(presetKb);
    if (!originalFile) return;

    // Approximate quality based on ratio
    const currentKb = originalSizeKb || 500;
    const ratio = Math.min(1, Math.max(0.1, presetKb / currentKb));
    const newQ = Math.max(0.15, Math.min(0.95, ratio * 0.85));
    setQuality(Number(newQ.toFixed(2)));
    compressImage(originalFile, newQ);
  };

  const handleSliderChange = (newQ: number) => {
    setQuality(newQ);
    if (originalFile) {
      compressImage(originalFile, newQ);
    }
  };

  const downloadCompressed = () => {
    if (!compressedUrl) return;
    const link = document.createElement('a');
    link.href = compressedUrl;
    link.download = `compressed-${targetKb}kb-${originalFile?.name || 'photo.jpg'}`;
    link.click();
    confetti({ particleCount: 30, spread: 60 });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/80 border border-slate-800 p-4 sm:p-6 rounded-2xl">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🗜️</span>
          <h2 className="text-xl sm:text-2xl font-black text-amber-300">
            फोटो कंप्रेशन टूल (Smart Photo Compression Tool)
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 mt-1">
          फोटो का साइज 20KB, 50KB, 100KB या अपनी इच्छानुसार कम करें - बिना स्पष्टता और क्वालिटी खोए।
        </p>
      </div>

      {/* Upload Zone */}
      {!originalUrl ? (
        <div className="bg-slate-900/90 border-2 border-dashed border-slate-700 hover:border-amber-500 rounded-3xl p-10 text-center transition relative cursor-pointer group">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          />
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition">
              <Upload className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white">
              कंप्रेस करने के लिए फोटो चुनें (Upload Photo)
            </h3>
            <p className="text-xs text-slate-400">
              पासपोर्ट साइज फोटो, सरकारी परीक्षा फॉर्म फोटो (SSC, UPSC, Railway) या कोई भी तस्वीर
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Controls Bar & Presets */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-amber-400" />
                <span>सरकारी फॉर्म व पोर्टल प्रीसेट (Govt Job Quick Presets):</span>
              </h3>

              <div className="flex flex-wrap items-center gap-2">
                {[
                  { label: '20 KB (SSC)', kb: 20 },
                  { label: '50 KB (UPSC/IBPS)', kb: 50 },
                  { label: '100 KB (ID Card)', kb: 100 },
                  { label: '200 KB (Web)', kb: 200 }
                ].map((p) => (
                  <button
                    key={p.kb}
                    onClick={() => applyPreset(p.kb)}
                    className="px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-amber-500/20 hover:border-amber-400 border border-slate-800 text-xs font-bold text-amber-300 transition cursor-pointer"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom slider */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">क्वालिटी स्तर (Quality Level):</span>
                  <span className="text-amber-400 font-mono font-bold">{Math.round(quality * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="0.95"
                  step="0.05"
                  value={quality}
                  onChange={(e) => handleSliderChange(parseFloat(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3">
                <label className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700 transition cursor-pointer">
                  दूसरी फोटो चुनें
                  <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                </label>

                <button
                  onClick={downloadCompressed}
                  disabled={!compressedUrl || isCompressing}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition active:scale-95 cursor-pointer disabled:opacity-50"
                >
                  <Download className="w-4 h-4" />
                  <span>कंप्रेस्ड फोटो डाउनलोड</span>
                </button>
              </div>
            </div>
          </div>

          {/* Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Original Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">मूल फोटो (Original)</span>
                <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-200 text-xs font-mono font-bold">
                  {originalSizeKb} KB
                </span>
              </div>
              <div className="h-72 rounded-2xl bg-slate-950 flex items-center justify-center overflow-hidden border border-slate-800">
                <img src={originalUrl} alt="Original" className="max-h-full max-w-full object-contain" />
              </div>
            </div>

            {/* Compressed Card */}
            <div className="bg-slate-900 border-2 border-emerald-500/40 rounded-3xl p-5 space-y-3 shadow-xl shadow-emerald-500/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold text-emerald-300">कंप्रेस्ड फोटो (Compressed)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold border border-emerald-500/30">
                    {compressedSizeKb} KB
                  </span>
                  <span className="text-[10px] text-emerald-400 font-bold">
                    ({Math.round(((originalSizeKb - compressedSizeKb) / originalSizeKb) * 100)}% छोटा)
                  </span>
                </div>
              </div>
              <div className="h-72 rounded-2xl bg-slate-950 flex items-center justify-center overflow-hidden border border-slate-800">
                {isCompressing ? (
                  <div className="text-xs text-amber-400 animate-pulse">प्रोसेसिंग जारी है...</div>
                ) : compressedUrl ? (
                  <img src={compressedUrl} alt="Compressed" className="max-h-full max-w-full object-contain" />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
