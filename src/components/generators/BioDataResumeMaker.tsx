import React, { useState } from 'react';
import { Upload, Download, CloudUpload, FileText, Briefcase, HeartHandshake, CheckCircle2 } from 'lucide-react';
import jsPDF from 'jspdf';
import confetti from 'canvas-confetti';
import { auth, db, handleFirestoreError, OperationType } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';

export const BioDataResumeMaker: React.FC = () => {
  const [docType, setDocType] = useState<'marriage' | 'resume'>('marriage');

  // Common Info
  const [fullName, setFullName] = useState('रोहन शर्मा (Rohan Sharma)');
  const [dob, setDob] = useState('18/06/1998');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [email, setEmail] = useState('rohan.sharma@example.com');
  const [address, setAddress] = useState('Sector 14, Jaipur, Rajasthan');
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  // Marriage Bio-Data specifics
  const [birthTime, setBirthTime] = useState('सुबह 06:45 बजे');
  const [birthPlace, setBirthPlace] = useState('जयपुर (राजस्थान)');
  const [height, setHeight] = useState('5 फीट 10 इंच (178 सेमी)');
  const [complexion, setComplexion] = useState('गोरा (Fair)');
  const [rashi, setRashi] = useState('मिथुन (Gemini)');
  const [gotra, setGotra] = useState('कौशिक (Kaushik)');
  const [manglik, setManglik] = useState('नहीं (Non-Manglik)');
  const [education, setEducation] = useState('B.Tech in Computer Science (82%)');
  const [occupation, setOccupation] = useState('Senior Software Engineer at MNC');
  const [income, setIncome] = useState('₹18.5 लाख प्रति वर्ष');
  const [fatherName, setFatherName] = useState('श्री राजेंद्र शर्मा (वरिष्ठ प्रबंधक, PNB)');
  const [motherName, setMotherName] = useState('श्रीमती आशा शर्मा (गृहणी)');
  const [siblings, setSiblings] = useState('1 छोटा भाई (IIT Delhi में अध्ययनरत)');

  // Resume specifics
  const [jobTitle, setJobTitle] = useState('Full Stack Software Engineer');
  const [summary, setSummary] = useState('Dedicated and results-driven professional with 4+ years of experience in designing scalable digital solutions and web platforms.');
  const [skills, setSkills] = useState('React, TypeScript, Node.js, Express, Tailwind CSS, Firebase, SQL, Git');
  const [experience, setExperience] = useState('Senior Software Developer at TechCorp (2022-Present)\n- Led engineering of core web platforms.\n- Improved system performance and user satisfaction.');
  const [languages, setLanguages] = useState('हिंदी (Hindi), English');

  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => setPhotoUrl(reader.result as string);
    reader.readAsDataURL(file);
  };

  const saveToFirebase = async () => {
    if (!auth.currentUser) {
      alert('कृपया पहले Google से लॉगिन करें ताकि आपका बायोडाटा / CV Firebase क्लाउड में सुरक्षित सेव रहे!');
      return;
    }

    try {
      setIsSaving(true);
      setSaveStatus('Saving to Firebase...');
      const itemId = `biodata_${Date.now()}`;
      const payload = {
        docType,
        fullName,
        dob,
        phone,
        email,
        address,
        photoUrl,
        birthTime,
        birthPlace,
        height,
        complexion,
        rashi,
        gotra,
        manglik,
        education,
        occupation,
        income,
        fatherName,
        motherName,
        siblings,
        jobTitle,
        summary,
        skills,
        experience,
        languages
      };

      await setDoc(doc(db, 'users', auth.currentUser.uid, 'savedItems', itemId), {
        id: itemId,
        userId: auth.currentUser.uid,
        category: 'biodata-cv',
        title: `${docType === 'marriage' ? 'Marriage Bio-Data' : 'Job Resume'}: ${fullName}`,
        data: JSON.stringify(payload),
        previewImage: photoUrl || '',
        createdAt: new Date().toISOString()
      });

      setSaveStatus('दस्तावेज़ Firebase में सुरक्षित सहेज दिया गया! ✅');
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

    if (docType === 'marriage') {
      doc.setDrawColor(180, 83, 9);
      doc.setLineWidth(1);
      doc.rect(10, 10, 190, 277);

      doc.setFontSize(16);
      doc.setTextColor(180, 83, 9);
      doc.text('॥ श्री गणेशाय नमः ॥', 105, 22, { align: 'center' });

      doc.setFontSize(18);
      doc.setTextColor(30, 41, 59);
      doc.text('वैवाहिक बायोडाटा (Marriage Bio-Data)', 105, 32, { align: 'center' });

      doc.setDrawColor(203, 213, 225);
      doc.line(25, 36, 185, 36);

      // Section 1: Personal
      doc.setFontSize(12);
      doc.setTextColor(180, 83, 9);
      doc.text('व्यक्तिगत विवरण (Personal Details):', 25, 46);

      doc.setFontSize(10);
      doc.setTextColor(51, 65, 85);
      doc.text(`पूरा नाम (Full Name): ${fullName}`, 25, 55);
      doc.text(`जन्म तिथि (DOB): ${dob} | जन्म समय: ${birthTime}`, 25, 63);
      doc.text(`जन्म स्थान (Birth Place): ${birthPlace}`, 25, 71);
      doc.text(`कद (Height): ${height} | वर्ण: ${complexion}`, 25, 79);
      doc.text(`राशि: ${rashi} | गोत्र: ${gotra} | मांगलिक: ${manglik}`, 25, 87);

      // Section 2: Education & Job
      doc.setFontSize(12);
      doc.setTextColor(180, 83, 9);
      doc.text('शिक्षा एवं व्यवसाय (Education & Career):', 25, 102);

      doc.setFontSize(10);
      doc.setTextColor(51, 65, 85);
      doc.text(`उच्चतम शिक्षा (Education): ${education}`, 25, 111);
      doc.text(`व्यवसाय / पद (Occupation): ${occupation}`, 25, 119);
      doc.text(`वार्षिक आय (Income): ${income}`, 25, 127);

      // Section 3: Family
      doc.setFontSize(12);
      doc.setTextColor(180, 83, 9);
      doc.text('पारिवारिक विवरण (Family Background):', 25, 142);

      doc.setFontSize(10);
      doc.setTextColor(51, 65, 85);
      doc.text(`पिता का नाम: ${fatherName}`, 25, 151);
      doc.text(`माता का नाम: ${motherName}`, 25, 159);
      doc.text(`भाई-बहन (Siblings): ${siblings}`, 25, 167);

      // Section 4: Contact
      doc.setFontSize(12);
      doc.setTextColor(180, 83, 9);
      doc.text('संपर्क एवं स्थायी पता (Contact Information):', 25, 182);

      doc.setFontSize(10);
      doc.setTextColor(51, 65, 85);
      doc.text(`मोबाइल नंबर: ${phone}`, 25, 191);
      doc.text(`ईमेल: ${email}`, 25, 199);
      doc.text(`स्थायी पता: ${address}`, 25, 207);

      doc.setFontSize(8);
      doc.setTextColor(148, 163, 184);
      doc.text('Generated via IOIS Indian Publication Portal', 105, 275, { align: 'center' });
    } else {
      // Resume Layout
      doc.setFillColor(30, 41, 59);
      doc.rect(0, 0, 210, 40, 'F');

      doc.setFontSize(22);
      doc.setTextColor(255, 255, 255);
      doc.text(fullName, 20, 20);

      doc.setFontSize(11);
      doc.setTextColor(226, 232, 240);
      doc.text(jobTitle, 20, 28);
      doc.setFontSize(9);
      doc.text(`${phone} | ${email} | ${address}`, 20, 35);

      // Summary
      doc.setFontSize(13);
      doc.setTextColor(30, 41, 59);
      doc.text('Professional Summary', 20, 52);
      doc.line(20, 54, 190, 54);

      doc.setFontSize(10);
      doc.setTextColor(71, 85, 105);
      doc.text(summary, 20, 62, { maxWidth: 170 });

      // Experience
      doc.setFontSize(13);
      doc.setTextColor(30, 41, 59);
      doc.text('Work Experience', 20, 82);
      doc.line(20, 84, 190, 84);

      doc.setFontSize(10);
      doc.setTextColor(71, 85, 105);
      doc.text(experience, 20, 92, { maxWidth: 170 });

      // Education & Skills
      doc.setFontSize(13);
      doc.setTextColor(30, 41, 59);
      doc.text('Key Skills & Technologies', 20, 132);
      doc.line(20, 134, 190, 134);

      doc.setFontSize(10);
      doc.setTextColor(71, 85, 105);
      doc.text(skills, 20, 142, { maxWidth: 170 });

      doc.setFontSize(13);
      doc.setTextColor(30, 41, 59);
      doc.text('Education', 20, 162);
      doc.line(20, 164, 190, 164);

      doc.setFontSize(10);
      doc.setTextColor(71, 85, 105);
      doc.text(education, 20, 172);

      doc.setFontSize(13);
      doc.setTextColor(30, 41, 59);
      doc.text('Languages Known', 20, 192);
      doc.line(20, 194, 190, 194);

      doc.setFontSize(10);
      doc.setTextColor(71, 85, 105);
      doc.text(languages, 20, 202);
    }

    doc.save(`iois-${docType}-${fullName.replace(/\s+/g, '-').toLowerCase()}.pdf`);
    confetti({ particleCount: 35, spread: 60 });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/80 border border-slate-800 p-4 sm:p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">📋</span>
            <h2 className="text-xl sm:text-2xl font-black text-amber-300">
              बायोडाटा एवं जॉब रिज्यूम मेकर (Marriage Bio-Data & Job CV Builder)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            शादी हेतु आकर्षक भारतीय बायोडाटा या नौकरी हेतु प्रोफेशनल रिज्यूम बनाएं, प्रिंट करें व सहेजें।
          </p>
        </div>

        {/* Mode switch */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800">
            <button
              onClick={() => setDocType('marriage')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                docType === 'marriage' ? 'bg-rose-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>शादी बायोडाटा</span>
            </button>
            <button
              onClick={() => setDocType('resume')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                docType === 'resume' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>जॉब CV / Resume</span>
            </button>
          </div>

          <button
            onClick={saveToFirebase}
            disabled={isSaving}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition cursor-pointer disabled:opacity-50"
          >
            <CloudUpload className="w-4 h-4" />
            <span>Firebase सेव</span>
          </button>
          <button
            onClick={downloadPdf}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition cursor-pointer"
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
        {/* Left Form */}
        <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-4">
          <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-2">
            {docType === 'marriage' ? 'वैवाहिक विवरण प्रपत्र' : 'Job Resume Information'}
          </h3>

          <div className="space-y-3 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 block mb-1">पूरा नाम</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2.5 font-bold"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">जन्म तिथि (DOB)</label>
                <input
                  type="text"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2.5"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 block mb-1">मोबाइल नंबर</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2.5"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">ईमेल</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2.5"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-400 block mb-1">पता (Address)</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2.5"
              />
            </div>

            {/* Marriage Fields */}
            {docType === 'marriage' && (
              <>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-slate-400 block mb-1">जन्म समय</label>
                    <input
                      type="text"
                      value={birthTime}
                      onChange={(e) => setBirthTime(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">जन्म स्थान</label>
                    <input
                      type="text"
                      value={birthPlace}
                      onChange={(e) => setBirthPlace(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">कद (Height)</label>
                    <input
                      type="text"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-slate-400 block mb-1">राशि</label>
                    <input
                      type="text"
                      value={rashi}
                      onChange={(e) => setRashi(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">गोत्र</label>
                    <input
                      type="text"
                      value={gotra}
                      onChange={(e) => setGotra(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">मांगलिक</label>
                    <input
                      type="text"
                      value={manglik}
                      onChange={(e) => setManglik(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-slate-400 block mb-1">शिक्षा</label>
                    <input
                      type="text"
                      value={education}
                      onChange={(e) => setEducation(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">व्यवसाय / पद</label>
                    <input
                      type="text"
                      value={occupation}
                      onChange={(e) => setOccupation(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-slate-400 block mb-1">पिता का नाम व पद</label>
                    <input
                      type="text"
                      value={fatherName}
                      onChange={(e) => setFatherName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">माता का नाम</label>
                    <input
                      type="text"
                      value={motherName}
                      onChange={(e) => setMotherName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Resume Fields */}
            {docType === 'resume' && (
              <>
                <div>
                  <label className="text-slate-400 block mb-1">पद / Title (e.g. Software Engineer)</label>
                  <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Professional Summary</label>
                  <textarea
                    rows={3}
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Key Skills</label>
                  <input
                    type="text"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Work Experience</label>
                  <textarea
                    rows={3}
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2 font-mono text-xs"
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right Live Preview: A4 Sheet Paper */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="w-full max-w-[440px] bg-white text-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-slate-300 font-sans space-y-4">
            {docType === 'marriage' ? (
              <div className="space-y-4 text-xs font-['Baloo_2',sans-serif]">
                <div className="text-center border-b-2 border-amber-600 pb-3">
                  <span className="text-amber-800 text-sm font-bold block">॥ श्री गणेशाय नमः ॥</span>
                  <h4 className="text-2xl font-black text-slate-900">वैवाहिक बायोडाटा</h4>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Biodata for Matrimony</p>
                </div>

                <div className="space-y-2">
                  <h5 className="font-extrabold text-amber-800 text-sm border-b pb-0.5">व्यक्तिगत विवरण:</h5>
                  <div className="grid grid-cols-2 gap-y-1 text-[11px] text-slate-700">
                    <p><span className="text-slate-500 font-semibold">नाम:</span> {fullName}</p>
                    <p><span className="text-slate-500 font-semibold">जन्म तिथि:</span> {dob}</p>
                    <p><span className="text-slate-500 font-semibold">जन्म समय:</span> {birthTime}</p>
                    <p><span className="text-slate-500 font-semibold">स्थान:</span> {birthPlace}</p>
                    <p><span className="text-slate-500 font-semibold">कद:</span> {height}</p>
                    <p><span className="text-slate-500 font-semibold">वर्ण:</span> {complexion}</p>
                    <p><span className="text-slate-500 font-semibold">गोत्र:</span> {gotra}</p>
                    <p><span className="text-slate-500 font-semibold">मांगलिक:</span> {manglik}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h5 className="font-extrabold text-amber-800 text-sm border-b pb-0.5">शिक्षा एवं व्यवसाय:</h5>
                  <div className="space-y-1 text-[11px] text-slate-700">
                    <p><span className="text-slate-500 font-semibold">शिक्षा:</span> {education}</p>
                    <p><span className="text-slate-500 font-semibold">व्यवसाय:</span> {occupation}</p>
                    <p><span className="text-slate-500 font-semibold">वार्षिक आय:</span> {income}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h5 className="font-extrabold text-amber-800 text-sm border-b pb-0.5">पारिवारिक विवरण:</h5>
                  <div className="space-y-1 text-[11px] text-slate-700">
                    <p><span className="text-slate-500 font-semibold">पिता:</span> {fatherName}</p>
                    <p><span className="text-slate-500 font-semibold">माता:</span> {motherName}</p>
                    <p><span className="text-slate-500 font-semibold">भाई-बहन:</span> {siblings}</p>
                  </div>
                </div>

                <div className="space-y-1 pt-2 border-t text-[11px] text-slate-700">
                  <p><span className="text-slate-500 font-semibold">संपर्क:</span> {phone} • {email}</p>
                  <p><span className="text-slate-500 font-semibold">पता:</span> {address}</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-xs font-sans">
                <div className="border-b pb-3">
                  <h4 className="text-2xl font-black text-slate-900">{fullName}</h4>
                  <p className="text-blue-700 font-bold text-sm">{jobTitle}</p>
                  <p className="text-[10px] text-slate-500 mt-1">{phone} • {email} • {address}</p>
                </div>

                <div className="space-y-1">
                  <h5 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] border-b pb-0.5">Summary</h5>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{summary}</p>
                </div>

                <div className="space-y-1">
                  <h5 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] border-b pb-0.5">Skills</h5>
                  <p className="text-[11px] text-slate-700 font-medium">{skills}</p>
                </div>

                <div className="space-y-1">
                  <h5 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] border-b pb-0.5">Experience</h5>
                  <p className="text-[11px] text-slate-600 whitespace-pre-line leading-relaxed">{experience}</p>
                </div>

                <div className="space-y-1">
                  <h5 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] border-b pb-0.5">Education</h5>
                  <p className="text-[11px] text-slate-700">{education}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
