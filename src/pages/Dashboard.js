import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaCloudUploadAlt, FaHeartbeat, FaUser, FaCalendarAlt, 
  FaWeight, FaBaby, FaPills, FaAppleAlt, FaFileMedical,
  FaChevronRight, FaPlus, FaClock, FaStethoscope, FaUtensils,
  FaNotesMedical, FaArrowUp, FaArrowDown, FaCheckCircle,
  FaBell, FaGlobe, FaSignOutAlt, FaMicrophone
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import VoiceAssistant from '../components/VoiceAssistant';

const Dashboard = ({ onLogout }) => {
  const { t, language, setLanguage, languages } = useLanguage();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [currentWeek, setCurrentWeek] = useState(20);
  const [showVoice, setShowVoice] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('maatrucare_user_data');
    if (saved) {
      const data = JSON.parse(saved);
      setUserData(data);
      if (data.pregnancyWeek) {
        setCurrentWeek(parseInt(data.pregnancyWeek));
      }
    }
  }, []);

  const trimester = Math.ceil(currentWeek / 13) || 1;
  const months = Math.floor(currentWeek / 4.3);
  const daysLeft = 280 - (currentWeek * 7);

  const appointments = [
    { date: '2026-03-15', type: 'Checkup', doctor: 'Dr. Sarah', status: 'completed', notes: 'BP Normal, Weight: 68kg' },
    { date: '2026-03-29', type: 'Ultrasound', doctor: 'Dr. Sarah', status: 'upcoming', notes: 'Growth Scan Scheduled' },
    { date: '2026-04-12', type: 'Glucose Test', doctor: 'Lab', status: 'upcoming', notes: 'Fasting Required' },
  ];

  const dietStats = {
    calories: { current: 2100, target: 2200, change: '+5%' },
    protein: { current: 75, target: 80, change: '+8%' },
    iron: { current: 18, target: 27, change: '-12%' },
    calcium: { current: 1100, target: 1000, change: '+15%' },
  };

  const quickActions = [
    { icon: FaCloudUploadAlt, label: 'Upload Report', color: 'from-blue-500 to-cyan-500', path: '/reports', desc: 'Blood tests, Scans' },
    { icon: FaUtensils, label: 'Diet Plan', color: 'from-green-500 to-emerald-500', path: '/nutrition', desc: 'Personalized meals' },
    { icon: FaPills, label: 'Medicines', color: 'from-orange-500 to-red-500', path: '/reminders', desc: 'Track dosages' },
    { icon: FaStethoscope, label: 'Find Doctor', color: 'from-purple-500 to-pink-500', path: '/hospitals', desc: 'Book appointment' },
  ];

  const healthMetrics = [
    { label: 'Weight', value: '68.5', unit: 'kg', change: '+2.5', trend: 'up', icon: FaWeight, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'BP', value: '120/80', unit: 'mmHg', change: 'Normal', trend: 'stable', icon: FaHeartbeat, color: 'text-green-500', bg: 'bg-green-50' },
    { label: 'Hb', value: '11.5', unit: 'g/dL', change: '-0.5', trend: 'down', icon: FaNotesMedical, color: 'text-yellow-500', bg: 'bg-yellow-50' },
    { label: 'Sugar', value: '85', unit: 'mg/dL', change: 'Normal', trend: 'stable', icon: FaFileMedical, color: 'text-purple-500', bg: 'bg-purple-50' },
  ];

  return (
    <div className="pb-28 bg-gray-50 min-h-screen">
      {/* Header */}
      <motion.div 
        className="bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 text-white p-6 pb-8"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-teal-100 text-sm mb-1">Welcome back,</p>
            <h1 className="text-2xl font-bold">{userData?.name || 'Sarah Johnson'} 👋</h1>
            <p className="text-teal-100 text-sm mt-1">Hope you're having a great day!</p>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-white/20 rounded-lg px-2 py-1 text-sm border-0 text-white"
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code} className="text-gray-800">
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
            <button onClick={() => setShowVoice(!showVoice)} className="p-2 bg-white/20 rounded-full">
              <FaMicrophone />
            </button>
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center relative">
              <FaBell />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center">3</span>
            </div>
          </div>
        </div>

        {showVoice && <VoiceAssistant onClose={() => setShowVoice(false)} />}

        {/* Pregnancy Progress Card */}
        <motion.div 
          className="bg-white rounded-2xl p-4 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex justify-between items-start mb-3">
            <div>
              <p className="text-gray-500 text-sm">Pregnancy Week</p>
              <p className="text-3xl font-bold text-gray-800">{currentWeek} <span className="text-lg text-gray-400">/ 40</span></p>
            </div>
            <div className="text-right">
              <span className="inline-block px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-medium">
                Trimester {trimester}
              </span>
              <p className="text-gray-500 text-xs mt-1">{daysLeft} days left</p>
            </div>
          </div>
          
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden mb-3">
            <motion.div 
              className="h-full bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(currentWeek / 40) * 100}%` }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
          
          <div className="flex justify-between text-xs text-gray-500">
            <span>Week 1</span>
            <span>{months} months pregnant</span>
            <span>Week 40</span>
          </div>
        </motion.div>
      </motion.div>

      <div className="p-4 -mt-4 space-y-4">
        {/* Quick Upload Section */}
        <motion.div
          className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <FaCloudUploadAlt className="text-blue-500" />
              {t('uploadReport') || 'Upload Medical Report'}
            </h3>
            <button 
              onClick={() => navigate('/reports')}
              className="text-blue-500 text-sm flex items-center gap-1"
            >
              {t('viewAll') || 'View All'} <FaChevronRight />
            </button>
          </div>
          
          <div 
            onClick={() => navigate('/reports')}
            className="border-2 border-dashed border-blue-200 rounded-xl p-6 text-center bg-blue-50/50 cursor-pointer hover:bg-blue-50 transition-colors"
          >
            <div className="w-14 h-14 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-3">
              <FaCloudUploadAlt className="text-2xl text-blue-500" />
            </div>
            <p className="text-sm text-gray-600 mb-1">{t('tapToUpload') || 'Tap to upload your medical report'}</p>
            <p className="text-xs text-gray-400">{t('supports') || 'Supports'}: {t('bloodTests') || 'Blood tests'}, {t('ultrasound') || 'Ultrasound'}, {t('bpReadings') || 'BP readings'}</p>
          </div>
        </motion.div>

        {/* User Details Grid */}
        <motion.div
          className="grid grid-cols-2 gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {[
            { label: t('age') || 'Age', value: userData?.age || '28', unit: t('years') || 'years', icon: FaUser, color: 'from-pink-400 to-rose-400' },
            { label: t('month') || 'Month', value: months, unit: t('months') || 'months', icon: FaCalendarAlt, color: 'from-purple-400 to-violet-400' },
            { label: t('pregnancyWeek') || 'Week', value: currentWeek, unit: t('week') || 'week', icon: FaBaby, color: 'from-amber-400 to-orange-400' },
            { label: t('dueDate') || 'Due Date', value: userData?.dueDate ? new Date(userData.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Oct 15', unit: userData?.dueDate ? new Date(userData.dueDate).getFullYear() : '2026', icon: FaClock, color: 'from-teal-400 to-cyan-400' },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${item.color} flex items-center justify-center mb-2`}>
                <item.icon className="text-white" />
              </div>
              <p className="text-gray-500 text-xs">{item.label}</p>
              <p className="text-lg font-bold text-gray-800">{item.value}</p>
              <p className="text-xs text-gray-400">{item.unit}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Health Metrics */}
        <motion.div
          className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <FaHeartbeat className="text-red-500" />
              Health Overview
            </h3>
            <span className="text-xs text-green-500 bg-green-100 px-2 py-1 rounded-full">All Normal</span>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {healthMetrics.map((metric) => (
              <div key={metric.label} className={`${metric.bg} rounded-xl p-3`}>
                <div className="flex items-center gap-2 mb-2">
                  <metric.icon className={metric.color} />
                  <span className="text-xs text-gray-600">{metric.label}</span>
                </div>
                <p className="text-xl font-bold text-gray-800">{metric.value}</p>
                <p className="text-xs text-gray-500">{metric.unit}</p>
                <div className={`flex items-center gap-1 text-xs mt-1 ${
                  metric.trend === 'up' ? 'text-red-500' : 
                  metric.trend === 'down' ? 'text-yellow-500' : 'text-green-500'
                }`}>
                  {metric.trend === 'up' ? <FaArrowUp /> : 
                   metric.trend === 'down' ? <FaArrowDown /> : <FaCheckCircle />}
                  {metric.change}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Appointments Section */}
        <motion.div
          className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <FaCalendarAlt className="text-purple-500" />
              Appointments
            </h3>
            <button 
              onClick={() => navigate('/reminders')}
              className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-500"
            >
              <FaPlus className="text-sm" />
            </button>
          </div>

          <div className="space-y-3">
            {appointments.map((apt, index) => (
              <motion.div
                key={index}
                className={`flex items-start gap-3 p-3 rounded-xl border ${
                  apt.status === 'upcoming' ? 'bg-purple-50 border-purple-100' : 'bg-gray-50 border-gray-100'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  apt.status === 'upcoming' ? 'bg-purple-500' : 'bg-green-500'
                }`}>
                  <FaCalendarAlt className="text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-800">{apt.type}</p>
                      <p className="text-sm text-gray-500">{apt.doctor}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      apt.status === 'upcoming' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {apt.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{apt.date} • {apt.notes}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Diet Improvement Tracking */}
        <motion.div
          className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <FaAppleAlt className="text-green-500" />
              Diet Progress
            </h3>
            <button 
              onClick={() => navigate('/nutrition')}
              className="text-green-500 text-sm flex items-center gap-1"
            >
              View Plan <FaChevronRight />
            </button>
          </div>

          <div className="space-y-4">
            {Object.entries(dietStats).map(([key, stats], index) => (
              <div key={key}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600 capitalize">{key}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-800">{stats.current}</span>
                    <span className={`text-xs ${stats.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                      {stats.change}
                    </span>
                  </div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${
                      key === 'calories' ? 'bg-orange-400' :
                      key === 'protein' ? 'bg-blue-400' :
                      key === 'iron' ? 'bg-red-400' : 'bg-teal-400'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${(stats.current / stats.target) * 100}%` }}
                    transition={{ duration: 1, delay: 0.6 + index * 0.1 }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">Target: {stats.target}</p>
              </div>
            ))}
          </div>

          {/* Daily Tip */}
          <div className="mt-4 p-3 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl border border-green-100">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 text-sm">💡</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">Today's Tip</p>
                <p className="text-xs text-gray-600 mt-1">
                  Increase iron intake with spinach, beetroot, and jaggery. Pair with Vitamin C for better absorption!
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="font-semibold text-gray-800 mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, index) => (
              <motion.button
                key={action.label}
                onClick={() => navigate(action.path)}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-left hover:shadow-md transition-shadow"
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${action.color} flex items-center justify-center mb-3`}>
                  <action.icon className="text-white text-xl" />
                </div>
                <p className="font-medium text-gray-800 text-sm">{action.label}</p>
                <p className="text-xs text-gray-500 mt-1">{action.desc}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
