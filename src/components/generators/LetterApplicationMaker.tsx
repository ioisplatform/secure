import React, { useState } from 'react';
import { Download, Copy, CloudUpload, CheckCircle2, FileText, Send, Sparkles } from 'lucide-react';
import jsPDF from 'jspdf';
import confetti from 'canvas-confetti';
import { auth, db, handleFirestoreError, OperationType } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';

interface LetterTemplate {
  id: string;
  nameHi: string;
  category: string;
  toTitle: string;
  subjectDefault: string;
  bodyDefault: string;
}

const TEMPLATES: LetterTemplate[] = [
  {
    id: 'school-leave',
    nameHi: 'स्कूल/कॉलेज अवकाश प्रार्थना पत्र (Leave Application)',
    category: 'Education',
    toTitle: 'सेवा में,\nश्रीमान प्रधानाचार्य महोदय,\nराजकीय उच्च माध्यमिक विद्यालय,\nजयपुर (राजस्थान)।',
    subjectDefault: 'बीमारी के कारण 3 दिन के अवकाश हेतु प्रार्थना पत्र।',
    bodyDefault: 'महोदय,\n\nसविनय निवेदन है कि मुझे कल रात से अचानक तेज बुखार आ गया है। डॉक्टर ने मुझे 3 दिन पूर्ण विश्राम की सलाह दी है। अतएव मैं विद्यालय में उपस्थित होने में असमर्थ हूँ।\n\nअतः आपसे करबद्ध प्रार्थना है कि मुझे दिनांक [प्रारंभ तिथि] से [अंतिम तिथि] तक 3 दिन का अवकाश स्वीकृत करने की कृपा करें। इसके लिए मैं आपका सदैव आभारी रहूँगा।\n\nसधन्यवाद।'
  },
  {
    id: 'bank-atm',
    nameHi: 'बैंक शाखा प्रबंधक को आवेदन (Bank ATM / Passbook Request)',
    category: 'Banking',
    toTitle: 'सेवा में,\nशाखा प्रबंधक महोदय,\nभारतीय स्टेट बैंक (SBI),\nशाखा - मुख्य बाजार, नई दिल्ली।',
    subjectDefault: 'नए ATM/डेबिट कार्ड जारी करने हेतु आवेदन पत्र।',
    bodyDefault: 'महोदय,\n\nसविनय निवेदन है कि मेरा एक बचत खाता आपकी बैंक शाखा में है, जिसका खाता संख्या [खाता संख्या] है। मेरा पुराना एटीएम कार्ड टूट जाने/खो जाने के कारण मुझे लेन-देन में असुविधा हो रही है।\n\nअतः आपसे विनम्र निवेदन है कि मेरे उक्त खाते पर एक नया रूपे/वीज़ा एटीएम कार्ड जारी करने की कृपा करें। आवश्यक दस्तावेज संलग्न हैं।\n\nसधन्यवाद।'
  },
  {
    id: 'job-cover',
    nameHi: 'नौकरी हेतु औपचारिक आवेदन (Job Application Letter)',
    category: 'Career',
    toTitle: 'To,\nThe Hiring Manager,\nHuman Resources Department,\n[Company Name],\nBangalore, India.',
    subjectDefault: 'Application for the position of Software Developer / Specialist.',
    bodyDefault: 'Respected Sir/Madam,\n\nWith reference to your job advertisement regarding the vacancy for the post of [Job Title], I wish to offer my candidature for the same. I have completed my Bachelor\'s Degree in Computer Science with distinction and possess relevant hands-on experience in full-stack web and application development.\n\nI am confident that my technical skills, dedication, and problem-solving mindset make me an ideal candidate for your esteemed organization. My detailed resume is enclosed herewith for your kind consideration.\n\nLooking forward to a positive response.\n\nYours faithfully,'
  },
  {
    id: 'police-lost',
    nameHi: 'दस्तावेज गुम होने की शिकायत (Lost Document / Police Complaint)',
    category: 'Official',
    toTitle: 'सेवा में,\nथाना प्रभारी महोदय,\nपुलिस थाना - कोतवाली,\nजयपुर (राजस्थान)।',
    subjectDefault: 'मूल शैक्षणिक अंकतालिका एवं आधार कार्ड खो जाने की सूचना बाबत।',
    bodyDefault: 'महोदय,\n\nसविनय निवेदन है कि प्रार्थी [आपका नाम], निवासी [आपका पता] है। दिनांक [तारीख] को बाजार जाते समय मेरा पर्स/बैग कहीं गिर गया, जिसमें मेरी कक्षा 10वीं की मूल अंकतालिका, आधार कार्ड व कुछ जरूरी दस्तावेज थे। काफी खोजबीन करने पर भी वह नहीं मिला।\n\nअतः आपसे निवेदन है कि मेरी इस सूचना को अपनी दैनिक डायरी में दर्ज कर मुझे एक प्रमाणित प्रति (NOC/पावती) प्रदान करने की कृपा करें, ताकि मैं द्वितीयक प्रति हेतु आवेदन कर सकूँ।\n\nसधन्यवाद।'
  }
];

export const LetterApplicationMaker: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<LetterTemplate>(TEMPLATES[0]);
  const [toHeader, setToHeader] = useState(TEMPLATES[0].toTitle);
  const [subject, setSubject] = useState(TEMPLATES[0].subjectDefault);
  const [letterBody, setLetterBody] = useState(TEMPLATES[0].bodyDefault);
  const [applicantName, setApplicantName] = useState('रोहित कुमार (Rohit Kumar)');
  const [applicantDetails, setApplicantDetails] = useState('कक्षा: 10वीं - अनुक्रमांक: 24\nमोबाइल: 9876543210\nदिनांक: ' + new Date().toLocaleDateString('hi-IN'));
  const [copied, setCopied] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleSelectTemplate = (tpl: LetterTemplate) => {
    setSelectedTemplate(tpl);
    setToHeader(tpl.toTitle);
    setSubject(tpl.subjectDefault);
    setLetterBody(tpl.bodyDefault);
  };

  const copyToClipboard = () => {
    const fullText = `${toHeader}\n\nविषय: ${subject}\n\n${letterBody}\n\nभवदीय,\n${applicantName}\n${applicantDetails}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    confetti({ particleCount: 20, spread: 50 });
  };

  const saveToFirebase = async () => {
    if (!auth.currentUser) {
      alert('कृपया पहले ऊपर Google लॉगिन करें ताकि आपका आवेदन पत्र Firebase में सुरक्षित स्टोर हो सके!');
      return;
    }

    try {
      setIsSaving(true);
      setSaveStatus('Saving to Firebase...');
      const itemId = `letter_${Date.now()}`;
      const payload = {
        templateId: selectedTemplate.id,
        toHeader,
        subject,
        letterBody,
        applicantName,
        applicantDetails
      };

      await setDoc(doc(db, 'users', auth.currentUser.uid, 'savedItems', itemId), {
        id: itemId,
        userId: auth.currentUser.uid,
        category: 'letter-app',
        title: `Letter: ${subject.substring(0, 50)}`,
        data: JSON.stringify(payload),
        previewImage: '',
        createdAt: new Date().toISOString()
      });

      setSaveStatus('प्रार्थना पत्र Firebase में सुरक्षित सहेज दिया गया! ✅');
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

    doc.setDrawColor(203, 213, 225);
    doc.line(20, 20, 190, 20);

    // To Header
    doc.setFontSize(11);
    doc.setTextColor(30, 41, 59);
    const toLines = doc.splitTextToSize(toHeader, 170);
    doc.text(toLines, 20, 32);

    // Subject
    let y = 32 + toLines.length * 6 + 6;
    doc.setFontSize(12);
    doc.setTextColor(15, 23, 42);
    doc.text(`विषय (Subject): ${subject}`, 20, y);

    // Body
    y += 10;
    doc.setFontSize(11);
    doc.setTextColor(51, 65, 85);
    const bodyLines = doc.splitTextToSize(letterBody, 170);
    doc.text(bodyLines, 20, y);

    // Signature
    y += bodyLines.length * 6 + 15;
    doc.setFontSize(11);
    doc.setTextColor(30, 41, 59);
    doc.text('भवदीय / प्रार्थी (Applicant):', 130, y);
    doc.text(applicantName, 130, y + 8);
    const signLines = doc.splitTextToSize(applicantDetails, 70);
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text(signLines, 130, y + 16);

    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text('IOIS Indian Publication Formal Letters Series', 105, 280, { align: 'center' });

    doc.save(`iois-letter-${selectedTemplate.id}.pdf`);
    confetti({ particleCount: 30, spread: 60 });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/80 border border-slate-800 p-4 sm:p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">📝</span>
            <h2 className="text-xl sm:text-2xl font-black text-amber-300">
              प्रार्थना पत्र एवं आवेदन जनरेटर (Official Letter & Application Maker)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            स्कूल/कॉलेज अवकाश, बैंक प्रार्थना पत्र, पुलिस शिकायत व नौकरी हेतु तुरंत कस्टमाइजेबल औपचारिक पत्र तैयार करें।
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition cursor-pointer"
          >
            {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'कॉपी हो गया!' : 'टेक्स्ट कॉपी करें'}</span>
          </button>
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
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-md transition cursor-pointer"
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

      {/* Templates Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {TEMPLATES.map((t) => {
          const isSelected = selectedTemplate.id === t.id;
          return (
            <button
              key={t.id}
              onClick={() => handleSelectTemplate(t)}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? 'bg-amber-500/20 border-amber-400 shadow-md text-amber-300'
                  : 'bg-slate-900/90 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-bold">
                {t.category}
              </span>
              <h4 className="font-bold text-xs sm:text-sm text-white mt-1.5 line-clamp-1">
                {t.nameHi}
              </h4>
            </button>
          );
        })}
      </div>

      {/* Editor & Letter Sheet Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Editor Inputs */}
        <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-4 text-xs">
          <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-2">
            पत्र संपादन (Edit Letter Form)
          </h3>

          <div>
            <label className="text-slate-400 block mb-1">प्रति / सेवा में (Recipient Address & Designation):</label>
            <textarea
              rows={3}
              value={toHeader}
              onChange={(e) => setToHeader(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2.5 font-mono"
            />
          </div>

          <div>
            <label className="text-slate-400 block mb-1">विषय (Subject):</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 text-white font-bold rounded-lg p-2.5"
            />
          </div>

          <div>
            <label className="text-slate-400 block mb-1">मुख्य सामग्री / सन्दर्भ (Letter Body):</label>
            <textarea
              rows={7}
              value={letterBody}
              onChange={(e) => setLetterBody(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2.5 font-sans leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-slate-400 block mb-1">प्रार्थी / आवेदक का नाम:</label>
              <input
                type="text"
                value={applicantName}
                onChange={(e) => setApplicantName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2.5 font-bold"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">रोल नंबर / संपर्क / दिनांक:</label>
              <textarea
                rows={2}
                value={applicantDetails}
                onChange={(e) => setApplicantDetails(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2 font-mono text-[11px]"
              />
            </div>
          </div>
        </div>

        {/* Live Formal Paper Preview */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="w-full max-w-[460px] bg-white text-slate-900 rounded-3xl p-6 sm:p-10 shadow-2xl border-4 border-slate-300 font-sans space-y-5 text-xs">
            <div className="border-b-2 border-slate-800 pb-2 text-center">
              <span className="text-xs font-black tracking-widest uppercase text-slate-800">
                IOIS FORMAL LETTER APPLICATION
              </span>
            </div>

            {/* To Header */}
            <div className="whitespace-pre-line text-slate-800 font-semibold leading-relaxed">
              {toHeader}
            </div>

            {/* Subject */}
            <div className="p-2 rounded-lg bg-slate-100 font-bold text-slate-900 border border-slate-300">
              <span className="text-orange-700 font-extrabold">विषय: </span>
              {subject}
            </div>

            {/* Body */}
            <div className="whitespace-pre-line text-slate-700 leading-relaxed font-normal py-2">
              {letterBody}
            </div>

            {/* Signatory */}
            <div className="pt-4 border-t border-slate-200 text-right space-y-1">
              <p className="font-bold text-slate-800">भवदीय / प्रार्थी:</p>
              <p className="font-black text-slate-950 text-sm">{applicantName}</p>
              <p className="whitespace-pre-line text-slate-500 font-mono text-[10px]">{applicantDetails}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
