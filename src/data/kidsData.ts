import { VarnamalaLetter, AlphabetLetter, NumberItem, RhymeItem, DiscoveryCategory } from '../types';

export const HINDI_SWAR: VarnamalaLetter[] = [
  { letter: 'अ', word: 'अनार', meaning: 'Pomegranate', transliteration: 'A se Anaar', imageEmoji: '🍎', audioText: 'अ से अनार, मीठा और दानेदार', type: 'swar' },
  { letter: 'आ', word: 'आम', meaning: 'Mango', transliteration: 'Aa se Aam', imageEmoji: '🥭', audioText: 'आ से आम, फलों का राजा', type: 'swar' },
  { letter: 'इ', word: 'इमली', meaning: 'Tamarind', transliteration: 'I se Imli', imageEmoji: '🍂', audioText: 'इ से इमली, खट्टी-मीठी', type: 'swar' },
  { letter: 'ई', word: 'ईख', meaning: 'Sugarcane', transliteration: 'Ee se Eekh', imageEmoji: '🎋', audioText: 'ई से ईख, सबको भाए', type: 'swar' },
  { letter: 'उ', word: 'उल्लू', meaning: 'Owl', transliteration: 'U se Ullu', imageEmoji: '🦉', audioText: 'उ से उल्लू, रात को जागे', type: 'swar' },
  { letter: 'ऊ', word: 'ऊन', meaning: 'Wool', transliteration: 'Oo se Oon', imageEmoji: '🧶', audioText: 'ऊ से ऊन, सर्दी भगाए', type: 'swar' },
  { letter: 'ऋ', word: 'ऋषि', meaning: 'Sage', transliteration: 'Ri se Rishi', imageEmoji: '🧘', audioText: 'ऋ से ऋषि, ध्यान लगाए', type: 'swar' },
  { letter: 'ए', word: 'एड़ी', meaning: 'Heel', transliteration: 'E se Edee', imageEmoji: '🦶', audioText: 'ए से एड़ी, कदम बढ़ाए', type: 'swar' },
  { letter: 'ऐ', word: 'ऐनक', meaning: 'Spectacles', transliteration: 'Ai se Ainak', imageEmoji: '👓', audioText: 'ऐ से ऐनक, साफ दिखाए', type: 'swar' },
  { letter: 'ओ', word: 'ओखली', meaning: 'Mortar', transliteration: 'O se Okhli', imageEmoji: '🥣', audioText: 'ओ से ओखली, धान कूटे', type: 'swar' },
  { letter: 'औ', word: 'औरत', meaning: 'Woman', transliteration: 'Au se Aurat', imageEmoji: '👩', audioText: 'औ से औरत, ममता की मूरत', type: 'swar' },
  { letter: 'अं', word: 'अंगूर', meaning: 'Grapes', transliteration: 'Ang se Angoor', imageEmoji: '🍇', audioText: 'अं से अंगूर, खट्टे-मीठे', type: 'swar' },
  { letter: 'अः', word: 'अहा!', meaning: 'Joy', transliteration: 'Aha se Khaali', imageEmoji: '😄', audioText: 'अः से खाली, बजाओ ताली', type: 'swar' },
];

export const HINDI_VYANJAN: VarnamalaLetter[] = [
  { letter: 'क', word: 'कमल', meaning: 'Lotus', transliteration: 'Ka se Kamal', imageEmoji: '🪷', audioText: 'क से कमल, राष्ट्रीय फूल', type: 'vyanjan' },
  { letter: 'ख', word: 'खरगोश', meaning: 'Rabbit', transliteration: 'Kha se Khargosh', imageEmoji: '🐇', audioText: 'ख से खरगोश, प्यारा-प्यारा', type: 'vyanjan' },
  { letter: 'ग', word: 'गमला', meaning: 'Flower pot', transliteration: 'Ga se Gamla', imageEmoji: '🪴', audioText: 'ग से गमला, फूल खिलाए', type: 'vyanjan' },
  { letter: 'घ', word: 'घड़ी', meaning: 'Clock', transliteration: 'Gha se Ghadi', imageEmoji: '⏰', audioText: 'घ से घड़ी, समय बताए', type: 'vyanjan' },
  { letter: 'ङ', word: 'खाली', meaning: 'Empty', transliteration: 'Nga khali', imageEmoji: '✨', audioText: 'ङ खाली, बच्चों बजाओ ताली', type: 'vyanjan' },
  { letter: 'च', word: 'चम्मच', meaning: 'Spoon', transliteration: 'Cha se Chammach', imageEmoji: '🥄', audioText: 'च से चम्मच, खीर खिलाए', type: 'vyanjan' },
  { letter: 'छ', word: 'छतरी', meaning: 'Umbrella', transliteration: 'Chha se Chhatri', imageEmoji: '☂️', audioText: 'छ से छतरी, धूप-बारिश से बचाए', type: 'vyanjan' },
  { letter: 'ज', word: 'जहाज', meaning: 'Ship', transliteration: 'Ja se Jahaaj', imageEmoji: '🚢', audioText: 'ज से जहाज, पानी में तैरे', type: 'vyanjan' },
  { letter: 'झ', word: 'झंडा', meaning: 'Flag', transliteration: 'Jha se Jhanda', imageEmoji: '🇮🇳', audioText: 'झ से झंडा, तिरंगा हमारा', type: 'vyanjan' },
  { letter: 'ञ', word: 'खाली', meaning: 'Empty', transliteration: 'Nya khali', imageEmoji: '✨', audioText: 'ञ खाली, खुशियों की ताली', type: 'vyanjan' },
  { letter: 'ट', word: 'टमाटर', meaning: 'Tomato', transliteration: 'Ta se Tamatar', imageEmoji: '🍅', audioText: 'ट से टमाटर, लाल-लाल', type: 'vyanjan' },
  { letter: 'ठ', word: 'ठठेरा', meaning: 'Tinsmith', transliteration: 'Tha se Thathera', imageEmoji: '🔨', audioText: 'ठ से ठठेरा, बर्तन बनाए', type: 'vyanjan' },
  { letter: 'ड', word: 'डमरू', meaning: 'Drum', transliteration: 'Da se Damru', imageEmoji: '🪘', audioText: 'ड से डमरू, डम-डम बाजे', type: 'vyanjan' },
  { letter: 'ढ', word: 'ढक्कन', meaning: 'Lid', transliteration: 'Dha se Dhakkan', imageEmoji: '🍲', audioText: 'ढ से ढक्कन, खाने को ढांके', type: 'vyanjan' },
  { letter: 'ण', word: 'खाली', meaning: 'Empty', transliteration: 'Na khali', imageEmoji: '✨', audioText: 'ण खाली, सुंदर बोली', type: 'vyanjan' },
  { letter: 'त', word: 'तरबूज', meaning: 'Watermelon', transliteration: 'Ta se Tarbooj', imageEmoji: '🍉', audioText: 'त से तरबूज, मीठा रसभरा', type: 'vyanjan' },
  { letter: 'थ', word: 'थर्मस', meaning: 'Flask', transliteration: 'Tha se Thermas', imageEmoji: '🍶', audioText: 'थ से थर्मस, चाय गरम रखे', type: 'vyanjan' },
  { letter: 'द', word: 'दवात', meaning: 'Inkpot', transliteration: 'Da se Dawaat', imageEmoji: '✒️', audioText: 'द से दवात, स्याही भरी', type: 'vyanjan' },
  { letter: 'ध', word: 'धनुष', meaning: 'Bow', transliteration: 'Dha se Dhanush', imageEmoji: '🏹', audioText: 'ध से धनुष, बाण चलाए', type: 'vyanjan' },
  { letter: 'न', word: 'नल', meaning: 'Tap', transliteration: 'Na se Nal', imageEmoji: '🚰', audioText: 'न से नल, जल ही जीवन', type: 'vyanjan' },
  { letter: 'प', word: 'पतंग', meaning: 'Kite', transliteration: 'Pa se Patang', imageEmoji: '🪁', audioText: 'प से पतंग, उड़ी आकाश', type: 'vyanjan' },
  { letter: 'फ', word: 'फल', meaning: 'Fruits', transliteration: 'Pha se Phal', imageEmoji: '🍎', audioText: 'फ से फल, सेहतमंद बनाए', type: 'vyanjan' },
  { letter: 'ब', word: 'बत्तख', meaning: 'Duck', transliteration: 'Ba se Batakh', imageEmoji: '🦆', audioText: 'ब से बत्तख, क्वाक-क्वाक करे', type: 'vyanjan' },
  { letter: 'भ', word: 'भालू', meaning: 'Bear', transliteration: 'Bha se Bhaloo', imageEmoji: '🐻', audioText: 'भ से भालू, नाच दिखाए', type: 'vyanjan' },
  { letter: 'म', word: 'मछली', meaning: 'Fish', transliteration: 'Ma se Machhli', imageEmoji: '🐟', audioText: 'म से मछली, जल की रानी', type: 'vyanjan' },
  { letter: 'य', word: 'यज्ञ', meaning: 'Yajna', transliteration: 'Ya se Yagya', imageEmoji: '🔥', audioText: 'य से यज्ञ, ऋषि-मुनि करते', type: 'vyanjan' },
  { letter: 'र', word: 'रथ', meaning: 'Chariot', transliteration: 'Ra se Rath', imageEmoji: '🎠', audioText: 'र से रथ, राजा की सवारी', type: 'vyanjan' },
  { letter: 'ल', word: 'लट्टू', meaning: 'Spinning Top', transliteration: 'La se Lattoo', imageEmoji: '🪀', audioText: 'ल से लट्टू, गोल-गोल घूमे', type: 'vyanjan' },
  { letter: 'व', word: 'वक', meaning: 'Heron / Crane', transliteration: 'Va se Vak', imageEmoji: '🦩', audioText: 'व से वक, पानी में बगुला', type: 'vyanjan' },
  { letter: 'श', word: 'शलजम', meaning: 'Turnip', transliteration: 'Sha se Shaljam', imageEmoji: '🥗', audioText: 'श से शलजम, पौष्टिक सब्जी', type: 'vyanjan' },
  { letter: 'ष', word: 'षट्कोण', meaning: 'Hexagon', transliteration: 'Sha se Shatkon', imageEmoji: '🛑', audioText: 'ष से षट्कोण, छह कोनों वाला', type: 'vyanjan' },
  { letter: 'स', word: 'सेब', meaning: 'Apple', transliteration: 'Sa se Seb', imageEmoji: '🍏', audioText: 'स से सेब, रोज़ एक खाओ', type: 'vyanjan' },
  { letter: 'ह', word: 'हाथी', meaning: 'Elephant', transliteration: 'Ha se Haathi', imageEmoji: '🐘', audioText: 'ह से हाथी, सूंड हिलाता', type: 'vyanjan' },
  { letter: 'क्ष', word: 'क्षत्रिय', meaning: 'Warrior', transliteration: 'Ksha se Kshatriya', imageEmoji: '🛡️', audioText: 'क्ष से क्षत्रिय, देश का रक्षक', type: 'vyanjan' },
  { letter: 'त्र', word: 'त्रिशूल', meaning: 'Trident', transliteration: 'Tra se Trishool', imageEmoji: '🔱', audioText: 'त्र से त्रिशूल, तीन नोकों वाला', type: 'vyanjan' },
  { letter: 'ज्ञ', word: 'ज्ञानी', meaning: 'Wise Man', transliteration: 'Gya se Gyaani', imageEmoji: '🧙‍♂️', audioText: 'ज्ञ से ज्ञानी, ज्ञान का सागर', type: 'vyanjan' },
];

export const ENGLISH_ALPHABET: AlphabetLetter[] = [
  { char: 'A', lower: 'a', word: 'Apple', phonics: '/æ/ as in Apple', imageEmoji: '🍎', audioPrompt: 'A for Apple, sweet and red' },
  { char: 'B', lower: 'b', word: 'Ball', phonics: '/b/ as in Ball', imageEmoji: '⚽', audioPrompt: 'B for Ball, bounce and catch' },
  { char: 'C', lower: 'c', word: 'Cat', phonics: '/k/ as in Cat', imageEmoji: '🐱', audioPrompt: 'C for Cat, meow meow' },
  { char: 'D', lower: 'd', word: 'Dog', phonics: '/d/ as in Dog', imageEmoji: '🐶', audioPrompt: 'D for Dog, woof woof' },
  { char: 'E', lower: 'e', word: 'Elephant', phonics: '/e/ as in Elephant', imageEmoji: '🐘', audioPrompt: 'E for Elephant, big and grey' },
  { char: 'F', lower: 'f', word: 'Fish', phonics: '/f/ as in Fish', imageEmoji: '🐟', audioPrompt: 'F for Fish, swim in the water' },
  { char: 'G', lower: 'g', word: 'Grapes', phonics: '/ɡ/ as in Grapes', imageEmoji: '🍇', audioPrompt: 'G for Grapes, juicy and sweet' },
  { char: 'H', lower: 'h', word: 'Horse', phonics: '/h/ as in Horse', imageEmoji: '🐴', audioPrompt: 'H for Horse, running fast' },
  { char: 'I', lower: 'i', word: 'Ice Cream', phonics: '/aɪ/ as in Ice Cream', imageEmoji: '🍦', audioPrompt: 'I for Ice Cream, cool and yummy' },
  { char: 'J', lower: 'j', word: 'Joker', phonics: '/dʒ/ as in Joker', imageEmoji: '🤡', audioPrompt: 'J for Joker, making us laugh' },
  { char: 'K', lower: 'k', word: 'Kite', phonics: '/k/ as in Kite', imageEmoji: '🪁', audioPrompt: 'K for Kite, flying high' },
  { char: 'L', lower: 'l', word: 'Lion', phonics: '/l/ as in Lion', imageEmoji: '🦁', audioPrompt: 'L for Lion, king of jungle' },
  { char: 'M', lower: 'm', word: 'Monkey', phonics: '/m/ as in Monkey', imageEmoji: '🐵', audioPrompt: 'M for Monkey, eating bananas' },
  { char: 'N', lower: 'n', word: 'Nest', phonics: '/n/ as in Nest', imageEmoji: '🪺', audioPrompt: 'N for Nest, home for birds' },
  { char: 'O', lower: 'o', word: 'Orange', phonics: '/ɒ/ as in Orange', imageEmoji: '🍊', audioPrompt: 'O for Orange, round and juicy' },
  { char: 'P', lower: 'p', word: 'Peacock', phonics: '/p/ as in Peacock', imageEmoji: '🦚', audioPrompt: 'P for Peacock, national bird of India' },
  { char: 'Q', lower: 'q', word: 'Queen', phonics: '/kw/ as in Queen', imageEmoji: '👑', audioPrompt: 'Q for Queen, wearing a crown' },
  { char: 'R', lower: 'r', word: 'Rabbit', phonics: '/r/ as in Rabbit', imageEmoji: '🐰', audioPrompt: 'R for Rabbit, hop hop hop' },
  { char: 'S', lower: 's', word: 'Sun', phonics: '/s/ as in Sun', imageEmoji: '☀️', audioPrompt: 'S for Sun, shining bright' },
  { char: 'T', lower: 't', word: 'Tiger', phonics: '/t/ as in Tiger', imageEmoji: '🐅', audioPrompt: 'T for Tiger, strong and brave' },
  { char: 'U', lower: 'u', word: 'Umbrella', phonics: '/ʌ/ as in Umbrella', imageEmoji: '☂️', audioPrompt: 'U for Umbrella, protects from rain' },
  { char: 'V', lower: 'v', word: 'Van', phonics: '/v/ as in Van', imageEmoji: '🚐', audioPrompt: 'V for Van, taking us to school' },
  { char: 'W', lower: 'w', word: 'Watch', phonics: '/w/ as in Watch', imageEmoji: '⌚', audioPrompt: 'W for Watch, tick tock tick' },
  { char: 'X', lower: 'x', word: 'Xylophone', phonics: '/z/ as in Xylophone', imageEmoji: '🎵', audioPrompt: 'X for Xylophone, sweet music' },
  { char: 'Y', lower: 'y', word: 'Yak', phonics: '/j/ as in Yak', imageEmoji: '🐂', audioPrompt: 'Y for Yak, in snowy mountains' },
  { char: 'Z', lower: 'z', word: 'Zebra', phonics: '/z/ as in Zebra', imageEmoji: '🦓', audioPrompt: 'Z for Zebra, black and white stripes' },
];

export const NUMBERS_1_TO_20: NumberItem[] = [
  { num: 1, wordEnglish: 'One', wordHindi: 'एक', emojis: ['⭐'] },
  { num: 2, wordEnglish: 'Two', wordHindi: 'दो', emojis: ['⭐', '⭐'] },
  { num: 3, wordEnglish: 'Three', wordHindi: 'तीन', emojis: ['⭐', '⭐', '⭐'] },
  { num: 4, wordEnglish: 'Four', wordHindi: 'चार', emojis: ['🍎', '🍎', '🍎', '🍎'] },
  { num: 5, wordEnglish: 'Five', wordHindi: 'पाँच', emojis: ['🎈', '🎈', '🎈', '🎈', '🎈'] },
  { num: 6, wordEnglish: 'Six', wordHindi: 'छह', emojis: ['🚗', '🚗', '🚗', '🚗', '🚗', '🚗'] },
  { num: 7, wordEnglish: 'Seven', wordHindi: 'सात', emojis: ['🌸', '🌸', '🌸', '🌸', '🌸', '🌸', '🌸'] },
  { num: 8, wordEnglish: 'Eight', wordHindi: 'आठ', emojis: ['🦋', '🦋', '🦋', '🦋', '🦋', '🦋', '🦋', '🦋'] },
  { num: 9, wordEnglish: 'Nine', wordHindi: 'नौ', emojis: ['🍓', '🍓', '🍓', '🍓', '🍓', '🍓', '🍓', '🍓', '🍓'] },
  { num: 10, wordEnglish: 'Ten', wordHindi: 'दस', emojis: ['🌟', '🌟', '🌟', '🌟', '🌟', '🌟', '🌟', '🌟', '🌟', '🌟'] },
  { num: 11, wordEnglish: 'Eleven', wordHindi: 'ग्यारह', emojis: ['11'] },
  { num: 12, wordEnglish: 'Twelve', wordHindi: 'बारह', emojis: ['12'] },
  { num: 13, wordEnglish: 'Thirteen', wordHindi: 'तेरह', emojis: ['13'] },
  { num: 14, wordEnglish: 'Fourteen', wordHindi: 'चौदह', emojis: ['14'] },
  { num: 15, wordEnglish: 'Fifteen', wordHindi: 'पंद्रह', emojis: ['15'] },
  { num: 16, wordEnglish: 'Sixteen', wordHindi: 'सोलह', emojis: ['16'] },
  { num: 17, wordEnglish: 'Seventeen', wordHindi: 'सत्रह', emojis: ['17'] },
  { num: 18, wordEnglish: 'Eighteen', wordHindi: 'अट्ठारह', emojis: ['18'] },
  { num: 19, wordEnglish: 'Nineteen', wordHindi: 'उन्नीस', emojis: ['19'] },
  { num: 20, wordEnglish: 'Twenty', wordHindi: 'बीस', emojis: ['20'] },
];

export const RHYMES_LIST: RhymeItem[] = [
  {
    id: 'machli',
    title: 'Machli Jal Ki Rani Hai',
    titleHindi: 'मछली जल की रानी है',
    language: 'hi',
    category: 'Hindi Balgeet',
    bannerEmoji: '🐠',
    color: 'from-cyan-500 to-blue-600',
    lyrics: [
      'मछली जल की रानी है,',
      'जीवन उसका पानी है।',
      'हाथ लगाओ तो डर जाएगी,',
      'बाहर निकालो तो मर जाएगी।',
      'पानी में डालो तो तैर जाएगी,',
      'सारा पानी पी जाएगी!'
    ]
  },
  {
    id: 'titli',
    title: 'Titli Udi Bas Par Chadi',
    titleHindi: 'तितली उड़ी बस पर चढ़ी',
    language: 'hi',
    category: 'Hindi Balgeet',
    bannerEmoji: '🦋',
    color: 'from-pink-500 to-rose-600',
    lyrics: [
      'तितली उड़ी बस पर चढ़ी,',
      'सीट न मिली तो रोने लगी।',
      'ड्राइवर ने बोला आजा मेरे पास,',
      'तितली बोली ना बाबा ना,',
      'मेरा घर है पास!'
    ]
  },
  {
    id: 'chanda-mama',
    title: 'Chanda Mama Door Ke',
    titleHindi: 'चंदा मामा दूर के',
    language: 'hi',
    category: 'Hindi Balgeet',
    bannerEmoji: '🌙',
    color: 'from-amber-400 to-orange-500',
    lyrics: [
      'चंदा मामा दूर के,',
      'पुए पकाएं बूर के।',
      'आप खाएं थाली में,',
      'मुन्ने को दें प्याली में।',
      'प्याली गई टूट, मुन्ना गया रूठ!',
      'लाएंगे नई प्यालियां, बजा बजा के तालियां!'
    ]
  },
  {
    id: 'lakdi-ki-kathi',
    title: 'Lakdi Ki Kathi',
    titleHindi: 'लकड़ी की काठी',
    language: 'hi',
    category: 'Hindi Balgeet',
    bannerEmoji: '🐴',
    color: 'from-emerald-500 to-teal-600',
    lyrics: [
      'लकड़ी की काठी, काठी पे घोड़ा,',
      'घोड़े की दुम पे जो मारा हथौड़ा,',
      'दौड़ा दौड़ा दौड़ा घोड़ा दुम उठा के दौड़ा!',
      'घोड़ा पहुंचा चौक में, चौक में था नाई,',
      'घोड़े जी की नाई ने हजामत जो बनाई!',
      'टक-बक टक-बक टक-बक टक-बक!'
    ]
  },
  {
    id: 'twinkle',
    title: 'Twinkle Twinkle Little Star',
    titleHindi: 'ट्विंकल ट्विंकल लिटिल स्टार',
    language: 'en',
    category: 'English Nursery Rhyme',
    bannerEmoji: '✨',
    color: 'from-purple-500 to-indigo-600',
    lyrics: [
      'Twinkle, twinkle, little star,',
      'How I wonder what you are!',
      'Up above the world so high,',
      'Like a diamond in the sky.',
      'Twinkle, twinkle, little star,',
      'How I wonder what you are!'
    ]
  },
  {
    id: 'johny',
    title: 'Johny Johny Yes Papa',
    titleHindi: 'जॉनी जॉनी यस पापा',
    language: 'en',
    category: 'English Nursery Rhyme',
    bannerEmoji: '🍬',
    color: 'from-sky-400 to-blue-500',
    lyrics: [
      'Johny, Johny, Yes, Papa?',
      'Eating sugar? No, Papa.',
      'Telling lies? No, Papa.',
      'Open your mouth, Ha! Ha! Ha!'
    ]
  },
  {
    id: 'baa-baa',
    title: 'Baa Baa Black Sheep',
    titleHindi: 'बा बा ब्लैक शीप',
    language: 'en',
    category: 'English Nursery Rhyme',
    bannerEmoji: '🐑',
    color: 'from-slate-600 to-slate-800',
    lyrics: [
      'Baa, baa, black sheep, have you any wool?',
      'Yes, sir, yes, sir, three bags full;',
      'One for the master, and one for the dame,',
      'And one for the little boy who lives down the lane.'
    ]
  }
];

export const DISCOVERY_CATEGORIES: DiscoveryCategory[] = [
  {
    id: 'animals',
    nameEn: 'Animals (जानवर)',
    nameHi: 'जानवर',
    icon: '🦁',
    items: [
      { en: 'Lion (King)', hi: 'शेर (जंगल का राजा)', emoji: '🦁', soundText: 'Lion, शेर' },
      { en: 'Elephant', hi: 'हाथी', emoji: '🐘', soundText: 'Elephant, हाथी' },
      { en: 'Cow', hi: 'गाय (गौमाता)', emoji: '🐄', soundText: 'Cow, गाय' },
      { en: 'Dog', hi: 'कुत्ता', emoji: '🐕', soundText: 'Dog, कुत्ता' },
      { en: 'Cat', hi: 'बिल्ली', emoji: '🐈', soundText: 'Cat, बिल्ली' },
      { en: 'Tiger', hi: 'बाघ (राष्ट्रीय पशु)', emoji: '🐅', soundText: 'Tiger, बाघ' },
      { en: 'Horse', hi: 'घोड़ा', emoji: '🐎', soundText: 'Horse, घोड़ा' },
      { en: 'Rabbit', hi: 'खरगोश', emoji: '🐇', soundText: 'Rabbit, खरगोश' },
      { en: 'Monkey', hi: 'बंदर', emoji: '🐒', soundText: 'Monkey, बंदर' },
      { en: 'Deer', hi: 'हिरण', emoji: '🦌', soundText: 'Deer, हिरण' },
      { en: 'Camel', hi: 'ऊंट (रेगिस्तान का जहाज)', emoji: '🐪', soundText: 'Camel, ऊंट' },
      { en: 'Bear', hi: 'भालू', emoji: '🐻', soundText: 'Bear, भालू' }
    ]
  },
  {
    id: 'birds',
    nameEn: 'Birds (पक्षी)',
    nameHi: 'पक्षी',
    icon: '🦚',
    items: [
      { en: 'Peacock', hi: 'मोर (राष्ट्रीय पक्षी)', emoji: '🦚', soundText: 'Peacock, मोर' },
      { en: 'Parrot', hi: 'तोता (मीठू)', emoji: '🦜', soundText: 'Parrot, तोता' },
      { en: 'Pigeon', hi: 'कबूतर', emoji: '🐦', soundText: 'Pigeon, कबूतर' },
      { en: 'Crow', hi: 'कौआ', emoji: '🦅', soundText: 'Crow, कौआ' },
      { en: 'Sparrow', hi: 'गौरैया', emoji: '🐤', soundText: 'Sparrow, गौरैया' },
      { en: 'Duck', hi: 'बत्तख', emoji: '🦆', soundText: 'Duck, बत्तख' },
      { en: 'Owl', hi: 'उल्लू', emoji: '🦉', soundText: 'Owl, उल्लू' },
      { en: 'Eagle', hi: 'चील / बाज़', emoji: '🦅', soundText: 'Eagle, बाज़' }
    ]
  },
  {
    id: 'fruits',
    nameEn: 'Fruits (फल)',
    nameHi: 'फल',
    icon: '🍎',
    items: [
      { en: 'Mango', hi: 'आम (फलों का राजा)', emoji: '🥭', soundText: 'Mango, आम' },
      { en: 'Apple', hi: 'सेब', emoji: '🍎', soundText: 'Apple, सेब' },
      { en: 'Banana', hi: 'केला', emoji: '🍌', soundText: 'Banana, केला' },
      { en: 'Grapes', hi: 'अंगूर', emoji: '🍇', soundText: 'Grapes, अंगूर' },
      { en: 'Orange', hi: 'संतरा', emoji: '🍊', soundText: 'Orange, संतरा' },
      { en: 'Watermelon', hi: 'तरबूज', emoji: '🍉', soundText: 'Watermelon, तरबूज' },
      { en: 'Papaya', hi: 'पपीता', emoji: '🍈', soundText: 'Papaya, पपीता' },
      { en: 'Pomegranate', hi: 'अनार', emoji: '🫐', soundText: 'Pomegranate, अनार' },
      { en: 'Guava', hi: 'अमरूद', emoji: '🍏', soundText: 'Guava, अमरूद' },
      { en: 'Pineapple', hi: 'अनानास', emoji: '🍍', soundText: 'Pineapple, अनानास' }
    ]
  },
  {
    id: 'vegetables',
    nameEn: 'Vegetables (सब्जियां)',
    nameHi: 'सब्जियां',
    icon: '🥕',
    items: [
      { en: 'Potato', hi: 'आलू (सब्जियों का राजा)', emoji: '🥔', soundText: 'Potato, आलू' },
      { en: 'Tomato', hi: 'टमाटर', emoji: '🍅', soundText: 'Tomato, टमाटर' },
      { en: 'Carrot', hi: 'गाजर', emoji: '🥕', soundText: 'Carrot, गाजर' },
      { en: 'Onion', hi: 'प्याज', emoji: '🧅', soundText: 'Onion, प्याज' },
      { en: 'Peas', hi: 'मटर', emoji: '🫛', soundText: 'Peas, मटर' },
      { en: 'Cauliflower', hi: 'फूलगोभी', emoji: '🥦', soundText: 'Cauliflower, फूलगोभी' },
      { en: 'Brinjal / Eggplant', hi: 'बैंगन', emoji: '🍆', soundText: 'Brinjal, बैंगन' },
      { en: 'Lady Finger', hi: 'भिंडी', emoji: '🥒', soundText: 'Lady finger, भिंडी' }
    ]
  },
  {
    id: 'colors',
    nameEn: 'Colors (रंग)',
    nameHi: 'रंग',
    icon: '🎨',
    items: [
      { en: 'Red', hi: 'लाल (रक्त जैसा)', emoji: '🔴', soundText: 'Red, लाल' },
      { en: 'Green', hi: 'हरा (पेड़ जैसा)', emoji: '🟢', soundText: 'Green, हरा' },
      { en: 'Blue', hi: 'नीला (आसमान जैसा)', emoji: '🔵', soundText: 'Blue, नीला' },
      { en: 'Yellow', hi: 'पीला (सूरज जैसा)', emoji: '🟡', soundText: 'Yellow, पीला' },
      { en: 'Orange / Saffron', hi: 'नारंगी / केसरिया', emoji: '🟠', soundText: 'Orange, नारंगी' },
      { en: 'White', hi: 'सफेद (शांति का प्रतीक)', emoji: '⚪', soundText: 'White, सफेद' },
      { en: 'Black', hi: 'काला', emoji: '⚫', soundText: 'Black, काला' },
      { en: 'Pink', hi: 'गुलाबी (कमल जैसा)', emoji: '🌸', soundText: 'Pink, गुलाबी' }
    ]
  },
  {
    id: 'shapes',
    nameEn: 'Shapes (आकार)',
    nameHi: 'आकार',
    icon: '📐',
    items: [
      { en: 'Circle', hi: 'वृत्त / गोल (रोटी जैसा)', emoji: '⚪', soundText: 'Circle, गोल' },
      { en: 'Square', hi: 'वर्ग / चौकोर (कैरम जैसा)', emoji: '⏹️', soundText: 'Square, चौकोर' },
      { en: 'Triangle', hi: 'त्रिकोण (समोसा जैसा)', emoji: '🔺', soundText: 'Triangle, त्रिकोण' },
      { en: 'Star', hi: 'तारा (आसमान का सितारा)', emoji: '⭐', soundText: 'Star, तारा' },
      { en: 'Heart', hi: 'दिल', emoji: '❤️', soundText: 'Heart, दिल का आकार' },
      { en: 'Diamond', hi: 'हीरा / पतंग का आकार', emoji: '💠', soundText: 'Diamond shape, हीरा' }
    ]
  },
  {
    id: 'body-parts',
    nameEn: 'Body Parts (शरीर के अंग)',
    nameHi: 'शरीर के अंग',
    icon: '🖐️',
    items: [
      { en: 'Eyes', hi: 'आँखें (देखने के लिए)', emoji: '👀', soundText: 'Eyes, आँखें' },
      { en: 'Ears', hi: 'कान (सुनने के लिए)', emoji: '👂', soundText: 'Ears, कान' },
      { en: 'Nose', hi: 'नाक (सूंघने के लिए)', emoji: '👃', soundText: 'Nose, नाक' },
      { en: 'Mouth / Teeth', hi: 'मुंह व दाँत', emoji: '👄', soundText: 'Mouth and teeth, मुंह' },
      { en: 'Hands', hi: 'हाथ (नमस्ते व काम के लिए)', emoji: '🖐️', soundText: 'Hands, हाथ' },
      { en: 'Feet / Legs', hi: 'पैर (चलने व दौड़ने के लिए)', emoji: '🦶', soundText: 'Feet, पैर' },
      { en: 'Head / Hair', hi: 'सिर व बाल', emoji: '🧑', soundText: 'Head, सिर' }
    ]
  },
  {
    id: 'good-habits',
    nameEn: 'Good Habits (अच्छी आदतें)',
    nameHi: 'अच्छी आदतें',
    icon: '✨',
    items: [
      { en: 'Wake up early', hi: 'सुबह जल्दी उठना', emoji: '🌅', soundText: 'Wake up early, सुबह जल्दी उठो' },
      { en: 'Brush teeth twice daily', hi: 'प्रतिदिन दो बार ब्रश करना', emoji: '🪥', soundText: 'Brush your teeth, रोज दांत साफ करो' },
      { en: 'Take a bath daily', hi: 'रोज नहाना', emoji: '🛁', soundText: 'Take a bath daily, रोज स्नान करो' },
      { en: 'Wash hands with soap', hi: 'साबुन से हाथ धोना', emoji: '🧼', soundText: 'Wash hands, हाथ अच्छे से धोएं' },
      { en: 'Respect elders', hi: 'बड़ों का आदर करना व नमस्ते कहना', emoji: '🙏', soundText: 'Respect elders, बड़ों का सम्मान करो' },
      { en: 'Eat healthy food', hi: 'पौष्टिक फल व हरी सब्जियां खाना', emoji: '🥗', soundText: 'Eat healthy food, ताजे फल व सब्जियां खाएं' }
    ]
  }
];

// Helper to speak speech in browser
export function speakWord(text: string, lang: 'hi-IN' | 'en-US' = 'hi-IN') {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.9; // clear for young kids
  utterance.pitch = 1.1; // friendly tone
  window.speechSynthesis.speak(utterance);
}
