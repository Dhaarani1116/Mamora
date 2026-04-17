import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaPlay, FaPause, FaCheck, FaClock, FaFire, FaHeart,
  FaBaby, FaArrowRight, FaArrowLeft, FaInfoCircle,
  FaWalking, FaSwimmer, FaSpa, FaChild
} from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';

const Exercises = () => {
  const { t, language } = useLanguage();
  const [activeExercise, setActiveExercise] = useState(null);
  const [completedExercises, setCompletedExercises] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Get user pregnancy week from localStorage
  const userData = JSON.parse(localStorage.getItem('maatrucare_user_data') || '{}');
  const pregnancyWeek = userData.pregnancyWeek || 12;

  // Exercises database with multilingual support
  const exercises = [
    {
      id: 1,
      title: {
        en: 'Pelvic Tilts',
        ta: 'இடுப்பு சாய்வுகள்',
        hi: 'पेल्विक झुकाव'
      },
      description: {
        en: 'Strengthens abdominal muscles and relieves back pain',
        ta: 'வயிற்றுத் தசைகளை வலுப்படுத்தி முதுகு வலியைக் குறைக்கிறது',
        hi: 'पेट की मांसपेशियों को मजबूत करता है और पीठ दर्द से राहत देता है'
      },
      duration: 10,
      calories: 25,
      difficulty: 'easy',
      trimester: [1, 2, 3],
      icon: FaChild,
      color: 'from-pink-400 to-rose-500',
      steps: [
        { en: 'Lie on your back with knees bent', ta: 'மண்டிகளை மடக்கி பின்னால் படுக்கவும்', hi: 'घुटनों को मोड़कर पीठ के बल लेट जाएं' },
        { en: 'Tighten abdominal muscles', ta: 'வயிற்றுத் தசைகளை இறுக்கவும்', hi: 'पेट की मांसपेशियों को कसें' },
        { en: 'Push lower back into floor', ta: 'கீழ் முதுகை தரையில் அழுத்தவும்', hi: 'निचली पीठ को फर्श पर दबाएं' },
        { en: 'Hold for 5 seconds', ta: '5 வினாடிகள் பிடிக்கவும்', hi: '5 सेकंड तक रखें' },
        { en: 'Release and repeat 10 times', ta: 'விடுவித்து 10 முறை மீண்டும் செய்யவும்', hi: 'छोड़ें और 10 बार दोहराएं' }
      ]
    },
    {
      id: 2,
      title: {
        en: 'Kegel Exercises',
        ta: 'கெகெல் பயிற்சிகள்',
        hi: 'केजेल व्यायाम'
      },
      description: {
        en: 'Strengthens pelvic floor muscles for easier delivery',
        ta: 'எளிதான பிரசவத்திற்கு இடுப்பு தரை தசைகளை வலுப்படுத்துகிறது',
        hi: 'आसान डिलीवरी के लिए पेल्विक फ्लोर मांसपेशियों को मजबूत करता है'
      },
      duration: 15,
      calories: 15,
      difficulty: 'easy',
      trimester: [1, 2, 3],
      icon: FaHeart,
      color: 'from-purple-400 to-indigo-500',
      steps: [
        { en: 'Identify pelvic floor muscles', ta: 'இடுப்பு தரை தசைகளை கண்டறியவும்', hi: 'पेल्विक फ्लोर मांसपेशियों की पहचान करें' },
        { en: 'Contract muscles for 5 seconds', ta: '5 வினாடிகளுக்கு தசைகளை சுருக்கவும்', hi: '5 सेकंड के लिए मांसपेशियों को संकुचित करें' },
        { en: 'Relax for 5 seconds', ta: '5 வினாடிகள் ஓய்வெடுக்கவும்', hi: '5 सेकंड के लिए आराम करें' },
        { en: 'Repeat 10-15 times', ta: '10-15 முறை மீண்டும் செய்யவும்', hi: '10-15 बार दोहराएं' },
        { en: 'Do 3 sets daily', ta: 'தினமும் 3 செட் செய்யவும்', hi: 'रोजाना 3 सेट करें' }
      ]
    },
    {
      id: 3,
      title: {
        en: 'Prenatal Yoga',
        ta: 'கர்ப்பிணி யோகா',
        hi: 'प्रसवपूर्व योग'
      },
      description: {
        en: 'Gentle stretching for flexibility and relaxation',
        ta: 'நெகிழ்வுத்தன்மை மற்றும் ஓய்வுக்கான மென்மையான நீட்டிப்பு',
        hi: 'लचीलेपन और आराम के लिए हल्का फैलाव'
      },
      duration: 20,
      calories: 60,
      difficulty: 'medium',
      trimester: [2, 3],
      icon: FaSpa,
      color: 'from-teal-400 to-cyan-500',
      steps: [
        { en: 'Start with cat-cow pose', ta: 'பூனை-பசு நிலையுடன் தொடங்கவும்', hi: 'कैट-काउ पोज से शुरू करें' },
        { en: 'Move to child\'s pose', ta: 'குழந்தையின் நிலைக்கு நகரவும்', hi: 'चाइल्ड पोज में जाएं' },
        { en: 'Try butterfly stretch', ta: 'பட்டாம்பூச்சி நீட்சியை முயற்சிக்கவும்', hi: 'बटरफ्लाई स्ट्रेच करें' },
        { en: 'Do side stretches gently', ta: 'பக்க நீட்சிகளை மெதுவாக செய்யவும்', hi: 'साइड स्ट्रेच धीरे से करें' },
        { en: 'End with deep breathing', ta: 'ஆழ்ந்த மூச்சுடன் முடிக்கவும்', hi: 'गहरी सांस के साथ समाप्त करें' }
      ]
    },
    {
      id: 4,
      title: {
        en: 'Walking',
        ta: 'நடைபயிற்சி',
        hi: 'टहलना'
      },
      description: {
        en: 'Low-impact cardio for overall health',
        ta: 'ஒட்டுமொத்த ஆரோக்கியத்திற்கு குறைந்த தாக்கம் கார்டியோ',
        hi: 'समग्र स्वास्थ्य के लिए लो-इम्पैक्ट कार्डियो'
      },
      duration: 30,
      calories: 120,
      difficulty: 'easy',
      trimester: [1, 2, 3],
      icon: FaWalking,
      color: 'from-green-400 to-emerald-500',
      steps: [
        { en: 'Wear comfortable shoes', ta: 'வசதியான காலணிகளை அணியவும்', hi: 'आरामदायक जूते पहनें' },
        { en: 'Start with 5 min warm-up', ta: '5 நிமிடம் வார்ம்-அப்புடன் தொடங்கவும்', hi: '5 मिनट वार्म-अप से शुरू करें' },
        { en: 'Walk at moderate pace', ta: 'மிதமான வேகத்தில் நடக்கவும்', hi: 'मध्यम गति से चलें' },
        { en: 'Swing arms naturally', ta: 'கைகளை இயற்கையாக அசைக்கவும்', hi: 'हाथों को स्वाभाविक रूप से घुमाएं' },
        { en: 'Cool down for 5 minutes', ta: '5 நிமிடங்கள் குளிரவைக்கவும்', hi: '5 मिनट कूल डाउन करें' }
      ]
    },
    {
      id: 5,
      title: {
        en: 'Swimming',
        ta: 'நீச்சல்',
        hi: 'तैराकी'
      },
      description: {
        en: 'Full body workout with zero joint stress',
        ta: 'பூஜ்ஜிய மூட்டு மன அழுத்தத்துடன் முழு உடல் பயிற்சி',
        hi: 'शून्य जोड़ा तनाव के साथ पूर्ण शरीर व्यायाम'
      },
      duration: 25,
      calories: 150,
      difficulty: 'medium',
      trimester: [2],
      icon: FaSwimmer,
      color: 'from-blue-400 to-cyan-500',
      steps: [
        { en: 'Choose comfortable swimsuit', ta: 'வசதியான நீச்சலுடையை தேர்வு செய்யவும்', hi: 'आरामदायक तैराकी पोशाक चुनें' },
        { en: 'Start with gentle laps', ta: 'மென்மையான ரவுண்டுகளுடன் தொடங்கவும்', hi: 'हल्के चक्कर से शुरू करें' },
        { en: 'Try water walking', ta: 'நீரில் நடைபயிற்சி முயற்சிக்கவும்', hi: 'पानी में चलने का प्रयास करें' },
        { en: 'Do side kicks gently', ta: 'பக்க உதைகளை மெதுவாக செய்யவும்', hi: 'साइड किक धीरे से करें' },
        { en: 'Rest when feeling tired', ta: 'சோர்வாக உணரும்போது ஓய்வெடுக்கவும்', hi: 'थकान महसूस होने पर आराम करें' }
      ]
    },
    {
      id: 6,
      title: {
        en: 'Squats',
        ta: 'ஸ்குவாட்கள்',
        hi: 'स्क्वाट्स'
      },
      description: {
        en: 'Prepares pelvic muscles for delivery',
        ta: 'பிரசவத்திற்கு இடுப்புத் தசைகளை தயார் செய்கிறது',
        hi: 'डिलीवरी के लिए पेल्विक मांसपेशियों को तैयार करता है'
      },
      duration: 12,
      calories: 40,
      difficulty: 'medium',
      trimester: [1, 2],
      icon: FaBaby,
      color: 'from-orange-400 to-amber-500',
      steps: [
        { en: 'Stand with feet shoulder-width apart', ta: 'கால்கள் தோள் அகலத்திற்கு நில்', hi: 'पैरों को कंधे की चौड़ाई पर खड़े हों' },
        { en: 'Lower hips as if sitting', ta: 'அமர்வது போல இடுப்பைக் குறைக்கவும்', hi: 'जैसे बैठ रहे हों वैसे कूल्हे नीचे करें' },
        { en: 'Keep back straight', ta: 'முதுகை நேராக வைத்திருக்கவும்', hi: 'पीठ को सीधा रखें' },
        { en: 'Go down only halfway', ta: 'பாதி வழியிலேயே கீழே செல்லவும்', hi: 'सिर्फ आधे रास्ते तक नीचे जाएं' },
        { en: 'Do 2 sets of 10 reps', ta: '10 முறை 2 செட் செய்யவும்', hi: '10 रैप्स के 2 सेट करें' }
      ]
    }
  ];

  // Filter exercises based on trimester
  const getCurrentTrimester = (week) => {
    if (week <= 12) return 1;
    if (week <= 28) return 2;
    return 3;
  };

  const currentTrimester = getCurrentTrimester(pregnancyWeek);
  const recommendedExercises = exercises.filter(ex => 
    ex.trimester.includes(currentTrimester)
  );

  const getLocalizedText = (obj) => {
    if (typeof obj === 'string') return obj;
    return obj[language] || obj.en || '';
  };

  const toggleComplete = (id) => {
    setCompletedExercises(prev => 
      prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
    );
  };

  const startExercise = (exercise) => {
    setActiveExercise(exercise);
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const closeExercise = () => {
    setActiveExercise(null);
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const nextStep = () => {
    if (currentStep < activeExercise.steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      toggleComplete(activeExercise.id);
      closeExercise();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className="pb-32 bg-gradient-to-br from-orange-50 via-white to-pink-50 min-h-screen">
      {/* Header */}
      <motion.div 
        className="p-4 bg-white/80 backdrop-blur-lg sticky top-0 z-10 border-b border-orange-100"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
              <FaBaby className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                {t('exerciseBook') || 'Exercise Book'}
              </h1>
              <p className="text-sm text-gray-500">
                {t('week') || 'Week'} {pregnancyWeek} • {t('trimester') || 'Trimester'} {currentTrimester}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-orange-500">
              {completedExercises.length}/{recommendedExercises.length}
            </p>
            <p className="text-xs text-gray-500">{t('completed') || 'Completed'}</p>
          </div>
        </div>
      </motion.div>

      {/* Progress Overview */}
      <motion.div 
        className="mx-4 mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="bg-gradient-to-r from-orange-400 to-pink-500 rounded-2xl p-4 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">{t('dailyGoal') || 'Daily Goal'}</p>
              <p className="text-2xl font-bold">{completedExercises.length * 15} {t('min') || 'min'}</p>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-90">{t('calories') || 'Calories'}</p>
              <p className="text-2xl font-bold">
                {completedExercises.reduce((sum, id) => {
                  const ex = exercises.find(e => e.id === id);
                  return sum + (ex?.calories || 0);
                }, 0)}
              </p>
            </div>
          </div>
          <div className="mt-3 h-2 bg-white/30 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-white rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(completedExercises.length / recommendedExercises.length) * 100}%` }}
            />
          </div>
        </div>
      </motion.div>

      {/* Recommended for Your Trimester */}
      <motion.div 
        className="mx-4 mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
          <FaHeart className="text-pink-500" />
          {t('recommendedForYou') || 'Recommended for You'}
        </h2>
        <div className="space-y-3">
          {recommendedExercises.map((exercise, index) => (
            <motion.div
              key={exercise.id}
              className={`bg-white rounded-2xl p-4 shadow-sm border-2 transition-all ${
                completedExercises.includes(exercise.id) 
                  ? 'border-green-400 bg-green-50/50' 
                  : 'border-transparent hover:border-orange-200'
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${exercise.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                  <exercise.icon className="text-white text-xl" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-gray-800">
                        {getLocalizedText(exercise.title)}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {getLocalizedText(exercise.description)}
                      </p>
                    </div>
                    <button
                      onClick={() => toggleComplete(exercise.id)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        completedExercises.includes(exercise.id)
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                      }`}
                    >
                      <FaCheck className="text-sm" />
                    </button>
                  </div>
                  <div className="flex items-center gap-4 mt-3">
                    <span className="flex items-center gap-1 text-xs text-gray-500">
                      <FaClock /> {exercise.duration} {t('min') || 'min'}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-500">
                      <FaFire /> {exercise.calories} {t('kcal') || 'kcal'}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      exercise.difficulty === 'easy' ? 'bg-green-100 text-green-600' :
                      exercise.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-red-100 text-red-600'
                    }`}>
                      {t(exercise.difficulty) || exercise.difficulty}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => startExercise(exercise)}
                className="w-full mt-3 py-2.5 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:shadow-lg transition-all"
              >
                <FaPlay className="text-xs" />
                {t('startExercise') || 'Start Exercise'}
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Safety Tips */}
      <motion.div 
        className="mx-4 mt-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
          <h3 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
            <FaInfoCircle />
            {t('safetyTips') || 'Safety Tips'}
          </h3>
          <ul className="space-y-2 text-sm text-blue-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              {t('tip1') || 'Consult your doctor before starting any exercise'}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              {t('tip2') || 'Stay hydrated - drink water before, during, and after'}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              {t('tip3') || 'Stop immediately if you feel dizzy or uncomfortable'}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              {t('tip4') || 'Avoid exercises that require lying on your back after week 16'}
            </li>
          </ul>
        </div>
      </motion.div>

      {/* Exercise Modal */}
      <AnimatePresence>
        {activeExercise && (
          <motion.div
            className="fixed inset-0 bg-black/80 z-50 flex items-end sm:items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeExercise}
          >
            <motion.div
              className="bg-white rounded-3xl w-full max-w-md overflow-hidden"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className={`p-6 bg-gradient-to-br ${activeExercise.color} text-white`}>
                <div className="flex items-center justify-between mb-4">
                  <button 
                    onClick={closeExercise}
                    className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"
                  >
                    ✕
                  </button>
                  <span className="text-sm opacity-80">
                    {currentStep + 1} / {activeExercise.steps.length}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                    <activeExercise.icon className="text-3xl" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">
                      {getLocalizedText(activeExercise.title)}
                    </h2>
                    <p className="text-sm opacity-80">
                      {activeExercise.duration} {t('min') || 'min'} • Step {currentStep + 1}
                    </p>
                  </div>
                </div>
              </div>

              {/* Step Content */}
              <div className="p-6">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="mb-6"
                >
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-orange-100 to-pink-100 rounded-2xl flex items-center justify-center">
                    <span className="text-4xl font-bold text-orange-500">
                      {currentStep + 1}
                    </span>
                  </div>
                  <p className="text-xl text-center text-gray-800 font-medium leading-relaxed">
                    {getLocalizedText(activeExercise.steps[currentStep])}
                  </p>
                </motion.div>

                {/* Progress Dots */}
                <div className="flex justify-center gap-2 mb-6">
                  {activeExercise.steps.map((_, idx) => (
                    <div 
                      key={idx}
                      className={`w-2 h-2 rounded-full transition-all ${
                        idx === currentStep ? 'w-6 bg-orange-500' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>

                {/* Navigation */}
                <div className="flex gap-3">
                  <button
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <FaArrowLeft /> {t('previous') || 'Previous'}
                  </button>
                  <button
                    onClick={nextStep}
                    className="flex-1 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-xl font-semibold flex items-center justify-center gap-2"
                  >
                    {currentStep === activeExercise.steps.length - 1 ? (
                      <><FaCheck /> {t('finish') || 'Finish'}</>
                    ) : (
                      <>{t('next') || 'Next'} <FaArrowRight /></>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Exercises;
