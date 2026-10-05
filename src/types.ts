export type ActiveTab = 
  | 'kids-home'
  | 'kids-varnamala'
  | 'kids-alphabet'
  | 'kids-numbers'
  | 'kids-rhymes'
  | 'kids-categories'
  | 'kids-drawing'
  | 'kids-quiz'
  | 'kids-worksheets'
  | 'tools-hub'
  | 'tool-pdf-jpg'
  | 'tool-photo-compress'
  | 'tool-image-enhance'
  | 'gen-id-card'
  | 'gen-shadi-card'
  | 'gen-passport-photo'
  | 'gen-biodata-cv'
  | 'gen-letter-app'
  | 'embed-export';

export interface UserSavedItem {
  id: string;
  userId: string;
  category: 'id-card' | 'shadi-card' | 'passport-photo' | 'biodata-cv' | 'letter-app' | 'drawing';
  title: string;
  data: string; // JSON payload
  previewImage?: string; // base64 or preview thumbnail
  createdAt: string;
  updatedAt?: string;
}

export interface VarnamalaLetter {
  letter: string;
  word: string;
  meaning: string;
  transliteration: string;
  imageEmoji: string;
  audioText: string;
  type: 'swar' | 'vyanjan';
}

export interface AlphabetLetter {
  char: string;
  lower: string;
  word: string;
  phonics: string;
  imageEmoji: string;
  audioPrompt: string;
}

export interface NumberItem {
  num: number;
  wordEnglish: string;
  wordHindi: string;
  emojis: string[];
}

export interface RhymeItem {
  id: string;
  title: string;
  titleHindi: string;
  language: 'hi' | 'en';
  category: string;
  lyrics: string[];
  bannerEmoji: string;
  color: string;
}

export interface DiscoveryCategory {
  id: string;
  nameEn: string;
  nameHi: string;
  icon: string;
  items: {
    en: string;
    hi: string;
    emoji: string;
    soundText: string;
  }[];
}
