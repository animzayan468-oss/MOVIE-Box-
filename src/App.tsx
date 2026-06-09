import React, { useState, useEffect, useRef } from "react";
import { 
  Play, 
  Pause,
  Download, 
  Upload, 
  Search, 
  Sparkles, 
  Trash2, 
  Film, 
  Clock, 
  Star, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize, 
  AlertTriangle, 
  Globe, 
  RefreshCw, 
  Sliders, 
  X, 
  CheckCircle, 
  Tv,
  ListRestart,
  Heart,
  Loader2,
  ChevronRight,
  Info,
  Facebook,
  Send,
  Share
} from "lucide-react";
import { Movie } from "./types";
import BackgroundAnimation from "./components/BackgroundAnimation";

// Bilingual translations dictionary
// Multi-language translations dictionary (10 Languages)
const translations: Record<string, {
  title: string;
  tagline: string;
  home: string;
  uploadTab: string;
  searchPlaceholder: string;
  language: string;
  genre: string;
  all: string;
  rating: string;
  year: string;
  cast: string;
  directorLabel: string;
  directorPlaceholder: string;
  uploadTime: string;
  fileSize: string;
  noMovies: string;
  featured: string;
  watchNow: string;
  downloadBtn: string;
  downloadAccelerator: string;
  accTitle: string;
  accSpeed: string;
  accRemaining: string;
  accStatus: string;
  accSuccess: string;
  accConnecting: string;
  accDownloading: string;
  streamNow: string;
  uploadTitle: string;
  uploadDirectTitle: string;
  uploadUrlTitle: string;
  movieT: string;
  movieTPlaceholder: string;
  aiGenerate: string;
  aiGenerating: string;
  desc: string;
  descPlaceholder: string;
  castPlaceholder: string;
  genreLabel: string;
  languageLabel: string;
  ratingLabel: string;
  chooseVideo: string;
  chooseCover: string;
  submitMovie: string;
  publishSuccess: string;
  or: string;
  streamUrl: string;
  streamUrlPlaceholder: string;
  coverUrl: string;
  coverUrlPlaceholder: string;
  downloadUrl: string;
  downloadUrlPlaceholder: string;
  deleteConfirm: string;
  sizeUnknown: string;
  creatorConsole: string;
  bengali: string;
  english: string;
  errorFill: string;
  emptyFields: string;
  playing: string;
  theaterMode: string;
  backToBoard: string;
  downloadLimit: string;
  deleteSuccess: string;
  authorLabel: string;
  watchHistoryTitle: string;
  clearHistoryBtn: string;
  noHistory: string;
  resumeAt: string;
  lastPlayed: string;
}> = {
  en: {
    title: "Cinematic Hub",
    tagline: "Upload, Stream, & Download Your Favorite Movies",
    home: "Browse Movies",
    uploadTab: "Creator Studio",
    searchPlaceholder: "Search movies by title, genre, cast...",
    language: "Language",
    genre: "Genre",
    all: "All",
    rating: "Rating",
    year: "Year",
    cast: "Cast/Actors",
    directorLabel: "Director",
    directorPlaceholder: "e.g., Christopher Nolan, Satyajit Ray",
    uploadTime: "Uploaded On",
    fileSize: "File Size",
    noMovies: "No movies found. Try uploading one or clearing search filters!",
    featured: "FEATURED BLOCKBUSTER",
    watchNow: "Watch Now",
    downloadBtn: "Direct Download",
    downloadAccelerator: "Launch Download Accelerator",
    accTitle: "Hyper-Speed Download Accelerator",
    accSpeed: "Speed",
    accRemaining: "Est. Time",
    accStatus: "Preparing digital package...",
    accSuccess: "File downloaded successfully!",
    accConnecting: "Securing download tunnels...",
    accDownloading: "Siphoning movie files with hyper-speed streams...",
    streamNow: "Live Stream",
    uploadTitle: "Upload & Register a New Movie",
    uploadDirectTitle: "Direct File Upload (Local Disk)",
    uploadUrlTitle: "Quick Metadata & External Streaming Reference Url",
    movieT: "Movie Title",
    movieTPlaceholder: "e.g., Interstellar, Chander Pahar, Devdas",
    aiGenerate: "AI Complete Details",
    aiGenerating: "Gemini Analyzing...",
    desc: "Description / Plot Summary",
    descPlaceholder: "Write a short engaging plot description here...",
    castPlaceholder: "e.g., Leonardo DiCaprio, Soumitra Chatterjee",
    genreLabel: "Genre Categories",
    languageLabel: "Audio Language",
    ratingLabel: "Score Rating",
    chooseVideo: "Choose Movie Video File (.mp4, .webm, up to 150MB)",
    chooseCover: "Choose Cover Poster Poster Image File",
    submitMovie: "Publish Movie to Hub",
    publishSuccess: "Congratulations! Movie is permanently uploaded and ready.",
    or: "— OR —",
    streamUrl: "Direct Video Streaming URL",
    streamUrlPlaceholder: "https://example.com/movie.mp4 (or open video source in public web)",
    coverUrl: "Direct Cover Image URL",
    coverUrlPlaceholder: "https://images.unsplash.com/... (Image URL)",
    downloadUrl: "Custom Direct Download Link (Optional)",
    downloadUrlPlaceholder: "Leave blank to use the streaming URL as download",
    deleteConfirm: "Are you sure you want to delete this movie from the system?",
    sizeUnknown: "Cloud Stream (~35 MB)",
    creatorConsole: "Upload movies, generate cover posters with automated storage options.",
    bengali: "বাংলা",
    english: "English",
    errorFill: "Please write a Movie Title first, then click AI completed!",
    emptyFields: "Please insert Title, Theme, and direct Playable video stream!",
    playing: "Now Streaming",
    theaterMode: "Theater Mode Light Toggle",
    backToBoard: "Back to Dashboard",
    downloadLimit: "Note: Large uploaded video files stream via local storage directories.",
    deleteSuccess: "Movie removed successfully from server.",
    authorLabel: "Admin Console",
    watchHistoryTitle: "Continue Watching",
    clearHistoryBtn: "Clear History",
    noHistory: "No recently played movies found.",
    resumeAt: "Resume at",
    lastPlayed: "Last watched"
  },
  bn: {
    title: "সিনেমাটিক হাব",
    tagline: "আপনার পছন্দের মুভি আপলোড করুন, স্ট্রীম করুন এবং হাই-স্পীডে ডাউনলোড করুন",
    home: "মুভি ব্রাউজ করুন",
    uploadTab: "ক্রিয়েটর স্টুডিও",
    searchPlaceholder: "মুভির নাম, ধরণ, অভিনেতা লিখে খুঁজুন...",
    language: "ভাষা",
    genre: "ধরণ",
    all: "সব",
    rating: "রেটিং",
    year: "বছর",
    cast: "অভিনেতা/কাষ্ট",
    directorLabel: "পরিচালক",
    directorPlaceholder: "যেমন: সত্যজিৎ রায়, তারেক মাসুদ",
    uploadTime: "আপলোড করা হয়েছে",
    fileSize: "ফাইল সাইজ",
    noMovies: "কোন মুভি পাওয়া যায়নি। অনুগ্রহ করে নতুন মুভি আপলোড করুন অথবা ফিল্টার পরিবর্তন করুন!",
    featured: "আজকের সেরা ফিচার্ড মুভি",
    watchNow: "এখনই দেখুন",
    downloadBtn: "সরাসরি ডাউনলোড",
    downloadAccelerator: "ডাউনলোড এক্সিলারেটর বুস্টার",
    accTitle: "হাইপার-স্পীড ডাউনলোড এক্সিলারেটর",
    accSpeed: "গতি",
    accRemaining: "বাকি সময়",
    accStatus: "ডিজিটাল প্যাকেজ প্রস্তুত করা হচ্ছে...",
    accSuccess: "ফাইলটি সফলভাবে ডাউনলোড সম্পন্ন হয়েছে!",
    accConnecting: "ডাউনলোড চ্যানেল সুরক্ষিত করা হচ্ছে...",
    accDownloading: "হাইপার-স্পীড স্ট্রীমের মাধ্যমে মুভি ফাইল ডাউনলোড করা হচ্ছে...",
    streamNow: "অনলাইন স্ট্রীমিং",
    uploadTitle: "নতুন চলচ্চিত্র (মুভি) আপলোড ও রেজিষ্টার করুন",
    uploadDirectTitle: "সরাসরি ফাইল আপলোড (লোকাল ডিস্ক)",
    uploadUrlTitle: "রিমোট লিংক ও মুভি মেটাডেটা দিয়ে রেজিষ্টার করুন",
    movieT: "মুভি বা চলচ্চিত্রের নাম",
    movieTPlaceholder: "যেমন: চাঁদের পাহাড়, ইন্টারস্টেলার, দেবদাস",
    aiGenerate: "এআই দিয়ে অটো-ফিল করুন",
    aiGenerating: "জেসিনি এনালাইসিস করছে...",
    desc: "মুভির বিবরণ ও কাহিনী সংক্ষেপ",
    descPlaceholder: "মুভির চমৎকার কাহিনী বা বর্ণনা এখানে লিখুন...",
    castPlaceholder: "যেমন: সৌমিত্র চট্টোপাধ্যায়, দেব, সাকিব খান",
    genreLabel: "মুভির ক্যাটাগরি / ধরণ",
    languageLabel: "অডিও ভাষা",
    ratingLabel: "মুভি রেটিং স্কোর",
    chooseVideo: "চলচ্চিত্র ভিডিও ফাইল নির্বাচন করুন (.mp4, .webm, সর্বোচ্চ ১৫০এমবি)",
    chooseCover: "কাভার পোস্টার ইমেজ নির্বাচন করুন",
    submitMovie: "মুভি স্থায়ীভাবে পাবলিশ করুন",
    publishSuccess: "অভিনন্দন! আপনার মুভিটি এখন সবার দেখার জন্য উন্মুক্ত হয়েছে।",
    or: "— অথবা —",
    streamUrl: "সরাসরি ভিডিও স্ট্রীমিং লিংক",
    streamUrlPlaceholder: "https://example.com/movie.mp4 (যেকোনো মেমোরি কালেকশন বা পাবলিক ইউআরএল)",
    coverUrl: "সরাসরি মুভি কাভার পোস্টার লিংক",
    coverUrlPlaceholder: "https://images.unsplash.com/... (ইমেজ ইউআরএল)",
    downloadUrl: "অনলাইন ডাউনলোড লিংক (ঐচ্ছিক)",
    downloadUrlPlaceholder: "ফাঁকা রাখলে উপরের স্ট্রীমিং ইউআরএল-টি ডাউনলোড লিংক হিসেবে ব্যবহৃত হবে",
    deleteConfirm: "আপনি কি নিশ্চিতভাবে এই মুভিটি ডিলিট করতে চান?",
    sizeUnknown: "ক্লাউড স্ট্রীম (~৩৫ এমবি)",
    creatorConsole: "মুভি ফাইল আপলোড করুন, স্বয়ংক্রিয় পোস্টার যুক্ত করুন এবং ক্লাউড স্টোরেজ সেটআপ করুন।",
    bengali: "বাংলা",
    english: "English",
    errorFill: "অনুগ্রহ করে প্রথমে মুভির নামটি লিখুন, তারপর এআই বাটনে চাপুন!",
    emptyFields: "দয়া করে মুভির নাম, ধরণ এবং সচল ভিডিও লিংক প্রবেশ করান!",
    playing: "চলতি সম্প্রচার",
    theaterMode: "থিয়েটার লাইট অফ মোড",
    backToBoard: "ড্যাশবোর্ডে ফিরে যান",
    downloadLimit: "লক্ষ্য করুন: আপলোড করা বড় ভিডিও ফাইলসমূহ সরাসরি ক্লাউড রান সার্ভার থেকে পরিবেশিত হয়।",
    deleteSuccess: "মুভিটি সফলভাবে সার্ভার থেকে মুছে ফেলা হয়েছে।",
    authorLabel: "অ্যাডমিন প্যানেল",
    watchHistoryTitle: "দেখা চালিয়ে যান (Continue Watching)",
    clearHistoryBtn: "হিস্ট্রি মুছুন",
    noHistory: "সম্প্রতি দেখা কোনো মুভি পাওয়া যায়নি।",
    resumeAt: "পুনরায় শুরু করুন",
    lastPlayed: "সর্বশেষ দেখা"
  },
  hi: {
    title: "सिनेमैटिक हब",
    tagline: "अपनी पसंदीदा फिल्में अपलोड करें, स्ट्रीम करें और हाई-स्पीड में डाउनलोड करें",
    home: "फिल्में ब्राउज़ करें",
    uploadTab: "क्रिएटर स्टूडियो",
    searchPlaceholder: "शीर्षक, शैली, कलाकारों द्वारा फिल्में खोजें...",
    language: "भाषा",
    genre: "शैली",
    all: "सभी",
    rating: "रेटिंग",
    year: "वर्ष",
    cast: "कलाकार/कास्ट",
    directorLabel: "निर्देशक",
    directorPlaceholder: "उदा. क्रिस्टोफर नोलन, सत्यजीत रे",
    uploadTime: "अपलोड किया गया",
    fileSize: "फाइल का आकार",
    noMovies: "कोई फिल्म नहीं मिली। एक अपलोड करने का प्रयास करें या खोज फ़िल्टर साफ़ करें!",
    featured: "आज की ब्लॉकबस्टर फिल्म",
    watchNow: "अभी देखें",
    downloadBtn: "सीधे डाउनलोड",
    downloadAccelerator: "डाउनलोड एक्सेलेरेटर बुस्टर",
    accTitle: "हाईपर-स्पीड डाउनलोड एक्सेलेरेटर",
    accSpeed: "गति",
    accRemaining: "शेष समय",
    accStatus: "डिजिटल पैकेज तैयार किया जा रहा है...",
    accSuccess: "फ़ाइल सफलतापूर्वक डाउनलोड हो गई!",
    accConnecting: "सुरक्षित डाउनलोड सुरंगें बनाई जा रही हैं...",
    accDownloading: "हाईपर-स्पीड स्ट्रीम के साथ मूवी फ़ाइलें डाउनलोड हो रही हैं...",
    streamNow: "लाइव स्ट्रीम",
    uploadTitle: "नई फिल्म अपलोड और पंजीकृत करें",
    uploadDirectTitle: "सीधे फाइल अपलोड (स्थानीय डिस्क)",
    uploadUrlTitle: "क्विक मेटाडेटा और बाहरी स्ट्रीमिंग संदर्भ URL",
    movieT: "फिल्म का शीर्षक",
    movieTPlaceholder: "उदा. इंटरस्टेलर, देवदास, चंद्र पहार",
    aiGenerate: "एआई से ऑटो-फिल करें",
    aiGenerating: "जेमिनी विश्लेषण कर रहा है...",
    desc: "विवरण और कथानक सारांश",
    descPlaceholder: "यहाँ एक छोटा आकर्षक कथानक विवरण लिखें...",
    castPlaceholder: "उदा. लियोनार्डो डिकैप्रियो, सौमित्र चटर्जी",
    genreLabel: "फिल्म की श्रेणियां",
    languageLabel: "ऑडियो भाषा",
    ratingLabel: "मूवी रेटिंग स्कोर",
    chooseVideo: "फिल्म वीडियो फ़ाइल चुनें (.mp4, .webm, अधिकतम 150MB)",
    chooseCover: "कवर पोस्टर छवि फ़ाइल चुनें",
    submitMovie: "हब पर फिल्म प्रकाशित करें",
    publishSuccess: "बधाई हो! आपकी फिल्म अब स्थायी रूप से अपलोड और तैयार है।",
    or: "— अथवा —",
    streamUrl: "सीधा वीडियो स्ट्रीमिंग URL",
    streamUrlPlaceholder: "https://example.com/movie.mp4",
    coverUrl: "सीधा कवर पोस्टर URL",
    coverUrlPlaceholder: "https://images.unsplash.com/...",
    downloadUrl: "कस्टम डायरेक्ट डाउनलोड लिंक (वैकल्पिक)",
    downloadUrlPlaceholder: "स्ट्रीमिंग URL को डाउनलोड के रूप में उपयोग करने के लिए खाली छोड़ें",
    deleteConfirm: "क्या आप वाकई इस फिल्म को हटाने के लिए निश्चित हैं?",
    sizeUnknown: "क्लाउड स्ट्रीम (~35 MB)",
    creatorConsole: "फिल्में अपलोड करें, कवर पोस्टर जोड़ें और क्लाउड स्टोरेज सेटअप करें।",
    bengali: "বাংলা",
    english: "English",
    errorFill: "कृपया पहले फिल्म का शीर्षक लिखें, फिर एआई बटन पर क्लिक करें!",
    emptyFields: "कृपया शीर्षक, शैली और लाइव वीडियो स्ट्रीम दर्ज करें!",
    playing: "लाइव प्रसारण",
    theaterMode: "थिएटर लाइट ऑफ मोड",
    backToBoard: "डैशबोर्ड पर वापस जाएं",
    downloadLimit: "ध्यान दें: अपलोड की गई बड़ी वीडियो फाइलें सीधे क्लाउड रन सर्वर से स्ट्रीम होती हैं।",
    deleteSuccess: "फिल्म सफलतापूर्वक हटा दी गई।",
    authorLabel: "एडमिन कंसोल",
    watchHistoryTitle: "देखना जारी रखें",
    clearHistoryBtn: "इतिहास साफ़ करें",
    noHistory: "हाल ही में देखी गई फिल्म नहीं मिली।",
    resumeAt: "फिर से शुरू करें",
    lastPlayed: "आखरी बार देखा गया"
  },
  ar: {
    title: "سينماتك هاب",
    tagline: "قم برفع وبث وتنزيل أفلامك المفضلة بسرعة فائقة",
    home: "تصفح الأفلام",
    uploadTab: "ستوديو المبدعين",
    searchPlaceholder: "ابحث عن الأفلام بالاسم، التصنيف، الممثلين...",
    language: "اللغة",
    genre: "التصنيف",
    all: "الكل",
    rating: "التقييم",
    year: "السنة",
    cast: "طاقم العمل / الممثلين",
    directorLabel: "المخرج",
    directorPlaceholder: "مثال: كريستوفر نولان، ساتياجيت راي",
    uploadTime: "تاريخ الرفع",
    fileSize: "حجم الملف",
    noMovies: "لم يتم العثور على أفلام. حاول رفع فيلم أو مسح فلاتر البحث!",
    featured: "فيلم اليوم المميز",
    watchNow: "شاهد الآن",
    downloadBtn: "تحميل مباشر",
    downloadAccelerator: "مسرع التحميل الذكي",
    accTitle: "مسرع التنزيل فائق السرعة",
    accSpeed: "السرعة",
    accRemaining: "الوقت المتبقي",
    accStatus: "جاري تحضير الحزمة الرقمية...",
    accSuccess: "تم تحميل الملف بنجاح!",
    accConnecting: "جاري تأمين قنوات التنزيل...",
    accDownloading: "جاري سحب ملف الفيلم بسرعات فائقة...",
    streamNow: "بث مباشر",
    uploadTitle: "رفع وتسجيل فيلم جديد",
    uploadDirectTitle: "رفع ملف مباشر (القرص المحلي)",
    uploadUrlTitle: "أدخل عنوان URL للبث والبيانات التعريفية للفيلم",
    movieT: "اسم الفيلم",
    movieTPlaceholder: "مثال: إنترستيلر، ديفداس",
    aiGenerate: "تعبئة تلقائية بالذكاء الاصطناعي",
    aiGenerating: "جيميني يحلل البيانات...",
    desc: "الوصف وقصة الفيلم",
    descPlaceholder: "اكتب وصفاً جذاباً ومختصراً لقصة الفيلم هنا...",
    castPlaceholder: "مثال: ليوناردو دي كابريو",
    genreLabel: "تصنيفات الفيلم",
    languageLabel: "لغة الصوت",
    ratingLabel: "تقييم الفيلم",
    chooseVideo: "اختر ملف فيديو الفيلم (.mp4, .webm, بحد أقصى 150 ميجابايت)",
    chooseCover: "اختر صورة بوستر الغلاف",
    submitMovie: "نشر الفيلم في المنصة",
    publishSuccess: "تهانينا! تم رفع الفيلم وبات جاهزاً للمشاهدة.",
    or: "— أو —",
    streamUrl: "رابط بث الفيديو المباشر",
    streamUrlPlaceholder: "https://example.com/movie.mp4",
    coverUrl: "رابط صورة بوستر الغلاف",
    coverUrlPlaceholder: "https://images.unsplash.com/...",
    downloadUrl: "رابط تحميل مباشر مخصص (اختياري)",
    downloadUrlPlaceholder: "اتركه فارغاً لاستخدام رابط البث كرابط تنزيل",
    deleteConfirm: "هل أنت متأكد من حذف هذا الفيلم؟",
    sizeUnknown: "بث سحابي (~35 ميجابايت)",
    creatorConsole: "ارفع الأفلام، أضف البوسترات، وسيتكفل النظام بالباقي.",
    bengali: "বাংলা",
    english: "English",
    errorFill: "يرجى كتابة عنوان الفيلم أولاً، ثم الضغط على زر الذكاء الاصطناعي!",
    emptyFields: "يرجى إدخال العنوان والتصنيف ورابط بث حي ساري العمل!",
    playing: "البث الحالي",
    theaterMode: "نمط ضوء السينما المغلق",
    backToBoard: "العودة للوحة التحكم",
    downloadLimit: "تنبيه: يتم بث ملفات الفيديو الكبيرة المرفوعة مباشرة من السيرفر السحابي.",
    deleteSuccess: "تم حذف الفيلم بنجاح من الخادم.",
    authorLabel: "لوحة التحكم للمسؤول",
    watchHistoryTitle: "مواصلة المشاهدة",
    clearHistoryBtn: "مسح سجل المشاهدة",
    noHistory: "لم يتم العثور على أفلام في سجل المشاهدة مؤخراً.",
    resumeAt: "استئناف من",
    lastPlayed: "آخر مشاهدة"
  },
  ur: {
    title: "سنیماٹک ہب",
    tagline: "اپنی پسندیدہ فلمیں اپ لوڈ، اسٹریم اور تیز رفتار کے ساتھ ڈاؤن لوڈ کریں",
    home: "فلمیں تلاش کریں",
    uploadTab: "کریئٹر اسٹوڈیو",
    searchPlaceholder: "عنوان، کیٹیگری، اداکاروں کے ذریعے فلمیں تلاش کریں...",
    language: "زبان",
    genre: "قسم / کیٹیگری",
    all: "سب",
    rating: "ریٹنگ",
    year: "سال",
    cast: "اداکار / کاسٹ",
    directorLabel: "ہدایت کار",
    directorPlaceholder: "مثال کے طور پر: کرسٹوفر نولان، ستیہ جیت رائے",
    uploadTime: "اپ لوڈ کا وقت",
    fileSize: "فائل کا سائز",
    noMovies: "کوئی فلم نہیں ملی۔ کوئی فلم اپ لوڈ کریں یا فلٹرز صاف کریں!",
    featured: "آج کی بہترین فلم",
    watchNow: "ابھی دیکھیں",
    downloadBtn: "براہ راست ڈاؤن لوڈ",
    downloadAccelerator: "ڈاؤن لوڈ ایکسیلیریٹر بوسٹر",
    accTitle: "ہائپر اسپیڈ ڈاؤن لوڈ ایکسیلیریٹر",
    accSpeed: "رفتار",
    accRemaining: "باقی وقت",
    accStatus: "ڈیجیٹل پیکیج تیار کیا جا رہا ہے...",
    accSuccess: "فائل کامیابی سے ڈاؤن لوڈ ہو گئی ہے!",
    accConnecting: "محفوظ ڈاؤن لوڈ چینلز تلاش کیے جا رہے ہیں...",
    accDownloading: "ہائپر اسپیڈ ڈاؤن لوڈ کے ذریعے فلم فائل حاصل کی جا رہی ہے...",
    streamNow: "آن لائن اسٹریم",
    uploadTitle: "نئی فلم اپ لوڈ اور رجسٹر کریں",
    uploadDirectTitle: "براہ راست فائل اپ لوڈ (لوکل اسٹوریج)",
    uploadUrlTitle: "میٹا ڈیٹا اور بیرونی اسٹریمنگ لنک فراہم کریں",
    movieT: "فلم کا نام",
    movieTPlaceholder: "مثال: انٹرسٹیلر, دیوداس",
    aiGenerate: "اے آئی کے ذریعے خود کار طریقے سے بھریں",
    aiGenerating: "جیمنی جائزہ لے رہا ہے...",
    desc: "فلم کی کہانی اور تفصیل",
    descPlaceholder: "فلم کی مختصر اور دلچسپ کہانی یہاں لکھیں...",
    castPlaceholder: "مثال: لیونارڈو ڈی کیپریو",
    genreLabel: "فلم کی کیٹیگری",
    languageLabel: "آڈیو زبان",
    ratingLabel: "ریٹنگ اسکور",
    chooseVideo: "ویڈیو فائل منتخب کریں (.mp4, .webm, زیادہ سے زیادہ 150MB)",
    chooseCover: "مووی کور پوسٹر تصویر منتخب کریں",
    submitMovie: "فلم کو پبلش کریں",
    publishSuccess: "مبارک ہو! آپ کی فلم اب کامیابی سے نشر کر دی گئی ہے۔",
    or: "— یا —",
    streamUrl: "براہ راست اسٹریمنگ لنک",
    streamUrlPlaceholder: "https://example.com/movie.mp4",
    coverUrl: "براہ راست کور امیج لنک",
    coverUrlPlaceholder: "https://images.unsplash.com/...",
    downloadUrl: "براہ راست ڈاؤن لوڈ لنک (اختیاری)",
    downloadUrlPlaceholder: "اسٹریمنگ لنک ہی استعمال کرنے کے لیے اس جگہ کو خالی چھوڑیں",
    deleteConfirm: "کیا آپ واقعی یہ فلم حذف کرنا چاہتے ہیں؟",
    sizeUnknown: "کلاؤڈ اسٹریم (~35 MB)",
    creatorConsole: "فلم فائلیں اپ لوڈ کریں، پوسٹر منتخب کریں اور کلاؤڈ اسٹوریج ترتیب دیں۔",
    bengali: "বাংলা",
    english: "English",
    errorFill: "براہ کرم پہلے فلم کا نام لکھیں، پھر اے آئی بٹن دبائیں!",
    emptyFields: "براہ کرم فلم کا نام، کیٹیگری اور فعال ویڈیو لنک فراہم کریں!",
    playing: "جاری نشریات",
    theaterMode: "تھیٹر موڈ لائٹ آف",
    backToBoard: "ڈیش بورڈ پر واپس جائیں",
    downloadLimit: "نوٹ: بڑی اپ لوڈ کردہ ویڈیو فائلیں براہ راست کلاؤڈ رن سرور سے اسٹریم ہوتی ہیں۔",
    deleteSuccess: "فلم کو سرور سے کامیابی کے ساتھ ہٹا دیا گیا ہے۔",
    authorLabel: "ایڈمن پینل",
    watchHistoryTitle: "دیکھنا جاری رکھیں",
    clearHistoryBtn: "ہسٹری صاف کریں",
    noHistory: "حالیہ دیکھی گئی فلمیں نہیں ملیں۔",
    resumeAt: "دوبارہ شروع کریں",
    lastPlayed: "آخری بار دیکھا گیا"
  },
  ta: {
    title: "சினிமாடிக் ஹப்",
    tagline: "உங்களுக்கு பிடித்த திரைப்படங்களை பதிவேற்றவும், ஸ்ட்ரீம் செய்யவும் மற்றும் அதிவேகமாக பதிவிறக்கவும்",
    home: "திரைப்படங்களை உலாவுக",
    uploadTab: "படைப்பாளர் அரங்கம்",
    searchPlaceholder: "தலைப்பு, வகை, நடிகர்கள் மூலம் திரைப்படங்களை தேடுக...",
    language: "மொழி",
    genre: "வகை",
    all: "அனைத்தும்",
    rating: "மதிப்பீடு",
    year: "ஆண்டு",
    cast: "நடிகர்கள் / குழு",
    directorLabel: "இயக்குனர்",
    directorPlaceholder: "எ.கா., கிறிஸ்டோபர் நோலன், சத்யஜித் ரே",
    uploadTime: "பதிவேற்றப்பட்ட நேரம்",
    fileSize: "கோப்பு அளவு",
    noMovies: "திரைப்படங்கள் எதுவும் கிடைக்கவில்லை. புதிய திரைப்படத்தை பதிவேற்றவும் அல்லது தேடல் வடிப்பான்களை அழிக்கவும்!",
    featured: "இன்றைய சிறந்த திரைப்படம்",
    watchNow: "இப்போது காண்க",
    downloadBtn: "நேரடி பதிவிறக்கம்",
    downloadAccelerator: "பதிவிறக்க முடுக்கி (அணுவேகம்)",
    accTitle: "அதிவேக பதிவிறக்க முடுக்கி",
    accSpeed: "வேகம்",
    accRemaining: "மீதமுள்ள நேரம்",
    accStatus: "டிஜிட்டல் தொகுப்பு தயாராகிறது...",
    accSuccess: "கோப்பு வெற்றிகரமாக பதிவிறக்கம் செய்யப்பட்டது!",
    accConnecting: "நெறிப்படுத்தப்பட்ட சேனல்கள் இணைக்கப்படுகின்றன...",
    accDownloading: "அதிவேக ஸ்ட்ரீம் மூலம் கோப்பு பெறப்படுகிறது...",
    streamNow: "நேரடி ஒளிபரப்பு",
    uploadTitle: "புதிய திரைப்படத்தை பதிவேற்றி பதிவு செய்க",
    uploadDirectTitle: "நேரடி கோப்பு பதிவேற்றம் (உள்ளூர் வட்டு)",
    uploadUrlTitle: "வெளி ஸ்ட்ரீமிங் இணைப்பு மற்றும் திரைப்பட விவரம்",
    movieT: "திரைப்படத்தின் பெயர்",
    movieTPlaceholder: "எ.கா., இண்டர்ஸ்டெல்லார், தேவதாஸ்",
    aiGenerate: "ஏஐ மூலம் தானாகவே நிரப்பவும்",
    aiGenerating: "ஜெமினி பகுப்பாய்வு செய்கிறது...",
    desc: "விவரம் மற்றும் கதைச்சுருக்கம்",
    descPlaceholder: "திரைப்படத்தின் சுவாரஸ்யமான கதையை இங்கே எழுதவும்...",
    castPlaceholder: "எ.கா., லியோனார்டோ டிகாப்ரியோ",
    genreLabel: "திரைப்படத்தின் வகைகள்",
    languageLabel: "ஆடியோ மொழி",
    ratingLabel: "திரைப்பட மதிப்பீட்டு புள்ளி",
    chooseVideo: "திரைப்பட வீடியோ கோப்பை தேர்வு செய்யவும் (.mp4, .webm, அதிகபட்சம் 150MB)",
    chooseCover: "திரைப்பட போஸ்டர் படத்தை தேர்வு செய்யவும்",
    submitMovie: "திரைப்படத்தை வெளியிடவும்",
    publishSuccess: "வாழ்த்துகள்! உங்கள் திரைப்படம் வெற்றிகரமாக வெளியிடப்பட்டது.",
    or: "— அல்லது —",
    streamUrl: "நேரடி வீடியோ ஒளிபரப்பு இணைப்பு",
    streamUrlPlaceholder: "https://example.com/movie.mp4",
    coverUrl: "நேரடி போஸ்டர் படம் இணைப்பு",
    coverUrlPlaceholder: "https://images.unsplash.com/... (போஸ்டர் முகவரி)",
    downloadUrl: "பிரத்தியேக நேரடி பதிவிறக்க இணைப்பு (விருப்பப்படி)",
    downloadUrlPlaceholder: "ஒளிபரப்பு இணைப்பையே பயன்படுத்த இதை காலியாக விடவும்",
    deleteConfirm: "இந்த திரைப்படத்தை நிச்சயமாக நீக்க விரும்புகிறீர்களா?",
    sizeUnknown: "கிளவுட் ஸ்ட்ரீம் (~35 MB)",
    creatorConsole: "திரைப்படங்களை பதிவேற்றி, போஸ்டர்களை இணைத்து, கிளவுட் சேமிப்பகத்தை அமைத்திடுங்கள்.",
    bengali: "বাংলা",
    english: "English",
    errorFill: "தயவுசெய்து முதலில் படத்தின் பெயரை எழுதி, பின் ஏஐ பொத்தானை அழுத்தவும்!",
    emptyFields: "தயவுசெய்து தலைப்பு, வகை மற்றும் செயல்படும் வீடியோ இணைப்பை உள்ளிடவும்!",
    playing: "தற்போது ஒளிபரப்பாகிறது",
    theaterMode: "திரையரங்க விளக்கு அணைத்தல்",
    backToBoard: "டாஷ்போர்டுக்கு திரும்பவும்",
    downloadLimit: "குறிப்பு: பெரிய வீடியோ கோப்புகள் கிளவுட் ரன் சர்வர் மூலம் நேரடியாக ஒளிபரப்பப்படுகின்றன.",
    deleteSuccess: "திரைப்படம் சர்வரிலிருந்து வெற்றிகரமாக நீக்கப்பட்டது.",
    authorLabel: "நிர்வாகி கன்சோல்",
    watchHistoryTitle: "தொடர்ந்து பார்க்க",
    clearHistoryBtn: "வரலாற்றை அழி",
    noHistory: "அண்மையில் பார்த்த திரைப்படங்கள் எதுவும் இல்லை.",
    resumeAt: "மீண்டும் தொடங்கவும்",
    lastPlayed: "கடைசியாக பார்த்தது"
  },
  te: {
    title: "సినీమాటిక్ హబ్",
    tagline: "మీకు ఇష్టమైన సినిమాలను అప్‌లోడ్ చేయండి, స్ట్రీమ్ చేయండి మరియు హై-స్పీడ్‌తో డౌన్‌లోడ్ చేసుకోండి",
    home: "సినిమాలను బ్రౌజ్ చేయండి",
    uploadTab: "క్రియేటర్ స్టూడియో",
    searchPlaceholder: "శీర్షిక, శైలి, నటీనటుల ద్వారా శోధించండి...",
    language: "భాష",
    genre: "శైలి / క్యాటగిరీ",
    all: "అన్నీ",
    rating: "రేటింగ్",
    year: "సంవత్సరం",
    cast: "నటీనటులు / కాస్ట్",
    directorLabel: "దర్శకుడు",
    directorPlaceholder: "ఉదా., క్రిస్టోఫర్ నోలన్, సత్యజిత్ రే",
    uploadTime: "అప్‌లోడ్ చేసిన సమయం",
    fileSize: "ఫైల్ సైజు",
    noMovies: "సినిమాలు ఏవీ లభించలేదు. కొత్త సినిమా అప్‌లోడ్ చేయండి లేదా ఫిల్టర్‌లను రీసెట్ చేయండి!",
    featured: "ఈ రోజు ప్రముఖ బ్లాక్‌బస్టర్ సినిమా",
    watchNow: "ఇప్పుడే చూడండి",
    downloadBtn: "నేరుగా డౌన్‌లోడ్",
    downloadAccelerator: "డౌన్‌లోడ్ యాక్సిలరేటర్ బూస్టర్",
    accTitle: "హైపర్ స్పీడ్ డౌన్‌లోడ్ యాక్సిలレーటర్",
    accSpeed: "వేగం",
    accRemaining: "మిగిలి ఉన్న సమయం",
    accStatus: "డిజిటల్ ప్యాకేజీ సిద్ధమవుతోంది...",
    accSuccess: "ఫైల్ విజయవంతంగా డౌన్‌లోడ్ అయింది!",
    accConnecting: "సురక్షిత డౌన్‌లోడ్ ఛానల్స్ కనెక్ట్ అవుతున్నాయి...",
    accDownloading: "అతివేగ స్ట్రీమ్ ద్వారా సినిమా ఫైల్ డౌన్‌లోడ్ అవుతోంది...",
    streamNow: "లైవ్ స్ట్రీమింగ్",
    uploadTitle: "కొత్త సినిమాను అప్‌లోడ్ & రిజిస్టర్ చేయండి",
    uploadDirectTitle: "నేరుగా ఫైల్ అప్‌లోడ్ (లోకల్ డిస్క్)",
    uploadUrlTitle: "లింక్ మరియు సినిమా మెటాడేటాతో రిజిస్టర్ చేయండి",
    movieT: "సినిమా పేరు",
    movieTPlaceholder: "ఉదా., ఇంటర్‌స్టెల్లార్, దేవదాస్",
    aiGenerate: "AIతో ఆటో-ఫిల్ చేయండి",
    aiGenerating: "జెమిని విశ్లేషిస్తోంది...",
    desc: "సినిమా వివరణ మరియు కథాంశం",
    descPlaceholder: "సినిమా యొక్క సంక్షిప్త కథనాన్ని ఇక్కడ రాయండి...",
    castPlaceholder: "ఉదా., లియోనార్డో డికాప్రియో",
    genreLabel: "సినిమా కేటగిరీలు",
    languageLabel: "ఆడియో భాష",
    ratingLabel: "సినిమా రేటింగ్ స్కోర్",
    chooseVideo: "వీడియో ఫైల్ ఎంచుకోండి (.mp4, .webm, గరిష్టంగా 150MB)",
    chooseCover: "సినిమా కవర్ పోస్టర్ చిత్రాన్ని ఎంచుకోండి",
    submitMovie: "సినిమాను హబ్‌లో ప్రచురించండి",
    publishSuccess: "అభినందనలు! మీ సినిమా విజయవంతంగా అప్‌లోడ్ చేయబడింది armament సిద్ధంగా ఉంది.",
    or: "— లేదా —",
    streamUrl: "నేరుగా వీడియో స్ట్రీమింగ్ లింక్",
    streamUrlPlaceholder: "https://example.com/movie.mp4",
    coverUrl: "నేరుగా కవర్ పోస్టర్ ఇమేజ్ లింక్",
    coverUrlPlaceholder: "https://images.unsplash.com/...",
    downloadUrl: "నేరుగా డౌన్‌లోడ్ లింక్ (ఐచ్ఛికం)",
    downloadUrlPlaceholder: "స్ట్రీమింగ్ లింక్‌నే డౌన్‌లోడ్ కోసం వాడటానికి దీన్ని ఖాళీగా ఉంచండి",
    deleteConfirm: "ఈ సినిమాను ఖచ్చితంగా తొలగించాలనుకుంటున్నారా?",
    sizeUnknown: "క్లౌడ్ స్ట్రీమ్ (~35 MB)",
    creatorConsole: "సినిమా ఫైళ్లను అప్‌లోడ్ చేసి, పోస్టర్ జోడించి, క్లౌడ్ స్టోレーజ్ సెటప్ చేయండి.",
    bengali: "বাংলা",
    english: "English",
    errorFill: "దయచేసి ముందు సినిమా పేరు రాయండి, ఆ తర్వాత AI బటన్‌ను క్లిక్ చేయండి!",
    emptyFields: "దయచేసి శీర్షిక, శైలి మరియు సక్రియ వీడియో లింక్‌ను జోడించండి!",
    playing: "ప్రస్తుత ప్రసారం",
    theaterMode: "థియేటర్ లైట్స్ ఆఫ్ మోడ్",
    backToBoard: "డ్యాష్‌బోర్డ్‌కు తిరిగి వెళ్ళండి",
    downloadLimit: "గమనిక: అప్‌లోడ్ చేయబడిన పెద్ద видео ఫైళ్లు నేరుగా క్లౌడ్ రన్ సర్వర్ నుండి స్ట్రీమ్ అవుతాయి.",
    deleteSuccess: "సినిమా సర్వర్ నుండి విజయవంతంగా తొలగించబడింది.",
    authorLabel: "అడ్మిన్ కన్సోల్",
    watchHistoryTitle: "చూడటం కొనసాగించండి",
    clearHistoryBtn: "చరిత్రను తొலగించండి",
    noHistory: "ఇటీవల చూసిన సినిమాలు ఏవీ లభించలేదు.",
    resumeAt: "ఇక్కడ నుండి కొనసాగించండి",
    lastPlayed: "చివరిగా చూసింది"
  },
  ko: {
    title: "시네마틱 허브",
    tagline: "좋아하는 영화를 업로드, 스트리밍 및 초고속으로 다운로드하세요",
    home: "영화 둘러보기",
    uploadTab: "크리에이터 스튜디오",
    searchPlaceholder: "제목, 장르, 배우 등으로 영화를 검색해 보세요...",
    language: "언어",
    genre: "장르",
    all: "전체",
    rating: "평점",
    year: "연도",
    cast: "출연 소속 / 캐스트",
    directorLabel: "감독",
    directorPlaceholder: "예: 크리스토퍼 놀란, 봉준호",
    uploadTime: "업로드 날짜",
    fileSize: "파일 크기",
    noMovies: "영화를 찾을 수 없습니다. 새로운 영화를 업로드하거나 필터를 조절해 보세요!",
    featured: "오늘의 추천 인기 블록버스터",
    watchNow: "지금 시청하기",
    downloadBtn: "직접 다운로드",
    downloadAccelerator: "다운로드 가속기 부스터",
    accTitle: "초고속 다운로드 가속 엔진",
    accSpeed: "속도",
    accRemaining: "남은 시간",
    accStatus: "디지털 패키지를 준비하는 중...",
    accSuccess: "파일이 성공적으로 다운로드되었습니다!",
    accConnecting: "보안 다운로드 터널을 검색 및 연결 중...",
    accDownloading: "초고속 스트림을 통해 영화 데이터를 다운로드 중...",
    streamNow: "실시간 스트리밍",
    uploadTitle: "신규 영화 업로드 및 등록",
    uploadDirectTitle: "로컬 디스크에서 비디오 직접 업로드",
    uploadUrlTitle: "원격 링크 및 영화 메타데이터 등록",
    movieT: "영화 제목",
    movieTPlaceholder: "예: 인터스텔라, 기생충, 올드보이",
    aiGenerate: "AI로 자동 완성",
    aiGenerating: "제미니 분석 가동 중...",
    desc: "영화 소개 및 스토리 배경",
    descPlaceholder: "영화에 대한 간단하고 흥미로운 줄거리를 입력해 주세요...",
    castPlaceholder: "예: 송강호, 레오나르도 디카프리오",
    genreLabel: "영화 카테고리 종류",
    languageLabel: "오디오 사운드 언어",
    ratingLabel: "영화 평점 별점",
    chooseVideo: "영화 동영상 파일 선택 (.mp4, .webm, 최대 150MB)",
    chooseCover: "커버 포스터 커버 이미지 선택",
    submitMovie: "서버에 영화 게시물 게시",
    publishSuccess: "축하합니다! 무비가 안전하게 영구 저장소에 업로드되었습니다.",
    or: "— 또는 —",
    streamUrl: "동영상 다이렉트 스트리밍 주소 (유비)",
    streamUrlPlaceholder: "https://example.com/movie.mp4",
    coverUrl: "다이렉트 영화 포스터 이미지 링크",
    coverUrlPlaceholder: "https://images.unsplash.com/...",
    downloadUrl: "일정 직접 다운로드 링크 (선택)",
    downloadUrlPlaceholder: "비워두면 위의 스트리밍 URL이 다운로드용으로 기본 지정됩니다.",
    deleteConfirm: "이 영화 게시물을 정말로 삭제하시겠습니까?",
    sizeUnknown: "클라우드 스트림 (~35 MB)",
    creatorConsole: "영화 파일들을 업로드하고 포스터를 지정하여 클라우드 스토리지를 구축해 보세요.",
    bengali: "বাংলা",
    english: "English",
    errorFill: "먼저 영화 제목을 입력하신 후 AI 채우기 단추를 클릭해 주세요!",
    emptyFields: "영화 제목, 장르, 그리고 작동하는 비디오 영상 주소를 채워주세요!",
    playing: "현재 스트리밍 중",
    theaterMode: "극장 모드 조명 끄기",
    backToBoard: "메인 대시보드로 이동",
    downloadLimit: "알림: 업로드된 대용량 비디오 동영상 파일은 클라우드 런 서버 등에서 직접 전송됩니다.",
    deleteSuccess: "영화를 서버에서 성공적으로 삭제했습니다.",
    authorLabel: "관리자 설정 콘솔",
    watchHistoryTitle: "이어서 시청하기",
    clearHistoryBtn: "기록 지우기",
    noHistory: "최근에 시청한 영화 기록이 없습니다.",
    resumeAt: "이전 시청 시점부터 시청",
    lastPlayed: "최종 관람 시간"
  },
  ja: {
    title: "シネマティック ハブ",
    tagline: "お気に入り映画をアップロード、ストリーミング、超高速でダウンロード",
    home: "映画をブラウズ",
    uploadTab: "クリエイタースタジオ",
    searchPlaceholder: "映画のタイトル、ジャンル、キャストで検索可能...",
    language: "言語",
    genre: "ジャンル",
    all: "すべて",
    rating: "評価",
    year: "制作年",
    cast: "出演キャスト / 俳優陣",
    directorLabel: "監督",
    directorPlaceholder: "例: クリストファー・ノーラン、黒澤明",
    uploadTime: "アップロード日",
    fileSize: "ファイルサイズ",
    noMovies: "映画が見つかりませんでした。新しくアップロードするか検索条件を変更してください！",
    featured: "本日の厳選大ヒット作",
    watchNow: "今すぐ視聴する",
    downloadBtn: "直接ダウンロード",
    downloadAccelerator: "超爆速・ダウンロードアクセラレータ",
    accTitle: "ハイパースピード・ダウンロード加速エンジン",
    accSpeed: "伝送速度",
    accRemaining: "残り時間",
    accStatus: "デジタルパッケージを準備中...",
    accSuccess: "ファイルのダウンロードが正常に完了しました！",
    accConnecting: "セキュア転送用トンネル経路を設定中...",
    accDownloading: "超爆速接続で映画データをダウンロード中...",
    streamNow: "ライブ配信",
    uploadTitle: "新しい動画のアップロード & 登録",
    uploadDirectTitle: "直接ファイルアップロード（ローカルディスクから）",
    uploadUrlTitle: "URL直接指定 ＆ メタデータの登録",
    movieT: "映画名 / タイトル",
    movieTPlaceholder: "例: インターステラー、君の名は。",
    aiGenerate: "AI自動補完",
    aiGenerating: "Geminiが分析を実行中...",
    desc: "解説・ストーリーの要約",
    descPlaceholder: "映画の簡単なあらすじや面白いアピールポイントを入力して下さい...",
    castPlaceholder: "例: レオナルド・ディカプリオ",
    genreLabel: "映画カテゴリ選択",
    languageLabel: "音声・字幕言語設定",
    ratingLabel: "映画の採点評価スコア",
    chooseVideo: "映画の動画ファイルを選択（.mp4、.webm、最大150MB）",
    chooseCover: "カバー用ポスター画像ファイルを選択",
    submitMovie: "映画データをハブにパブリッシュ",
    publishSuccess: "おめでとうございます！ 映画のアップロードが正常に終了、公開されました。",
    or: "— または —",
    streamUrl: "動画直接ストリーミング再生リンク",
    streamUrlPlaceholder: "https://example.com/movie.mp4",
    coverUrl: "ダイレクトカバーポスターの画像アドレス",
    coverUrlPlaceholder: "https://images.unsplash.com/...",
    downloadUrl: "特設ダウンロード専用URL（任意）",
    downloadUrlPlaceholder: "未入力の場合、上記のストリーミング再生用のURLが自動指定されます",
    deleteConfirm: "本当にこの映画を削除してもよろしいですか？",
    sizeUnknown: "クラウドストリーム (~35 MB)",
    creatorConsole: "動画をアップロードして、ポスターを設定、クラウドストレージに完結させましょう。",
    bengali: "বাংলা",
    english: "English",
    errorFill: "はじめにタイトルを入力してから、AIボタンを押してください！",
    emptyFields: "映画の名前、ジャンル設定、および再生可能な映像URLを入力してください！",
    playing: "現在、ライブ配信再生中",
    theaterMode: "シアターモード・ライトオフ切り替え",
    backToBoard: "ダッシュボードに戻る",
    downloadLimit: "注意: アップロードされた容量の大きい映像ファイルは Cloud Run 等のサーバーから送出されます。",
    deleteSuccess: "映画をサーバーから正常に削除しました。",
    authorLabel: "管理者ダッシュボード",
    watchHistoryTitle: "続きから再生",
    clearHistoryBtn: "再生履歴をクリア",
    noHistory: "最近視聴した映画履歴がありません。",
    resumeAt: "続きから再開する",
    lastPlayed: "最終視聴日時"
  },
  zh: {
    title: "极光电影院",
    tagline: "上传、在线播放、超高速下载您喜爱的影片",
    home: "浏览全部电影",
    uploadTab: "创作者演播厅",
    searchPlaceholder: "支持搜索片名、分类、演职人员名...",
    language: "影片语言",
    genre: "类型分类",
    all: "全部",
    rating: "评分",
    year: "年份",
    cast: "领衔主演 / 艺人",
    directorLabel: "导演",
    directorPlaceholder: "例如：克里斯托弗·诺兰、李安",
    uploadTime: "发布日期",
    fileSize: "文件体积",
    noMovies: "未找到任何电影。快去上传一部新片或是调整过滤搜索吧！",
    featured: "今日精选推荐热播巨制",
    watchNow: "立即播放服务",
    downloadBtn: "电影高速直链下载",
    downloadAccelerator: "极速下载通道加速器",
    accTitle: "闪电级物理网络高速加速引擎",
    accSpeed: "测速带宽",
    accRemaining: "预估时间",
    accStatus: "正在拼装数字化媒体包...",
    accSuccess: "文件成功下载，安全存储到下载夹！",
    accConnecting: "正在寻找并安全绑定下载节点管道...",
    accDownloading: "利用极速物理并行流秒级导入文件...",
    streamNow: "在线播放",
    uploadTitle: "快速录入全新电影作品",
    uploadDirectTitle: "直传视频影片文件 (本地磁盘上传)",
    uploadUrlTitle: "使用网络串流URL直接引用数据建档",
    movieT: "电影文件标题",
    movieTPlaceholder: "例如：星际穿越、卧虎藏龙、霸王别姬",
    aiGenerate: "AI一键自动健全内容",
    aiGenerating: "Gemini 深度网络分析中...",
    desc: "故事梗概及剧情简介",
    descPlaceholder: "简洁地介绍一下电影扣人心弦的背景情节吧...",
    castPlaceholder: "例如：莱昂纳多·迪卡普里奥",
    genreLabel: "电影流派题材设置",
    languageLabel: "原始音轨语言",
    ratingLabel: "电影好评星级积分",
    chooseVideo: "点击定位电影长片视频 (.mp4, .webm, 最大限制150MB)",
    chooseCover: "选择封面海报原画文件",
    submitMovie: "提交新视频到公共库",
    publishSuccess: "大功告成！全新的电影已安全保存在线上并向所有人提供访问服务。",
    or: "— 或者使用外链 —",
    streamUrl: "网络直链视频播放串流链接",
    streamUrlPlaceholder: "https://example.com/movie.mp4",
    coverUrl: "电影宣传海报直连图片URL",
    coverUrlPlaceholder: "https://images.unsplash.com/...",
    downloadUrl: "自定义外部下载直链 (可选参数)",
    downloadUrlPlaceholder: "留空即刻默认套用上方的播放链接作为下载入口",
    deleteConfirm: "您确定要彻底删除该影片的档案和在服务上的记录吗？",
    sizeUnknown: "云存储直连 (~35 MB)",
    creatorConsole: "极速上传、无缝指定精美海报封面，完美建立您的个人媒体库。",
    bengali: "বাংলা",
    english: "English",
    errorFill: "请务必先输入电影名称，以便调用 AI 进行智慧充实！",
    emptyFields: "请填入核心电影名称、主题标签以及一个有效的串流视频地址！",
    playing: "当前火热播放中",
    theaterMode: "影院模式暗光开合",
    backToBoard: "返回主界面",
    downloadLimit: "提示：大容量直传视频文件将会直接借宿 Cloud Run 进行高带宽内容分发。",
    deleteSuccess: "电影已成功从数据库中永久擦除。",
    authorLabel: "超级管理员控制屏",
    watchHistoryTitle: "继续观看",
    clearHistoryBtn: "清空历史记录",
    noHistory: "在您的播放队列中没有找到最近的任何观影足迹。",
    resumeAt: "继续从此处观影",
    lastPlayed: "最后观看时间"
  }
};

export const LANGUAGES = [
  { code: "bn" as const, label: "বাংলা" },
  { code: "en" as const, label: "English" },
  { code: "hi" as const, label: "Hindi" },
  { code: "ar" as const, label: "Arabic (আরবি)" },
  { code: "ur" as const, label: "Urdu (উর্দু)" },
  { code: "ta" as const, label: "Tamil (তামিল)" },
  { code: "te" as const, label: "Telugu (తేలుగు)" },
  { code: "ko" as const, label: "Korean (কোরিয়ান)" },
  { code: "ja" as const, label: "Japanese (জাপানিজ)" },
  { code: "zh" as const, label: "Chinese (চাইনিজ)" },
];

export type LangType = typeof LANGUAGES[number]["code"];

export default function App() {
  const [lang, setLang] = useState<LangType>("bn");
  const t = translations[lang] || translations["bn"];

  // Enforce dark mode as permanent theme
  const isDarkMode = true;

  useEffect(() => {
    localStorage.setItem("theme_mode", "dark");
    document.body.classList.add("dark-mode");
    document.body.classList.remove("light-mode");
  }, []);

  // Authentication states
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string } | null>(() => {
    try {
      const saved = localStorage.getItem("current_app_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [authModal, setAuthModal] = useState<"login" | "signup" | null>(null);
  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [authError, setAuthError] = useState("");

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");

    if (!signUpName.trim() || !signUpEmail.trim() || !signUpPassword.trim() || !signUpConfirmPassword.trim()) {
      setAuthError("অনুগ্রহ করে সবগুলি ঘর পূরণ করুন।");
      return;
    }

    if (signUpPassword !== signUpConfirmPassword) {
      setAuthError("পাসওয়ার্ড দুটি মেলেনি!");
      return;
    }

    try {
      const usersJson = localStorage.getItem("moviebox_users");
      const users: any[] = usersJson ? JSON.parse(usersJson) : [];

      if (users.some((u: any) => u.email.toLowerCase() === signUpEmail.toLowerCase())) {
        setAuthError("এই ইমেইল দিয়ে ইতিমধ্যে একটি অ্যাকাউন্ট তৈরি করা হয়েছে।");
        return;
      }

      const newUser = {
        name: signUpName.trim(),
        email: signUpEmail.trim().toLowerCase(),
        password: signUpPassword,
      };

      users.push(newUser);
      localStorage.setItem("moviebox_users", JSON.stringify(users));

      // Auto login after sign up
      localStorage.setItem("current_app_user", JSON.stringify({ name: newUser.name, email: newUser.email }));
      setCurrentUser({ name: newUser.name, email: newUser.email });

      // Clean up fields
      setSignUpName("");
      setSignUpEmail("");
      setSignUpPassword("");
      setSignUpConfirmPassword("");
      setAuthModal(null);
    } catch (err) {
      setAuthError("অ্যাকাউন্ট তৈরি করতে সমস্যা হয়েছে, পুনরায় চেষ্টা করুন।");
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");

    if (!loginEmail.trim() || !loginPassword.trim()) {
      setAuthError("অনুগ্রহ করে ইমেইল এবং পাসওয়ার্ড প্রদান করুন।");
      return;
    }

    try {
      const usersJson = localStorage.getItem("moviebox_users");
      const users: any[] = usersJson ? JSON.parse(usersJson) : [];

      const foundUser = users.find(
        (u: any) => u.email.toLowerCase() === loginEmail.toLowerCase() && u.password === loginPassword
      );

      if (!foundUser) {
        setAuthError("ভুল ইমেইল অথবা পাসওয়ার্ড!");
        return;
      }

      localStorage.setItem("current_app_user", JSON.stringify({ name: foundUser.name, email: foundUser.email }));
      setCurrentUser({ name: foundUser.name, email: foundUser.email });

      setLoginEmail("");
      setLoginPassword("");
      setAuthModal(null);
    } catch (err) {
      setAuthError("লগইন করতে সমস্যা হয়েছে, পুনরায় চেষ্টা করুন।");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("current_app_user");
    setCurrentUser(null);
  };

  // Movie states
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"browse" | "creator" | "favorites">("browse");

  // Favorites system state
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const savedUser = localStorage.getItem("current_app_user");
      const user = savedUser ? JSON.parse(savedUser) : null;
      const key = user ? `favorites_${user.email}` : "favorites_guest";
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Track the key and synchronize if user logs in/out
  useEffect(() => {
    const key = currentUser ? `favorites_${currentUser.email}` : "favorites_guest";
    try {
      const saved = localStorage.getItem(key);
      setFavorites(saved ? JSON.parse(saved) : []);
    } catch {
      setFavorites([]);
    }
  }, [currentUser]);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    const key = currentUser ? `favorites_${currentUser.email}` : "favorites_guest";
    localStorage.setItem(key, JSON.stringify(favorites));
  }, [favorites, currentUser]);

  const toggleFavorite = (movieId: string) => {
    setFavorites(prev => {
      if (prev.includes(movieId)) {
        return prev.filter(id => id !== movieId);
      } else {
        return [...prev, movieId];
      }
    });
  };

  const isFavorite = (movieId: string) => {
    return favorites.includes(movieId);
  };
  
  // Filtering & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [sortBy, setSortBy] = useState<"date" | "rating">("date");

  // Selected Play Movie
  const [playingMovie, setPlayingMovie] = useState<Movie | null>(null);
  const [infoMovie, setInfoMovie] = useState<Movie | null>(null);
  const [copied, setCopied] = useState(false);
  const [isTheaterMode, setIsTheaterMode] = useState(false);
  const [watchHistory, setWatchHistory] = useState<any[]>([]);

  // Upload Form details
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  
  // Movie registration Form variables
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formGenre, setFormGenre] = useState("");
  const [formLanguage, setFormLanguage] = useState("Bengali");
  const [formCast, setFormCast] = useState("");
  const [formDirector, setFormDirector] = useState("");
  const [formYear, setFormYear] = useState("2026");
  const [formRating, setFormRating] = useState(5);
  
  // Method selectors
  const [creationMethod, setCreationMethod] = useState<"upload" | "link">("link");
  const [formVideoUrl, setFormVideoUrl] = useState("");
  const [formCoverUrl, setFormCoverUrl] = useState("");
  const [formDownloadUrl, setFormDownloadUrl] = useState("");
  const [formSize, setFormSize] = useState("");

  // Local File references
  const fileVideoRef = useRef<HTMLInputElement>(null);
  const fileCoverRef = useRef<HTMLInputElement>(null);
  const lastSavedTimeRef = useRef<number>(0);

  // Status message alerts
  const [infoMessage, setInfoMessage] = useState<{ text: string; type: "success" | "error" | "info" } | null>(null);

  // Download Accelerator States
  const [acceleratorActive, setAcceleratorActive] = useState(false);
  const [acceleratorMovie, setAcceleratorMovie] = useState<Movie | null>(null);
  const [acceleratorProgress, setAcceleratorProgress] = useState(0);
  const [acceleratorSpeed, setAcceleratorSpeed] = useState("");
  const [acceleratorTimeRem, setAcceleratorTimeRem] = useState("");
  const [acceleratorPhase, setAcceleratorPhase] = useState<"connecting" | "downloading" | "finished">("connecting");

  // Premium custom video player states and references
  const customVideoRef = useRef<HTMLVideoElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);

  // Sync fullscreen change with state
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Controls auto-hide timer when mouse is inactive
  useEffect(() => {
    let timeoutId: any;
    const handleMouseMove = () => {
      setShowControls(true);
      clearTimeout(timeoutId);
      if (isPlaying) {
        timeoutId = setTimeout(() => {
          setShowControls(false);
        }, 3000);
      }
    };

    const container = playerContainerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("touchstart", handleMouseMove);
    }

    return () => {
      clearTimeout(timeoutId);
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("touchstart", handleMouseMove);
      }
    };
  }, [isPlaying]);

  // Keep volume updated on ref changes
  useEffect(() => {
    if (customVideoRef.current) {
      customVideoRef.current.volume = isMuted ? 0 : volume;
      customVideoRef.current.muted = isMuted;
    }
  }, [volume, isMuted, playingMovie]);

  // Handle play state when a movie loads
  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    lastSavedTimeRef.current = 0;
  }, [playingMovie]);

  // Save to Watch History when played
  useEffect(() => {
    if (!playingMovie) return;
    try {
      const stored = localStorage.getItem("moviebox_watch_history");
      let currentHistory: any[] = [];
      if (stored) {
        currentHistory = JSON.parse(stored);
      }
      const filtered = currentHistory.filter(item => item.id !== playingMovie.id);
      const existing = currentHistory.find(item => item.id === playingMovie.id);
      
      const updatedItem = {
        ...playingMovie,
        playedAt: new Date().toISOString(),
        currentTime: existing ? (existing.currentTime || 0) : 0,
        duration: existing ? (existing.duration || 0) : 0
      };
      
      const newHistory = [updatedItem, ...filtered].slice(0, 10);
      localStorage.setItem("moviebox_watch_history", JSON.stringify(newHistory));
      setWatchHistory(newHistory);
    } catch (e) {
      console.error("Failed to update watch history:", e);
    }
  }, [playingMovie]);

  const togglePlay = () => {
    const video = customVideoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(err => console.error("Video play failed:", err));
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    if (customVideoRef.current && playingMovie) {
      const time = customVideoRef.current.currentTime;
      const totalDur = customVideoRef.current.duration || 0;
      setCurrentTime(time);
      
      // Save progress to local storage and state when it has advanced by 5s or at the end
      if (Math.abs(time - lastSavedTimeRef.current) >= 5 || Math.abs(time - totalDur) < 1) {
        lastSavedTimeRef.current = time;
        try {
          const stored = localStorage.getItem("moviebox_watch_history");
          if (stored) {
            const currentHistory: any[] = JSON.parse(stored);
            const foundIndex = currentHistory.findIndex(item => item.id === playingMovie.id);
            if (foundIndex !== -1) {
              currentHistory[foundIndex] = {
                ...currentHistory[foundIndex],
                currentTime: time,
                duration: totalDur,
                playedAt: new Date().toISOString()
              };
              localStorage.setItem("moviebox_watch_history", JSON.stringify(currentHistory));
              setWatchHistory(currentHistory);
            }
          }
        } catch (e) {
          console.error("Failed to save periodic playback progress:", e);
        }
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (customVideoRef.current) {
      const dur = customVideoRef.current.duration;
      setDuration(dur);
      
      if (playingMovie) {
        try {
          const stored = localStorage.getItem("moviebox_watch_history");
          if (stored) {
            const currentHistory: any[] = JSON.parse(stored);
            const found = currentHistory.find(item => item.id === playingMovie.id);
            if (found && found.currentTime > 3 && found.currentTime < (dur - 10)) {
              customVideoRef.current.currentTime = found.currentTime;
              setCurrentTime(found.currentTime);
              
              showAlert(
                lang === "bn"
                  ? `মুভিটি ${formatTime(found.currentTime)} থেকে পুনরায় চালু করা হয়েছে`
                  : `Resumed from ${formatTime(found.currentTime)}`,
                "info"
              );
            }
          }
        } catch (e) {
          console.error("Failed to load playback position:", e);
        }
      }
    }
  };

  const clearWatchHistory = () => {
    try {
      localStorage.removeItem("moviebox_watch_history");
      setWatchHistory([]);
      showAlert(
        lang === "bn"
          ? "প্লেব্যাক হিস্ট্রি সফলভাবে মুছে ফেলা হয়েছে"
          : "Playback history successfully cleared",
        "success"
      );
    } catch (e) {
      console.error("Failed to clear watch history", e);
    }
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (customVideoRef.current) {
      const seekTime = Number(e.target.value);
      customVideoRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    setVolume(v);
    if (v > 0) {
      setIsMuted(false);
    } else {
      setIsMuted(true);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    const container = playerContainerRef.current;
    if (!container) return;
    if (!document.fullscreenElement) {
      container.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(err => console.error("Request fullscreen failed:", err));
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      }).catch(err => console.error("Exit fullscreen failed:", err));
    }
  };

  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds) || !isFinite(timeInSeconds)) return "00:00";
    const hrs = Math.floor(timeInSeconds / 3600);
    const mins = Math.floor((timeInSeconds % 3600) / 60);
    const secs = Math.floor(timeInSeconds % 60);
    
    if (hrs > 0) {
      return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Load Movies and Watch History on Start
  useEffect(() => {
    fetchMovies();
    try {
      const stored = localStorage.getItem("moviebox_watch_history");
      if (stored) {
        setWatchHistory(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load initial watch history:", e);
    }
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/movies");
      const data = await res.json();
      setMovies(data);
      setLoading(false);

      // Deep-linking: auto-open description if movie ID is in search query attributes
      try {
        const searchParams = new URLSearchParams(window.location.search);
        const sharedMovieId = searchParams.get("movie");
        if (sharedMovieId) {
          const found = data.find((m: any) => m.id === sharedMovieId);
          if (found) {
            setInfoMovie(found);
          }
        }
      } catch (paramErr) {
        console.error("Failed to parse URL query params:", paramErr);
      }
    } catch (err) {
      console.error("Error loading movies:", err);
      setLoading(false);
    }
  };

  // Run AI autocomplete powered by server side Gemini API
  const generateMetadataWithAI = async () => {
    if (!formTitle.trim()) {
      showAlert(t.errorFill, "error");
      return;
    }
    
    setAiLoading(true);
    try {
      const res = await fetch("/api/movies/generate-meta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: formTitle })
      });
      const data = await res.json();
      
      if (data.error) {
        showAlert(data.error, "error");
      } else {
        setFormDescription(data.description || "");
        setFormGenre(data.genre || "");
        setFormLanguage(data.language || "English");
        setFormCast(data.cast || "");
        setFormDirector(data.director || "");
        setFormYear(data.year || "2026");
        setFormRating(data.rating || 5);
        
        // Dynamic poster picker from Unsplash matching keyword
        const queryWord = encodeURIComponent(data.genre.split(",")[0] || formTitle);
        setFormCoverUrl(`https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=1080&auto=format&fit=crop`);
        
        showAlert(lang === "bn" ? "✨ এআই তথ্য পূরণ সম্পূর্ণ!" : "✨ AI detailed metadata auto-populated!", "success");
      }
    } catch (err: any) {
      showAlert(err.message || "Failed to contact Gemini engine", "error");
    } finally {
      setAiLoading(false);
    }
  };

  const showAlert = (text: string, type: "success" | "error" | "info") => {
    setInfoMessage({ text, type });
    setTimeout(() => {
      setInfoMessage(null);
    }, 5000);
  };

  // Perform actual File uploads using standard asynchronous XHR to render real progress bar!
  const handleUploadedFilesAndSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formTitle.trim()) {
      showAlert(t.emptyFields, "error");
      return;
    }

    if (creationMethod === "link" && (!formVideoUrl.trim())) {
      showAlert(t.emptyFields, "error");
      return;
    }

    try {
      setUploading(true);
      setUploadProgress(10);
      
      let finalVideoUrl = formVideoUrl;
      let finalCoverUrl = formCoverUrl || "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&auto=format&fit=crop&q=80";
      let calculatedSize = formSize || "28 MB";

      if (creationMethod === "upload") {
        const videoInput = fileVideoRef.current;
        const coverInput = fileCoverRef.current;

        const formData = new FormData();
        let hasFiles = false;

        if (videoInput?.files && videoInput.files[0]) {
          formData.append("videoFile", videoInput.files[0]);
          hasFiles = true;
        }
        if (coverInput?.files && coverInput.files[0]) {
          formData.append("coverFile", coverInput.files[0]);
          hasFiles = true;
        }

        if (hasFiles) {
          setUploadProgress(25);
          // Standard asynchronous HTTP upload trigger
          const uploadPromise = new Promise<{ videoUrl?: string; coverUrl?: string; size?: string }>((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("POST", "/api/movies/upload", true);
            
            xhr.upload.onprogress = (progressEvent) => {
              if (progressEvent.lengthComputable) {
                const percentage = Math.round((progressEvent.loaded / progressEvent.total) * 60) + 25; // Scale between 25% and 85%
                setUploadProgress(percentage);
              }
            };

            xhr.onload = () => {
              if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                resolve(response);
              } else {
                reject(new Error("File upload failed on server"));
              }
            };

            xhr.onerror = () => reject(new Error("Network connection error during file upload"));
            xhr.send(formData);
          });

          const uploadResult = await uploadPromise;
          
          if (uploadResult.videoUrl) {
            finalVideoUrl = uploadResult.videoUrl;
          }
          if (uploadResult.coverUrl) {
            finalCoverUrl = uploadResult.coverUrl;
          }
          if (uploadResult.size) {
            calculatedSize = uploadResult.size;
          }
        }
      }

      setUploadProgress(90);

      // Save Movie profile block inside backend storage system
      const moviesResponse = await fetch("/api/movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formTitle,
          description: formDescription,
          genre: formGenre || "Drama",
          language: formLanguage,
          cast: formCast,
          director: formDirector,
          year: formYear,
          rating: Number(formRating),
          coverUrl: finalCoverUrl,
          videoUrl: finalVideoUrl,
          downloadUrl: formDownloadUrl || finalVideoUrl,
          size: calculatedSize
        })
      });

      if (!moviesResponse.ok) {
        throw new Error("Unable to save movie profiles to disk");
      }

      setUploadProgress(100);
      showAlert(t.publishSuccess, "success");
      
      // Reset variables
      setFormTitle("");
      setFormDescription("");
      setFormGenre("");
      setFormCast("");
      setFormDirector("");
      setFormYear("2026");
      setFormRating(5);
      setFormVideoUrl("");
      setFormCoverUrl("");
      setFormDownloadUrl("");
      
      if (fileVideoRef.current) fileVideoRef.current.value = "";
      if (fileCoverRef.current) fileCoverRef.current.value = "";

      // Refresh Movie library
      await fetchMovies();
      setActiveTab("browse");

    } catch (e: any) {
      showAlert(e.message || "An issue occurred during publishing", "error");
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  // Movie Deletion
  const handleDeleteMovie = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm(t.deleteConfirm)) return;

    try {
      const res = await fetch(`/api/movies/${id}`, {
        method: "DELETE"
      });

      if (res.ok) {
        showAlert(t.deleteSuccess, "success");
        fetchMovies();
        if (playingMovie?.id === id) {
          setPlayingMovie(null);
        }
      } else {
        showAlert("Failed to delete movie from system", "error");
      }
    } catch (err: any) {
      showAlert(err.message, "error");
    }
  };

  // Dynamic Movie star rating submitter
  const handleRateMovie = async (movieId: string, ratingValue: number) => {
    try {
      const res = await fetch(`/api/movies/${movieId}/rate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating: ratingValue }),
      });
      const data = await res.json();
      if (data.error) {
        showAlert(data.error, "error");
      } else {
        // Update local state is crucial!
        setMovies(prevMovies => prevMovies.map(movie => {
          if (movie.id === movieId) {
            return {
              ...movie,
              rating: data.rating,
              userRatings: movie.userRatings ? [...movie.userRatings, ratingValue] : [ratingValue],
            };
          }
          return movie;
        }));
        
        // Also update infoMovie if it's currently open
        if (infoMovie && infoMovie.id === movieId) {
          setInfoMovie(prev => prev ? {
            ...prev,
            rating: data.rating,
            userRatings: prev.userRatings ? [...prev.userRatings, ratingValue] : [ratingValue]
          } : null);
        }

        // Also update playingMovie if it's currently open
        if (playingMovie && playingMovie.id === movieId) {
          setPlayingMovie(prev => prev ? {
            ...prev,
            rating: data.rating,
            userRatings: prev.userRatings ? [...prev.userRatings, ratingValue] : [ratingValue]
          } : null);
        }

        showAlert(
          lang === "bn"
            ? `মুভিটিকে আপনি ${ratingValue} স্টার রেটিং দিয়েছেন!`
            : `You rated this movie ${ratingValue} stars!`,
          "success"
        );
      }
    } catch (err: any) {
      console.error("Failed to rate movie:", err);
      showAlert(err.message || "Failed to submit rating", "error");
    }
  };

  // Render clickable rating stars
  const renderRatingStars = (movieId: string, currentRating: number) => {
    return (
      <div className="bg-white/5 border border-white/5 p-3 rounded-xl flex flex-col gap-1.5 w-full select-none text-left">
        <span className="text-[9px] uppercase tracking-wider font-extrabold text-amber-500 font-mono">
          {lang === "bn" ? "আপনার রেটিং দিন" : "Rate this Movie"}
        </span>
        <div className="flex items-center gap-1.5">
          {[1, 2, 3, 4, 5].map((starVal) => {
            const isFilled = starVal <= Math.round(currentRating);
            return (
              <button
                key={starVal}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRateMovie(movieId, starVal);
                }}
                className="text-neutral-500 hover:text-amber-400 hover:scale-120 transition duration-150 cursor-pointer focus:outline-none p-0.5"
                title={`${starVal} Stars`}
              >
                <Star
                  size={16}
                  fill={isFilled ? "#fbbf24" : "none"}
                  className={isFilled ? "text-amber-400" : "text-neutral-600"}
                />
              </button>
            );
          })}
          <span className="text-[10px] font-mono text-neutral-400 font-bold ml-1">
            ({currentRating}/5)
          </span>
        </div>
      </div>
    );
  };

  // Copy shareable watch URL to user's clipboard helper
  const handleShareMovie = (movie: Movie) => {
    try {
      const shareUrl = `${window.location.origin}${window.location.pathname}?movie=${movie.id}`;
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      showAlert(
        lang === "bn"
          ? "মুভির লিংক ক্লিপবোর্ডে কপি করা হয়েছে!"
          : "Movie link copied to clipboard!",
        "success"
      );
    } catch (e) {
      console.error("Failed to copy watch link:", e);
      showAlert("Failed to copy link", "error");
    }
  };

  // Launch High-fidelity Simulator for the "Download Accelerator"
  const startFileDownloadProcess = (movie: Movie) => {
    setAcceleratorMovie(movie);
    setAcceleratorActive(true);
    setAcceleratorProgress(0);
    setAcceleratorPhase("connecting");
    setAcceleratorSpeed("0 KB/s");
    setAcceleratorTimeRem("--");

    // Phase A: Securing high-speed connections for 1.8 seconds
    let curProgress = 0;
    const intervalConnect = setInterval(() => {
      curProgress += 12;
      if (curProgress >= 35) {
        clearInterval(intervalConnect);
        setAcceleratorPhase("downloading");
        
        // Phase B: Speed download
        const intervalDown = setInterval(() => {
          curProgress += Math.floor(Math.random() * 5) + 3;
          if (curProgress >= 100) {
            curProgress = 100;
            clearInterval(intervalDown);
            setAcceleratorPhase("finished");
            
            // Actually request standard browser download of targeted file link!
            const downloadLink = document.createElement("a");
            downloadLink.href = movie.downloadUrl;
            downloadLink.setAttribute("download", `${movie.title}.mp4`);
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
          }
          
          setAcceleratorProgress(curProgress);
          // Standard dynamic telemetries
          const randomSpeed = (Math.random() * 6 + 12).toFixed(1); // 12MB/s - 18MB/s
          setAcceleratorSpeed(`${randomSpeed} MB/s`);
          const remRaw = Math.ceil((100 - curProgress) / 8);
          setAcceleratorTimeRem(`${remRaw}s`);
        }, 300);
      } else {
        setAcceleratorProgress(curProgress);
        setAcceleratorSpeed("Connecting...");
      }
    }, 400);
  };

  // Filtering calculation logic
  const filteredMovies = movies.filter(m => {
    const query = searchQuery.toLowerCase().trim();
    const titleMatch = m.title.toLowerCase().includes(query);
    const descMatch = m.description.toLowerCase().includes(query);
    const castMatch = m.cast ? m.cast.toLowerCase().includes(query) : false;
    const genreMatchText = m.genre.toLowerCase().includes(query);
    const searchMatch = !query || titleMatch || descMatch || castMatch || genreMatchText;

    const genreFilterMatch = selectedGenre === "All" || m.genre.toLowerCase().includes(selectedGenre.toLowerCase());
    const langFilterMatch = selectedLanguage === "All" || m.language.toLowerCase() === selectedLanguage.toLowerCase();

    return searchMatch && genreFilterMatch && langFilterMatch;
  });

  const sortedAndFilteredMovies = [...filteredMovies].sort((a, b) => {
    if (sortBy === "rating") {
      return (b.rating || 0) - (a.rating || 0);
    } else {
      // Sort by uploading timestamp
      return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime();
    }
  });

  // Featured Movie (Take first movie)
  const featuredMovie = movies.length > 0 ? movies[0] : null;

  // Extract all available Genres for display pills
  const genresSet = new Set<string>();
  movies.forEach(m => {
    m.genre.split(",").forEach(g => genresSet.add(g.trim()));
  });
  const genresList = Array.from(genresSet);

  // Extract array of all Languages for selection
  const languagesList = Array.from(new Set(movies.map(m => m.language)));

  return (
    <div className={`min-h-screen bg-transparent ${isDarkMode ? "text-white" : "text-slate-800"} font-sans transition-all duration-300 relative ${isTheaterMode ? "brightness-50" : ""}`}>
      
      {/* High-Performance Canvas-based Background Animation */}
      <BackgroundAnimation isDarkMode={isDarkMode} />
      
      {/* Lights out overlay banner for theater environment */}
      {isTheaterMode && (
        <div className="fixed inset-0 bg-black/80 pointer-events-none z-40 transition-all duration-500" />
      )}

      {/* Floating Alerts Container */}
      {infoMessage && (
        <div id="alerts-bar" className="fixed top-6 right-6 z-50 max-w-md w-full">
          <div className={`flex items-center gap-3 p-4 rounded-xl shadow-2xl border ${
            infoMessage.type === "success" 
              ? "bg-emerald-950 border-emerald-500 text-emerald-300"
              : infoMessage.type === "error"
              ? "bg-red-950/95 border-red-500/50 text-red-200 backdrop-blur-md"
              : "bg-blue-950/95 border-blue-500/50 text-blue-200 backdrop-blur-md"
          }`}>
            <span className="p-1 rounded-md bg-white/10">
              {infoMessage.type === "success" && <CheckCircle size={20} />}
              {infoMessage.type === "error" && <AlertTriangle size={20} />}
              {infoMessage.type === "info" && <Info size={20} />}
            </span>
            <div className="flex-1 text-sm font-semibold tracking-wide">
              {infoMessage.text}
            </div>
            <button onClick={() => setInfoMessage(null)} className="opacity-70 hover:opacity-100 transition p-1">
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Immersive Fullscreen Video Player Modal */}
      {playingMovie && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-45 flex items-center justify-center p-3 sm:p-5 animate-fade-in font-sans">
          <div className="relative w-full max-w-5xl bg-[#0d0d11] rounded-3xl overflow-hidden border border-white/10 shadow-3xl max-h-[95vh] flex flex-col justify-between">
            {/* Top info and action bar */}
            <div className="p-4 bg-gradient-to-r from-[#17171c] to-[#0a0a0c] flex items-center justify-between border-b border-white/5 text-sm">
              <div className="flex items-center gap-2 text-blue-500 font-bold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                <span>{lang === "bn" ? "এখন চলছে" : "Streaming"}: {playingMovie.title}</span>
              </div>
              <div className="flex items-center gap-2">
                {/* Close Button */}
                <button 
                  onClick={() => setPlayingMovie(null)} 
                  className="px-3.5 py-1.5 text-neutral-400 hover:text-white bg-white/5 border border-white/10 rounded-xl hover:bg-red-950/40 hover:border-red-500/50 transition duration-200 cursor-pointer flex items-center gap-1.5 text-xs font-bold"
                >
                  <X size={14} />
                  <span>{lang === "bn" ? "বন্ধ করুন" : "Close"}</span>
                </button>
              </div>
            </div>

            {/* Immersive Video frame */}
            <div className="flex-1 bg-black flex items-center justify-center relative overflow-hidden" style={{ minHeight: "250px" }}>
              <div 
                ref={playerContainerRef}
                className="relative w-full h-full aspect-video bg-black flex items-center justify-center overflow-hidden select-none group"
                onMouseEnter={() => setShowControls(true)}
                onMouseLeave={() => isPlaying && setShowControls(false)}
              >
                <video 
                  ref={customVideoRef}
                  id="film-player"
                  src={playingMovie.videoUrl} 
                  autoPlay 
                  className="w-full h-full object-contain cursor-pointer"
                  poster={playingMovie.coverUrl}
                  onClick={togglePlay}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onEnded={() => setIsPlaying(false)}
                />
                
                {/* Controls overlay block (always visible or hover-revealed) */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/95 via-black/10 to-black/30 flex flex-col justify-between p-4 transition-opacity duration-300 pointer-events-none ${
                  showControls ? "opacity-100" : "opacity-0"
                }`}>
                  
                  {/* Top stats layer inside player container */}
                  <div className="flex justify-between items-start w-full">
                    <div className="bg-black/80 backdrop-blur-md border border-white/5 px-2.5 py-1 text-white/50 rounded-lg text-[9px] font-mono tracking-wider select-none">
                      MOVIE BOX THEATER v2.5
                    </div>
                    <div className="bg-black/80 backdrop-blur-md border border-white/5 px-2.5 py-1 text-blue-400 font-extrabold text-[9px] font-mono tracking-wider select-none">
                      {isPlaying ? "LIVE STREAM ACTIVE" : "PAUSED"}
                    </div>
                  </div>

                  {/* Controls HUD */}
                  <div className="space-y-3 w-full pointer-events-auto">
                    
                    {/* Progress Slider */}
                    <div className="flex items-center gap-3 w-full group/timeline">
                      <span className="text-[10px] font-mono font-bold text-white/80 min-w-[35px] select-none text-right">
                        {formatTime(currentTime)}
                      </span>
                      
                      <div className="relative flex-1 flex items-center h-4">
                        <input 
                          type="range"
                          min={0}
                          max={duration || 100}
                          value={currentTime}
                          onChange={handleSeekChange}
                          className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500 focus:outline-none transition group-hover/timeline:h-1.5"
                          style={{
                            background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${duration ? (currentTime / duration) * 100 : 0}%, rgba(255, 255, 255, 0.1) ${duration ? (currentTime / duration) * 100 : 0}%, rgba(255, 255, 255, 0.1) 100%)`
                          }}
                        />
                      </div>

                      <span className="text-[10px] font-mono font-bold text-white/40 min-w-[35px] select-none">
                        {formatTime(duration)}
                      </span>
                    </div>

                    {/* Button footer row */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {/* Play control */}
                        <button 
                          onClick={togglePlay}
                          className="text-white hover:text-blue-400 p-2 rounded-full hover:bg-white/5 transition duration-150 active:scale-90 cursor-pointer"
                          title={isPlaying ? "Pause" : "Play"}
                        >
                          {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
                        </button>

                        {/* Volume stack */}
                        <div className="flex items-center gap-1.5 group/volume">
                          <button 
                            onClick={toggleMute}
                            className="text-white hover:text-blue-400 p-2 rounded-full hover:bg-white/5 transition duration-150 cursor-pointer"
                          >
                            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                          </button>
                          <input 
                            type="range"
                            min={0}
                            max={1}
                            step={0.05}
                            value={isMuted ? 0 : volume}
                            onChange={handleVolumeChange}
                            className="w-0 opacity-0 group-hover/volume:w-16 group-hover/volume:opacity-100 h-1 rounded bg-white/20 appearance-none accent-blue-500 transition-all duration-300 cursor-pointer"
                            style={{
                              background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(isMuted ? 0 : volume) * 100}%, rgba(255, 255, 255, 0.1) ${(isMuted ? 0 : volume) * 100}%, rgba(255, 255, 255, 0.1) 100%)`
                            }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <button 
                          onClick={toggleFullscreen}
                          className="text-white hover:text-blue-400 p-2 rounded-full hover:bg-white/5 transition duration-150 cursor-pointer"
                          title="Fullscreen"
                        >
                          {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>

            {/* Bottom details block (meta & file sizes) */}
            <div className="p-5 sm:p-6 bg-gradient-to-tr from-[#0a0a0c] to-[#121217] text-neutral-400 border-t border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
              <div className="space-y-1.5 text-left flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <h4 className="text-lg font-black text-white tracking-wide">{playingMovie.title}</h4>
                  <span className="bg-blue-600/20 text-blue-400 border border-blue-500/10 text-[10px] font-bold px-2 py-0.5 rounded-lg">
                    {playingMovie.year || "2026"}
                  </span>
                  <span className="bg-white/5 border border-white/5 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded-lg flex items-center gap-0.5">
                    <Star size={10} fill="currentColor" /> {playingMovie.rating}/5
                  </span>
                </div>
                <p className="text-xs text-white/50 max-w-xl line-clamp-2 leading-relaxed">
                  {playingMovie.description}
                </p>
                
                {/* Embedded Interactive Star Rating submission widget */}
                <div className="pt-2 max-w-xs">
                  {renderRatingStars(playingMovie.id, playingMovie.rating || 5)}
                </div>
              </div>

              {/* Action operations and statistics */}
              <div className="flex flex-col sm:flex-row md:flex-col items-stretch sm:items-center md:items-end gap-3.5 shrink-0 w-full md:w-auto self-end">
                <div className="text-xs font-mono select-none bg-white/5 px-3.5 py-1.5 rounded-xl border border-white/5 flex flex-col gap-0.5 text-left md:text-right w-full">
                  <span className="text-[9px] uppercase tracking-wider text-neutral-500">Audio/Size</span>
                  <span className="font-bold text-white/80">{playingMovie.language} • {playingMovie.size || "38 MB"}</span>
                </div>
                <button 
                  onClick={() => startFileDownloadProcess(playingMovie)}
                  className="w-full px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 rounded-xl font-bold text-xs text-white flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-blue-500/25 active:scale-95 transition"
                >
                  <Download size={13} />
                  <span>{lang === "bn" ? "ডাউনলোড" : "Download"}</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Header section */}
      <header className={`border-b sticky top-0 backdrop-blur-md z-30 transition-all duration-300 ${isDarkMode ? "border-white/10 bg-[#0f0f12]/80" : "border-slate-200/80 bg-white/85 shadow-sm"}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-4">
          
          {/* Top Row: Brand Info and Auth/Language controls */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
            {/* Logo & Main Title Area */}
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center justify-center">
                <div className="text-2xl font-black tracking-tighter text-blue-500 font-display select-none leading-none">
                  MOVIE<span className={isDarkMode ? "text-white" : "text-slate-900"}> BOX</span>
                </div>
                <span className={`text-[12px] font-semibold tracking-wide mt-1 select-none italic ${isDarkMode ? "text-blue-400/70" : "text-blue-600/80"}`}>
                  Developed by ANIM ZAYAN
                </span>
              </div>
              <div className={`h-8 w-px hidden sm:block ${isDarkMode ? "bg-white/15" : "bg-slate-300"}`}></div>
              <div className="hidden sm:block text-left">
                <h1 className={`text-sm font-bold tracking-wide leading-none ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                  {t.title}
                </h1>
                <p className={`text-[9px] font-mono tracking-widest uppercase mt-1 ${isDarkMode ? "text-white/40" : "text-slate-500"}`}>
                  {lang === "bn" ? "মুভি ডাউনলোডার ও স্ট্রীমার ২.০" : "MOVIE STREAM & DOWNLOAD PORTAL"}
                </p>
              </div>
            </div>

            {/* Language filter and Auth controls (Extreme Right) */}
            <div className="flex items-center gap-3">
              
              {/* Language toggle tab */}
              <div className="flex items-center max-w-full">
                <div className={`flex items-center gap-1 p-1 rounded-full border overflow-x-auto scrollbar-none max-w-[260px] xs:max-w-[320px] sm:max-w-md md:max-w-xs lg:max-w-md xl:max-w-lg whitespace-nowrap snap-x ${
                  isDarkMode ? "bg-white/5 border-white/10" : "bg-slate-100 border-slate-200"
                }`}>
                  {LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => setLang(l.code)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all snap-start shrink-0 ${
                        lang === l.code
                          ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                          : isDarkMode 
                            ? "text-white/60 hover:text-white hover:bg-white/5"
                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Auth Buttons */}
              <div className="flex items-center gap-2 select-none">
                {currentUser ? (
                  <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-full pl-3 pr-4 py-1 animate-fade-in">
                    <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-xs font-extrabold text-white shadow-md border border-white/15">
                      {currentUser.name.trim().charAt(0).toUpperCase()}
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-[9px] text-white/40 tracking-wider font-extrabold uppercase leading-none">MEMBER</span>
                      <span className="text-xs font-bold text-white mt-0.5 leading-none">Welcome, {currentUser.name}</span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="ml-2 pl-2.5 border-l border-white/10 text-rose-400 hover:text-rose-300 transition text-xs font-extrabold cursor-pointer h-5 flex items-center"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 animate-fade-in">
                    <button
                      onClick={() => { setAuthError(""); setAuthModal("login"); }}
                      className="px-4 py-1.5 rounded-full text-xs font-bold bg-white/5 border border-white/10 text-white hover:bg-white/10 transition cursor-pointer flex items-center gap-1.5"
                    >
                      🔑 Login
                    </button>
                    <button
                      onClick={() => { setAuthError(""); setAuthModal("signup"); }}
                      className="px-4 py-1.5 rounded-full text-xs font-bold bg-blue-600 text-white shadow-md shadow-blue-600/20 hover:bg-blue-500 transition cursor-pointer flex items-center gap-1.5"
                    >
                      📝 Sign Up
                    </button>
                  </div>
                )}
              </div>

            </div>

          </div>

          {/* Separation divider */}
          <div className={`h-px w-full ${isDarkMode ? "bg-white/5" : "bg-slate-200"}`} />

          {/* Bottom Row: Navigation Tabs */}
          <div className="flex justify-center items-center">
            <nav className={`flex items-center rounded-full border p-1 ${isDarkMode ? "bg-white/5 border-white/10" : "bg-slate-100 border-slate-200"}`}>
              <button
                onClick={() => { setActiveTab("browse"); setPlayingMovie(null); }}
                className={`px-5 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 ${
                  activeTab === "browse" ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25" : "text-white/60 hover:text-white"
                }`}
                id="tab-browse-nav"
              >
                <Film size={14} />
                <span>{t.home}</span>
              </button>
              <button
                onClick={() => { setActiveTab("favorites"); setPlayingMovie(null); }}
                className={`px-5 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 ${
                  activeTab === "favorites" ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25" : "text-white/60 hover:text-white"
                }`}
                id="tab-favorites-nav"
              >
                <Heart size={14} className={activeTab === "favorites" ? "text-white" : "text-rose-400"} fill={activeTab === "favorites" ? "currentColor" : "none"} />
                <span>{lang === "bn" ? "আমার পছন্দের" : "My Favorites"}</span>
              </button>
              <button
                onClick={() => { setActiveTab("creator"); }}
                className={`px-5 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 ${
                  activeTab === "creator" ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25" : "text-white/60 hover:text-white"
                }`}
                id="tab-creator-nav"
              >
                <Upload size={14} />
                <span>{t.uploadTab}</span>
              </button>
            </nav>
          </div>

        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 py-6">

        {/* Info label banner under head */}
        <div className="mb-6 flex flex-col md:flex-row items-center justify-between p-5 bg-white/5 rounded-3xl border border-white/5 gap-4">
          <div className="flex items-center gap-4 text-left">
            <div className="p-2.5 bg-blue-500/10 rounded-xl text-blue-400 shadow-inner">
              <Sparkles size={20} />
            </div>
            <div>
              <p className="text-sm font-extrabold text-white tracking-wide">{t.tagline}</p>
              <p className="text-xs text-white/40 font-mono tracking-wider">{lang === "bn" ? "ডিভাইস বান্ধব ভিডিও কন্টেন্ট ডিলিভারি পোর্টাল" : "Fully responsive streaming workspace"}</p>
            </div>
          </div>
          <div className="bg-gradient-to-tr from-blue-500 to-purple-600 border border-white/20 px-4 py-1.5 text-white text-xs font-bold font-mono rounded-full shadow-lg shadow-blue-500/10">
            {t.authorLabel} (animzayan468)
          </div>
        </div>

        {/* CONDITIONAL TAB A: MOVIE BROWSER */}
        {activeTab === "browse" && (
          <div className="space-y-8 animate-fade-in">
            
            {/* HERO CINEMATIC HEADER (Rendered if movies exist) */}
            {featuredMovie && !searchQuery && selectedGenre === "All" && selectedLanguage === "All" && (
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-white/5 bg-gradient-to-r from-blue-950/40 to-black">
                {/* Backdrop cover shadow block */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-black/10 z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/25 to-transparent z-10" />
                
                {/* Background high-resolution landscape cover */}
                <img 
                  src={featuredMovie.coverUrl} 
                  alt={featuredMovie.title} 
                  className="absolute inset-0 w-full h-full object-cover scale-105 pointer-events-none filter brightness-50 contrast-110" 
                  referrerPolicy="no-referrer"
                />

                {/* Hero information content */}
                <div className="relative z-20 px-6 py-16 sm:px-12 sm:py-24 max-w-2xl flex flex-col justify-end text-left h-full">
                  <div className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-[10px] uppercase font-black tracking-widest px-3.5 py-1.5 rounded-full mb-4 w-max shadow-lg shadow-blue-600/20">
                    <Sparkles size={10} />
                    <span>{t.featured}</span>
                  </div>

                  <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4 font-display">
                    {featuredMovie.title}
                  </h2>

                  <div className="flex flex-wrap gap-2.5 mb-6 items-center">
                    <span className="bg-white/10 backdrop-blur-md border border-white/5 px-3 py-1 text-xs text-blue-400 rounded-lg font-bold">
                      {featuredMovie.genre}
                    </span>
                    <span className="bg-white/10 backdrop-blur-md border border-white/5 px-3 py-1 text-xs text-white/80 rounded-lg">
                      {featuredMovie.language}
                    </span>
                    <span className="bg-white/10 backdrop-blur-md border border-white/5 px-3 py-1 text-xs text-amber-400 font-bold flex items-center gap-1 rounded-lg">
                      <Star size={12} fill="currentColor" /> {featuredMovie.rating}/5
                    </span>
                    <span className="bg-white/10 backdrop-blur-md border border-white/5 px-3 py-1 text-xs text-white/40 font-mono rounded-lg">
                      {featuredMovie.year}
                    </span>
                  </div>

                  <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-8 drop-shadow-md">
                    {featuredMovie.description.length > 250 
                      ? `${featuredMovie.description.substring(0, 250)}...` 
                      : featuredMovie.description
                    }
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button 
                      onClick={() => setPlayingMovie(featuredMovie)}
                      className="bg-white text-black px-8 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-white/10 select-none cursor-pointer hover:bg-gray-200 transition transform active:scale-95 duration-150"
                      id="hero-play-btn"
                    >
                      <Play size={18} fill="currentColor" />
                      <span>{t.watchNow}</span>
                    </button>
                    <button 
                      onClick={() => startFileDownloadProcess(featuredMovie)}
                      className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 select-none cursor-pointer hover:bg-white/20 transition transform active:scale-95 duration-150"
                      id="hero-download-btn"
                    >
                      <Download size={18} />
                      <span>{t.downloadBtn}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* WATCH HISTORY (Continue Watching) */}
            {watchHistory.length > 0 && !searchQuery && (
              <div className="space-y-4 text-left">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400">
                      <Clock size={16} />
                    </div>
                    <h3 className="text-lg font-black text-white tracking-tight">
                      {t.watchHistoryTitle}
                    </h3>
                    <span className="bg-blue-600/10 text-blue-400 text-xs px-2.5 py-0.5 rounded-full font-bold">
                      {watchHistory.length}
                    </span>
                  </div>
                  
                  <button
                    onClick={clearWatchHistory}
                    className="flex items-center gap-1.5 text-[10px] text-neutral-400 hover:text-red-400 transition-colors uppercase font-bold tracking-wider hover:bg-red-500/10 px-3 py-1.5 rounded-xl border border-white/5 cursor-pointer hover:border-red-500/20"
                  >
                    <Trash2 size={12} />
                    <span>{t.clearHistoryBtn}</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {watchHistory.map((item) => {
                    const percent = item.duration ? Math.min(Math.round((item.currentTime / item.duration) * 100), 100) : 0;
                    return (
                      <div
                        key={`history-${item.id}`}
                        className="group bg-[#16161c]/40 rounded-2xl overflow-hidden border border-white/5 hover:border-blue-500/30 transition-all duration-300 relative text-left flex flex-col justify-between"
                      >
                        {/* Poster Aspect Container */}
                        <div className="relative aspect-[3/4] bg-black/50 overflow-hidden">
                          {/* Rating badge */}
                          <div className="absolute top-2.5 left-2.5 bg-black/80 backdrop-blur-xs text-amber-400 font-bold text-[9px] px-2 py-0.5 rounded z-10 flex items-center gap-1 border border-white/5">
                            <Star size={9} fill="currentColor" /> {item.rating || 5}/5
                          </div>

                          <img
                            src={item.coverUrl}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 pointer-events-none filter brightness-90 group-hover:brightness-100"
                            referrerPolicy="no-referrer"
                          />

                          {/* Netflix-style Progress Bar at the absolute bottom of poster */}
                          {percent > 0 && (
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-10">
                              <div
                                className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                                style={{ width: `${percent}%` }}
                              />
                            </div>
                          )}

                          {/* Quick Resume Button overlay on hover or always on touch */}
                          <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-center items-center gap-2 z-10 p-3">
                            <button
                              onClick={() => {
                                setPlayingMovie(item);
                                window.scrollTo({ top: 0, behavior: "smooth" });
                              }}
                              className="w-10 h-10 bg-blue-600 hover:bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition active:scale-95 cursor-pointer"
                              title={t.watchNow}
                            >
                              <Play size={18} fill="currentColor" className="ml-0.5" />
                            </button>
                            
                            <button
                              onClick={() => setInfoMovie(item)}
                              className="text-[10px] text-white/80 hover:text-white bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-md transition font-semibold flex items-center gap-1 cursor-pointer"
                            >
                              <Info size={10} />
                              <span>{lang === "bn" ? "বিস্তারিত" : "Details"}</span>
                            </button>
                          </div>
                        </div>

                        {/* Title details */}
                        <div className="p-3 space-y-1 bg-black/20 flex-1 flex flex-col justify-between">
                          <div className="space-y-0.5 block">
                            <h4 className="text-xs font-bold text-white truncate max-w-full" title={item.title}>
                              {item.title}
                            </h4>
                            <div className="flex justify-between items-center text-[10px] text-neutral-400 select-none">
                              <span className="truncate max-w-[65%]">{item.genre}</span>
                              <span className="font-mono text-blue-400 font-bold">
                                {percent > 0 ? `${percent}%` : "0%"}
                              </span>
                            </div>
                          </div>

                          {/* Elapsed Indicator label */}
                          {percent > 0 && (
                            <div className="text-[9px] text-blue-400 font-mono font-medium tracking-tight pt-1 leading-tight">
                              {lang === "bn" 
                                ? `${formatTime(item.currentTime)} থেকে পুনরায় দেখুন` 
                                : `Resume at ${formatTime(item.currentTime)}`}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* DIRECTORY FILTERS & SEARCH MODULE */}
            <div className="bg-[#0f0f12]/80 backdrop-blur-md p-6 rounded-[2rem] border border-white/10 space-y-5 shadow-2xl">
              
              <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                
                {/* Search Bar */}
                <div className="relative w-full md:w-1/2">
                  <span className="absolute inset-y-0 left-4 flex items-center text-white/40 pointer-events-none">
                    <Search size={18} />
                  </span>
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t.searchPlaceholder}
                    className="w-full bg-white/5 text-white text-sm pl-12 pr-10 py-3.5 rounded-full border border-white/10 focus:outline-none focus:border-blue-500 placeholder-white/30 transition-all duration-300"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery("")}
                      className="absolute inset-y-0 right-4 flex items-center text-white/40 hover:text-white transition"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>

                {/* Sort Settings */}
                <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                  
                  <span className="text-xs text-white/40 flex items-center gap-1.5 shrink-0 hidden sm:inline-flex font-bold">
                    <Sliders size={14} /> Sort By:
                  </span>

                  <div className="bg-white/5 p-1 rounded-full flex items-center border border-white/10 w-full md:w-auto">
                    <button 
                      onClick={() => setSortBy("date")}
                      className={`flex-1 md:flex-none px-5 py-1.5 rounded-full text-xs font-bold transition select-none ${
                        sortBy === "date" ? "bg-blue-600 text-white shadow-md shadow-blue-600/20" : "text-white/60 hover:text-white"
                      }`}
                    >
                      {lang === "bn" ? "নতুন আপলোড" : "Newest"}
                    </button>
                    <button 
                      onClick={() => setSortBy("rating")}
                      className={`flex-1 md:flex-none px-5 py-1.5 rounded-full text-xs font-bold transition select-none ${
                        sortBy === "rating" ? "bg-blue-600 text-white shadow-md shadow-blue-600/20" : "text-white/60 hover:text-white"
                      }`}
                    >
                      {lang === "bn" ? "উচ্চ রেটিং" : "Top Rated"}
                    </button>
                  </div>

                </div>

              </div>

              {/* Advanced Filter Pills */}
              <div className="pt-3 border-t border-white/10 flex flex-col gap-3.5">
                
                {/* Genre Filter List */}
                <div className="flex items-center gap-3 overflow-x-auto pb-1 select-none">
                  <span className="text-xs font-mono text-white/40 font-bold tracking-wider shrink-0">{t.genre}:</span>
                  <button 
                    onClick={() => setSelectedGenre("All")}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all ${
                      selectedGenre === "All" 
                        ? "bg-blue-600 text-white shadow-md shadow-blue-600/20" 
                        : "bg-white/5 text-white/60 hover:text-white border border-white/5 hover:bg-white/10"
                    }`}
                  >
                    {t.all}
                  </button>
                  {["Action", "Comedy", "Thriller", "Drama", "Romance", "Sci-Fi", "Animation", "Fantasy", "Nature"].map(gen => (
                    <button
                      key={gen}
                      onClick={() => setSelectedGenre(gen)}
                      className={`px-4 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all ${
                        selectedGenre === gen 
                          ? "bg-blue-600 text-white shadow-md shadow-blue-600/20" 
                          : "bg-white/5 text-white/60 hover:text-white border border-white/5 hover:bg-white/10"
                      }`}
                    >
                      {gen}
                    </button>
                  ))}
                </div>

                {/* Language Filter Tags */}
                <div className="flex items-center gap-3 overflow-x-auto select-none">
                  <span className="text-xs font-mono text-white/40 font-bold tracking-wider shrink-0">{t.language}:</span>
                  <button 
                    onClick={() => setSelectedLanguage("All")}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all ${
                      selectedLanguage === "All" 
                        ? "bg-blue-600 text-white shadow-md shadow-blue-600/20" 
                        : "bg-white/5 text-white/60 hover:text-white border border-white/5 hover:bg-white/10"
                    }`}
                  >
                    {t.all}
                  </button>
                  {["Bengali", "English", "Hindi", "Universal"].map(langName => (
                    <button
                      key={langName}
                      onClick={() => setSelectedLanguage(langName)}
                      className={`px-4 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all ${
                        selectedLanguage === langName 
                          ? "bg-blue-600 text-white shadow-md shadow-blue-600/25 border border-transparent" 
                          : "bg-white/5 text-white/60 hover:text-white border border-white/5 hover:bg-white/10"
                      }`}
                    >
                      {langName}
                    </button>
                  ))}
                </div>

              </div>

            </div>

            {/* MOVIE COLLECTION GRID */}
            <div>
              <div className="flex items-center justify-between mb-5 select-none">
                <h3 className="text-lg font-extrabold tracking-tight text-white flex items-center gap-2 font-display">
                  <Film size={20} className="text-blue-500" />
                  <span>{lang === "bn" ? "চলচ্চিত্রের গ্যালারী" : "All Movies"} ({sortedAndFilteredMovies.length})</span>
                </h3>
                <span className="text-xs text-white/40">
                  {lang === "bn" ? "সেরা মুভি কালেকশন প্লে এবং ডাউনলোড করুন" : "Click to stream directly inside browser"}
                </span>
              </div>

              {loading ? (
                <div className="flex flex-col items-center justify-center py-24 gap-3">
                  <Loader2 className="animate-spin text-blue-500" size={36} />
                  <p className="text-sm font-semibold text-white/40 font-mono tracking-wider">Loading movie library database...</p>
                </div>
              ) : sortedAndFilteredMovies.length === 0 ? (
                <div className="bg-[#1a1a1f] border border-white/5 p-12 text-center rounded-[2rem] shadow-xl">
                  <AlertTriangle className="mx-auto text-amber-500 mb-4" size={38} />
                  <p className="text-sm text-white/70 max-w-sm mx-auto">{t.noMovies}</p>
                  <button 
                    onClick={() => setActiveTab("creator")}
                    className="mt-5 inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 px-5 py-2.5 rounded-full text-xs font-bold transition-all"
                  >
                    <Upload size={14} />
                    <span>{t.uploadTab}</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {sortedAndFilteredMovies.map((movie) => {
                    const isCurrentlyPlaying = playingMovie?.id === movie.id;
                    return (
                      <div 
                        key={movie.id}
                        id={`movie-card-${movie.id}`}
                        onClick={() => {
                          setPlayingMovie(movie);
                        }}
                        className={`group bg-[#1a1a1f] rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer shadow-lg shadow-black/40 hover:shadow-2xl hover:shadow-blue-500/5 transform hover:-translate-y-1 text-left ${
                          isCurrentlyPlaying 
                            ? "border-blue-500 ring-1 ring-blue-500/50" 
                            : "border-white/5 hover:border-white/15"
                        }`}
                      >
                        {/* Poster Image Frame */}
                        <div className="relative aspect-[3/4] bg-black/40 overflow-hidden">
                          {/* Rating badge */}
                          <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm text-amber-400 font-bold text-[10px] px-2.5 py-1 rounded-lg z-10 flex items-center gap-1 shadow-md border border-white/5">
                            <Star size={11} fill="currentColor" /> {movie.rating}/5
                          </div>

                          {/* Year label badge */}
                          <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm text-neutral-200 font-bold text-[10px] px-2.5 py-1 rounded-lg mb-1 z-10 shadow-md">
                            {movie.year || "2026"}
                          </div>

                          {/* Cover Image */}
                          <img 
                            src={movie.coverUrl} 
                            alt={movie.title} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none filter brightness-90 group-hover:brightness-100"
                            referrerPolicy="no-referrer"
                          />

                          {/* Play button hover overlay */}
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center z-10">
                            <span className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white scale-75 group-hover:scale-100 transition duration-300 shadow-xl shadow-blue-600/40">
                              <Play size={24} fill="currentColor" className="ml-1" />
                            </span>
                          </div>

                          {/* Stream indicator */}
                          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10 select-none">
                            <span className="bg-black/80 backdrop-blur-sm text-white/80 text-[9px] px-2.5 py-1 rounded-md font-bold border border-white/5">
                              {movie.language}
                            </span>
                            <span className="bg-black/80 backdrop-blur-sm text-white/80 text-[9px] px-2.5 py-1 rounded-md font-mono font-bold border border-white/5">
                              {movie.size || t.sizeUnknown}
                            </span>
                          </div>
                        </div>

                        {/* Text and interaction controls */}
                        <div className="p-4 space-y-2 text-left relative">
                          
                          <div className="flex items-start justify-between gap-1">
                            <h4 className="font-bold text-white group-hover:text-blue-400 text-sm tracking-wide truncate max-w-[85%] transition-colors">
                              {movie.title}
                            </h4>
                            
                            {/* Deletion icon for manual uploads */}
                            <button 
                              onClick={(e) => handleDeleteMovie(movie.id, e)}
                              className="text-neutral-500 hover:text-red-400 hover:bg-neutral-800 p-1 rounded-lg transition duration-150 relative z-20 opacity-0 group-hover:opacity-100 font-sans"
                              title="Delete Movie"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>

                          <div className="flex items-center justify-between text-[10px] font-mono font-bold text-blue-400/80">
                            <span>{movie.genre}</span>
                          </div>

                          <p className="text-xs text-white/50 line-clamp-2 h-8 leading-relaxed font-sans">
                            {movie.description}
                          </p>

                          <div className="pt-2.5 border-t border-white/5 flex items-center gap-2">
                            {/* Blue Play Watch Now Button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setPlayingMovie(movie);
                              }}
                              className="flex-grow bg-blue-600 hover:bg-blue-505 text-white font-bold text-xs py-2 rounded-xl transition duration-150 flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 active:scale-95 cursor-pointer"
                            >
                              <Play size={11} fill="currentColor" />
                              <span>{lang === "bn" ? "▶ দেখুন" : "▶ Watch"}</span>
                            </button>

                            {/* Info Details Trigger */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setInfoMovie(movie);
                              }}
                              className="p-2 bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white rounded-xl transition border border-white/5 hover:border-white/10 flex items-center justify-center cursor-pointer"
                              title={lang === "bn" ? "বিস্তারিত" : "Details"}
                            >
                              <Info size={14} />
                            </button>

                            {/* Favorite Heart Toggle Button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(movie.id);
                              }}
                              className={`p-2 rounded-xl transition border flex items-center justify-center cursor-pointer ${
                                isFavorite(movie.id)
                                  ? "bg-rose-500/20 text-rose-500 border-rose-500/35 hover:bg-rose-500/30"
                                  : "bg-white/5 text-neutral-400 hover:text-rose-400 border-white/5 hover:border-rose-500/25"
                              }`}
                              title={isFavorite(movie.id) ? (lang === "bn" ? "পছন্দ তালিকা থেকে সরান" : "Remove from Favorites") : (lang === "bn" ? "পছন্দ তালিকায় যোগ করুন" : "Add to Favorites")}
                            >
                              <Heart size={14} fill={isFavorite(movie.id) ? "currentColor" : "none"} />
                            </button>

                            {/* Speed Accelerator Download Button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                startFileDownloadProcess(movie);
                              }}
                              className="p-2 bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-neutral-200 rounded-xl transition border border-white/5 flex items-center justify-center cursor-pointer"
                              title={lang === "bn" ? "ডাউনলোড" : "Download"}
                            >
                              <Download size={14} />
                            </button>
                          </div>

                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

          </div>
        )}

        {/* CONDITIONAL TAB C: MY FAVORITES SECTION */}
        {activeTab === "favorites" && (
          <div className="space-y-8 animate-fade-in">
             <div className="bg-[#0f0f12]/80 backdrop-blur-md p-6 sm:p-8 rounded-[2rem] border border-white/10 space-y-3 shadow-2xl text-left">
               <div className="flex items-center gap-3 text-rose-500">
                 <Heart size={28} fill="currentColor" />
                 <h2 className="text-2xl font-black tracking-tight text-white font-display">
                   {lang === "bn" ? "আমার পছন্দের মুভি তালিকা" : "My Favorite Movies"}
                 </h2>
               </div>
               <p className="text-sm text-white/50">
                 {lang === "bn" 
                   ? "নিচের তালিকাটি আপনার ব্রাউজার মেমোরিতে (localStorage) সংরক্ষিত থাকবে। যেকোনো চলচ্চিত্রের কার্ডে থাকা হার্ট (❤️) আইকনে ক্লিক করে তালিকায় যোগ বা বিয়োগ করতে পারবেন।" 
                   : "These movies are saved locally in your browser storage. You can add or remove movies by clicking the heart (❤️) icon on any card."}
               </p>
             </div>

             {/* MOVIE COLLECTION GRID - ONLY SHOW FAVORITED MOVIES */}
             <div>
               {(() => {
                 const favoritedMovies = movies.filter(m => isFavorite(m.id));
                 if (favoritedMovies.length === 0) {
                   return (
                     <div className="bg-[#1a1a1f] border border-white/5 p-12 text-center rounded-[2rem] shadow-xl">
                       <Heart className="mx-auto text-rose-500/50 mb-4 animate-pulse relative" size={48} />
                       <h3 className="text-lg font-bold text-white mb-2">{lang === "bn" ? "পছন্দ তালিকা খালি!" : "Your Favorites folder is empty!"}</h3>
                       <p className="text-sm text-white/40 max-w-sm mx-auto">
                         {lang === "bn" 
                           ? "মুভি গ্যালারি থেকে পছন্দের যেকোনো মুভিতে থাকা হার্ট আইকনে চাপ দিয়ে এই তালিকায় যুক্ত করুন।" 
                           : "Explore the movie archive and click on the heart icon on any movie to pin it in this section."}
                       </p>
                       <button 
                         onClick={() => setActiveTab("browse")}
                         className="mt-6 inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer"
                       >
                         <Film size={14} />
                         <span>{lang === "bn" ? "মুভি ব্রাউজ করুন" : "Browse Movies"}</span>
                       </button>
                     </div>
                   );
                 }

                 return (
                   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                     {favoritedMovies.map((movie) => {
                       const isCurrentlyPlaying = playingMovie?.id === movie.id;
                       return (
                         <div 
                           key={movie.id}
                           id={`fav-movie-card-${movie.id}`}
                           onClick={() => {
                             setPlayingMovie(movie);
                           }}
                           className={`group bg-[#1a1a1f] rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer shadow-lg shadow-black/40 hover:shadow-2xl hover:shadow-blue-500/5 transform hover:-translate-y-1 text-left ${
                             isCurrentlyPlaying 
                               ? "border-blue-500 ring-1 ring-blue-500/50" 
                               : "border-white/5 hover:border-white/15"
                           }`}
                         >
                           {/* Poster Image Frame */}
                           <div className="relative aspect-[3/4] bg-black/40 overflow-hidden">
                             {/* Rating badge */}
                             <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm text-amber-400 font-bold text-[10px] px-2.5 py-1 rounded-lg z-10 flex items-center gap-1 shadow-md border border-white/5">
                               <Star size={11} fill="currentColor" /> {movie.rating}/5
                             </div>

                             {/* Year label badge */}
                             <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm text-neutral-200 font-bold text-[10px] px-2.5 py-1 rounded-lg mb-1 z-10 shadow-md">
                               {movie.year || "2026"}
                             </div>

                             {/* Cover Image */}
                             <img 
                               src={movie.coverUrl} 
                               alt={movie.title} 
                               className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none filter brightness-90 group-hover:brightness-100"
                               referrerPolicy="no-referrer"
                             />

                             {/* Play button hover overlay */}
                             <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center z-10">
                               <span className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white scale-75 group-hover:scale-100 transition duration-300 shadow-xl shadow-blue-600/40">
                                 <Play size={24} fill="currentColor" className="ml-1" />
                               </span>
                             </div>

                             {/* Stream indicator */}
                             <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10 select-none">
                               <span className="bg-black/80 backdrop-blur-sm text-white/80 text-[9px] px-2.5 py-1 rounded-md font-bold border border-white/5">
                                 {movie.language}
                               </span>
                               <span className="bg-black/80 backdrop-blur-sm text-white/80 text-[9px] px-2.5 py-1 rounded-md font-mono font-bold border border-white/5">
                                 {movie.size || t.sizeUnknown}
                               </span>
                             </div>
                           </div>

                           {/* Text and interaction controls */}
                           <div className="p-4 space-y-2 text-left relative">
                             
                             <div className="flex items-start justify-between gap-1">
                               <h4 className="font-bold text-white group-hover:text-blue-400 text-sm tracking-wide truncate max-w-[85%] transition-colors">
                                 {movie.title}
                               </h4>
                               
                               {/* Deletion icon for manual uploads */}
                               <button 
                                 onClick={(e) => handleDeleteMovie(movie.id, e)}
                                 className="text-neutral-500 hover:text-red-400 hover:bg-neutral-800 p-1 rounded-lg transition duration-150 relative z-20 opacity-0 group-hover:opacity-100 font-sans"
                                 title="Delete Movie"
                               >
                                 <Trash2 size={13} />
                               </button>
                             </div>

                             <div className="flex items-center justify-between text-[10px] font-mono font-bold text-blue-400/80">
                               <span>{movie.genre}</span>
                             </div>

                             <p className="text-xs text-white/50 line-clamp-2 h-8 leading-relaxed font-sans">
                               {movie.description}
                             </p>

                             <div className="pt-2.5 border-t border-white/5 flex items-center gap-2">
                               {/* Blue Play Watch Now Button */}
                               <button
                                 onClick={(e) => {
                                   e.stopPropagation();
                                   setPlayingMovie(movie);
                                 }}
                                 className="flex-grow bg-blue-600 hover:bg-blue-505 text-white font-bold text-xs py-2 rounded-xl transition duration-150 flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 active:scale-95 cursor-pointer"
                               >
                                 <Play size={11} fill="currentColor" />
                                 <span>{lang === "bn" ? "▶ দেখুন" : "▶ Watch"}</span>
                               </button>

                               {/* Info Details Trigger */}
                               <button
                                 onClick={(e) => {
                                   e.stopPropagation();
                                   setInfoMovie(movie);
                                 }}
                                 className="p-2 bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white rounded-xl transition border border-white/5 hover:border-white/10 flex items-center justify-center cursor-pointer"
                                 title={lang === "bn" ? "বিস্তারিত" : "Details"}
                               >
                                 <Info size={14} />
                               </button>

                               {/* Favorite Toggle Button */}
                               <button
                                 onClick={(e) => {
                                   e.stopPropagation();
                                   toggleFavorite(movie.id);
                                 }}
                                 className={`p-2 rounded-xl transition border flex items-center justify-center cursor-pointer ${
                                   isFavorite(movie.id)
                                     ? "bg-rose-500/20 text-rose-500 border-rose-500/35 hover:bg-rose-500/30"
                                     : "bg-white/5 text-neutral-400 hover:text-rose-400 border-white/5 hover:border-rose-550/25"
                                 }`}
                                 title={isFavorite(movie.id) ? (lang === "bn" ? "পছন্দ তালিকা থেকে সরান" : "Remove from Favorites") : (lang === "bn" ? "পছন্দ তালিকায় যোগ করুন" : "Add to Favorites")}
                               >
                                 <Heart size={14} fill={isFavorite(movie.id) ? "currentColor" : "none"} />
                               </button>

                               {/* Speed Accelerator Download Button */}
                               <button
                                 onClick={(e) => {
                                   e.stopPropagation();
                                   startFileDownloadProcess(movie);
                                 }}
                                 className="p-2 bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-neutral-200 rounded-xl transition border border-white/5 flex items-center justify-center cursor-pointer"
                                 title={lang === "bn" ? "ডাউনলোড" : "Download"}
                               >
                                 <Download size={14} />
                               </button>
                             </div>

                           </div>
                         </div>
                       );
                     })}
                   </div>
                 );
               })()}
             </div>
          </div>
        )}

        {/* CONDITIONAL TAB B: CREATOR CONSOLE & UPLOAD STUDIO */}
        {activeTab === "creator" && (
          <div className="max-w-3xl mx-auto animate-fade-in space-y-6 text-left">
            
            <div className="bg-gradient-to-tr from-[#0f0f12] to-[#1a1a1f] p-6 rounded-[2rem] border border-white/5 shadow-2xl">
              <h2 className="text-2xl font-extrabold text-white flex items-center gap-2 mb-2 font-display">
                <Upload className="text-blue-500" size={24} />
                <span>{t.uploadTitle}</span>
              </h2>
              <p className="text-white/60 text-sm leading-relaxed">
                {t.creatorConsole}
              </p>
            </div>

            {/* MAIN UPLOAD CHASSIS */}
            <form onSubmit={handleUploadedFilesAndSubmit} className="bg-[#0f0f12] rounded-[2rem] p-6 sm:p-8 border border-white/5 space-y-6 shadow-2xl">
              
              {/* Form Input for Title */}
              <div className="flex flex-col space-y-2">
                <label className="text-xs font-mono font-bold tracking-wider text-white/40 uppercase">
                  {t.movieT} <span className="text-blue-500">*</span>
                </label>
                
                <div className="flex gap-3 items-end">
                  <div className="relative flex-1">
                    <input 
                      type="text" 
                      required
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      placeholder={t.movieTPlaceholder}
                      className="w-full bg-white/5 text-white text-sm px-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:border-blue-500 transition-all placeholder-white/20"
                    />
                  </div>
                  
                  {/* MAGICAL GEMINI ACTION BUTTON COUPLING */}
                  <button
                    type="button"
                    onClick={generateMetadataWithAI}
                    disabled={aiLoading}
                    className="bg-gradient-to-tr from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-705 text-white font-black text-xs px-5 py-3 rounded-xl select-none flex items-center gap-1.5 disabled:opacity-50 cursor-pointer transform hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-blue-500/10"
                  >
                    {aiLoading ? (
                      <RefreshCw size={14} className="animate-spin text-white" />
                    ) : (
                      <Sparkles size={14} className="text-amber-300 animate-pulse" />
                    )}
                    <span>{aiLoading ? t.aiGenerating : t.aiGenerate}</span>
                  </button>
                </div>
              </div>

              {/* Form Input for Description */}
              <div className="flex flex-col space-y-2">
                <label className="text-xs font-mono font-bold tracking-wider text-white/40 uppercase">
                  {t.desc}
                </label>
                <textarea 
                  rows={3}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder={t.descPlaceholder}
                  className="w-full bg-white/5 text-white text-sm p-4 rounded-xl border border-white/10 focus:outline-none focus:border-blue-500 transition-all placeholder-white/20"
                />
              </div>

              {/* Row: Cast List, Director, & Genre */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                
                <div className="flex flex-col space-y-2">
                  <label className="text-xs font-mono font-bold tracking-wider text-white/40 uppercase">
                    {t.cast}
                  </label>
                  <input 
                    type="text" 
                    value={formCast}
                    onChange={(e) => setFormCast(e.target.value)}
                    placeholder={t.castPlaceholder}
                    className="bg-white/5 text-white text-sm px-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:border-blue-500 transition-all placeholder-white/20"
                  />
                </div>

                <div className="flex flex-col space-y-2">
                  <label className="text-xs font-mono font-bold tracking-wider text-white/40 uppercase">
                    {t.directorLabel}
                  </label>
                  <input 
                    type="text" 
                    value={formDirector}
                    onChange={(e) => setFormDirector(e.target.value)}
                    placeholder={t.directorPlaceholder}
                    className="bg-white/5 text-white text-sm px-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:border-blue-500 transition-all placeholder-white/20"
                  />
                </div>

                <div className="flex flex-col space-y-2">
                  <label className="text-xs font-mono font-bold tracking-wider text-white/40 uppercase">
                    {t.genreLabel} <span className="text-blue-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    required
                    value={formGenre}
                    onChange={(e) => setFormGenre(e.target.value)}
                    placeholder="e.g., Action, Romance, Drama"
                    className="bg-white/5 text-white text-sm px-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:border-blue-500 transition-all placeholder-white/20"
                  />
                </div>

              </div>

              {/* Row: Year, Rating score, and Language */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                
                <div className="flex flex-col space-y-2">
                  <label className="text-xs font-mono font-bold tracking-wider text-white/40 uppercase">
                    {t.year}
                  </label>
                  <input 
                    type="text" 
                    value={formYear}
                    onChange={(e) => setFormYear(e.target.value)}
                    placeholder="e.g., 2024"
                    className="bg-white/5 text-white text-sm px-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:border-blue-500 transition-all placeholder-white/20"
                  />
                </div>

                <div className="flex flex-col space-y-2">
                  <label className="text-xs font-mono font-bold tracking-wider text-white/40 uppercase">
                    {t.languageLabel}
                  </label>
                  <select 
                    value={formLanguage}
                    onChange={(e) => setFormLanguage(e.target.value)}
                    className="bg-white/5 text-white text-sm px-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:border-blue-500 transition-all cursor-pointer"
                  >
                    <option value="Bengali" className="bg-[#0f0f12]">Bengali</option>
                    <option value="English" className="bg-[#0f0f12]">English</option>
                    <option value="Hindi" className="bg-[#0f0f12]">Hindi</option>
                    <option value="Universal" className="bg-[#0f0f12]">Universal</option>
                  </select>
                </div>

                <div className="flex flex-col space-y-2">
                  <label className="text-xs font-mono font-bold tracking-wider text-white/40 uppercase">
                    {t.ratingLabel}
                  </label>
                  <select 
                    value={formRating}
                    onChange={(e) => setFormRating(Number(e.target.value))}
                    className="bg-white/5 text-white text-sm px-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:border-blue-500 transition-all cursor-pointer"
                  >
                    <option value="5" className="bg-[#0f0f12]">⭐⭐⭐⭐⭐ (5/5)</option>
                    <option value="4" className="bg-[#0f0f12]">⭐⭐⭐⭐ (4/5)</option>
                    <option value="3" className="bg-[#0f0f12]">⭐⭐⭐ (3/5)</option>
                  </select>
                </div>

              </div>

              {/* Upload configuration methodology switcher */}
              <div className="pt-5 border-t border-white/10">
                <div className="bg-black/30 p-1.5 rounded-2xl flex items-center border border-white/10 mb-5 select-none">
                  <button 
                    type="button"
                    onClick={() => setCreationMethod("link")}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                      creationMethod === "link" ? "bg-blue-600 font-extrabold text-white shadow-lg shadow-blue-600/25" : "text-white/60 hover:text-white"
                    }`}
                  >
                    <Sliders size={14} />
                    <span>{t.uploadUrlTitle}</span>
                  </button>
                  <button 
                    type="button"
                    onClick={() => setCreationMethod("upload")}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                      creationMethod === "upload" ? "bg-blue-600 font-extrabold text-white shadow-lg shadow-blue-600/25" : "text-white/60 hover:text-white"
                    }`}
                  >
                    <Upload size={14} />
                    <span>{t.uploadDirectTitle}</span>
                  </button>
                </div>

                {/* METHOD A DETAIL: FORM VIDEO & COVER MANIFEST LINK REFERENCES */}
                {creationMethod === "link" && (
                  <div className="space-y-4 animate-fade-in bg-white/5 p-5 rounded-2xl border border-white/5 text-left">
                    
                    <div className="flex flex-col space-y-1.5">
                      <label className="text-xs font-mono font-bold text-blue-400">
                        {t.streamUrl} <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="url" 
                        required={creationMethod === "link"}
                        value={formVideoUrl}
                        onChange={(e) => setFormVideoUrl(e.target.value)}
                        placeholder={t.streamUrlPlaceholder}
                        className="bg-white/5 text-white text-xs px-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:border-blue-500 transition font-mono placeholder-white/20"
                      />
                    </div>

                    <div className="flex flex-col space-y-1.5">
                      <label className="text-xs font-mono font-bold text-white/65">
                        {t.coverUrl}
                      </label>
                      <input 
                        type="url" 
                        value={formCoverUrl}
                        onChange={(e) => setFormCoverUrl(e.target.value)}
                        placeholder={t.coverUrlPlaceholder}
                        className="bg-white/5 text-white text-xs px-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:border-blue-500 transition font-mono placeholder-white/20"
                      />
                    </div>

                    <div className="flex flex-col space-y-1.5">
                      <label className="text-xs font-mono font-bold text-white/65">
                        {t.downloadUrl}
                      </label>
                      <input 
                        type="url" 
                        value={formDownloadUrl}
                        onChange={(e) => setFormDownloadUrl(e.target.value)}
                        placeholder={t.downloadUrlPlaceholder}
                        className="bg-white/5 text-white text-xs px-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:border-blue-500 transition font-mono placeholder-white/20"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col space-y-1.5">
                        <label className="text-xs font-mono font-bold text-white/60">
                          {lang === "bn" ? "মুভির সাইজ" : "Movie File Size"}
                        </label>
                        <input 
                          type="text" 
                          value={formSize}
                          onChange={(e) => setFormSize(e.target.value)}
                          placeholder="e.g. 45 MB, 1.2 GB"
                          className="bg-white/5 text-white text-sm px-4 py-3 rounded-xl border border-white/10 focus:outline-none placeholder-white/20"
                        />
                      </div>
                    </div>

                  </div>
                )}

                {/* METHOD B DETAIL: BINARY FILE UPLOADER CONTROL */}
                {creationMethod === "upload" && (
                  <div className="space-y-4 animate-fade-in bg-white/5 p-5 rounded-2xl border border-white/5 text-left">
                    
                    <div className="flex flex-col space-y-2">
                      <label className="text-xs font-mono font-bold text-blue-400">
                        {t.chooseVideo} <span className="text-red-500">*</span>
                      </label>
                      <div className="bg-black/30 border border-dashed border-white/10 hover:border-blue-500 hover:bg-white/5 p-6 rounded-2xl transition duration-150 flex flex-col items-center justify-center gap-1 cursor-pointer">
                        <Film className="text-white/40" size={28} />
                        <span className="text-xs text-white/50">{lang === "bn" ? "আপনার কম্পিউটার থেকে চলচ্চিত্রটি টানুন বা সিলেক্ট করুন" : "Browse or Drag MP4 Movie file"}</span>
                        <input 
                          type="file" 
                          ref={fileVideoRef}
                          required={creationMethod === "upload"}
                          accept="video/mp4, video/webm, video/*"
                          className="mt-2 text-xs text-white/40 file:bg-white/10 file:text-white file:border-0 file:py-1 file:px-3 file:rounded-lg cursor-pointer file:font-semibold hover:file:bg-white/20"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2">
                      <label className="text-xs font-mono font-bold text-white/60">
                        {t.chooseCover}
                      </label>
                      <div className="bg-black/30 border border-dashed border-white/10 hover:border-blue-500 hover:bg-white/5 p-6 rounded-2xl transition duration-150 flex flex-col items-center justify-center gap-1 cursor-pointer">
                        <Tv className="text-white/40" size={28} />
                        <span className="text-xs text-white/50">{lang === "bn" ? "পোস্টার ফটো নির্বাচন করুন (জেপেগ, পিএনজি কাভার)" : "Choose cover poster artwork jpeg/png"}</span>
                        <input 
                          type="file" 
                          ref={fileCoverRef}
                          accept="image/*"
                          className="mt-2 text-xs text-white/40 file:bg-white/10 file:text-white file:border-0 file:py-1 file:px-3 file:rounded-lg cursor-pointer file:font-semibold hover:file:bg-white/20"
                        />
                      </div>
                    </div>

                    <div className="bg-blue-500/5 p-4 rounded-xl border border-blue-500/10 text-xs text-blue-300 flex items-start gap-2.5">
                      <AlertTriangle className="text-blue-500 shrink-0 mt-0.5" size={14} />
                      <p>{t.downloadLimit}</p>
                    </div>

                  </div>
                )}

              </div>

              {/* Progress bars if upload triggered */}
              {uploading && (
                <div id="prog-bar" className="bg-black/30 p-5 rounded-2xl border border-white/10 space-y-2.5 animate-pulse">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-blue-400 font-bold flex items-center gap-1.5">
                      <Loader2 size={12} className="animate-spin text-blue-500" />
                      {lang === "bn" ? "সার্ভারে ফাইল ট্রান্সফার হচ্ছে..." : "Pushing video stream arrays block to server..."}
                    </span>
                    <span className="font-extrabold text-white">{uploadProgress}%</span>
                  </div>
                  <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden border border-white/10">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 transition-all duration-300 rounded-full"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-white/40 text-left">
                    {lang === "bn" 
                      ? "পদ্ধতি সম্পন্ন করতে ব্রাউজার উইন্ডো বা ট্যাব বন্ধ করবেন না। ফাইল আপলোডটি সরাসরি Express-Multer ব্যাকএন্ডে হোস্ট হচ্ছে।" 
                      : "Do not close the page. The backend stream is compiling files permanently into user metadata spaces."
                    }
                  </p>
                </div>
              )}

              {/* Submission button */}
              <button
                type="submit"
                disabled={uploading}
                className="w-full py-4 text-white font-black uppercase tracking-wider rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-xl shadow-blue-500/10 flex items-center justify-center gap-2 cursor-pointer transition transform active:scale-[0.98] disabled:opacity-50"
                id="submit-form-trigger"
              >
                {uploading ? (
                  <Loader2 size={18} className="animate-spin text-white" />
                ) : (
                  <Upload size={18} />
                )}
                <span>{uploading ? "Transferring Stream Files..." : t.submitMovie}</span>
              </button>

            </form>

          </div>
        )}

      </main>

      {/* FOOTER AREA */}
      <footer className="border-t border-white/5 mt-20 bg-[#0f0f12] py-12 relative z-10 font-mono text-center">
        <div className="max-w-7xl mx-auto px-6 space-y-6">
          
          {/* Owner Profile Section (ক্রিয়েটর প্রোফাইল) */}
          <div className="max-w-xl mx-auto bg-[#14141a]/95 p-6 rounded-[2rem] border border-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.15)] flex flex-col sm:flex-row items-center gap-6 text-left transition-all duration-300 hover:border-blue-500/40 hover:shadow-[0_0_35px_rgba(59,130,246,0.2)]">
            
            {/* Profile Picture circular visual */}
            <div className="relative shrink-0 select-none">
              <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping" />
              <img 
                src="https://i.ibb.co.com/ZR1HQygr/Picsart-26-05-24-23-11-31-519.jpg" 
                alt="Owner animzayan468" 
                className="w-20 h-20 rounded-full object-cover border-2 border-blue-500/40 shadow-[0_0_15px_rgba(59,130,246,0.3)] relative z-10"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Profile Content Details */}
            <div className="space-y-4 flex-1 w-full text-center sm:text-left">
              <div>
                <h4 className="text-xl sm:text-2xl font-black text-white font-sans tracking-wide">
                  𝐀𝐍𝐈𝐌 𝐙𝐀𝐘𝐀𝐍
                </h4>
                <p className="text-xs text-blue-400 font-extrabold flex items-center justify-center sm:justify-start gap-1 mt-1 tracking-wide font-sans">
                  🎬 MOVIE BOX Creator
                </p>
              </div>

              {/* Action Redirection Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full">
                {/* Facebook Button (Blue) */}
                <a 
                  href="https://www.facebook.com/share/1HWjmc2F8R/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-[#1877F2] hover:bg-[#166ee6] text-white py-2 px-3 rounded-xl font-bold font-sans text-xs flex items-center justify-center gap-1.5 transition duration-150 active:scale-95 shadow-md shadow-blue-500/10 cursor-pointer"
                >
                  <Facebook size={12} className="shrink-0" />
                  <span>ফেসবুক</span>
                </a>

                {/* Telegram Personal Button (Blue) */}
                <a 
                  href="https://t.me/animzayan1990" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-[#24A1DE] hover:bg-[#1e8dbf] text-white py-2 px-3 rounded-xl font-bold font-sans text-xs flex items-center justify-center gap-1.5 transition duration-150 active:scale-95 shadow-md shadow-cyan-500/10 cursor-pointer"
                >
                  <Send size={12} className="shrink-0" />
                  <span>টেলিগ্রাম</span>
                </a>

                {/* Telegram Channel Button (Red) */}
                <a 
                  href="https://t.me/moviebox1990" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-red-600 hover:bg-red-500 text-white py-2 px-3 rounded-xl font-bold font-sans text-xs flex items-center justify-center gap-1.5 transition duration-150 active:scale-95 shadow-md shadow-red-500/10 cursor-pointer"
                >
                  <Send size={12} className="shrink-0" />
                  <span>চ্যানেল</span>
                </a>
              </div>
            </div>

          </div>

          <div className="flex justify-center items-center gap-2 text-blue-500 font-extrabold text-xs tracking-wider pt-4 border-t border-white/5">
            <Tv size={14} />
            <span>CINEMATIC MOVIE PORTAL & STREAM ENGINE</span>
          </div>
          <p className="text-[10px] text-white/40 max-w-md mx-auto leading-relaxed">
            {lang === "bn" 
              ? "এই অ্যাপ্লিকেশনটিতে জেসিনি এআই দিয়ে স্বয়ংক্রিয় বর্ণনা তৈরি করা যায় ও চলচ্চিত্রগুলি সরাসরি এক্সপ্রেস ব্যাকএন্ডের মাধ্যমে স্ট্রিম ও ডাউনলোড সুবিধা প্রদান করো।"
              : "Bilingual platform crafted with automated metadata injection, secure Multer binary pipelines, and robust local file system databases."
            }
          </p>
          <div className="text-[9px] text-white/20 tracking-wider">
            Current Server State: <span className="text-emerald-400 font-bold">ONLINE</span> | Local persistence database activated in <span className="text-white/40 font-mono">uploads/movies.json</span>
          </div>
        </div>
      </footer>

      {/* HIGH FIDELITY DOWNLOAD ACCELERATOR MODAL COMPONENT */}
      {acceleratorActive && acceleratorMovie && (
        <div className="fixed inset-0 bg-[#0a0a0c]/90 flex items-center justify-center z-50 p-4 backdrop-blur-md animate-fade-in">
          <div className="bg-[#0f0f12] rounded-[2rem] border border-white/10 p-6 sm:p-8 max-w-md w-full text-center space-y-6 shadow-2xl relative">
            
            {/* Modal close */}
            <button 
              onClick={() => {
                if (acceleratorPhase === "finished" || window.confirm("Cancel download boost?")) {
                  setAcceleratorActive(false);
                }
              }}
              className="absolute top-5 right-5 text-white/40 hover:text-white transition p-1.5 hover:bg-white/5 rounded-full"
            >
              <X size={18} />
            </button>

            {/* Glowing icon */}
            <div className="w-16 h-16 rounded-full bg-blue-500/10 mx-auto flex items-center justify-center text-blue-400 relative">
              <span className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping" />
              <Download size={32} className="animate-bounce" />
            </div>

            <div>
              <h3 className="text-lg font-black text-white font-display tracking-wide">{t.accTitle}</h3>
              <p className="text-xs text-blue-400 font-bold truncate max-w-sm mt-1">{acceleratorMovie.title}</p>
            </div>

            {/* Accelerator Engine progression status */}
            <div className="bg-black/30 p-5 rounded-2xl border border-white/5 text-left space-y-3.5">
              
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/60 font-mono">
                  {acceleratorPhase === "connecting" && (
                    <span className="text-amber-400 font-bold animate-pulse">{t.accConnecting}</span>
                  )}
                  {acceleratorPhase === "downloading" && (
                    <span className="text-blue-400 font-bold">{t.accDownloading}</span>
                  )}
                  {acceleratorPhase === "finished" && (
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle size={12} fill="currentColor" className="text-emerald-500" />
                      {t.accSuccess}
                    </span>
                  )}
                </span>
                <span className="font-mono font-black text-white text-sm">{acceleratorProgress}%</span>
              </div>

              {/* Progress bar stream layout */}
              <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden border border-white/10">
                <div 
                  className={`h-full transition-all duration-300 rounded-full ${
                    acceleratorPhase === "finished" 
                      ? "bg-emerald-500" 
                      : "bg-gradient-to-r from-blue-600 via-purple-500 to-blue-500 text-white"
                  }`}
                  style={{ width: `${acceleratorProgress}%` }}
                />
              </div>

              {/* Speed / ETA Details */}
              <div className="grid grid-cols-2 gap-2 pt-3.5 text-[11px] font-mono border-t border-white/5">
                <div>
                  <span className="text-white/40">{t.accSpeed}:</span>
                  <p className="text-white font-bold mt-0.5">{acceleratorSpeed}</p>
                </div>
                <div>
                  <span className="text-white/40">{t.accRemaining}:</span>
                  <p className="text-white font-bold mt-0.5">
                    {acceleratorPhase === "finished" ? "Done" : acceleratorTimeRem}
                  </p>
                </div>
              </div>

            </div>

            {/* Direct download fallbacks */}
            {acceleratorPhase === "finished" ? (
              <div className="space-y-3">
                <div className="py-2.5 bg-emerald-950/20 text-emerald-400 rounded-xl border border-emerald-900/40 text-xs font-semibold">
                  🚀 Download initiated automatically!
                </div>
                <button 
                  onClick={() => setAcceleratorActive(false)}
                  className="w-full bg-white/5 hover:bg-white/10 py-3 rounded-xl text-xs font-bold text-white transition"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <div className="flex justify-between items-center text-[10px] text-white/30 font-mono">
                <span>Direct URL: {acceleratorMovie.downloadUrl.substring(0, 24)}...</span>
                <span>Thread pool: 32 links</span>
              </div>
            )}

          </div>
        </div>
      )}

      {/* MOVIE DETAILS INFO BOX MODAL COMPONENT */}
      {infoMovie && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in text-left">
          <div className="bg-[#0f0f12] rounded-[1.5rem] border border-white/10 max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            
            {/* Control buttons in header of details box */}
            <div className="absolute top-5 right-5 flex items-center gap-2">
              {/* Share button next to close button */}
              <button
                onClick={async () => {
                  const shareUrl = `${window.location.origin}${window.location.pathname}?movie=${infoMovie.id}`;
                  const shareData = {
                    title: infoMovie.title,
                    text: infoMovie.description || "",
                    url: shareUrl,
                  };
                  if (navigator.share) {
                    try {
                      await navigator.share(shareData);
                      showAlert(
                        lang === "bn" ? "সফলভাবে শেয়ার করা হয়েছে!" : "Shared successfully!",
                        "success"
                      );
                      return;
                    } catch (err) {
                      console.log("Web Share API error or dismissed, falling back:", err);
                    }
                  }
                  try {
                    await navigator.clipboard.writeText(shareUrl);
                    showAlert(
                      lang === "bn"
                        ? "মুভির লিংক ক্লিপবোর্ডে কপি করা হয়েছে!"
                        : "Movie link copied to clipboard!",
                      "success"
                    );
                  } catch (e) {
                    console.error("Failed to copy watch link:", e);
                    showAlert("Failed to copy link", "error");
                  }
                }}
                className="text-neutral-400 hover:text-blue-400 transition duration-150 bg-white/5 hover:bg-blue-500/10 p-2 rounded-full cursor-pointer flex items-center justify-center"
                id="info-modal-header-share"
                title={lang === "bn" ? "শেয়ার করুন" : "Share"}
              >
                <Share size={16} />
              </button>

              {/* Close button icon */}
              <button 
                onClick={() => setInfoMovie(null)}
                className="text-neutral-400 hover:text-white transition duration-150 bg-white/5 hover:bg-white/10 p-2 rounded-full cursor-pointer flex items-center justify-center"
                id="info-modal-close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Main card grid splits into Poster Left and Meta Right on Desktop */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 sm:gap-8 items-start">
              
              {/* Left column: Poster frame */}
              <div className="md:col-span-2 aspect-[3/4] bg-black/40 rounded-2xl overflow-hidden border border-white/5 relative shadow-lg">
                <img 
                  src={infoMovie.coverUrl} 
                  alt={infoMovie.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                {/* Badge overlays */}
                <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-xs text-amber-400 text-xs px-2.5 py-1 rounded-lg border border-white/5 font-extrabold flex items-center gap-1">
                  <Star size={12} fill="currentColor" /> {infoMovie.rating}/5
                </div>
              </div>

              {/* Right column: Movie metadatas */}
              <div className="md:col-span-3 space-y-4">
                
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#2563eb] font-extrabold uppercase bg-blue-500/10 px-2.5 py-1 rounded-full">
                    {lang === "bn" ? "চলচ্চিত্রের বিবরণ" : "Movie Details"}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-2 font-display">
                    {infoMovie.title}
                  </h3>
                </div>

                {/* Bullet tags year, language, genre, size */}
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="bg-white/5 border border-white/5 px-2.5 py-1 rounded-lg text-xs text-blue-400 font-bold">
                    {infoMovie.genre}
                  </span>
                  <span className="bg-white/5 border border-white/5 px-2.5 py-1 rounded-lg text-xs text-white/80 font-semibold flex items-center gap-1">
                    <Globe size={11} className="text-white/40" /> {infoMovie.language}
                  </span>
                  <span className="bg-white/5 border border-white/5 px-2.5 py-1 rounded-lg text-xs text-neutral-300 font-bold">
                    {infoMovie.year}
                  </span>
                  <span className="bg-white/5 border border-white/5 px-2.5 py-1 rounded-lg text-xs text-white/40 font-mono">
                    {infoMovie.size || "35 MB"}
                  </span>
                </div>

                <p className="text-sm text-neutral-300 leading-relaxed bg-[#16161c]/50 p-4 rounded-xl border border-white/5 font-sans whitespace-pre-wrap">
                  {infoMovie.description || (lang === "bn" ? "কোন কাহিনী সংক্ষেপ উপলব্ধ নেই।" : "No summary available.")}
                </p>

                {/* Cast & Director grids */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-2">
                  {/* Director Block */}
                  <div className="bg-black/40 p-3 rounded-xl border border-white/5 space-y-1">
                    <span className="text-[9px] uppercase tracking-wider font-extrabold text-blue-400/80 font-mono">
                      {t.directorLabel}
                    </span>
                    <p className="text-xs text-white font-bold truncate">
                      {infoMovie.director || "N/A"}
                    </p>
                  </div>

                  {/* Cast Block */}
                  <div className="bg-black/40 p-3 rounded-xl border border-white/5 space-y-1">
                    <span className="text-[9px] uppercase tracking-wider font-extrabold text-purple-400/80 font-mono">
                      {t.cast}
                    </span>
                    <p className="text-xs text-white font-bold truncate" title={infoMovie.cast}>
                      {infoMovie.cast || "N/A"}
                    </p>
                  </div>
                </div>

                {/* Interactive Star Rating element */}
                <div className="pt-2 border-t border-white/5">
                  {renderRatingStars(infoMovie.id, infoMovie.rating || 5)}
                </div>

              </div>

            </div>

            {/* Action Footer Buttons */}
            <div className="pt-5 border-t border-white/10 flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => {
                  setPlayingMovie(infoMovie); // Trigger custom video player
                  setInfoMovie(null); // Close details popup
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-3.5 px-6 rounded-xl font-bold tracking-wide flex items-center justify-center gap-2 cursor-pointer transition transform active:scale-95 shadow-lg shadow-blue-600/25 animate-pulse"
                id="info-watch-now"
              >
                <Play size={18} fill="currentColor" />
                <span>{lang === "bn" ? "এখনই দেখুন (Watch Now)" : "Watch Now"}</span>
              </button>
              
              <button 
                onClick={() => {
                  setInfoMovie(null); // Close details popup
                  startFileDownloadProcess(infoMovie); // Direct accelerator trigger
                }}
                className="bg-white/5 hover:bg-white/10 text-white py-3.5 px-6 rounded-xl font-semibold border border-white/15 flex items-center justify-center gap-2 cursor-pointer transition transform active:scale-95"
                id="info-download"
              >
                <Download size={18} />
                <span>{lang === "bn" ? "ডাউনলোড করুন" : "Direct Download"}</span>
              </button>

              <button 
                onClick={() => handleShareMovie(infoMovie)}
                className="bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 py-3.5 px-6 rounded-xl font-semibold border border-blue-500/20 flex items-center justify-center gap-2 cursor-pointer transition transform active:scale-95 hover:border-blue-500/40 shadow-sm shadow-blue-500/5 hover:shadow-blue-500/10"
                id="info-share"
              >
                {copied ? <CheckCircle size={18} className="text-green-400" /> : <Share size={18} />}
                <span>{copied ? (lang === "bn" ? "কপি হয়েছে!" : "Copied!") : (lang === "bn" ? "শেয়ার করুন" : "Share")}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- LOGIN MODAL --- */}
      {authModal === "login" && (
        <div className="fixed inset-0 bg-[#0a0a0c]/95 flex items-center justify-center z-50 p-4 backdrop-blur-md animate-fade-in select-none">
          <div className="bg-[#0f0f12] rounded-[2rem] border border-white/10 p-6 sm:p-8 max-w-sm w-full relative space-y-6 shadow-2xl">
            
            {/* Modal close */}
            <button 
              onClick={() => { setAuthModal(null); setAuthError(""); }}
              className="absolute top-5 right-5 text-white/40 hover:text-white transition p-1.5 hover:bg-white/5 rounded-full cursor-pointer"
            >
              <X size={18} />
            </button>

            {/* Glowing Icon */}
            <div className="w-16 h-16 rounded-full bg-blue-500/10 mx-auto flex items-center justify-center text-blue-400 relative">
              <span className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping" />
              <span className="text-2xl">🔑</span>
            </div>

            <div className="text-center">
              <h2 className="text-xl font-bold font-display text-white">Login</h2>
              <p className="text-xs text-white/40 tracking-wider font-mono mt-1 uppercase">CINEMATIC MOVIE PORTAL</p>
            </div>

            {authError && (
              <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs p-3 rounded-xl text-center">
                ⚠️ {authError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4 text-left">
              <div className="space-y-1">
                <label className="text-xs font-bold text-white/60 uppercase tracking-wider block">Email Address</label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="Enter your email..."
                  className="w-full bg-white/5 text-white text-sm px-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:border-blue-500 transition-all placeholder-white/20"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-white/60 uppercase tracking-wider block">Password</label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter your password..."
                  className="w-full bg-white/5 text-white text-sm px-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:border-blue-500 transition-all placeholder-white/20"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-xl transition transform active:scale-95 shadow-lg shadow-blue-600/25 cursor-pointer flex items-center justify-center gap-2"
              >
                Login
              </button>
            </form>

            <div className="border-t border-white/5 pt-4 text-center">
              <button 
                onClick={() => { setAuthModal("signup"); setAuthError(""); }}
                className="text-xs text-blue-400 hover:text-blue-300 font-bold transition cursor-pointer"
              >
                Don't have an account? Sign Up
              </button>
            </div>

          </div>
        </div>
      )}

      {/* --- SIGN UP MODAL --- */}
      {authModal === "signup" && (
        <div className="fixed inset-0 bg-[#0a0a0c]/95 flex items-center justify-center z-50 p-4 backdrop-blur-md animate-fade-in select-none">
          <div className="bg-[#0f0f12] rounded-[2rem] border border-white/10 p-6 sm:p-8 max-w-sm w-full relative space-y-5 shadow-2xl">
            
            {/* Modal close */}
            <button 
              onClick={() => { setAuthModal(null); setAuthError(""); }}
              className="absolute top-5 right-5 text-white/40 hover:text-white transition p-1.5 hover:bg-white/5 rounded-full cursor-pointer"
            >
              <X size={18} />
            </button>

            {/* Glowing Icon */}
            <div className="w-16 h-16 rounded-full bg-blue-500/10 mx-auto flex items-center justify-center text-blue-400 relative">
              <span className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping" />
              <span className="text-2xl">📝</span>
            </div>

            <div className="text-center">
              <h2 className="text-xl font-bold font-display text-white">Create Account</h2>
              <p className="text-xs text-white/40 tracking-wider font-mono mt-1 uppercase">CINEMATIC MOVIE PORTAL</p>
            </div>

            {authError && (
              <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs p-3 rounded-xl text-center">
                ⚠️ {authError}
              </div>
            )}

            <form onSubmit={handleSignUp} className="space-y-4 text-left">
              <div className="space-y-1">
                <label className="text-xs font-bold text-white/60 uppercase tracking-wider block">Full Name</label>
                <input
                  type="text"
                  value={signUpName}
                  onChange={(e) => setSignUpName(e.target.value)}
                  placeholder="Enter your name..."
                  className="w-full bg-white/5 text-white text-sm px-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:border-blue-500 transition-all placeholder-white/20"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-white/60 uppercase tracking-wider block">Email Address</label>
                <input
                  type="email"
                  value={signUpEmail}
                  onChange={(e) => setSignUpEmail(e.target.value)}
                  placeholder="Enter your email..."
                  className="w-full bg-white/5 text-white text-sm px-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:border-blue-500 transition-all placeholder-white/20"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-white/60 uppercase tracking-wider block">Password</label>
                <input
                  type="password"
                  value={signUpPassword}
                  onChange={(e) => setSignUpPassword(e.target.value)}
                  placeholder="Enter a password..."
                  className="w-full bg-white/5 text-white text-sm px-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:border-blue-500 transition-all placeholder-white/20"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-white/60 uppercase tracking-wider block">Confirm Password</label>
                <input
                  type="password"
                  value={signUpConfirmPassword}
                  onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                  placeholder="Confirm your password..."
                  className="w-full bg-white/5 text-white text-sm px-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:border-blue-500 transition-all placeholder-white/20"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-xl transition transform active:scale-95 shadow-lg shadow-blue-600/25 cursor-pointer flex items-center justify-center gap-2"
              >
                Sign Up
              </button>
            </form>

            <div className="border-t border-white/5 pt-4 text-center">
              <button 
                onClick={() => { setAuthModal("login"); setAuthError(""); }}
                className="text-xs text-blue-400 hover:text-blue-300 font-bold transition cursor-pointer"
              >
                Already have an account? Login
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
