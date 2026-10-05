import React, { useRef, useState, useEffect } from 'react';
import { Eraser, Download, Trash2, Paintbrush, Sparkles, CloudUpload } from 'lucide-react';
import confetti from 'canvas-confetti';
import { auth, db, handleFirestoreError, OperationType } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';

export const DrawingPad: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState('#f59e0b');
  const [brushSize, setBrushSize] = useState(6);
  const [tool, setTool] = useState<'brush' | 'eraser' | 'stamp'>('brush');
  const [selectedStamp, setSelectedStamp] = useState('⭐');
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  const colors = [
    '#f59e0b', '#ef4444', '#10b981', '#3b82f6', 
    '#8b5cf6', '#ec4899', '#ffffff', '#000000'
  ];

  const stamps = ['⭐', '🐱', '🌸', '🚗', '🍎', '🎈', '🐘', '🦋', '🇮🇳'];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set initial canvas background
    ctx.fillStyle = '#0f172a'; // slate-900
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const startDraw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    if (tool === 'stamp') {
      ctx.font = '36px sans-serif';
      ctx.fillText(selectedStamp, x - 18, y + 14);
      confetti({ particleCount: 15, spread: 40 });
      return;
    }

    setIsDrawing(true);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (tool === 'eraser') {
      ctx.strokeStyle = '#0f172a';
    } else {
      ctx.strokeStyle = brushColor;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDraw = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const downloadDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `iois-kids-drawing-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    confetti({ particleCount: 30, spread: 60 });
  };

  const saveToFirebase = async () => {
    if (!auth.currentUser) {
      alert('कृपया पहले Google से लॉगिन करें ताकि आपकी पेंटिंग Firebase क्लाउड में सुरक्षित सहेजी जा सके!');
      return;
    }
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      setSaveStatus('Saving to Firebase...');
      const dataUrl = canvas.toDataURL('image/png');
      const itemId = `drawing_${Date.now()}`;
      const path = `users/${auth.currentUser.uid}/savedItems/${itemId}`;
      
      await setDoc(doc(db, 'users', auth.currentUser.uid, 'savedItems', itemId), {
        id: itemId,
        userId: auth.currentUser.uid,
        category: 'drawing',
        title: `Kids Drawing ${new Date().toLocaleDateString()}`,
        data: JSON.stringify({ brushColor, brushSize }),
        previewImage: dataUrl,
        createdAt: new Date().toISOString()
      });
      setSaveStatus('चित्रकला Firebase में सुरक्षित सहेज दी गई! ✅');
      setTimeout(() => setSaveStatus(null), 3000);
      confetti({ particleCount: 40, spread: 70 });
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `users/${auth.currentUser.uid}/savedItems`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/80 border border-slate-800 p-4 sm:p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎨</span>
            <h2 className="text-xl sm:text-2xl font-black text-amber-300 font-['Baloo_2',sans-serif]">
              बाल चित्रकला एवं स्टैम्प पैड (Kids Magic Art Canvas)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            रंग-बिरंगे ब्रश, आकर्षक स्टैम्प्स और डाउनलोड व क्लाउड सेव विकल्प।
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={downloadDrawing}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>चित्र डाउनलोड</span>
          </button>
          <button
            onClick={saveToFirebase}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition cursor-pointer"
          >
            <CloudUpload className="w-4 h-4" />
            <span>Firebase सेव</span>
          </button>
          <button
            onClick={clearCanvas}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-red-950 text-slate-300 hover:text-red-300 font-bold text-xs border border-slate-700 transition cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>साफ करें (Clear)</span>
          </button>
        </div>
      </div>

      {saveStatus && (
        <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-center text-xs font-bold animate-fadeIn">
          {saveStatus}
        </div>
      )}

      {/* Canvas Tool Controls */}
      <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4">
        {/* Tools (Brush vs Eraser vs Stamp) */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800">
          <button
            onClick={() => setTool('brush')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              tool === 'brush' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Paintbrush className="w-3.5 h-3.5" />
            <span>ब्रश</span>
          </button>
          <button
            onClick={() => setTool('eraser')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              tool === 'eraser' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Eraser className="w-3.5 h-3.5" />
            <span>इरेज़र</span>
          </button>
          <button
            onClick={() => setTool('stamp')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              tool === 'stamp' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>स्टैम्प</span>
          </button>
        </div>

        {/* Colors Palette */}
        {tool === 'brush' && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">रंग:</span>
            <div className="flex items-center gap-1.5">
              {colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setBrushColor(c)}
                  style={{ backgroundColor: c }}
                  className={`w-7 h-7 rounded-full border-2 transition transform cursor-pointer ${
                    brushColor === c ? 'scale-125 border-white shadow-md' : 'border-slate-800'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Stamps Selector */}
        {tool === 'stamp' && (
          <div className="flex items-center gap-1.5 overflow-x-auto">
            <span className="text-xs text-slate-400">चुनें:</span>
            {stamps.map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStamp(st)}
                className={`p-1.5 rounded-lg text-xl transition cursor-pointer ${
                  selectedStamp === st ? 'bg-amber-500/20 border border-amber-400 scale-125' : 'hover:bg-slate-800'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        )}

        {/* Brush Size */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">आकार:</span>
          <input
            type="range"
            min="2"
            max="30"
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            className="w-24 accent-amber-500"
          />
          <span className="text-xs text-amber-400 font-mono w-4">{brushSize}</span>
        </div>
      </div>

      {/* Main Canvas Box */}
      <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl p-3 shadow-2xl flex justify-center overflow-hidden">
        <canvas
          ref={canvasRef}
          width={800}
          height={480}
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={stopDraw}
          onMouseLeave={stopDraw}
          onTouchStart={startDraw}
          onTouchMove={draw}
          onTouchEnd={stopDraw}
          className="rounded-2xl cursor-crosshair max-w-full touch-none shadow-inner border border-slate-800"
        />
      </div>
    </div>
  );
};
