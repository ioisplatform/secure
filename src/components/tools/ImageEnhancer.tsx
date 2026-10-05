import React, { useState, useRef } from 'react';
import { Upload, Sparkles, Wand2, Download, RefreshCw, ZoomIn, Sliders } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ImageEnhancer: React.FC = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [brightness, setBrightness] = useState<number>(105);
  const [contrast, setContrast] = useState<number>(115);
  const [saturate, setSaturate] = useState<number>(110);
  const [sharpness, setSharpness] = useState<number>(1);
  const [scaleFactor, setScaleFactor] = useState<number>(2); // 2x upscale
  const [targetFormat, setTargetFormat] = useState<'image/jpeg' | 'image/png' | 'image/webp'>('image/jpeg');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setImageSrc(url);
  };

  const autoEnhance = () => {
    setBrightness(110);
    setContrast(120);
    setSaturate(115);
    setSharpness(1.5);
    confetti({ particleCount: 25, spread: 50 });
  };

  const resetFilters = () => {
    setBrightness(100);
    setContrast(100);
    setSaturate(100);
    setSharpness(1);
    setScaleFactor(1);
  };

  const downloadEnhancedImage = () => {
    if (!imageSrc) return;
    setIsProcessing(true);

    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const w = img.width * scaleFactor;
      const h = img.height * scaleFactor;
      canvas.width = w;
      canvas.height = h;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Apply CSS-like filters on canvas
      ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%)`;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      ctx.drawImage(img, 0, 0, w, h);

      const ext = targetFormat === 'image/png' ? 'png' : targetFormat === 'image/webp' ? 'webp' : 'jpg';
      const link = document.createElement('a');
      link.download = `iois-hd-enhanced-${scaleFactor}x.${ext}`;
      link.href = canvas.toDataURL(targetFormat, 0.98);
      link.click();

      setIsProcessing(false);
      confetti({ particleCount: 35, spread: 60 });
    };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/80 border border-slate-800 p-4 sm:p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">✨</span>
            <h2 className="text-xl sm:text-2xl font-black text-amber-300">
              लो-क्वालिटी से हाई-क्वालिटी इमेज एन्हांसर (Photo HD Enhancer & Upscaler)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            धुंधली व लो-रेजोल्यूशन फोटो को साफ, ब्राइट, हाई-कंट्रास्ट और 2X / 4X सुपर रेजोल्यूशन में बदलें।
          </p>
        </div>

        {imageSrc && (
          <div className="flex items-center gap-2">
            <button
              onClick={autoEnhance}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs shadow-md transition cursor-pointer"
            >
              <Wand2 className="w-3.5 h-3.5" />
              <span>ऑटो एन्हांस (Auto HD)</span>
            </button>
            <button
              onClick={resetFilters}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>रीसेट</span>
            </button>
          </div>
        )}
      </div>

      {!imageSrc ? (
        <div className="bg-slate-900/90 border-2 border-dashed border-slate-700 hover:border-amber-500 rounded-3xl p-10 text-center transition relative cursor-pointer group">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          />
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition">
              <Upload className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white">
              साफ व HD बनाने के लिए फोटो अपलोड करें
            </h3>
            <p className="text-xs text-slate-400">
              पुरानी धुंधली फोटो, पासपोर्ट साइज इमेज, आधार/पैन कार्ड फोटो या शादी कार्ड की फोटो
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Controls */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">ब्राइटनेस (Brightness):</span>
                  <span className="text-amber-400 font-mono">{brightness}%</span>
                </div>
                <input
                  type="range"
                  min="80"
                  max="150"
                  value={brightness}
                  onChange={(e) => setBrightness(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">कंट्रास्ट (Contrast / स्पष्टता):</span>
                  <span className="text-amber-400 font-mono">{contrast}%</span>
                </div>
                <input
                  type="range"
                  min="80"
                  max="160"
                  value={contrast}
                  onChange={(e) => setContrast(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">रंग जीवंतता (Saturation):</span>
                  <span className="text-amber-400 font-mono">{saturate}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="180"
                  value={saturate}
                  onChange={(e) => setSaturate(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">सुपर स्केलिंग (HD Upscale):</span>
                  <span className="text-emerald-400 font-mono font-bold">{scaleFactor}X HD</span>
                </div>
                <select
                  value={scaleFactor}
                  onChange={(e) => setScaleFactor(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-1.5"
                >
                  <option value={1}>1X (सामान्य आकार)</option>
                  <option value={2}>2X HD (डबल रेजोल्यूशन)</option>
                  <option value={4}>4X Ultra HD (अति उच्च स्पष्टता)</option>
                </select>
              </div>
            </div>

            {/* Format choice & download */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-800">
              <div className="flex items-center gap-3 text-xs">
                <span className="text-slate-400">आउटपुट फॉर्मेट:</span>
                <div className="flex gap-1.5">
                  {[
                    { id: 'image/jpeg', label: 'JPG' },
                    { id: 'image/png', label: 'PNG' },
                    { id: 'image/webp', label: 'WEBP' }
                  ].map((fmt) => (
                    <button
                      key={fmt.id}
                      onClick={() => setTargetFormat(fmt.id as any)}
                      className={`px-2.5 py-1 rounded-md font-bold transition cursor-pointer ${
                        targetFormat === fmt.id
                          ? 'bg-amber-500 text-slate-950'
                          : 'bg-slate-950 text-slate-400 border border-slate-800'
                      }`}
                    >
                      {fmt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <label className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700 transition cursor-pointer">
                  अन्य फोटो चुनें
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>

                <button
                  onClick={downloadEnhancedImage}
                  disabled={isProcessing}
                  className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-orange-500/20 active:scale-95 transition cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>{isProcessing ? 'तैयार हो रहा है...' : 'HD इमेज डाउनलोड करें'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Live Preview Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-3">
              <span className="text-xs font-bold text-slate-400">मूल फोटो (Original Preview)</span>
              <div className="h-80 rounded-2xl bg-slate-950 flex items-center justify-center overflow-hidden border border-slate-800">
                <img src={imageSrc} alt="Original" className="max-h-full max-w-full object-contain" />
              </div>
            </div>

            <div className="bg-slate-900 border-2 border-amber-500/40 rounded-3xl p-5 space-y-3 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-300">एन्हांस्ड HD फोटो (Enhanced HD Preview)</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                  {scaleFactor}X Ultra HD
                </span>
              </div>
              <div className="h-80 rounded-2xl bg-slate-950 flex items-center justify-center overflow-hidden border border-slate-800">
                <img
                  src={imageSrc}
                  alt="Enhanced"
                  style={{
                    filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%)`
                  }}
                  className="max-h-full max-w-full object-contain transition-all"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
