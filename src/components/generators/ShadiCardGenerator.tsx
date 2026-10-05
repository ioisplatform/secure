import React, { useState } from 'react';
import { Download, CloudUpload, Sparkles, Heart, Calendar, MapPin, Users } from 'lucide-react';
import jsPDF from 'jspdf';
import confetti from 'canvas-confetti';
import { auth, db, handleFirestoreError, OperationType } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';

export const ShadiCardGenerator: React.FC = () => {
  const [theme, setTheme] = useState<'crimson' | 'saffron' | 'emerald' | 'royal-purple'>('crimson');
  const [godGreeting, setGodGreeting] = useState('॥ श्री गणेशाय नमः ॥');
  const [mangalSlok, setMangalSlok] = useState('वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥');
  
  // Groom info
  const [groomName, setGroomName] = useState('आयुष्मान अमन शर्मा');
  const [groomParents, setGroomParents] = useState('श्रीमती सुनीता देवी एवं श्री रमेश शर्मा');
  const [groomAddress, setGroomAddress] = useState('जयपुर, राजस्थान');
  
  // Bride info
  const [brideName, setBrideName] = useState('आयुष्मती पूजा मिश्रा');
  const [brideParents, setBrideParents] = useState('श्रीमती किरण देवी एवं श्री विजय मिश्रा');
  const [brideAddress, setBrideAddress] = useState('उदयपुर, राजस्थान');

  // Dates & Events
  const [weddingDate, setWeddingDate] = useState('रविवार, 28 नवम्बर 2026');
  const [haldiDate, setHaldiDate] = useState('शनिवार, 27 नवम्बर 2026 (सायं 4:00 बजे)');
  const [receptionDate, setReceptionDate] = useState('सोमवार, 29 नवम्बर 2026 (सायं 7:00 बजे)');
  const [venue, setVenue] = useState('रॉयल पैलेस हेरिटेज रिसॉर्ट, रिंग रोड, जयपुर');
  const [inviter, setInviter] = useState('समस्त शर्मा एवं मिश्रा परिवार');
  const [rsvp, setRsvp] = useState('मो. 9876543210, 9123456780');

  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const themeColors = {
    crimson: {
      bg: 'from-amber-950 via-rose-950 to-red-950',
      border: 'border-amber-400',
      accent: 'text-amber-300',
      tag: 'bg-red-900/60 text-amber-200'
    },
    saffron: {
      bg: 'from-orange-950 via-amber-950 to-yellow-950',
      border: 'border-yellow-400',
      accent: 'text-yellow-300',
      tag: 'bg-orange-900/60 text-yellow-200'
    },
    emerald: {
      bg: 'from-emerald-950 via-teal-950 to-slate-950',
      border: 'border-emerald-400',
      accent: 'text-emerald-300',
      tag: 'bg-emerald-900/60 text-emerald-200'
    },
    'royal-purple': {
      bg: 'from-purple-950 via-indigo-950 to-slate-950',
      border: 'border-purple-400',
      accent: 'text-purple-300',
      tag: 'bg-purple-900/60 text-purple-200'
    }
  };

  const saveToFirebase = async () => {
    if (!auth.currentUser) {
      alert('कृपया पहले Google लॉगिन करें ताकि आपका शादी कार्ड Firebase डेटाबेस में सुरक्षित सहेज दिया जाए!');
      return;
    }

    try {
      setIsSaving(true);
      setSaveStatus('Saving to Firebase...');
      const itemId = `shadicard_${Date.now()}`;
      const payload = {
        theme,
        godGreeting,
        mangalSlok,
        groomName,
        groomParents,
        groomAddress,
        brideName,
        brideParents,
        brideAddress,
        weddingDate,
        haldiDate,
        receptionDate,
        venue,
        inviter,
        rsvp
      };

      await setDoc(doc(db, 'users', auth.currentUser.uid, 'savedItems', itemId), {
        id: itemId,
        userId: auth.currentUser.uid,
        category: 'shadi-card',
        title: `Wedding Card: ${groomName} Weds ${brideName}`,
        data: JSON.stringify(payload),
        previewImage: '',
        createdAt: new Date().toISOString()
      });

      setSaveStatus('शादी कार्ड Firebase में सुरक्षित सहेज दिया गया! ✅');
      setTimeout(() => setSaveStatus(null), 3500);
      confetti({ particleCount: 40, spread: 70 });
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `users/${auth.currentUser?.uid}/savedItems`);
    } finally {
      setIsSaving(false);
    }
  };

  const downloadCardPdf = () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Border
    doc.setDrawColor(180, 83, 9);
    doc.setLineWidth(1.5);
    doc.rect(10, 10, 190, 277);
    doc.setLineWidth(0.5);
    doc.rect(13, 13, 184, 271);

    doc.setFontSize(16);
    doc.setTextColor(180, 83, 9);
    doc.text(godGreeting, 105, 25, { align: 'center' });

    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);
    doc.text(mangalSlok, 105, 33, { align: 'center' });

    doc.setFontSize(12);
    doc.setTextColor(15, 23, 42);
    doc.text('॥ शुभ विवाह निमंत्रण ॥', 105, 45, { align: 'center' });

    doc.setFontSize(10);
    doc.setTextColor(71, 85, 105);
    doc.text('परमपिता परमात्मा की असीम अनुकम्पा से हमारे प्रिय परिवार में मांगलिक प्रसंग पर:', 105, 53, { align: 'center' });

    // Groom Box
    doc.setFontSize(16);
    doc.setTextColor(180, 83, 9);
    doc.text(groomName, 105, 70, { align: 'center' });
    doc.setFontSize(10);
    doc.setTextColor(51, 65, 85);
    doc.text(`सुपुत्र: ${groomParents} (${groomAddress})`, 105, 78, { align: 'center' });

    doc.setFontSize(16);
    doc.setTextColor(220, 38, 38);
    doc.text('संग परिणय सूत्र (WEDS)', 105, 90, { align: 'center' });

    // Bride Box
    doc.setFontSize(16);
    doc.setTextColor(180, 83, 9);
    doc.text(brideName, 105, 105, { align: 'center' });
    doc.setFontSize(10);
    doc.setTextColor(51, 65, 85);
    doc.text(`सुपुत्री: ${brideParents} (${brideAddress})`, 105, 113, { align: 'center' });

    // Events Table
    doc.setDrawColor(203, 213, 225);
    doc.line(30, 125, 180, 125);

    doc.setFontSize(12);
    doc.setTextColor(15, 23, 42);
    doc.text('मांगलिक कार्यक्रम (Program Schedule):', 30, 135);

    doc.setFontSize(10);
    doc.setTextColor(71, 85, 105);
    doc.text(`• हल्दी एवं मेहंदी: ${haldiDate}`, 35, 145);
    doc.text(`• शुभ विवाह: ${weddingDate}`, 35, 155);
    doc.text(`• प्रीतिभोज (Reception): ${receptionDate}`, 35, 165);

    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text('विवाह स्थल (Venue):', 30, 180);
    doc.setFontSize(10);
    doc.setTextColor(71, 85, 105);
    doc.text(venue, 35, 188);

    doc.line(30, 200, 180, 200);

    doc.setFontSize(11);
    doc.setTextColor(180, 83, 9);
    doc.text('दर्शनाभिलाषी एवं विनीत:', 105, 215, { align: 'center' });
    doc.setFontSize(10);
    doc.setTextColor(51, 65, 85);
    doc.text(inviter, 105, 225, { align: 'center' });
    doc.text(`RSVP / संपर्क: ${rsvp}`, 105, 235, { align: 'center' });

    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text('Designed with IOIS Indian Publication Card Studio', 105, 275, { align: 'center' });

    doc.save(`shadi-card-${groomName.split(' ').pop()}-weds-${brideName.split(' ').pop()}.pdf`);
    confetti({ particleCount: 35, spread: 60 });
  };

  const currTheme = themeColors[theme];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/80 border border-slate-800 p-4 sm:p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">💌</span>
            <h2 className="text-xl sm:text-2xl font-black text-rose-300 font-['Baloo_2',sans-serif]">
              शाही विवाह पत्रिका मेकर (Indian Shadi Card & Wedding Invitation Maker)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            पारंपरिक भारतीय शादी कार्ड, गणेश वंदना, दूल्हा-दुल्हन विवरण, लग्न मुहूर्त व प्रतिभोज स्थल सहित।
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={saveToFirebase}
            disabled={isSaving}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition cursor-pointer disabled:opacity-50"
          >
            <CloudUpload className="w-4 h-4" />
            <span>Firebase सुरक्षित सेव</span>
          </button>
          <button
            onClick={downloadCardPdf}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs sm:text-sm shadow-md transition cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>कार्ड डाउनलोड (PDF)</span>
          </button>
        </div>
      </div>

      {saveStatus && (
        <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-center text-xs font-bold animate-fadeIn">
          {saveStatus}
        </div>
      )}

      {/* Editor & Preview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Editor Form */}
        <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center justify-between border-b border-slate-800 pb-2">
            <span>विवाह पत्रिका विवरण (Edit Details)</span>
            {/* Color Theme Selector */}
            <div className="flex gap-2">
              {(['crimson', 'saffron', 'emerald', 'royal-purple'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`w-6 h-6 rounded-full border-2 transition cursor-pointer ${
                    t === 'crimson' ? 'bg-red-800' : t === 'saffron' ? 'bg-amber-600' : t === 'emerald' ? 'bg-emerald-800' : 'bg-purple-800'
                  } ${theme === t ? 'border-white scale-125' : 'border-transparent'}`}
                />
              ))}
            </div>
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-slate-400 block mb-1">मांगलिक अभिवादन</label>
              <input
                type="text"
                value={godGreeting}
                onChange={(e) => setGodGreeting(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 text-amber-300 font-bold rounded-lg p-2.5 font-['Baloo_2',sans-serif]"
              />
            </div>

            {/* Groom Section */}
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <span className="text-amber-400 font-bold block">दूल्हा पक्ष (Groom Details):</span>
              <input
                type="text"
                placeholder="दूल्हे का नाम"
                value={groomName}
                onChange={(e) => setGroomName(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-2 font-bold font-['Baloo_2',sans-serif]"
              />
              <input
                type="text"
                placeholder="माता-पिता का नाम"
                value={groomParents}
                onChange={(e) => setGroomParents(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-2"
              />
              <input
                type="text"
                placeholder="निवास स्थान / शहर"
                value={groomAddress}
                onChange={(e) => setGroomAddress(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-2"
              />
            </div>

            {/* Bride Section */}
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <span className="text-rose-400 font-bold block">दुल्हन पक्ष (Bride Details):</span>
              <input
                type="text"
                placeholder="दुल्हन का नाम"
                value={brideName}
                onChange={(e) => setBrideName(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-2 font-bold font-['Baloo_2',sans-serif]"
              />
              <input
                type="text"
                placeholder="माता-पिता का नाम"
                value={brideParents}
                onChange={(e) => setBrideParents(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-2"
              />
              <input
                type="text"
                placeholder="निवास स्थान / शहर"
                value={brideAddress}
                onChange={(e) => setBrideAddress(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-2"
              />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label className="text-slate-400 block mb-1">शुभ विवाह तिथि</label>
                <input
                  type="text"
                  value={weddingDate}
                  onChange={(e) => setWeddingDate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">हल्दी / संगीत</label>
                <input
                  type="text"
                  value={haldiDate}
                  onChange={(e) => setHaldiDate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-400 block mb-1">विवाह स्थल (Venue)</label>
              <input
                type="text"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label className="text-slate-400 block mb-1">दर्शनाभिलाषी / विनीत</label>
                <input
                  type="text"
                  value={inviter}
                  onChange={(e) => setInviter(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">RSVP / संपर्क सूत्र</label>
                <input
                  type="text"
                  value={rsvp}
                  onChange={(e) => setRsvp(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Live Card Preview */}
        <div className="lg:col-span-6 flex justify-center">
          <div className={`w-full max-w-[420px] rounded-3xl bg-gradient-to-b ${currTheme.bg} p-6 sm:p-8 text-white shadow-2xl border-4 ${currTheme.border} relative overflow-hidden space-y-5 text-center font-['Baloo_2',sans-serif]`}>
            {/* Traditional Corner Ornaments */}
            <div className="absolute top-2 left-2 text-amber-300 text-xl">⚜️</div>
            <div className="absolute top-2 right-2 text-amber-300 text-xl">⚜️</div>
            <div className="absolute bottom-2 left-2 text-amber-300 text-xl">⚜️</div>
            <div className="absolute bottom-2 right-2 text-amber-300 text-xl">⚜️</div>

            {/* Religious Header */}
            <div className="space-y-1">
              <span className="text-3xl block">🪷 🕉️ 🪷</span>
              <h4 className="text-lg sm:text-xl font-black text-amber-300 tracking-wider">
                {godGreeting}
              </h4>
              <p className="text-[10px] text-amber-200/80 italic max-w-xs mx-auto leading-relaxed">
                {mangalSlok}
              </p>
            </div>

            <div className="py-1">
              <span className="px-4 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-400/40">
                ॥ शुभ विवाह निमंत्रण ॥
              </span>
            </div>

            {/* Couple names */}
            <div className="space-y-3 py-2 bg-slate-950/40 rounded-2xl p-4 border border-amber-500/20">
              <div>
                <h5 className="text-xl sm:text-2xl font-black text-amber-300 drop-shadow-md">
                  {groomName}
                </h5>
                <p className="text-xs text-slate-300">
                  सुपुत्र: {groomParents}
                </p>
                <p className="text-[10px] text-slate-400">({groomAddress})</p>
              </div>

              <div className="flex items-center justify-center gap-2 text-rose-400 text-sm font-bold">
                <Heart className="w-4 h-4 fill-current animate-pulse text-red-500" />
                <span className="text-white text-xs font-extrabold tracking-widest uppercase">संग परिणय सूत्र</span>
                <Heart className="w-4 h-4 fill-current animate-pulse text-red-500" />
              </div>

              <div>
                <h5 className="text-xl sm:text-2xl font-black text-amber-300 drop-shadow-md">
                  {brideName}
                </h5>
                <p className="text-xs text-slate-300">
                  सुपुत्री: {brideParents}
                </p>
                <p className="text-[10px] text-slate-400">({brideAddress})</p>
              </div>
            </div>

            {/* Schedule */}
            <div className="space-y-1.5 text-xs text-slate-200 text-left bg-slate-950/30 p-3 rounded-xl border border-slate-800">
              <div className="flex items-center gap-1.5 text-amber-300 font-bold">
                <Calendar className="w-3.5 h-3.5" />
                <span>मांगलिक कार्यक्रम:</span>
              </div>
              <p className="text-[11px]"><span className="text-amber-400 font-bold">• विवाह:</span> {weddingDate}</p>
              <p className="text-[11px]"><span className="text-amber-400 font-bold">• हल्दी/संगीत:</span> {haldiDate}</p>
              <p className="text-[11px]"><span className="text-amber-400 font-bold">• प्रतिभोज:</span> {receptionDate}</p>
              <div className="pt-1 text-[11px]">
                <span className="text-amber-400 font-bold flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> स्थल:
                </span>
                <p className="text-slate-300 pl-4">{venue}</p>
              </div>
            </div>

            {/* Inviter */}
            <div className="pt-2 border-t border-amber-500/30 text-xs space-y-1">
              <p className="text-amber-300 font-bold">दर्शनाभिलाषी एवं विनीत:</p>
              <p className="text-white font-medium">{inviter}</p>
              <p className="text-[10px] text-slate-400">RSVP: {rsvp}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
