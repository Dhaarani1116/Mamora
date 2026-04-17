import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaHome, FaUtensils, FaFileMedical, FaBell, FaMapMarkerAlt, 
  FaRobot, FaClinicMedical, FaSpa, FaRunning, FaHeartbeat
} from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const navItems = [
    { icon: FaHome, label: t('home') || 'Home', path: '/dashboard' },
    { icon: FaUtensils, label: t('diet') || 'Diet', path: '/nutrition' },
    { icon: FaRunning, label: t('exercise') || 'Exercise', path: '/exercises' },
    { icon: FaSpa, label: t('relax') || 'Relax', path: '/relax' },
    { icon: FaClinicMedical, label: t('sos') || 'SOS', path: '/emergency', isEmergency: true },
  ];

  return (
    <motion.nav 
      className="fixed bottom-0 left-0 right-0 bg-white shadow-lg rounded-t-3xl z-50 safe-bottom"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
    >
      <div className="flex justify-around items-center py-2 px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          if (item.isEmergency) {
            return (
              <motion.button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="flex flex-col items-center -mt-6"
                whileTap={{ scale: 0.9 }}
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-red-500 to-orange-500 shadow-lg shadow-red-500/30 flex items-center justify-center animate-pulse">
                  <FaHeartbeat className="text-white text-xl" />
                </div>
                <span className="text-xs text-red-600 font-medium mt-1">{item.label}</span>
              </motion.button>
            );
          }

          return (
            <motion.button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center p-2 rounded-xl transition-colors ${
                isActive ? 'text-pink-600' : 'text-gray-400'
              }`}
              whileTap={{ scale: 0.9 }}
            >
              <item.icon className={`text-xl ${isActive ? 'text-pink-600' : ''}`} />
              <span className="text-xs mt-1">{item.label}</span>
              {isActive && (
                <motion.div
                  className="w-1 h-1 rounded-full bg-pink-600 mt-1"
                  layoutId="activeIndicator"
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default BottomNav;
