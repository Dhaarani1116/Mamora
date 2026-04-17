import React, { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  en: {
    // Common
    appName: 'MaatruCare',
    tagline: 'AI-Powered Maternal Health Companion',
    welcome: 'Welcome',
    hello: 'Hello',
    goodbye: 'Goodbye',
    yes: 'Yes',
    no: 'No',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    add: 'Add',
    search: 'Search',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    
    // Auth
    login: 'Login',
    signup: 'Sign Up',
    email: 'Email',
    password: 'Password',
    phone: 'Phone Number',
    name: 'Full Name',
    dueDate: 'Due Date',
    pregnancyWeek: 'Pregnancy Week',
    forgotPassword: 'Forgot Password?',
    noAccount: "Don't have an account?",
    haveAccount: 'Already have an account?',
    
    // Navigation
    dashboard: 'Dashboard',
    nutrition: 'Nutrition',
    reports: 'Reports',
    records: 'Records',
    emergency: 'Emergency',
    reminders: 'Reminders',
    hospitals: 'Hospitals',
    pharmacy: 'Pharmacy',
    chatbot: 'AI Assistant',
    
    // Dashboard
    pregnancyJourney: 'Pregnancy Journey',
    week: 'Week',
    trimester: 'Trimester',
    babySize: 'Baby Size',
    babyWeight: 'Baby Weight',
    dailyTip: 'Daily Tip',
    nextAppointment: 'Next Appointment',
    
    // Nutrition
    aiNutrition: 'AI Nutrition Advisor',
    enterSymptoms: 'Enter your symptoms or health condition',
    getRecommendations: 'Get Recommendations',
    recommendedFoods: 'Recommended Foods',
    avoidFoods: 'Foods to Avoid',
    dailyMealPlan: 'Daily Meal Plan',
    
    // Reports
    uploadReport: 'Upload Medical Report',
    uploadImage: 'Upload Image/PDF',
    analyzing: 'Analyzing...',
    hemoglobin: 'Hemoglobin',
    bloodPressure: 'Blood Pressure',
    bloodSugar: 'Blood Sugar',
    riskLevel: 'Risk Level',
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    
    // Emergency
    emergencySOS: 'Emergency SOS',
    tapForHelp: 'Tap for Immediate Help',
    sendingAlert: 'Sending Alert...',
    alertSent: 'Alert Sent!',
    nearbyHospitals: 'Nearby Hospitals',
    
    // Reminders
    medicineReminder: 'Medicine Reminder',
    doctorVisit: 'Doctor Visit',
    addReminder: 'Add Reminder',
    time: 'Time',
    frequency: 'Frequency',
    
    // Chatbot
    // Emergency Alert Details
    smsSentTo: 'SMS sent to',
    locationShared: 'Location shared',
    emergencyServicesNotified: 'Emergency services notified',
    alertLogged: 'Alert logged at',
    protected: 'Protected',
    youAreHere: 'You are here',
    placesFound: 'places found',
    hospital: 'Hospital',
    police: 'Police',
    all: 'All',
    hospitals: 'Hospitals',
    confirmEmergency: 'Confirm Emergency?',
    sosWarning: 'This will alert your emergency contacts and share your location.',
    confirm: 'Confirm',
    alertSent: 'Alert Sent!',
    helpOnWay: 'Help is on the way',
    emergencyHub: 'EMERGENCY HUB',
    tapForEmergency: 'Tap for immediate help',
    ambulance: 'Ambulance',
    
    // Relax/Meditation
    relaxTime: 'Relax Time',
    forMothers: 'For Mothers',
    breathingExercise: 'Breathing Exercise',
    ready: 'Ready',
    start: 'Start',
    stop: 'Stop',
    inhale: 'Inhale',
    hold: 'Hold',
    exhale: 'Exhale',
    inhaleFor4: 'Inhale for 4 seconds',
    holdFor7: 'Hold for 7 seconds',
    exhaleFor8: 'Exhale for 8 seconds',
    breathingDesc: '4-7-8 breathing helps reduce anxiety and promotes better sleep during pregnancy',
    moreSounds: 'More Relaxing Sounds',
    benefitsForMothers: 'Benefits for Mothers',
    betterSleep: 'Better Sleep',
    reducedStress: 'Reduced Stress',
    calmMind: 'Calm Mind',
    babyBonding: 'Baby Bonding',
    
    // Exercises
    exerciseBook: 'Exercise Book',
    trimester: 'Trimester',
    completed: 'Completed',
    dailyGoal: 'Daily Goal',
    min: 'min',
    kcal: 'kcal',
    recommendedForYou: 'Recommended for You',
    startExercise: 'Start Exercise',
    safetyTips: 'Safety Tips',
    tip1: 'Consult your doctor before starting any exercise',
    tip2: 'Stay hydrated - drink water before, during, and after',
    tip3: 'Stop immediately if you feel dizzy or uncomfortable',
    tip4: 'Avoid exercises that require lying on your back after week 16',
    previous: 'Previous',
    next: 'Next',
    finish: 'Finish',
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard',
    
    // Voice Assistant
    voiceAssistant: 'Voice Assistant',
    tryAsking: 'Try asking',
    
    // Navigation
    home: 'Home',
    diet: 'Diet',
    exercise: 'Exercise',
    relax: 'Relax',
    sos: 'SOS',
    
    // Dashboard additional
    uploadReport: 'Upload Report',
    viewAll: 'View All',
    tapToUpload: 'Tap to upload your medical report',
    supports: 'Supports',
    bloodTests: 'Blood tests',
    ultrasound: 'Ultrasound',
    bpReadings: 'BP readings',
    healthOverview: 'Health Overview',
    dietProgress: 'Diet Progress',
    viewPlan: 'View Plan',
    quickActions: 'Quick Actions',
    
    // Login/Register additional
    fullName: 'Full Name',
    enterName: 'Enter your full name',
    age: 'Age',
    pregnancyWeek: 'Pregnancy Week',
    confirmPassword: 'Confirm Password',
    createAccount: 'Create Account',
    
    // Common
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    add: 'Add',
  },
  
  ta: {
    // Common
    appName: 'மாத்ருகேர்',
    tagline: 'AI இயக்கிய தாய்நல உதவியாளர்',
    welcome: 'வரவேற்கிறோம்',
    hello: 'வணக்கம்',
    goodbye: 'விடைபெறுகிறேன்',
    yes: 'ஆம்',
    no: 'இல்லை',
    cancel: 'ரத்து செய்',
    save: 'சேமி',
    delete: 'நீக்கு',
    edit: 'திருத்து',
    add: 'சேர்',
    search: 'தேடு',
    loading: 'ஏற்றுகிறது...',
    error: 'பிழை',
    success: 'வெற்றி',
    title: 'தலைப்பு',
    
    // Auth
    login: 'உள்நுழை',
    signup: 'பதிவு செய்',
    email: 'மின்னஞ்சல்',
    password: 'கடவுச்சொல்',
    phone: 'கைபேசி எண்',
    name: 'முழு பெயர்',
    dueDate: 'பிரசவ தேதி',
    pregnancyWeek: 'கர்ப்ப வாரம்',
    forgotPassword: 'கடவுச்சொல் மறந்ததா?',
    noAccount: 'கணக்கு இல்லையா?',
    haveAccount: 'ஏற்கனவே கணக்கு உள்ளதா?',
    fullName: 'முழு பெயர்',
    enterName: 'உங்கள் முழு பெயரை உள்ளிடவும்',
    age: 'வயது',
    confirmPassword: 'கடவுச்சொல்லை உறுதிப்படுத்து',
    createAccount: 'கணக்கை உருவாக்கு',
    
    // Navigation
    dashboard: 'டாஷ்போர்டு',
    nutrition: 'உணவு',
    reports: 'அறிக்கைகள்',
    records: 'பதிவுகள்',
    emergency: 'அவசரம்',
    reminders: 'நினைவூட்டல்கள்',
    hospitals: 'மருத்துவமனைகள்',
    pharmacy: 'மருந்தகம்',
    chatbot: 'AI உதவியாளர்',
    home: 'முகப்பு',
    diet: 'உணவு',
    exercise: 'பயிற்சி',
    relax: 'ஓய்வு',
    sos: 'அவசரம்',
    
    // Dashboard
    pregnancyJourney: 'கர்ப்ப பயணம்',
    week: 'வாரம்',
    trimester: 'மூன்றுமாதம்',
    babySize: 'குழந்தை அளவு',
    babyWeight: 'குழந்தை எடை',
    dailyTip: 'இன்றைய குறிப்பு',
    nextAppointment: 'அடுத்த சந்திப்பு',
    uploadReport: 'அறிக்கையை பதிவேற்றம் செய்',
    viewAll: 'அனைத்தையும் காண்',
    tapToUpload: 'உங்கள் மருத்துவ அறிக்கையை பதிவேற்ற தட்டவும்',
    supports: 'ஆதரிக்கிறது',
    bloodTests: 'ரத்த பரிசோதனைகள்',
    ultrasound: 'அல்ட்ராசவுண்டு',
    bpReadings: 'இரத்த அழுத்தம் படிப்புகள்',
    healthOverview: 'ஆரோக்கிய கண்ணோட்டம்',
    dietProgress: 'உணவு முன்னேற்றம்',
    viewPlan: 'திட்டத்தைக் காண்',
    quickActions: 'விரைவான செயல்கள்',
    completed: 'முடிந்தது',
    dailyGoal: 'தினசரி இலக்கு',
    
    // Nutrition
    aiNutrition: 'AI உணவு ஆலோசகர்',
    enterSymptoms: 'உங்கள் அறிகுறிகளை உள்ளிடவும்',
    getRecommendations: 'பரிந்துரைகள் பெறு',
    recommendedFoods: 'பரிந்துரைக்கப்பட்ட உணவுகள்',
    avoidFoods: 'தவிர்க்க வேண்டிய உணவுகள்',
    dailyMealPlan: 'தினசரி உணவுத் திட்டம்',
    
    // Reports
    uploadReport: 'மருத்துவ அறிக்கையை பதிவேற்றம் செய்',
    uploadImage: 'படம்/PDF ஐ பதிவேற்றவும்',
    analyzing: 'பகுப்பாய்வு செய்கிறது...',
    hemoglobin: 'ஹீமோகுளோபின்',
    bloodPressure: 'இரத்த அழுத்தம்',
    bloodSugar: 'இரத்த சர்க்கரை',
    riskLevel: 'ஆபத்து நிலை',
    low: 'குறைவு',
    medium: 'நடுத்தரம்',
    high: 'உயர்வு',
    
    // Emergency
    emergencySOS: 'அவசர SOS',
    tapForHelp: 'உடனடி உதவிக்கு தட்டவும்',
    sendingAlert: 'எச்சரிக்கை அனுப்புகிறது...',
    alertSent: 'எச்சரிக்கை அனுப்பப்பட்டது!',
    nearbyHospitals: 'அருகிலுள்ள மருத்துவமனைகள்',
    
    // Reminders
    medicineReminder: 'மருந்து நினைவூட்டல்',
    doctorVisit: 'மருத்துவர் சந்திப்பு',
    addReminder: 'நினைவூட்டல் சேர்',
    time: 'நேரம்',
    frequency: 'அதிர்வெண்',
    alarm: 'அலாரம்',
    stopAlarm: 'அலாரம் நிறுத்து',
    reminderAlert: 'நினைவூட்டல்',
    remindersDesc: 'உங்கள் மருந்துகள் அல்லது சந்திப்புகளைத் தவறவிடாதீர்கள்',
    noReminders: 'இன்னும் நினைவூட்டல்கள் இல்லை',
    addFirstReminder: 'முதல் நினைவூட்டலைச் சேர்க்கவும்',
    activeReminders: 'செயலில் உள்ளவை',
    medicines: 'மருந்துகள்',
    tapToMark: 'முக்கிய நிகழ்வுகளைக் குறிக்க தேதிகளைத் தட்டவும்',
    reminderType: 'வகை',
    reminderPlaceholder: 'எ.கா., போலிக் அமிலம் எடுக்கவும்',
    
    // Chatbot
    typeMessage: 'உங்கள் செய்தியை உள்ளிடவும்...',
    voiceInput: 'குரல் உள்ளீடு',
    suggestedQuestions: 'பரிந்துரைக்கப்பட்ட கேள்விகள்',
    
    // Emergency Alert Details
    smsSentTo: 'SMS அனுப்பப்பட்டது',
    locationShared: 'இடம் பகிரப்பட்டது',
    emergencyServicesNotified: 'அவசர சேவைகளுக்கு தெரிவிக்கப்பட்டது',
    alertLogged: 'எச்சரிக்கை பதிவு செய்யப்பட்ட நேரம்',
    protected: 'பாதுகாக்கப்பட்டது',
    youAreHere: 'நீங்கள் இங்கே இருக்கிறீர்கள்',
    placesFound: 'இடங்கள் கண்டறியப்பட்டன',
    hospital: 'மருத்துவமனை',
    police: 'காவல் நிலையம்',
    all: 'அனைத்தும்',
    hospitals: 'மருத்துவமனைகள்',
    confirmEmergency: 'அவசரத்தை உறுதிப்படுத்தவா?',
    sosWarning: 'இது உங்கள் அவசர தொடர்புகளுக்கு எச்சரிக்கை அனுப்பி உங்கள் இடத்தை பகிரும்.',
    confirm: 'உறுதிப்படுத்து',
    alertSent: 'எச்சரிக்கை அனுப்பப்பட்டது!',
    helpOnWay: 'உதவி வருகிறது',
    emergencyHub: 'அவசர மையம்',
    tapForEmergency: 'உடனடி உதவிக்கு தட்டவும்',
    ambulance: 'ஆம்புலன்ஸ்',
    
    // Relax/Meditation
    relaxTime: 'ஓய்வு நேரம்',
    forMothers: 'தாய்மார்களுக்கு',
    breathingExercise: 'மூச்சு பயிற்சி',
    ready: 'தயார்',
    start: 'தொடங்கு',
    stop: 'நிறுத்து',
    inhale: 'உள்ளிழு',
    hold: 'பிடி',
    exhale: 'வெளியேற்று',
    inhaleFor4: '4 வினாடிகள் உள்ளிழுக்கவும்',
    holdFor7: '7 வினாடிகள் பிடிக்கவும்',
    exhaleFor8: '8 வினாடிகள் வெளியேற்றவும்',
    breathingDesc: '4-7-8 மூச்சு பயிற்சி கவலையைக் குறைத்து கர்ப்பத்தின் போது சிறந்த தூக்கத்தை வழங்குகிறது',
    moreSounds: 'மேலும் ஓய்வூட்டும் ஒலிகள்',
    benefitsForMothers: 'தாய்மார்களுக்கான நன்மைகள்',
    betterSleep: 'சிறந்த தூக்கம்',
    reducedStress: 'குறைந்த மன அழுத்தம்',
    calmMind: 'அமைதியான மனம்',
    babyBonding: 'குழந்தை உறவு',
    min: 'நிமி',
    
    // Exercises
    exerciseBook: 'உடற்பயிற்சி புத்தகம்',
    trimester: 'மூன்றுமாதம்',
    completed: 'முடிந்தது',
    dailyGoal: 'தினசரி இலக்கு',
    kcal: 'கலோரி',
    recommendedForYou: 'உங்களுக்கான பரிந்துரைகள்',
    startExercise: 'பயிற்சியை தொடங்கு',
    safetyTips: 'பாதுகாப்பு குறிப்புகள்',
    tip1: 'எந்த பயிற்சியையும் தொடங்குவதற்கு முன் மருத்துவரை அணுகவும்',
    tip2: 'நீரேற்றம் பேணவும் - முன், பின் மற்றும் போது தண்ணீர் குடிக்கவும்',
    tip3: 'மயக்கம் அல்லது அசௌகரியமாக உணர்ந்தால் உடனடியாக நிறுத்தவும்',
    tip4: '16 வாரத்திற்குப் பிறகு முதுகில் படுக்கும் பயிற்சிகளைத் தவிர்க்கவும்',
    previous: 'முந்தைய',
    next: 'அடுத்து',
    finish: 'முடி',
    easy: 'எளிது',
    medium: 'நடுத்தரம்',
    hard: 'கடினம்',
    
    // Voice Assistant
    voiceAssistant: 'குரல் உதவியாளர்',
    tryAsking: 'கேட்க முயற்சிக்கவும்',
  },
  
  hi: {
    // Common - Hindi
    appName: 'मातृकेयर',
    tagline: 'AI-संचालित मातृ स्वास्थ्य साथी',
    welcome: 'स्वागत है',
    hello: 'नमस्ते',
    goodbye: 'अलविदा',
    yes: 'हाँ',
    no: 'नहीं',
    cancel: 'रद्द करें',
    save: 'सहेजें',
    delete: 'हटाएं',
    edit: 'संपादित करें',
    add: 'जोड़ें',
    search: 'खोजें',
    loading: 'लोड हो रहा है...',
    error: 'त्रुटि',
    success: 'सफलता',
    title: 'शीर्षक',
    
    // Auth - Hindi
    login: 'लॉग इन',
    signup: 'साइन अप',
    email: 'ईमेल',
    password: 'पासवर्ड',
    phone: 'फोन नंबर',
    name: 'पूरा नाम',
    dueDate: 'प्रसव की तारीख',
    pregnancyWeek: 'गर्भावस्था सप्ताह',
    forgotPassword: 'पासवर्ड भूल गए?',
    noAccount: 'खाता नहीं है?',
    haveAccount: 'पहले से खाता है?',
    fullName: 'पूरा नाम',
    enterName: 'अपना पूरा नाम दर्ज करें',
    age: 'उम्र',
    confirmPassword: 'पासवर्ड की पुष्टि करें',
    createAccount: 'खाता बनाएं',
    
    // Navigation - Hindi
    dashboard: 'डैशबोर्ड',
    nutrition: 'पोषण',
    reports: 'रिपोर्ट्स',
    records: 'रिकॉर्ड्स',
    emergency: 'आपातकालीन',
    reminders: 'रिमाइंडर',
    hospitals: 'अस्पताल',
    pharmacy: 'फार्मेसी',
    chatbot: 'AI सहायक',
    home: 'होम',
    diet: 'आहार',
    exercise: 'व्यायाम',
    relax: 'आराम',
    sos: 'एसओएस',
    
    // Dashboard - Hindi
    pregnancyJourney: 'गर्भावस्था यात्रा',
    week: 'सप्ताह',
    trimester: 'त्रैमासिक',
    babySize: 'बच्चे का आकार',
    babyWeight: 'बच्चे का वजन',
    dailyTip: 'दैनिक सुझाव',
    nextAppointment: 'अगली नियुक्ति',
    uploadReport: 'रिपोर्ट अपलोड करें',
    viewAll: 'सभी देखें',
    tapToUpload: 'अपनी मेडिकल रिपोर्ट अपलोड करने के लिए टैप करें',
    supports: 'समर्थन करता है',
    bloodTests: 'रक्त परीक्षण',
    ultrasound: 'अल्ट्रासाउंड',
    bpReadings: 'बीपी रीडिंग',
    healthOverview: 'स्वास्थ्य अवलोकन',
    dietProgress: 'आहार प्रगति',
    viewPlan: 'योजना देखें',
    quickActions: 'त्वरित कार्रवाई',
    completed: 'पूरा हुआ',
    dailyGoal: 'दैनिक लक्ष्य',
    
    // Nutrition - Hindi
    aiNutrition: 'AI पोषण सलाहकार',
    enterSymptoms: 'अपने लक्षण दर्ज करें',
    getRecommendations: 'सुझाव प्राप्त करें',
    recommendedFoods: 'अनुशंसित खाद्य पदार्थ',
    avoidFoods: 'बचने योग्य खाद्य पदार्थ',
    dailyMealPlan: 'दैनिक भोजन योजना',
    
    // Reports - Hindi
    uploadReport: 'मेडिकल रिपोर्ट अपलोड करें',
    uploadImage: 'छवि/PDF अपलोड करें',
    analyzing: 'विश्लेषण कर रहा है...',
    hemoglobin: 'हीमोग्लोबिन',
    bloodPressure: 'रक्तचाप',
    bloodSugar: 'रक्त शर्करा',
    riskLevel: 'जोखिम स्तर',
    low: 'कम',
    medium: 'मध्यम',
    high: 'उच्च',
    
    // Emergency - Hindi
    emergencySOS: 'आपातकालीन SOS',
    tapForHelp: 'तत्काल सहायता के लिए टैप करें',
    sendingAlert: 'अलर्ट भेज रहा है...',
    alertSent: 'अलर्ट भेजा गया!',
    nearbyHospitals: 'पास के अस्पताल',
    
    // Reminders - Hindi
    medicineReminder: 'दवा रिमाइंडर',
    doctorVisit: 'डॉक्टर का दौरा',
    addReminder: 'रिमाइंडर जोड़ें',
    time: 'समय',
    frequency: 'आवृत्ति',
    alarm: 'अलार्म',
    stopAlarm: 'अलार्म बंद करें',
    reminderAlert: 'रिमाइंडर',
    remindersDesc: 'अपनी दवाएं या अनुबंध कभी न भूलें',
    noReminders: 'कोई रिमाइंडर नहीं',
    addFirstReminder: 'अपना पहला रिमाइंडर जोड़ें',
    activeReminders: 'सक्रिय',
    medicines: 'दवाइयां',
    tapToMark: 'महत्वपूर्ण तिथियां चिह्नित करने के लिए टैप करें',
    reminderType: 'प्रकार',
    reminderPlaceholder: 'जैसे, फोलिक एसिड लें',
    
    // Chatbot - Hindi
    typeMessage: 'अपना संदेश लिखें...',
    voiceInput: 'वॉइस इनपुट',
    suggestedQuestions: 'सुझाए गए प्रश्न',
    
    // Emergency Alert Details - Hindi
    smsSentTo: 'SMS भेजा गया',
    locationShared: 'स्थान साझा किया गया',
    emergencyServicesNotified: 'आपातकालीन सेवाओं को सूचित किया गया',
    alertLogged: 'अलर्ट का समय',
    protected: 'सुरक्षित',
    youAreHere: 'आप यहाँ हैं',
    placesFound: 'स्थान मिले',
    hospital: 'अस्पताल',
    police: 'पुलिस',
    all: 'सभी',
    hospitals: 'अस्पताल',
    confirmEmergency: 'आपातकाल की पुष्टि करें?',
    sosWarning: 'यह आपके आपातकालीन संपर्कों को सचेत करेगा और आपका स्थान साझा करेगा।',
    confirm: 'पुष्टि करें',
    alertSent: 'अलर्ट भेजा गया!',
    helpOnWay: 'मदद आ रही है',
    emergencyHub: 'आपातकालीन केंद्र',
    tapForEmergency: 'तत्काल सहायता के लिए टैप करें',
    ambulance: 'एम्बुलेंस',
    
    // Relax/Meditation - Hindi
    relaxTime: 'आराम का समय',
    forMothers: 'माताओं के लिए',
    breathingExercise: 'सांस व्यायाम',
    ready: 'तैयार',
    start: 'शुरू करें',
    stop: 'रोकें',
    inhale: 'सांस लें',
    hold: 'रोकें',
    exhale: 'सांस छोड़ें',
    inhaleFor4: '4 सेकंड के लिए सांस लें',
    holdFor7: '7 सेकंड के लिए रोकें',
    exhaleFor8: '8 सेकंड के लिए सांस छोड़ें',
    breathingDesc: '4-7-8 सांस व्यायाम चिंता को कम करता है और गर्भावस्था के दौरान बेहतर नींद देता है',
    moreSounds: 'और आरामदायक ध्वनियाँ',
    benefitsForMothers: 'माताओं के लिए लाभ',
    betterSleep: 'बेहतर नींद',
    reducedStress: 'कम तनाव',
    calmMind: 'शांत मन',
    babyBonding: 'बच्चे के साथ बंधन',
    min: 'मिनट',
    
    // Exercises - Hindi
    exerciseBook: 'व्यायाम पुस्तक',
    trimester: 'त्रैमासिक',
    completed: 'पूरा हुआ',
    dailyGoal: 'दैनिक लक्ष्य',
    min: 'मिनट',
    kcal: 'कैलोरी',
    recommendedForYou: 'आपके लिए अनुशंसित',
    startExercise: 'व्यायाम शुरू करें',
    safetyTips: 'सुरक्षा सुझाव',
    tip1: 'कोई भी व्यायाम शुरू करने से पहले अपने डॉक्टर से परामर्श करें',
    tip2: 'हाइड्रेटेड रहें - पहले, दौरान और बाद में पानी पिएं',
    tip3: 'अगर चक्कर आए या असुविधा महसूस हो तो तुरंत रोकें',
    tip4: '16 सप्ताह के बाद पीठ के बल लेटने वाले व्यायामों से बचें',
    previous: 'पिछला',
    next: 'अगला',
    finish: 'समाप्त',
    easy: 'आसान',
    medium: 'मध्यम',
    hard: 'कठिन',
    
    // Voice Assistant - Hindi
    voiceAssistant: 'वॉयस सहायक',
    tryAsking: 'पूछने का प्रयास करें',
  }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('maatrucare_language');
    return saved || 'en';
  });

  useEffect(() => {
    localStorage.setItem('maatrucare_language', language);
  }, [language]);

  const t = (key) => {
    return translations[language]?.[key] || translations['en'][key] || key;
  };

  const value = {
    language,
    setLanguage,
    t,
    languages: [
      { code: 'en', name: 'English', flag: '🇮🇳' },
      { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
      { code: 'hi', name: 'हिंदी', flag: '🇮🇳' }
    ]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}

export default LanguageContext;
