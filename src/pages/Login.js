import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Heart } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(false); // Default to Sign Up mode
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(false);
    setErrorMsg('');

    if (!formData.email || !formData.password) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (isLogin) {
      const registeredUser = localStorage.getItem('mamora_user_auth');
      if (registeredUser) {
        const parsedAuth = JSON.parse(registeredUser);
        if (parsedAuth.email === formData.email && parsedAuth.password === formData.password) {
          localStorage.setItem('maatrucare_user', JSON.stringify({ id: 1, email: formData.email }));
          const onboarded = localStorage.getItem('mamora_onboarding_completed');
          if (onboarded !== 'true') {
            localStorage.setItem('mamora_onboarding_completed', 'false');
          }
        } else {
          setErrorMsg('Invalid email or password credentials.');
          setLoading(false);
          return;
        }
      } else {
        localStorage.setItem('mamora_user_auth', JSON.stringify({ email: formData.email, password: formData.password }));
        localStorage.setItem('maatrucare_user', JSON.stringify({ id: 1, email: formData.email }));
        localStorage.setItem('mamora_onboarding_completed', 'false');
      }
    } else {
      localStorage.setItem('mamora_user_auth', JSON.stringify({ email: formData.email, password: formData.password }));
      localStorage.setItem('maatrucare_user', JSON.stringify({ id: 1, email: formData.email }));
      localStorage.setItem('mamora_onboarding_completed', 'false');
    }

    setLoading(false);
    onLogin();
  };

  const FloatingHearts = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-pink-300 opacity-20"
          style={{
            left: `${10 + i * 12}%`,
            top: `${15 + i * 10}%`
          }}
          animate={{
            y: [0, -80, -160],
            opacity: [0, 0.4, 0],
            scale: [0.7, 1.2, 0.7]
          }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            delay: i * 0.3
          }}
        >
          <Heart className="h-8 w-8 fill-current" />
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-white to-teal-50 relative overflow-hidden p-4 md:p-8">
      <FloatingHearts />

      {/* Elegant Centered Glassmorphic Card */}
      <motion.div 
        className="w-full max-w-lg bg-white/70 backdrop-blur-xl border border-white/40 shadow-2xl shadow-rose-100/50 rounded-3xl p-8 md:p-12 z-10 relative"
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100, damping: 15 }}
      >
        <div className="text-center mb-6">
          {/* Logo container using pregnant watercolor illustration */}
          <motion.div 
            className="relative w-48 h-48 mx-auto bg-white rounded-3xl flex items-center justify-center shadow-xl shadow-rose-100/60 p-4 border border-pink-100 overflow-hidden"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img 
              src="/images/signup_illustration.png" 
              alt="Mamora Maternal Care Illustration" 
              className="w-full h-full object-contain rounded-2xl animate-fade-in"
              onError={(e) => {
                e.target.src = "/images/mamora_logo.png";
              }}
            />
          </motion.div>

          <h1 className="text-4xl font-black text-slate-800 tracking-tight mt-6">Mamora</h1>
          <p className="text-slate-500 text-base md:text-lg mt-2 leading-relaxed font-semibold">
            Your premium, automated clinical maternal health companion.
          </p>
        </div>

        {/* Form Card (collects only email/password) */}
        <div className="space-y-6">
          <h2 className="text-2xl font-black text-slate-800 text-center">
            {isLogin ? 'Welcome Back' : 'Create Maternal Account'}
          </h2>

          {errorMsg && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 bg-rose-50 border border-rose-100 text-rose-600 text-sm rounded-2xl font-bold"
            >
              ⚠️ {errorMsg}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-600 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                <input
                  type="email"
                  placeholder="name@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 text-lg pl-12 pr-4 p-4 rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-rose-400 focus:border-rose-400 transition-all text-slate-800 font-semibold"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-600 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 text-lg pl-12 pr-4 p-4 rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-rose-400 focus:border-rose-400 transition-all text-slate-800 font-semibold"
                  required
                  minLength="6"
                />
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-rose-500 via-pink-500 to-teal-600 text-white font-extrabold p-4 rounded-2xl shadow-xl shadow-rose-200/50 active:scale-95 disabled:scale-100 disabled:opacity-50 transition-all flex items-center justify-center gap-2 text-lg mt-8"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                isLogin ? 'LOG IN' : 'SIGN UP'
              )}
            </motion.button>
          </form>

          <div className="text-center border-t border-slate-100 pt-6">
            <p className="text-slate-400 text-sm font-medium">
              {isLogin ? "Don't have an account yet?" : 'Already registered with Mamora?'}
            </p>
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setErrorMsg('');
              }}
              className="text-rose-600 hover:text-rose-700 font-bold mt-2 text-sm hover:underline active:scale-95 transition-all"
            >
              {isLogin ? 'Create Account' : 'Log In Here'}
            </button>
          </div>
        </div>

        {/* Footer certification badges */}
        <div className="flex justify-center gap-5 mt-8 text-xs font-bold text-slate-400 uppercase tracking-wider">
          <span>🔒 Secure SSL</span>
          <span>🏥 HIPAA Standards</span>
          <span>🇮🇳 India</span>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
