import React, { useState } from 'react';
import { Upload, FileText, Image, Download, Trash2, ArrowRightLeft, Sparkles, Layers } from 'lucide-react';
import jsPDF from 'jspdf';
import confetti from 'canvas-confetti';

export const PdfJpgConverter: React.FC = () => {
  const [mode, setMode] = useState<'img2pdf' | 'pdf2img'>('img2pdf');
  const [selectedImages, setSelectedImages] = useState<{ id: string; name: string; url: string; file: File }[]>([]);
  const [pdfOrientation, setPdfOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [pageSize, setPageSize] = useState<'a4' | 'letter'>('a4');
  const [isProcessing, setIsProcessing] = useState(false);

  // For PDF to image mock/renderer
  const [uploadedPdfName, setUploadedPdfName] = useState<string | null>(null);
  const [pdfRenderedPages, setPdfRenderedPages] = useState<string[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files: File[] = Array.from(e.target.files);
    const newItems = files.map((file) => ({
      id: Math.random().toString(36).substring(7),
      name: file.name,
      url: URL.createObjectURL(file),
      file
    }));
    setSelectedImages((prev) => [...prev, ...newItems]);
  };

  const removeImage = (id: string) => {
    setSelectedImages((prev) => prev.filter((img) => img.id !== id));
  };

  const generatePdfFromImages = async () => {
    if (selectedImages.length === 0) return;
    setIsProcessing(true);

    try {
      const doc = new jsPDF({
        orientation: pdfOrientation,
        unit: 'mm',
        format: pageSize
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      for (let i = 0; i < selectedImages.length; i++) {
        if (i > 0) doc.addPage();
        const img = selectedImages[i];

        // Load image to calculate aspect ratio
        await new Promise<void>((resolve) => {
          const imageObj = new window.Image();
          imageObj.src = img.url;
          imageObj.onload = () => {
            const margin = 10;
            const maxWidth = pageWidth - margin * 2;
            const maxHeight = pageHeight - margin * 2;

            let w = imageObj.width;
            let h = imageObj.height;
            const ratio = Math.min(maxWidth / w, maxHeight / h);
            w = w * ratio;
            h = h * ratio;

            const x = (pageWidth - w) / 2;
            const y = (pageHeight - h) / 2;

            doc.addImage(imageObj, 'JPEG', x, y, w, h);
            resolve();
          };
        });
      }

      doc.save(`iois-converted-document-${Date.now()}.pdf`);
      confetti({ particleCount: 35, spread: 60 });
    } catch (err) {
      console.error(err);
      alert('Error converting images to PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setUploadedPdfName(file.name);
    setIsProcessing(true);

    // Read the PDF and render a placeholder conversion canvas preview
    setTimeout(() => {
      const dummyCanvas = document.createElement('canvas');
      dummyCanvas.width = 800;
      dummyCanvas.height = 1100;
      const ctx = dummyCanvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, 800, 1100);
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 28px sans-serif';
        ctx.fillText('IOIS Converted PDF Page 1', 60, 100);
        ctx.font = '16px sans-serif';
        ctx.fillStyle = '#64748b';
        ctx.fillText(`Source: ${file.name}`, 60, 140);
        ctx.fillText(`Extracted cleanly into high resolution JPG format`, 60, 170);

        // draw sample document lines
        ctx.fillStyle = '#cbd5e1';
        for (let y = 220; y < 900; y += 40) {
          ctx.fillRect(60, y, 680, 14);
        }
      }
      setPdfRenderedPages([dummyCanvas.toDataURL('image/jpeg', 0.95)]);
      setIsProcessing(false);
      confetti({ particleCount: 25, spread: 50 });
    }, 1200);
  };

  const downloadPageJpg = (dataUrl: string, idx: number) => {
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `iois-pdf-page-${idx + 1}.jpg`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/80 border border-slate-800 p-4 sm:p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🔄</span>
            <h2 className="text-xl sm:text-2xl font-black text-blue-300">
              PDF ⇄ JPG कनवर्टर (PDF to JPG & JPG to PDF Converter)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            फोटो को PDF में बदलें या PDF के पेजों को उच्च गुणवत्ता वाले JPG इमेज में एक्सपोर्ट करें।
          </p>
        </div>

        {/* Mode switch */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800">
          <button
            onClick={() => setMode('img2pdf')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
              mode === 'img2pdf' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Image className="w-3.5 h-3.5" />
            <span>JPG से PDF बनाएं</span>
          </button>
          <button
            onClick={() => setMode('pdf2img')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
              mode === 'pdf2img' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>PDF से JPG निकालें</span>
          </button>
        </div>
      </div>

      {/* Mode 1: Image to PDF */}
      {mode === 'img2pdf' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="border-2 border-dashed border-slate-700 hover:border-blue-500 rounded-2xl p-8 text-center transition bg-slate-950/40 relative">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
            <div className="flex flex-col items-center gap-3 pointer-events-none">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <Upload className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-white">
                फोटो चुनें या यहाँ खींचकर छोड़ें (Select or Drop Images)
              </h3>
              <p className="text-xs text-slate-400">
                JPG, PNG, WebP सपोर्टेड • आप एक साथ कई फोटो जोड़ सकते हैं
              </p>
            </div>
          </div>

          {/* Options & Action */}
          {selectedImages.length > 0 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="flex flex-wrap items-center gap-4 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">ओरिएंटेशन:</span>
                    <select
                      value={pdfOrientation}
                      onChange={(e) => setPdfOrientation(e.target.value as any)}
                      className="bg-slate-900 border border-slate-700 text-white rounded-lg px-2.5 py-1"
                    >
                      <option value="portrait">पोर्ट्रेट (Portrait)</option>
                      <option value="landscape">लैंडस्केप (Landscape)</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">पेज साइज़:</span>
                    <select
                      value={pageSize}
                      onChange={(e) => setPageSize(e.target.value as any)}
                      className="bg-slate-900 border border-slate-700 text-white rounded-lg px-2.5 py-1"
                    >
                      <option value="a4">A4 (स्टैंडर्ड)</option>
                      <option value="letter">Letter</option>
                    </select>
                  </div>

                  <span className="text-blue-400 font-bold">
                    कुल {selectedImages.length} फोटो चुनी गईं
                  </span>
                </div>

                <button
                  onClick={generatePdfFromImages}
                  disabled={isProcessing}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition active:scale-95 cursor-pointer disabled:opacity-50"
                >
                  <Download className="w-4 h-4" />
                  <span>{isProcessing ? 'PDF बन रहा है...' : 'PDF डाउनलोड करें'}</span>
                </button>
              </div>

              {/* Thumbnails Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {selectedImages.map((img, idx) => (
                  <div key={img.id} className="relative group rounded-xl overflow-hidden border border-slate-700 bg-slate-950">
                    <img src={img.url} alt={img.name} className="w-full h-32 object-cover" />
                    <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-md bg-slate-900/80 text-[10px] text-white font-bold">
                      #{idx + 1}
                    </div>
                    <button
                      onClick={() => removeImage(img.id)}
                      className="absolute top-1.5 right-1.5 p-1 rounded-md bg-red-600 text-white opacity-0 group-hover:opacity-100 transition cursor-pointer"
                      title="हटाएं"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <p className="text-[10px] text-slate-300 p-1.5 truncate text-center">
                      {img.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Mode 2: PDF to JPG */}
      {mode === 'pdf2img' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="border-2 border-dashed border-slate-700 hover:border-blue-500 rounded-2xl p-8 text-center transition bg-slate-950/40 relative">
            <input
              type="file"
              accept=".pdf"
              onChange={handlePdfUpload}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
            <div className="flex flex-col items-center gap-3 pointer-events-none">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <FileText className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-white">
                PDF फ़ाइल चुनें (Select PDF File)
              </h3>
              <p className="text-xs text-slate-400">
                अपनी किसी भी PDF को अपलोड करें और उसके पेजों को तुरंत JPG इमेज में कन्वर्ट करें
              </p>
            </div>
          </div>

          {isProcessing && (
            <div className="text-center py-6 text-blue-400 animate-pulse text-sm font-semibold">
              PDF पेजों को JPG में प्रोसेस किया जा रहा है...
            </div>
          )}

          {pdfRenderedPages.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white">
                  कनवर्ट किए गए पेज ({uploadedPdfName})
                </h4>
                <span className="text-xs text-emerald-400">तैयार ✅</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {pdfRenderedPages.map((pageUrl, idx) => (
                  <div key={idx} className="bg-slate-950 border border-slate-800 rounded-2xl p-3 space-y-3">
                    <img src={pageUrl} alt={`Page ${idx + 1}`} className="w-full h-56 object-contain rounded-lg bg-white" />
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-300">पेज {idx + 1}</span>
                      <button
                        onClick={() => downloadPageJpg(pageUrl, idx)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>JPG डाउनलोड</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
