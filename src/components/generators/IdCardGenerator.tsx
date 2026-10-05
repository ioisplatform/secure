import React, { useState } from 'react';
import { Upload, Download, CloudUpload, ShieldCheck, QrCode, IdCard, Sparkles, CheckCircle2 } from 'lucide-react';
import jsPDF from 'jspdf';
import confetti from 'canvas-confetti';
import { auth, db, handleFirestoreError, OperationType } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';

export const IdCardGenerator: React.FC = () => {
  const [cardType, setCardType] = useState<'student' | 'employee' | 'press' | 'member'>('student');
  const [orgName, setOrgName] = useState('IOIS NATIONAL ACADEMY');
  const [tagline, setTagline] = useState('Govt. Recognized Educational Institute');
  const [fullName, setFullName] = useState('Rahul Sharma');
  const [fatherName, setFatherName] = useState('Shri R. K. Sharma');
  const [idNumber, setIdNumber] = useState('IOIS-2026-9081');
  const [roleOrClass, setRoleOrClass] = useState('Class 10th - Section A');
  const [dob, setDob] = useState('15/08/2012');
  const [bloodGroup, setBloodGroup] = useState('B+');
  const [mobile, setMobile] = useState('+91 98765 43210');
  const [address, setAddress] = useState('New Delhi, India - 110001');
  const [validTill, setValidTill] = useState('31/03/2027');
  const [themeColor, setThemeColor] = useState('#1e40af'); // blue-800
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

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
      alert('कृपया पहले ऊपर Google लॉगिन बटन पर क्लिक करें ताकि आपका ID कार्ड Firebase डेटाबेस में सुरक्षित सेव हो सके!');
      return;
    }

    try {
      setIsSaving(true);
      setSaveStatus('Saving to Firebase...');
      const itemId = `idcard_${Date.now()}`;
      const payload = {
        cardType,
        orgName,
        tagline,
        fullName,
        fatherName,
        idNumber,
        roleOrClass,
        dob,
        bloodGroup,
        mobile,
        address,
        validTill,
        themeColor,
        photoUrl
      };

      await setDoc(doc(db, 'users', auth.currentUser.uid, 'savedItems', itemId), {
        id: itemId,
        userId: auth.currentUser.uid,
        category: 'id-card',
        title: `ID Card: ${fullName} (${idNumber})`,
        data: JSON.stringify(payload),
        previewImage: photoUrl || '',
        createdAt: new Date().toISOString()
      });

      setSaveStatus('ID कार्ड Firebase डेटाबेस में सुरक्षित सहेज दिया गया! ✅');
      setTimeout(() => setSaveStatus(null), 3500);
      confetti({ particleCount: 35, spread: 60 });
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `users/${auth.currentUser?.uid}/savedItems`);
    } finally {
      setIsSaving(false);
    }
  };

  const downloadPdf = () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    doc.setFontSize(16);
    doc.setTextColor(30, 41, 59);
    doc.text('IOIS ID CARD PRINT SHEET', 105, 20, { align: 'center' });

    // Front ID Card Box
    doc.setDrawColor(30, 64, 175);
    doc.setLineWidth(0.8);
    doc.roundedRect(25, 35, 75, 115, 4, 4);

    // Header band
    doc.setFillColor(30, 64, 175);
    doc.roundedRect(25, 35, 75, 22, 4, 4, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.text(orgName.substring(0, 28), 62.5, 43, { align: 'center' });
    doc.setFontSize(7);
    doc.text(tagline.substring(0, 36), 62.5, 48, { align: 'center' });

    // Card Details
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(12);
    doc.text(fullName, 62.5, 92, { align: 'center' });

    doc.setFontSize(8);
    doc.setTextColor(71, 85, 105);
    doc.text(roleOrClass, 62.5, 97, { align: 'center' });

    doc.setFontSize(7);
    doc.text(`ID No: ${idNumber}`, 30, 107);
    doc.text(`Father: ${fatherName}`, 30, 113);
    doc.text(`DOB: ${dob} | Blood: ${bloodGroup}`, 30, 119);
    doc.text(`Mobile: ${mobile}`, 30, 125);
    doc.text(`Valid Till: ${validTill}`, 30, 131);

    // Back ID Card Box
    doc.setDrawColor(71, 85, 105);
    doc.roundedRect(110, 35, 75, 115, 4, 4);
    doc.setFillColor(241, 245, 249);
    doc.roundedRect(110, 35, 75, 15, 4, 4, 'F');
    doc.setTextColor(30, 41, 59);
    doc.setFontSize(9);
    doc.text('TERMS & INSTRUCTIONS', 147.5, 44, { align: 'center' });

    doc.setFontSize(7);
    doc.setTextColor(100, 116, 139);
    doc.text('1. This card is property of ' + orgName, 115, 58);
    doc.text('2. Please report immediately if lost.', 115, 65);
    doc.text(`Address: ${address.substring(0, 35)}`, 115, 75);
    doc.text('Emergency Contact: ' + mobile, 115, 85);
    doc.text('Authorized Signatory:', 115, 125);
    doc.text('__________________', 115, 133);

    doc.save(`id-card-${fullName.replace(/\s+/g, '-').toLowerCase()}.pdf`);
    confetti({ particleCount: 30, spread: 60 });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/80 border border-slate-800 p-4 sm:p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🪪</span>
            <h2 className="text-xl sm:text-2xl font-black text-emerald-300">
              परफेक्ट ID कार्ड मेकर (Student, Employee & Press ID Generator)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            फोटो, बारकोड, संस्था का नाम व पते सहित PVC कार्ड बनाएं • प्रिंट करें और Firebase डेटाबेस में सुरक्षित सहेजें।
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
            onClick={downloadPdf}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm shadow-md transition cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>PDF डाउनलोड</span>
          </button>
        </div>
      </div>

      {saveStatus && (
        <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-center text-xs font-bold animate-fadeIn">
          {saveStatus}
        </div>
      )}

      {/* Editor & Preview Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Details */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
            <IdCard className="w-4 h-4 text-emerald-400" />
            <span>ID कार्ड विवरण भरें (Enter Details)</span>
          </h3>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label className="text-slate-400 block mb-1">कार्ड का प्रकार</label>
              <select
                value={cardType}
                onChange={(e) => setCardType(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2.5"
              >
                <option value="student">विद्यार्थी (Student ID)</option>
                <option value="employee">कर्मचारी (Employee ID)</option>
                <option value="press">प्रेस / मीडिया (Press Reporter ID)</option>
                <option value="member">सदस्यता कार्ड (Member Card)</option>
              </select>
            </div>

            <div>
              <label className="text-slate-400 block mb-1">थीम रंग (Theme Color)</label>
              <div className="flex gap-2 pt-1">
                {['#1e40af', '#047857', '#b91c1c', '#7c3aed', '#b45309'].map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setThemeColor(c)}
                    style={{ backgroundColor: c }}
                    className={`w-7 h-7 rounded-full transition transform cursor-pointer ${
                      themeColor === c ? 'ring-2 ring-white scale-110' : 'opacity-70'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="text-slate-400 block mb-1">संस्था / स्कूल / कंपनी का नाम</label>
              <input
                type="text"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2.5"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">टैगलाइन / उपनाम</label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2.5"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="text-slate-400 block mb-1">धारक का पूरा नाम</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2.5 font-bold"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">पिता / अभिभावक का नाम</label>
              <input
                type="text"
                value={fatherName}
                onChange={(e) => setFatherName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2.5"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 text-xs">
            <div>
              <label className="text-slate-400 block mb-1">आईडी / रोल नं.</label>
              <input
                type="text"
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2.5 font-mono"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">कक्षा / पद (Role)</label>
              <input
                type="text"
                value={roleOrClass}
                onChange={(e) => setRoleOrClass(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2.5"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">ब्लड ग्रुप</label>
              <input
                type="text"
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2.5"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 text-xs">
            <div>
              <label className="text-slate-400 block mb-1">जन्म तिथि (DOB)</label>
              <input
                type="text"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2.5"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">मोबाइल नंबर</label>
              <input
                type="text"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2.5"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">वैधता तिथि</label>
              <input
                type="text"
                value={validTill}
                onChange={(e) => setValidTill(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2.5"
              />
            </div>
          </div>

          <div className="text-xs">
            <label className="text-slate-400 block mb-1">पता (Address)</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2.5"
            />
          </div>

          {/* Photo upload input */}
          <div className="text-xs pt-1">
            <label className="text-slate-400 block mb-1">पासपोर्ट साइज फोटो लगाएं</label>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold cursor-pointer border border-slate-700 transition">
                <Upload className="w-4 h-4 text-emerald-400" />
                <span>गैलरी से फोटो चुनें</span>
                <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
              </label>
              {photoUrl && <span className="text-emerald-400 font-bold">फोटो लोड हो गई ✅</span>}
            </div>
          </div>
        </div>

        {/* Right Live Preview: Front & Back of PVC Card */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center gap-6">
          {/* Front Card */}
          <div className="w-[310px] h-[480px] rounded-3xl bg-white text-slate-900 shadow-2xl overflow-hidden flex flex-col justify-between border-4 border-slate-300 relative select-none">
            {/* Header Strip */}
            <div
              style={{ backgroundColor: themeColor }}
              className="p-3.5 text-center text-white space-y-0.5 relative"
            >
              <h4 className="font-black text-sm tracking-wide uppercase truncate">
                {orgName}
              </h4>
              <p className="text-[9px] text-white/80 tracking-wider uppercase truncate">
                {tagline}
              </p>
              {/* Lanyard punch hole simulation */}
              <div className="w-8 h-2 rounded-full bg-slate-800/40 mx-auto mt-1" />
            </div>

            {/* Photo & Name */}
            <div className="flex flex-col items-center px-4 -mt-3">
              <div className="w-24 h-28 rounded-xl bg-slate-100 border-2 border-slate-300 shadow-md overflow-hidden flex items-center justify-center">
                {photoUrl ? (
                  <img src={photoUrl} alt="Photo" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center p-2 text-slate-400">
                    <span className="text-2xl">👤</span>
                    <p className="text-[8px] font-bold">PHOTO</p>
                  </div>
                )}
              </div>

              <h5 className="font-extrabold text-base text-slate-900 mt-2 text-center truncate max-w-[260px]">
                {fullName}
              </h5>
              <span
                style={{ color: themeColor }}
                className="text-xs font-bold uppercase tracking-wider"
              >
                {roleOrClass}
              </span>
            </div>

            {/* Details Table */}
            <div className="px-5 py-2 space-y-1 text-[11px] text-slate-700">
              <div className="flex justify-between border-b border-slate-100 pb-0.5">
                <span className="text-slate-400 font-semibold">ID No:</span>
                <span className="font-mono font-bold text-slate-900">{idNumber}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-0.5">
                <span className="text-slate-400 font-semibold">Father:</span>
                <span className="font-medium text-slate-800">{fatherName}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-0.5">
                <span className="text-slate-400 font-semibold">DOB / Blood:</span>
                <span className="font-medium text-slate-800">{dob} • {bloodGroup}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-0.5">
                <span className="text-slate-400 font-semibold">Mobile:</span>
                <span className="font-medium text-slate-800">{mobile}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-semibold">Valid Till:</span>
                <span className="font-bold text-emerald-700">{validTill}</span>
              </div>
            </div>

            {/* Bottom Barcode Strip */}
            <div className="bg-slate-50 border-t border-slate-200 p-2.5 flex items-center justify-between px-5">
              <div className="space-y-0.5">
                {/* Simulated Barcode */}
                <div className="h-6 flex items-center gap-0.5">
                  {[2, 1, 3, 1, 2, 4, 1, 2, 3, 1, 2, 3, 1, 4, 2, 1, 3, 2, 1].map((w, i) => (
                    <div key={i} style={{ width: `${w}px` }} className="h-full bg-slate-900" />
                  ))}
                </div>
                <p className="text-[8px] font-mono text-slate-500 text-center">{idNumber}</p>
              </div>

              <div className="text-right">
                <div className="h-4" />
                <p className="text-[8px] font-bold text-slate-500 border-t border-slate-400 pt-0.5">
                  Auth. Signatory
                </p>
              </div>
            </div>
          </div>

          <span className="text-xs text-slate-400 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>ISO Standard PVC कार्ड रेशियो (85.6mm x 54mm)</span>
          </span>
        </div>
      </div>
    </div>
  );
};
