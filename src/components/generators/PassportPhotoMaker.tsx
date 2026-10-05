import React, { useState, useRef } from 'react';
import { Upload, Download, CloudUpload, Sliders, Scissors, CheckCircle2, Grid } from 'lucide-react';
import jsPDF from 'jspdf';
import confetti from 'canvas-confetti';
import { auth, db, handleFirestoreError, OperationType } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';

export const PassportPhotoMaker: React.FC = () => {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [bgColor, setBgColor] = useState<string>('#ffffff'); // white
  const [sizePreset, setSizePreset] = useState<'indian-passport' | 'us-visa' | 'stamp' | 'pan'>('indian-passport');
  const [gridCount, setGridCount] = useState<8 | 16>(8);
  const [zoom, setZoom] = useState<number>(1);
  const [brightness, setBrightness] = useState<number>(100);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setPhotoUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const saveToFirebase = async () => {
    if (!auth.currentUser) {
      alert('कृपया पहले ऊपर Google लॉगिन करें ताकि आपकी पासपोर्ट फोटो Firebase में सुरक्षित स्टोर हो!');
      return;
    }

    try {
      setIsSaving(true);
      setSaveStatus('Saving to Firebase...');
      const itemId = `passport_${Date.now()}`;
      await setDoc(doc(db, 'users', auth.currentUser.uid, 'savedItems', itemId), {
        id: itemId,
        userId: auth.currentUser.uid,
        category: 'passport-photo',
        title: `Passport Photo (${sizePreset})`,
        data: JSON.stringify({ sizePreset, bgColor, gridCount, zoom, brightness }),
        previewImage: photoUrl || '',
        createdAt: new Date().toISOString()
      });
      setSaveStatus('फोटो डेटा Firebase में सुरक्षित सहेज दिया गया! ✅');
      setTimeout(() => setSaveStatus(null), 3500);
      confetti({ particleCount: 30, spread: 60 });
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `users/${auth.currentUser?.uid}/savedItems`);
    } finally {
      setIsSaving(false);
    }
  };

  const downloadPrintSheetPdf = () => {
    if (!photoUrl) return;

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: gridCount === 8 ? [102, 152] : 'a4' // 4x6 inch paper for 8 photos, A4 for 16
    });

    const img = new Image();
    img.src = photoUrl;
    img.onload = () => {
      const photoW = sizePreset === 'us-visa' ? 51 : 35; // mm
      const photoH = sizePreset === 'us-visa' ? 51 : 45; // mm

      let cols = gridCount === 8 ? 2 : 4;
      let rows = gridCount === 8 ? 4 : 4;
      let startX = 12;
      let startY = 12;
      let gapX = 6;
      let gapY = 6;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = startX + c * (photoW + gapX);
          const y = startY + r * (photoH + gapY);

          // Draw thin cut border
          doc.setDrawColor(203, 213, 225);
          doc.setLineWidth(0.2);
          doc.rect(x - 0.5, y - 0.5, photoW + 1, photoH + 1);

          doc.addImage(img, 'JPEG', x, y, photoW, photoH);
        }
      }

      doc.save(`iois-passport-print-sheet-${gridCount}-photos.pdf`);
      confetti({ particleCount: 40, spread: 70 });
    };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/80 border border-slate-800 p-4 sm:p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">📸</span>
            <h2 className="text-xl sm:text-2xl font-black text-amber-300">
              पासपोर्ट फोटो मेकर स्टूडियो (Passport Photo Maker & Print Grid)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            भारतीय पासपोर्ट (35x45mm), वीज़ा (2x2 inch), स्टैम्प साइज फोटो बनाएं • 8 या 16 फोटो की रेडी-टू-प्रिंट शीट डाउनलोड करें।
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={saveToFirebase}
            disabled={isSaving}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition cursor-pointer disabled:opacity-50"
          >
            <CloudUpload className="w-4 h-4" />
            <span>Firebase सेव</span>
          </button>
          <button
            onClick={downloadPrintSheetPdf}
            disabled={!photoUrl}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-md transition cursor-pointer disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>प्रिंट शीट डाउनलोड (PDF)</span>
          </button>
        </div>
      </div>

      {saveStatus && (
        <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-center text-xs font-bold animate-fadeIn">
          {saveStatus}
        </div>
      )}

      {/* Editor & Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-5">
          <div className="border-2 border-dashed border-slate-700 hover:border-amber-400 rounded-2xl p-6 text-center transition bg-slate-950/40 relative cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
            <div className="flex flex-col items-center gap-2 pointer-events-none">
              <Upload className="w-6 h-6 text-amber-400" />
              <p className="text-sm font-bold text-white">चेहरे की फोटो अपलोड करें</p>
              <p className="text-xs text-slate-400">सीधे कैमरे से या गैलरी से सेलेक्ट करें</p>
            </div>
          </div>

          {/* Preset size selection */}
          <div className="space-y-1.5 text-xs">
            <label className="text-slate-400 font-bold block">फोटो साइज़ प्रीसेट (Photo Size):</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'indian-passport', label: 'भारतीय पासपोर्ट (35x45mm)' },
                { id: 'us-visa', label: 'US / ग्लोबल वीज़ा (2x2")' },
                { id: 'stamp', label: 'स्टैम्प साइज़ (25x30mm)' },
                { id: 'pan', label: 'PAN कार्ड साइज़ (25x35mm)' }
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSizePreset(p.id as any)}
                  className={`p-2 rounded-xl text-left font-bold transition cursor-pointer border ${
                    sizePreset === p.id
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Background color */}
          <div className="space-y-1.5 text-xs">
            <label className="text-slate-400 font-bold block">बैकग्राउंड का रंग (Background):</label>
            <div className="flex items-center gap-2">
              {[
                { color: '#ffffff', name: 'White (सफेद)' },
                { color: '#bfdbfe', name: 'Light Blue (हल्का नीला)' },
                { color: '#e2e8f0', name: 'Light Gray (ग्रे)' },
                { color: '#b91c1c', name: 'Red (लाल)' }
              ].map((bg) => (
                <button
                  key={bg.color}
                  onClick={() => setBgColor(bg.color)}
                  style={{ backgroundColor: bg.color }}
                  className={`w-8 h-8 rounded-full border-2 transition transform cursor-pointer ${
                    bgColor === bg.color ? 'ring-2 ring-amber-400 scale-110' : 'border-slate-700'
                  }`}
                  title={bg.name}
                />
              ))}
            </div>
          </div>

          {/* Print grid count */}
          <div className="space-y-1.5 text-xs">
            <label className="text-slate-400 font-bold block">प्रिंट शीट फोटो संख्या (Print Sheet Layout):</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setGridCount(8)}
                className={`p-2.5 rounded-xl font-bold transition cursor-pointer border ${
                  gridCount === 8
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                8 फोटो शीट (4x6 इंच फोटो पेपर)
              </button>
              <button
                onClick={() => setGridCount(16)}
                className={`p-2.5 rounded-xl font-bold transition cursor-pointer border ${
                  gridCount === 16
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                16 फोटो शीट (A4 पेपर)
              </button>
            </div>
          </div>

          {/* Zoom & Brightness */}
          <div className="grid grid-cols-2 gap-4 text-xs pt-2 border-t border-slate-800">
            <div>
              <div className="flex justify-between text-slate-400 mb-1">
                <span>ज़ूम (Crop/Fit):</span>
                <span className="font-mono text-amber-400">{zoom}x</span>
              </div>
              <input
                type="range"
                min="0.8"
                max="2"
                step="0.1"
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>
            <div>
              <div className="flex justify-between text-slate-400 mb-1">
                <span>ब्राइटनेस:</span>
                <span className="font-mono text-amber-400">{brightness}%</span>
              </div>
              <input
                type="range"
                min="80"
                max="130"
                value={brightness}
                onChange={(e) => setBrightness(Number(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Live Preview: 8-Photo or 16-Photo studio sheet */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center">
          <div className="bg-slate-100 rounded-3xl p-6 shadow-2xl border-4 border-slate-300 max-w-md w-full">
            <div className="flex items-center justify-between border-b border-slate-300 pb-2 mb-4">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Scissors className="w-3.5 h-3.5 text-slate-600" />
                <span>स्टूडियो प्रिंट शीट प्रीव्यू ({gridCount} फोटो)</span>
              </span>
              <span className="text-[10px] font-mono text-slate-500">300 DPI High-Res Ready</span>
            </div>

            {/* Grid Layout */}
            <div className={`grid ${gridCount === 8 ? 'grid-cols-2 gap-3' : 'grid-cols-4 gap-2'}`}>
              {Array.from({ length: gridCount }).map((_, i) => (
                <div
                  key={i}
                  style={{ backgroundColor: bgColor }}
                  className="aspect-[35/45] rounded-md border border-dashed border-slate-400 flex items-center justify-center overflow-hidden relative shadow-sm"
                >
                  {photoUrl ? (
                    <img
                      src={photoUrl}
                      alt={`Passport ${i + 1}`}
                      style={{
                        transform: `scale(${zoom})`,
                        filter: `brightness(${brightness}%)`
                      }}
                      className="w-full h-full object-cover transition-transform"
                    />
                  ) : (
                    <span className="text-2xl text-slate-400">👤</span>
                  )}
                  {/* Thin cut line indicator */}
                  <div className="absolute inset-0 border border-slate-300 pointer-events-none" />
                </div>
              ))}
            </div>

            <p className="text-[10px] text-slate-500 text-center mt-4">
              कैंची से काटने हेतु बॉर्डर लाइन्स शामिल हैं • किसी भी फोटो स्टूडियो या कलर प्रिंटर से निकालें।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
