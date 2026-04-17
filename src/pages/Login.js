import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaEnvelope, 
  FaLock, 
  FaUser, 
  FaPhone, 
  FaBaby, 
  FaCalendar,
  FaHeartbeat,
  FaGlobe
} from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';

const Login = ({ onLogin }) => {
  const { t, language, setLanguage, languages } = useLanguage();
  const [isLogin, setIsLogin] = useState(false); // Default to Sign Up mode
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    age: '',
    pregnancyWeek: '',
    dueDate: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(5deg); }
      }
      @keyframes pulse-glow {
        0%, 100% { box-shadow: 0 0 20px rgba(236, 72, 153, 0.3); }
        50% { box-shadow: 0 0 40px rgba(236, 72, 153, 0.6); }
      }
      @keyframes heartbeat {
        0%, 100% { transform: scale(1); }
        14% { transform: scale(1.1); }
        28% { transform: scale(1); }
        42% { transform: scale(1.1); }
        70% { transform: scale(1); }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Store complete user data
    const userData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      age: parseInt(formData.age) || 25,
      pregnancyWeek: parseInt(formData.pregnancyWeek) || 12,
      dueDate: formData.dueDate,
      loginTime: new Date().toISOString()
    };
    
    localStorage.setItem('maatrucare_user_data', JSON.stringify(userData));
    localStorage.setItem('maatrucare_user', JSON.stringify({ id: 1, name: formData.name }));
    setLoading(false);
    onLogin();
  };

  const FloatingHearts = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-pink-300 opacity-20"
          style={{
            left: `${10 + i * 15}%`,
            fontSize: `${20 + i * 10}px`,
          }}
          animate={{
            y: [0, -100, -200],
            opacity: [0, 0.3, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        >
          <FaHeartbeat />
        </motion.div>
      ))}
    </div>
  );

  const MaternalIllustration = () => (
    <div className="relative w-full h-full flex items-center justify-center">
      <div 
        className="relative w-64 h-64 md:w-80 md:h-80"
        style={{
          background: 'linear-gradient(135deg, #fce7f3 0%, #f9a8d4 50%, #f472b6 100%)',
          borderRadius: '50%',
          animation: 'pulse-glow 3s ease-in-out infinite',
        }}
      >
        <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
          <svg viewBox="0 0 200 200" className="w-48 h-48 md:w-56 md:h-56">
            <defs>
              <linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FDBA74" />
                <stop offset="100%" stopColor="#FB923C" />
              </linearGradient>
              <linearGradient id="dressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F472B6" />
                <stop offset="100%" stopColor="#DB2777" />
              </linearGradient>
              <linearGradient id="babyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FECDD3" />
                <stop offset="100%" stopColor="#FDA4AF" />
              </linearGradient>
            </defs>
            
            <ellipse cx="100" cy="110" rx="50" ry="60" fill="url(#dressGrad)" />
            
            <circle cx="100" cy="55" r="30" fill="url(#skinGrad)" />
            
            <ellipse cx="100" cy="108" rx="35" ry="45" fill="url(#dressGrad)" opacity="0.9" />
            
            <ellipse cx="100" cy="115" rx="25" ry="30" fill="url(#babyGrad)" opacity="0.6" />
            
            <circle cx="100" cy="100" r="8" fill="#FED7AA" opacity="0.8" />
            
            <path d="M70 140 Q100 160 130 140" stroke="#F9A8D4" strokeWidth="3" fill="none" />
            
            <ellipse cx="70" cy="110" rx="8" ry="20" fill="url(#skinGrad)" />
            <ellipse cx="130" cy="110" rx="8" ry="20" fill="url(#skinGrad)" />
            
            <ellipse cx="85" cy="165" rx="12" ry="25" fill="url(#skinGrad)" />
            <ellipse cx="115" cy="165" rx="12" ry="25" fill="url(#skinGrad)" />
            
            <ellipse cx="85" cy="175" rx="15" ry="8" fill="#374151" />
            <ellipse cx="115" cy="175" rx="15" ry="8" fill="#374151" />
            
            <circle cx="90" cy="50" r="12" fill="#1F2937" />
            <circle cx="110" cy="50" r="12" fill="#1F2937" />
            <circle cx="93" cy="48" r="4" fill="#FFF" />
            <circle cx="113" cy="48" r="4" fill="#FFF" />
            
            <path d="M95 65 Q100 70 105 65" stroke="#BE185D" strokeWidth="2" fill="none" />
            
            <ellipse cx="100" cy="42" rx="25" ry="8" fill="#1F2937" />
            <path d="M75 40 Q100 20 125 40" fill="#1F2937" />
            
            <motion.g
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <path d="M85 80 Q100 95 115 80" stroke="#F472B6" strokeWidth="2" fill="none" opacity="0.5" />
            </motion.g>
          </svg>
        </div>
        
        <motion.div
          className="absolute -top-4 -right-4 bg-white p-3 rounded-2xl shadow-lg"
          animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <FaBaby className="text-pink-500 text-2xl" />
        </motion.div>
        
        <motion.div
          className="absolute -bottom-2 -left-2 bg-white p-3 rounded-2xl shadow-lg"
          animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
        >
          <FaHeartbeat className="text-red-500 text-2xl" />
        </motion.div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <FloatingHearts />
      
      {/* Left Side - Animation/Illustration */}
      <motion.div 
        className="hidden md:flex md:w-1/2 items-center justify-center p-8 relative"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center">
          <MaternalIllustration />
          <motion.h1 
            className="text-4xl font-bold gradient-text mt-8 mb-2"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            MaatruCare
          </motion.h1>
          <p className="text-gray-600 text-lg">{t('tagline')}</p>
          
          <div className="flex justify-center gap-4 mt-6">
            {[
              { icon: FaHeartbeat, color: 'text-red-500', label: 'Health' },
              { icon: FaBaby, color: 'text-pink-500', label: 'Care' },
              { icon: FaCalendar, color: 'text-purple-500', label: 'Track' },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.2 }}
              >
                <div className="bg-white p-3 rounded-xl shadow-md mb-1">
                  <item.icon className={`${item.color} text-xl`} />
                </div>
                <span className="text-xs text-gray-500">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Right Side - Form */}
      <motion.div 
        className="flex-1 flex items-center justify-center p-4 md:p-8"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-full max-w-md">
          {/* Mobile Header */}
          <div className="md:hidden text-center mb-6">
            <div className="inline-block p-4 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 mb-3">
              <FaHeartbeat className="text-4xl text-pink-500" />
            </div>
            <h1 className="text-2xl font-bold gradient-text">MaatruCare</h1>
            <p className="text-sm text-gray-500">{t('tagline')}</p>
          </div>

          {/* Language Selector */}
          <div className="flex justify-end mb-4">
            <div className="relative">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="appearance-none bg-white border border-gray-200 rounded-lg px-3 py-2 pr-8 text-sm focus:outline-none focus:border-pink-400"
              >
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
              <FaGlobe className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none" />
            </div>
          </div>

          {/* Form Card */}
          <motion.div 
            className="bg-white rounded-3xl shadow-xl p-6 md:p-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isLogin ? 'login' : 'signup'}
                initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                  {isLogin ? t('login') : t('signup')}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {!isLogin && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-4"
                    >
                      <div className="relative">
                        <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          placeholder={t('name')}
                          className="input-field pl-10"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          required={!isLogin}
                        />
                      </div>
                      
                      <div className="relative">
                        <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="tel"
                          placeholder={t('phone')}
                          className="input-field pl-10"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          required={!isLogin}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div className="relative">
                          <FaBaby className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="number"
                            placeholder={t('age')}
                            className="input-field pl-10"
                            value={formData.age}
                            onChange={(e) => setFormData({...formData, age: e.target.value})}
                            min="18"
                            max="50"
                            required={!isLogin}
                          />
                        </div>
                        <div className="relative">
                          <FaBaby className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="number"
                            placeholder={t('pregnancyWeek')}
                            className="input-field pl-10"
                            value={formData.pregnancyWeek}
                            onChange={(e) => setFormData({...formData, pregnancyWeek: e.target.value})}
                            min="1"
                            max="42"
                            required={!isLogin}
                          />
                        </div>
                      </div>
                      
                      <div className="relative">
                        <FaCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="date"
                          placeholder={t('dueDate')}
                          className="input-field pl-10 text-sm"
                          value={formData.dueDate}
                          onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                          required={!isLogin}
                        />
                      </div>
                    </motion.div>
                  )}

                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      placeholder={t('email')}
                      className="input-field pl-10"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>

                  <div className="relative">
                    <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="password"
                      placeholder={t('password')}
                      className="input-field pl-10"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      required
                      minLength="6"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full flex items-center justify-center gap-2"
                    style={{ marginTop: '1.5rem' }}
                  >
                    {loading ? (
                      <motion.div
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                    ) : (
                      isLogin ? t('login') : t('signup')
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-gray-500 text-sm">
                    {isLogin ? t('noAccount') : t('haveAccount')}
                  </p>
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-pink-600 font-semibold mt-1 hover:underline"
                  >
                    {isLogin ? t('signup') : t('login')}
                  </button>
                </div>

                {isLogin && (
                  <p className="text-center mt-4">
                    <button className="text-sm text-gray-400 hover:text-gray-600">
                      {t('forgotPassword')}
                    </button>
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Trust Badges */}
          <div className="flex justify-center gap-6 mt-6 text-xs text-gray-400">
            <span>🔒 Secure</span>
            <span>🏥 Trusted by Doctors</span>
            <span>🇮🇳 Made in India</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
