import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaDownload, FaTimes, FaMobileAlt } from 'react-icons/fa';

const InstallPrompt = ({ onClose }) => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShow(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    
    // Show prompt after 3 seconds if not already installed
    const timer = setTimeout(() => {
      if (!window.matchMedia('(display-mode: standalone)').matches && !deferredPrompt) {
        setShow(true);
      }
    }, 3000);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      clearTimeout(timer);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    }
    setShow(false);
    onClose();
  };

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => {
          setShow(false);
          onClose();
        }}
      >
        <motion.div
          className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          onClick={e => e.stopPropagation()}
        >
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center">
                <FaMobileAlt className="text-white text-2xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">Install Mamora</h3>
                <p className="text-sm text-gray-500">Add to your home screen</p>
              </div>
            </div>
            <button 
              onClick={() => {
                setShow(false);
                onClose();
              }}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FaTimes className="text-gray-400" />
            </button>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <span className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold">1</span>
              <span>Quick access from home screen</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <span className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold">2</span>
              <span>Works offline - no internet needed</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <span className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">3</span>
              <span>Get push notifications for reminders</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => {
                setShow(false);
                onClose();
              }}
              className="flex-1 py-3 border border-gray-300 rounded-full text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Not Now
            </button>
            <button
              onClick={handleInstall}
              className="flex-1 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <FaDownload />
              Install App
            </button>
          </div>

          <p className="text-xs text-gray-400 text-center mt-4">
            Works on Android & iOS Safari
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default InstallPrompt;
