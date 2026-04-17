import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane, FaMicrophone, FaRobot, FaUser, FaTimes, FaVolumeUp } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';

const Chatbot = () => {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState([
    { type: 'bot', text: t('greeting'), timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Knowledge base for rule-based responses
  const knowledgeBase = {
    en: {
      greetings: ['hello', 'hi', 'hey', 'good morning', 'good evening'],
      nutrition: ['food', 'eat', 'diet', 'nutrition', 'hungry', 'meal', 'vitamin'],
      symptoms: ['symptom', 'pain', 'nausea', 'vomit', 'bleeding', 'cramp', 'headache', 'tired'],
      exercise: ['exercise', 'workout', 'yoga', 'walk', 'activity', 'fitness'],
      emergency: ['emergency', 'urgent', 'bleeding', 'pain', 'hurt', 'accident', 'danger'],
      appointment: ['doctor', 'appointment', 'clinic', 'hospital', 'visit', 'checkup'],
      mental: ['stress', 'anxiety', 'depressed', 'sad', 'worried', 'scared', 'mood'],
      baby: ['baby', 'fetal', 'kick', 'movement', 'growth', 'development'],
      
      responses: {
        greeting: 'Hello! I\'m Maatru AI, your pregnancy companion. How can I help you today?',
        nutrition: 'During pregnancy, focus on: Folic acid, Iron, Calcium, and Protein. Eat plenty of fruits, vegetables, whole grains, and lean proteins. Avoid raw foods, excess caffeine, and unpasteurized products.',
        symptoms: 'Common pregnancy symptoms include nausea, fatigue, breast tenderness, and mood changes. If you experience severe pain, heavy bleeding, or persistent vomiting, contact your doctor immediately.',
        exercise: 'Safe exercises during pregnancy include walking, swimming, prenatal yoga, and light stretching. Aim for 30 minutes of moderate activity daily, but always consult your doctor first.',
        emergency: '⚠️ If you have severe abdominal pain, heavy bleeding, vision changes, or can\'t feel baby movements, call emergency services (108) or go to the nearest hospital immediately!',
        appointment: 'Regular prenatal visits are crucial. Typically: Weeks 4-28 (monthly), Weeks 28-36 (bi-weekly), Weeks 36-40 (weekly). Always attend your scheduled appointments!',
        mental: 'It\'s completely normal to feel emotional during pregnancy. Practice deep breathing, talk to loved ones, get adequate rest, and don\'t hesitate to seek professional support if needed.',
        baby: `At your current stage, your baby is developing rapidly! Regular kicks (after week 20) are a good sign. Count 10 movements within 2 hours. If movements decrease significantly, contact your doctor.`,
        default: 'I\'m here to help! You can ask me about nutrition, symptoms, exercise, mental health, or emergency guidance. What would you like to know?'
      }
    },
    
    ta: {
      greetings: ['வணக்கம்', 'ஹாய்', 'காலை', 'மாலை'],
      nutrition: ['உணவு', 'சாப்பாடு', 'உணவுமுறை', 'வைட்டமின்'],
      symptoms: ['அறிகுறி', 'வலி', 'குமட்டல', 'ரத்தம்', 'வலிப்பு'],
      exercise: ['உடற்பயிற்சி', 'யோகா', 'நடைபயிற்சி'],
      emergency: ['அவசரம்', 'ஆபத்து', 'வலி', 'அபாயம்'],
      
      responses: {
        greeting: 'வணக்கம்! நான் மாத்ருகேர் AI, உங்கள் கர்ப்ப கால உதவியாளர். நான் உங்களுக்கு எவ்வாறு உதவ முடியும்?',
        nutrition: 'கர்ப்ப காலத்தில்: போலிக் அமிலம், இரும்புச்சத்து, கால்சியம் மற்றும் புரதம் முக்கியம். பழங்கள், காய்கறிகள், முழு தானியங்கள் மற்றும் புரதம் நிறைந்த உணவுகளை சாப்பிடுங்கள்.',
        symptoms: 'பொதுவான கர்ப்ப அறிகுறிகள்: குமட்டல், சோர்வு, மார்பு வலி, மனநிலை மாற்றங்கள். தீவிரமான வலி அல்லது ரத்தப்போக்கு இருந்தால் உடனடியாக மருத்துவரை அணுகவும்.',
        exercise: 'பாதுகாப்பான உடற்பயிற்சிகள்: நடைபயிற்சி, நீச்சல், கர்ப்ப கால யோகா. தினமும் 30 நிமிடங்கள் மிதமான உடற்பயிற்சி.',
        emergency: '⚠️ தீவிரமான வயிற்று வலி, அதிக ரத்தப்போக்கு, பார்வை மாற்றங்கள் அல்லது குழந்தை அசைவுகள் இல்லையென்றால், உடனடியாக அவசர சேவைகளை (108) அழைக்கவும்!',
        default: 'நான் உதவ இங்கே இருக்கிறேன்! உணவு, அறிகுறிகள், உடற்பயிற்சி, அல்லது மனநலம் பற்றி கேட்கலாம். என்ன தெரிந்து கொள்ள விரும்புகிறீர்கள்?'
      }
    },
    
    hi: {
      greetings: ['नमस्ते', 'हाय', 'सुप्रभात', 'शुभ संध्या'],
      nutrition: ['खाना', 'भोजन', 'आहार', 'पोषण', 'विटामिन'],
      symptoms: ['लक्षण', 'दर्द', 'मतली', 'खून', 'सिरदर्द'],
      exercise: ['व्यायाम', 'योग', 'टहलना', 'वॉक'],
      emergency: ['आपातकाल', 'आपात', 'खतरा', 'दर्द', 'सहायता'],
      
      responses: {
        greeting: 'नमस्ते! मैं मातृकेयर AI, आपकी गर्भावस्था साथी। मैं आपकी कैसे मदद कर सकती हूं?',
        nutrition: 'गर्भावस्था में ध्यान दें: फोलिक एसिड, आयरन, कैल्शियम और प्रोटीन। फल, सब्जियां, अनाज और प्रोटीन युक्त खाद्य पदार्थ खाएं।',
        symptoms: 'सामान्य गर्भावस्था लक्षण: मतली, थकान, स्तन दर्द, मूड स्विंग। गंभीर दर्द या खून आने पर तुरंत डॉक्टर से संपर्क करें।',
        exercise: 'सुरक्षित व्यायाम: टहलना, तैराकी, प्रसवपूर्व योग। रोज 30 मिनट मध्यम व्यायाम करें।',
        emergency: '⚠️ गंभीर पेट दर्द, अत्यधिक रक्तस्राव, दृष्टि परिवर्तन, या बच्चे की हलचल न होने पर तुरंत आपातकालीन सेवाओं (108) को कॉल करें!',
        default: 'मैं मदद के लिए यहां हूं! पोषण, लक्षण, व्यायाम, या मानसिक स्वास्थ्य के बारे में पूछ सकते हैं। आप क्या जानना चाहते हैं?'
      }
    }
  };

  const processMessage = (text) => {
    const kb = knowledgeBase[language] || knowledgeBase.en;
    const lowerText = text.toLowerCase();
    
    // Check each category
    for (const [category, keywords] of Object.entries(kb)) {
      if (category === 'responses') continue;
      
      if (keywords.some(keyword => lowerText.includes(keyword.toLowerCase()))) {
        return kb.responses[category] || kb.responses.default;
      }
    }
    
    return kb.responses.default;
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    
    const userMessage = { type: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const response = processMessage(input);
      const botMessage = { type: 'bot', text: response, timestamp: new Date() };
      setMessages(prev => [...prev, botMessage]);
      setLoading(false);
      
      // Text to speech
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(response);
        utterance.lang = language === 'ta' ? 'ta-IN' : language === 'hi' ? 'hi-IN' : 'en-IN';
        window.speechSynthesis.speak(utterance);
      }
    }, 1000);
  };

  const startVoiceInput = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = language === 'ta' ? 'ta-IN' : language === 'hi' ? 'hi-IN' : 'en-IN';
      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event) => {
        setInput(event.results[0][0].transcript);
        setIsListening(false);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      
      recognition.start();
    }
  };

  const suggestedQuestions = [
    'What should I eat during pregnancy?',
    'Is morning sickness normal?',
    'What exercises are safe?',
    'When should I call the doctor?',
    'How much water should I drink?'
  ];

  return (
    <div className="pb-24 h-screen flex flex-col bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Header */}
      <motion.div
        className="bg-white shadow-sm p-4 flex items-center gap-3"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
      >
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
          <FaRobot className="text-white text-xl" />
        </div>
        <div>
          <h1 className="font-bold text-gray-800">Maatru AI Assistant</h1>
          <p className="text-xs text-green-500 flex items-center gap-1">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Online
          </p>
        </div>
      </motion.div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <motion.div
            key={index}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className={`flex items-start gap-2 max-w-[80%] ${
              message.type === 'user' ? 'flex-row-reverse' : ''
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.type === 'user' ? 'bg-pink-500' : 'bg-purple-500'
              }`}>
                {message.type === 'user' ? (
                  <FaUser className="text-white text-xs" />
                ) : (
                  <FaRobot className="text-white text-xs" />
                )}
              </div>
              <div className={`rounded-2xl p-3 ${
                message.type === 'user' 
                  ? 'bg-pink-500 text-white rounded-tr-none' 
                  : 'bg-white shadow-md rounded-tl-none'
              }`}>
                <p className="text-sm">{message.text}</p>
                <p className={`text-xs mt-1 ${
                  message.type === 'user' ? 'text-pink-200' : 'text-gray-400'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
        
        {loading && (
          <motion.div className="flex justify-start">
            <div className="bg-white shadow-md rounded-2xl rounded-tl-none p-3 flex items-center gap-2">
              <div className="flex gap-1">
                {[0, 1, 2].map(i => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-purple-400 rounded-full"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      {messages.length < 3 && (
        <div className="px-4 py-2">
          <p className="text-xs text-gray-500 mb-2">{t('suggestedQuestions')}:</p>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {suggestedQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => {
                  setInput(q);
                  setTimeout(sendMessage, 100);
                }}
                className="text-xs bg-white border border-gray-200 px-3 py-2 rounded-full whitespace-nowrap hover:bg-pink-50 hover:border-pink-200 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <motion.div
        className="bg-white p-4 shadow-lg"
        initial={{ y: 50 }}
        animate={{ y: 0 }}
      >
        <div className="flex items-center gap-2">
          <button
            onClick={startVoiceInput}
            className={`p-3 rounded-full transition-colors ${
              isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <FaMicrophone />
          </button>
          
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder={t('typeMessage')}
            className="flex-1 input-field"
          />
          
          <button
            onClick={sendMessage}
            disabled={!input.trim() || loading}
            className="p-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            <FaPaperPlane />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Chatbot;
