import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaMicrophone, FaTimes, FaVolumeUp } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';

const VoiceAssistant = ({ onClose }) => {
  const { t, language } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const responses = {
    en: {
      greeting: 'Hello! I am your MaatruCare assistant. How can I help you today?',
      nutrition: 'For a healthy pregnancy, eat plenty of fruits, vegetables, whole grains, and protein. Avoid raw fish and unpasteurized foods.',
      symptoms: 'Common pregnancy symptoms include nausea, fatigue, and mood swings. If you experience severe pain or bleeding, contact your doctor immediately.',
      exercise: 'Light exercises like walking, swimming, and prenatal yoga are great during pregnancy. Always consult your doctor first.',
      emergency: 'If you have severe bleeding, intense pain, or cannot feel baby movements, call emergency services immediately.',
      default: 'I can help with pregnancy nutrition, symptoms, exercise advice, and emergency guidance. What would you like to know?'
    },
    ta: {
      greeting: 'வணக்கம்! நான் உங்கள் மாத்ருகேர் உதவியாளர். இன்று நான் உங்களுக்கு எவ்வாறு உதவ முடியும்?',
      nutrition: 'ஆரோக்கியமான கர்ப்பத்திற்கு, பழங்கள், காய்கறிகள், முழு தானியங்கள் மற்றும் புரதம் நிறைந்த உணவுகளை அதிகம் சாப்பிடுங்கள்.',
      symptoms: 'பொதுவான கர்ப்ப அறிகுறிகளில் குமட்டல், சோர்வு மற்றும் மனநிலை மாற்றங்கள் அடங்கும்.',
      exercise: 'நடக்குதல், நீச்சல் மற்றும் கர்ப்ப கால யோகா போன்ற லேசான உடற்பயிற்சிகள் கர்ப்பத்தின் போது நல்லது.',
      emergency: 'தீவிரமான பிளவு, தீவிரமான வலி அல்லது குழந்தை அசைவுகளை உணர முடியவில்லை என்றால், உடனடியாக அவசர சேவைகளை அழைக்கவும்.',
      default: 'கர்ப்ப சத்தான உணவு, அறிகுறிகள், உடற்பயிற்சி ஆலோசனை மற்றும் அவசர வழிகாட்டுதல்களில் நான் உதவ முடியும்.'
    },
    hi: {
      greeting: 'नमस्ते! मैं आपकी मातृकेयर सहायक हूं। आज मैं आपकी कैसे मदद कर सकती हूं?',
      nutrition: 'स्वस्थ गर्भावस्था के लिए, फल, सब्जियां,whole grains और प्रोटीन युक्त खाद्य पदार्थ खाएं।',
      symptoms: 'सामान्य गर्भावस्था लक्षणों में मतली, थकान और मूड स्विंग शामिल हैं।',
      exercise: 'टहलना, तैराकी और प्रसवपूर्व योग जैसी हल्की व्यायाम गर्भावस्था के दौरान बहुत अच्छी हैं।',
      emergency: 'यदि आपको तीव्र रक्तस्राव, तीव्र दर्द हो या बच्चे की हलचल महसूस न हो, तो तुरंत आपातकालीन सेवाओं को कॉल करें।',
      default: 'मैं गर्भावस्था पोषण, लक्षण, व्यायाम सलाह और आपातकालीन मार्गदर्शन में मदद कर सकती हूं।'
    }
  };

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = language === 'ta' ? 'ta-IN' : language === 'hi' ? 'hi-IN' : 'en-IN';

      recognition.onstart = () => setIsListening(true);
      
      recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        setTranscript(text);
        processCommand(text);
      };

      recognition.onerror = () => {
        setIsListening(false);
        setResponse('Sorry, I did not understand. Please try again.');
      };

      recognition.onend = () => setIsListening(false);

      if (isListening) {
        recognition.start();
      }

      return () => recognition.stop();
    }
  }, [isListening, language]);

  const processCommand = (text) => {
    setLoading(true);
    const lowerText = text.toLowerCase();
    const langResponses = responses[language] || responses.en;
    
    setTimeout(() => {
      let reply = langResponses.default;
      
      if (lowerText.includes('hello') || lowerText.includes('hi') || lowerText.includes('வணக்கம்') || lowerText.includes('नमस्ते')) {
        reply = langResponses.greeting;
      } else if (lowerText.includes('food') || lowerText.includes('eat') || lowerText.includes('nutrition') || lowerText.includes('உணவு') || lowerText.includes('खाना')) {
        reply = langResponses.nutrition;
      } else if (lowerText.includes('symptom') || lowerText.includes('pain') || lowerText.includes('அறிகுறி') || lowerText.includes('लक्षण')) {
        reply = langResponses.symptoms;
      } else if (lowerText.includes('exercise') || lowerText.includes('workout') || lowerText.includes('யோகா') || lowerText.includes('व्यायाम')) {
        reply = langResponses.exercise;
      } else if (lowerText.includes('emergency') || lowerText.includes('help') || lowerText.includes('அவசரம்') || lowerText.includes('आपातकाल')) {
        reply = langResponses.emergency;
      }
      
      setResponse(reply);
      setLoading(false);
      
      // Text to speech
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(reply);
        utterance.lang = language === 'ta' ? 'ta-IN' : language === 'hi' ? 'hi-IN' : 'en-IN';
        window.speechSynthesis.speak(utterance);
      }
    }, 1000);
  };

  const suggestedQuestions = {
    en: ['What should I eat?', 'Is this symptom normal?', 'What exercises are safe?', 'Emergency help'],
    ta: ['நான் என்ன சாப்பிட வேண்டும்?', 'இந்த அறிகுறி சாதாரணமா?', 'எந்த பயிற்சிகள் பாதுகாப்பானவை?', 'அவசர உதவி'],
    hi: ['मुझे क्या खाना चाहिए?', 'क्या यह लक्षण सामान्य है?', 'कौन से व्यायाम सुरक्षित हैं?', 'आपातकालीन सहायता']
  };

  const uiText = {
    en: { title: 'Voice Assistant', youSaid: 'You said:', tryAsking: 'Try asking:', listening: 'Listening...', tapToSpeak: 'Tap to speak' },
    ta: { title: 'குரல் உதவியாளர்', youSaid: 'நீங்கள் கூறியது:', tryAsking: 'கேட்க முயற்சிக்கவும்:', listening: 'கேட்கிறது...', tapToSpeak: 'பேச தட்டவும்' },
    hi: { title: 'वॉयस सहायक', youSaid: 'आपने कहा:', tryAsking: 'पूछने का प्रयास करें:', listening: 'सुन रहा है...', tapToSpeak: 'बोलने के लिए टैप करें' }
  };

  const currentQuestions = suggestedQuestions[language] || suggestedQuestions.en;
  const currentUi = uiText[language] || uiText.en;

  return (
    <motion.div
      className="fixed inset-x-4 top-24 bg-white rounded-3xl shadow-2xl z-50 p-6"
      initial={{ opacity: 0, scale: 0.9, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -20 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-800 flex items-center gap-2">
          <FaMicrophone className="text-pink-500" />
          {currentUi.title}
        </h3>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
          <FaTimes />
        </button>
      </div>

      {/* Voice Wave Animation */}
      <div className="flex justify-center mb-6">
        <motion.button
          onClick={() => setIsListening(!isListening)}
          className={`w-20 h-20 rounded-full flex items-center justify-center ${
            isListening ? 'bg-red-500' : 'bg-gradient-to-r from-pink-500 to-purple-500'
          } shadow-lg`}
          animate={isListening ? {
            scale: [1, 1.1, 1],
          } : {}}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <FaMicrophone className="text-white text-2xl" />
        </motion.button>
      </div>

      {isListening && (
        <div className="flex justify-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 bg-pink-500 rounded-full"
              animate={{
                height: [10, 30, 10],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </div>
      )}

      {transcript && (
        <div className="bg-gray-100 rounded-xl p-3 mb-3">
          <p className="text-sm text-gray-600">{currentUi.youSaid}</p>
          <p className="text-gray-800">{transcript}</p>
        </div>
      )}

      {loading && (
        <div className="flex justify-center items-center py-4">
          <motion.div
            className="w-6 h-6 border-2 border-pink-500 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>
      )}

      {response && (
        <motion.div
          className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-4 mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-start gap-2">
            <FaVolumeUp className="text-pink-500 mt-1" />
            <p className="text-gray-800">{response}</p>
          </div>
        </motion.div>
      )}

      {/* Suggested Questions */}
      <div className="space-y-2">
        <p className="text-xs text-gray-500">{currentUi.tryAsking}</p>
        <div className="flex flex-wrap gap-2">
          {currentQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => {
                setTranscript(q);
                processCommand(q);
              }}
              className="text-xs bg-gray-100 hover:bg-pink-100 text-gray-700 px-3 py-1 rounded-full transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default VoiceAssistant;
