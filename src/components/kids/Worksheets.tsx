import React, { useState } from 'react';
import { Printer, Download, Sparkles, FileText, CheckCircle2 } from 'lucide-react';
import jsPDF from 'jspdf';

export const Worksheets: React.FC = () => {
  const [activeSheet, setActiveSheet] = useState<'hindi' | 'english' | 'math' | 'shapes'>('hindi');

  const printWorksheet = () => {
    window.print();
  };

  const downloadPdf = () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    doc.setFontSize(22);
    doc.setTextColor(30, 41, 59);
    doc.text('IOIS INDIAN PUBLICATION', 105, 20, { align: 'center' });
    
    doc.setFontSize(14);
    doc.setTextColor(71, 85, 105);
    doc.text('Kids Practice Worksheet (0-5 Years) - www.ioisplatform.in', 105, 28, { align: 'center' });

    doc.setLineWidth(0.5);
    doc.setDrawColor(203, 213, 225);
    doc.line(20, 32, 190, 32);

    doc.setFontSize(12);
    doc.text('Student Name: _______________________    Date: ____________', 20, 42);

    if (activeSheet === 'english') {
      doc.setFontSize(16);
      doc.text('A to Z Alphabet Tracing & Practice', 20, 55);
      
      const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
      let yPos = 70;
      let xPos = 25;
      
      letters.forEach((l, idx) => {
        doc.setFontSize(24);
        doc.setTextColor(51, 65, 85);
        doc.text(l, xPos, yPos);
        doc.setFontSize(10);
        doc.setTextColor(148, 163, 184);
        doc.text('... ... ...', xPos + 10, yPos);

        xPos += 40;
        if ((idx + 1) % 4 === 0) {
          xPos = 25;
          yPos += 25;
        }
      });
    } else if (activeSheet === 'math') {
      doc.setFontSize(16);
      doc.text('Numbers 1 to 20 Counting & Tracing Worksheet', 20, 55);

      let yPos = 70;
      let xPos = 25;
      for (let i = 1; i <= 20; i++) {
        doc.setFontSize(20);
        doc.setTextColor(30, 41, 59);
        doc.text(`${i}.`, xPos, yPos);
        doc.setFontSize(10);
        doc.setTextColor(148, 163, 184);
        doc.text('Trace: [ ' + i + ' ]  [ ' + i + ' ]', xPos + 12, yPos);

        xPos += 80;
        if (i % 2 === 0) {
          xPos = 25;
          yPos += 20;
        }
      }
    } else {
      doc.setFontSize(16);
      doc.text('Hindi Varnamala Swar (स्वर) Tracing Worksheet', 20, 55);
      
      const swars = ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ऋ', 'ए', 'ऐ', 'ओ', 'औ', 'अं', 'अः'];
      let yPos = 70;
      let xPos = 30;
      swars.forEach((sw, idx) => {
        doc.setFontSize(22);
        doc.setTextColor(30, 41, 59);
        doc.text(sw, xPos, yPos);
        doc.setFontSize(10);
        doc.setTextColor(148, 163, 184);
        doc.text('[ अभ्यास करें: ............. ]', xPos + 15, yPos);

        xPos += 80;
        if ((idx + 1) % 2 === 0) {
          xPos = 30;
          yPos += 22;
        }
      });
    }

    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139);
    doc.text('© IOIS Indian Publication - Certified Early Child Education Series', 105, 285, { align: 'center' });

    doc.save(`iois-worksheet-${activeSheet}.pdf`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/80 border border-slate-800 p-4 sm:p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">📄</span>
            <h2 className="text-xl sm:text-2xl font-black text-amber-300 font-['Baloo_2',sans-serif]">
              प्रिंटेबल बाल वर्कशीट (Printable Worksheets for Kids)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            घर व स्कूल में अभ्यास हेतु रेडी-टू-प्रिंट A4 वर्कशीट - सीधे प्रिंट करें या PDF डाउनलोड करें।
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={printWorksheet}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm border border-slate-700 transition cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>प्रिंट करें (Print)</span>
          </button>
          <button
            onClick={downloadPdf}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>PDF डाउनलोड</span>
          </button>
        </div>
      </div>

      {/* Switcher */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        <button
          onClick={() => setActiveSheet('hindi')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
            activeSheet === 'hindi' ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-900 text-slate-300'
          }`}
        >
          हिंदी स्वर अभ्यास
        </button>
        <button
          onClick={() => setActiveSheet('english')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
            activeSheet === 'english' ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-900 text-slate-300'
          }`}
        >
          English A to Z Tracing
        </button>
        <button
          onClick={() => setActiveSheet('math')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
            activeSheet === 'math' ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-900 text-slate-300'
          }`}
        >
          अंक 1 से 20 गिनती
        </button>
      </div>

      {/* Paper Preview Sheet (Clean White printable sheet preview) */}
      <div className="bg-white text-slate-900 rounded-3xl p-6 sm:p-12 shadow-2xl max-w-3xl mx-auto border-4 border-slate-300 font-sans print:border-none print:shadow-none">
        {/* Printable Header */}
        <div className="border-b-2 border-slate-800 pb-4 text-center space-y-1">
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-wide font-['Baloo_2',sans-serif]">
            IOIS INDIAN PUBLICATION
          </h3>
          <p className="text-xs sm:text-sm font-bold text-orange-600 uppercase tracking-widest">
            बाल शिक्षा अभ्यास माला (Kids Early Learning Activity Worksheet)
          </p>
          <div className="pt-3 flex justify-between text-xs sm:text-sm font-semibold text-slate-600">
            <span>विद्यार्थी का नाम: ............................................</span>
            <span>दिनांक: ....................</span>
          </div>
        </div>

        {/* Content based on active sheet */}
        {activeSheet === 'hindi' && (
          <div className="py-6 space-y-6">
            <h4 className="text-base sm:text-lg font-black text-slate-800 border-b pb-1 font-['Baloo_2',sans-serif]">
              स्वर वर्ण पहचानें एवं बिंदुओं को मिलाकर लिखें (Trace the vowels):
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ऋ', 'ए', 'ऐ', 'ओ', 'औ', 'अं'].map((sw, idx) => (
                <div key={idx} className="p-4 border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-between">
                  <span className="text-4xl font-black text-slate-800 font-['Baloo_2',sans-serif]">{sw}</span>
                  <div className="space-y-1 text-right">
                    <div className="text-xs text-slate-400 font-mono tracking-widest">. . . . . .</div>
                    <div className="text-xs text-slate-400 font-mono tracking-widest">. . . . . .</div>
                    <div className="text-xs text-slate-400 font-mono tracking-widest">. . . . . .</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSheet === 'english' && (
          <div className="py-6 space-y-6">
            <h4 className="text-base sm:text-lg font-black text-slate-800 border-b pb-1">
              Trace and write Capital & Small Letters (Aa to Zz):
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {['Aa', 'Bb', 'Cc', 'Dd', 'Ee', 'Ff', 'Gg', 'Hh', 'Ii', 'Jj', 'Kk', 'Ll', 'Mm', 'Nn', 'Oo', 'Pp'].map((pair, idx) => (
                <div key={idx} className="p-3 border-2 border-dashed border-slate-300 rounded-xl text-center">
                  <span className="text-2xl font-black text-slate-800 block">{pair}</span>
                  <div className="text-[10px] text-slate-400 font-mono pt-1">_ _ _ _ _ _</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSheet === 'math' && (
          <div className="py-6 space-y-6">
            <h4 className="text-base sm:text-lg font-black text-slate-800 border-b pb-1 font-['Baloo_2',sans-serif]">
              वस्तुएं गिनें और सही संख्या लिखें (Count the items):
            </h4>
            <div className="space-y-4">
              <div className="p-3 border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-between">
                <span className="text-2xl">🍎 🍎 🍎</span>
                <div className="w-16 h-12 border-2 border-slate-400 rounded-lg flex items-center justify-center font-bold text-slate-400">
                  [  ]
                </div>
              </div>
              <div className="p-3 border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-between">
                <span className="text-2xl">⭐ ⭐ ⭐ ⭐ ⭐</span>
                <div className="w-16 h-12 border-2 border-slate-400 rounded-lg flex items-center justify-center font-bold text-slate-400">
                  [  ]
                </div>
              </div>
              <div className="p-3 border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-between">
                <span className="text-2xl">🎈 🎈</span>
                <div className="w-16 h-12 border-2 border-slate-400 rounded-lg flex items-center justify-center font-bold text-slate-400">
                  [  ]
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Printable Footer */}
        <div className="border-t-2 border-slate-800 pt-4 text-center text-xs text-slate-500 font-medium">
          IOIS Indian Publication • सर्वाधिकार सुरक्षित • अधिक जानकारी हेतु www.ioisplatform.in देखें
        </div>
      </div>
    </div>
  );
};
