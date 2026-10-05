import React, { useEffect, useState } from 'react';
import { X, Trash2, FolderHeart, ExternalLink, Calendar, LogIn, Sparkles, ShieldCheck } from 'lucide-react';
import { auth, db, handleFirestoreError, OperationType, googleProvider } from '../../firebase';
import { collection, query, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { signInWithPopup, User } from 'firebase/auth';
import { UserSavedItem } from '../../types';

interface SavedProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
}

export const SavedProjectsModal: React.FC<SavedProjectsModalProps> = ({
  isOpen,
  onClose,
  currentUser
}) => {
  const [items, setItems] = useState<UserSavedItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen || !currentUser) {
      setItems([]);
      return;
    }

    setLoading(true);
    const colPath = `users/${currentUser.uid}/savedItems`;
    const q = query(collection(db, 'users', currentUser.uid, 'savedItems'));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const fetched: UserSavedItem[] = [];
        snapshot.forEach((d) => {
          fetched.push(d.data() as UserSavedItem);
        });
        setItems(fetched.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
        setLoading(false);
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, colPath);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [isOpen, currentUser]);

  const handleDelete = async (itemId: string) => {
    if (!currentUser) return;
    if (!confirm('क्या आप इस सहेजे गए प्रोजेक्ट को हटाना चाहते हैं?')) return;

    const path = `users/${currentUser.uid}/savedItems/${itemId}`;
    try {
      await deleteDoc(doc(db, 'users', currentUser.uid, 'savedItems', itemId));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, path);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <FolderHeart className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white">
                सुरक्षित सहेजे गए दस्तावेज़ व फोटो (Firebase Database)
              </h3>
              <p className="text-xs text-slate-400">
                आपके द्वारा बनाए गए ID कार्ड, शादी कार्ड, बायोडाटा एवं फोटो
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          {!currentUser ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto text-blue-400">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-white">
                Firebase सुरक्षित क्लाउड में डेटा सहेजने हेतु लॉगिन करें
              </h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Google लॉगिन करने पर आपके सभी ID कार्ड, फोटो विवरण और दस्तावेज़ आपके व्यक्तिगत डेटाबेस में एन्क्रिप्टेड रूप में सुरक्षित रहेंगे।
              </p>
              <button
                onClick={handleLogin}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-md transition cursor-pointer"
              >
                Google से सुरक्षित लॉगिन करें
              </button>
            </div>
          ) : loading ? (
            <div className="text-center py-10 text-amber-400 animate-pulse text-sm">
              डेटा लोड हो रहा है...
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-12 space-y-2">
              <span className="text-4xl">📁</span>
              <h4 className="text-base font-bold text-white">अभी कोई सहेजा गया प्रोजेक्ट नहीं है</h4>
              <p className="text-xs text-slate-400">
                ID कार्ड, शादी कार्ड, बायोडाटा या फोटो बनाकर "Firebase सेव" बटन दबाएं।
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4 hover:border-slate-700 transition"
                >
                  <div className="flex items-center gap-3">
                    {item.previewImage ? (
                      <img
                        src={item.previewImage}
                        alt="Preview"
                        className="w-12 h-12 rounded-xl object-cover border border-slate-800 shrink-0 bg-slate-900"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-xl shrink-0">
                        📄
                      </div>
                    )}

                    <div>
                      <div className="flex items-center gap-2">
                        <h5 className="font-bold text-sm text-white line-clamp-1">
                          {item.title}
                        </h5>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-amber-300 font-semibold uppercase">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <Calendar className="w-3 h-3 text-slate-500" />
                        <span>{new Date(item.createdAt).toLocaleString('hi-IN')}</span>
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 rounded-xl bg-slate-900 hover:bg-red-950 text-slate-400 hover:text-red-400 transition cursor-pointer"
                    title="डेटाबेस से हटाएं"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>Firebase Firestore 256-bit ABAC Protected</span>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition cursor-pointer"
          >
            बंद करें
          </button>
        </div>
      </div>
    </div>
  );
};
