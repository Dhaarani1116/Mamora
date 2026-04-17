import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaPlay, FaPause, FaHeart, FaWind, FaWater, 
  FaMoon, FaSun, FaMusic, FaVolumeUp, FaVolumeMute,
  FaStepBackward, FaStepForward, FaSpinner, FaBaby
} from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';

const Relax = () => {
  const { t, language } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(180); // 3 minutes default
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState('inhale');
  const audioRef = useRef(null);
  const breathingInterval = useRef(null);

  // Meditation tracks with multiple language support
  const tracks = [
    {
      id: 1,
      title: { en: 'Gentle Rain', ta: 'மென்மையான மழை', hi: 'हल्की बारिश' },
      subtitle: { en: 'Nature Sounds', ta: 'இயற்கை ஒலிகள்', hi: 'प्रकृति की आवाज़ें' },
      icon: FaWater,
      color: 'from-blue-400 to-cyan-400',
      duration: 300,
      audioUrl: 'https://www.soundjay.com/misc/sounds-767.mp3' // Placeholder - use real URL
    },
    {
      id: 2,
      title: { en: 'Ocean Waves', ta: 'கடல் அலைகள்', hi: 'समुद्री लहरें' },
      subtitle: { en: 'Deep Relaxation', ta: 'ஆழ்ந்த ஓய்வு', hi: 'गहन आराम' },
      icon: FaWater,
      color: 'from-teal-400 to-blue-500',
      duration: 420,
      audioUrl: 'https://www.soundjay.com/misc/sounds-767.mp3'
    },
    {
      id: 3,
      title: { en: 'Soft Flute', ta: 'மென்மையான புல்லாங்குழல்', hi: 'कोमल बांसुरी' },
      subtitle: { en: 'Indian Classical', ta: 'இந்திய பாரம்பரிய இசை', hi: 'भारतीय शास्त्रीय' },
      icon: FaMusic,
      color: 'from-orange-400 to-pink-400',
      duration: 360,
      audioUrl: 'https://www.soundjay.com/misc/sounds-767.mp3'
    },
    {
      id: 4,
      title: { en: 'Birds Chirping', ta: 'பறவைகள் கீச்சிடும் ஒலி', hi: 'चिड़ियों की चहचहाहट' },
      subtitle: { en: 'Morning Calm', ta: 'காலை அமைதி', hi: 'सुबह की शांति' },
      icon: FaSun,
      color: 'from-yellow-400 to-orange-400',
      duration: 240,
      audioUrl: 'https://www.soundjay.com/misc/sounds-767.mp3'
    },
    {
      id: 5,
      title: { en: 'Night Crickets', ta: 'இரவு கிரிக்கெட்டுகள்', hi: 'रात के झींगुर' },
      subtitle: { en: 'Sleep Aid', ta: 'தூக்க உதவி', hi: 'नींद सहायक' },
      icon: FaMoon,
      color: 'from-indigo-400 to-purple-500',
      duration: 600,
      audioUrl: 'https://www.soundjay.com/misc/sounds-767.mp3'
    }
  ];

  // 4-7-8 Breathing exercise
  const startBreathingExercise = () => {
    setBreathingActive(true);
    let phase = 0; // 0: inhale, 1: hold, 2: exhale
    
    const breathingCycle = () => {
      if (phase === 0) {
        setBreathPhase('inhale');
        setTimeout(() => { phase = 1; breathingCycle(); }, 4000); // 4 seconds inhale
      } else if (phase === 1) {
        setBreathPhase('hold');
        setTimeout(() => { phase = 2; breathingCycle(); }, 7000); // 7 seconds hold
      } else {
        setBreathPhase('exhale');
        setTimeout(() => { phase = 0; breathingCycle(); }, 8000); // 8 seconds exhale
      }
    };
    
    breathingCycle();
  };

  const stopBreathingExercise = () => {
    setBreathingActive(false);
    setBreathPhase('inhale');
    if (breathingInterval.current) {
      clearInterval(breathingInterval.current);
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // In real implementation, would play actual audio
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getLocalizedText = (obj) => {
    if (typeof obj === 'string') return obj;
    return obj[language] || obj.en || '';
  };

  return (
    <div className="pb-32 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 min-h-screen">
      {/* Header */}
      <motion.div 
        className="p-4 bg-white/80 backdrop-blur-lg sticky top-0 z-10 border-b border-purple-100"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
              <FaWind className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                {t('relaxTime') || 'Relax Time'}
              </h1>
              <p className="text-sm text-gray-500">
                {t('forMothers') || 'For Mothers'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs text-gray-500">{t('ready') || 'Ready'}</span>
          </div>
        </div>
      </motion.div>

      {/* Breathing Exercise Card */}
      <motion.div 
        className="mx-4 mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-3xl p-6 text-white shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <FaWind className="text-2xl" />
              </div>
              <div>
                <h2 className="font-bold text-lg">{t('breathingExercise') || 'Breathing Exercise'}</h2>
                <p className="text-sm text-white/80">4-7-8 Technique</p>
              </div>
            </div>
            <button
              onClick={breathingActive ? stopBreathingExercise : startBreathingExercise}
              className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${
                breathingActive 
                  ? 'bg-white text-teal-600' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              {breathingActive ? (t('stop') || 'Stop') : (t('start') || 'Start')}
            </button>
          </div>

          {/* Breathing Animation */}
          {breathingActive && (
            <motion.div 
              className="flex flex-col items-center py-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center"
                animate={{
                  scale: breathPhase === 'inhale' ? 1.5 : breathPhase === 'hold' ? 1.5 : 1,
                  opacity: breathPhase === 'inhale' ? 1 : breathPhase === 'hold' ? 0.8 : 0.5,
                }}
                transition={{ duration: breathPhase === 'inhale' ? 4 : breathPhase === 'hold' ? 7 : 8 }}
              >
                <motion.div
                  className="w-24 h-24 bg-white/30 rounded-full flex items-center justify-center"
                  animate={{
                    scale: breathPhase === 'inhale' ? 1.2 : breathPhase === 'hold' ? 1.2 : 1,
                  }}
                  transition={{ duration: breathPhase === 'inhale' ? 4 : breathPhase === 'hold' ? 7 : 8 }}
                >
                  <span className="text-2xl font-bold">
                    {breathPhase === 'inhale' && ' inhale '}
                    {breathPhase === 'hold' && 'hold '}
                    {breathPhase === 'exhale' && 'exhale '}
                  </span>
                </motion.div>
              </motion.div>
              <p className="mt-4 text-sm text-white/90">
                {breathPhase === 'inhale' && (t('inhaleFor4') || 'Inhale for 4 seconds')}
                {breathPhase === 'hold' && (t('holdFor7') || 'Hold for 7 seconds')}
                {breathPhase === 'exhale' && (t('exhaleFor8') || 'Exhale for 8 seconds')}
              </p>
            </motion.div>
          )}

          {!breathingActive && (
            <div className="text-center py-4">
              <p className="text-sm text-white/80">
                {t('breathingDesc') || '4-7-8 breathing helps reduce anxiety and promotes better sleep during pregnancy'}
              </p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Music Player Card */}
      <motion.div 
        className="mx-4 mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="bg-white rounded-3xl p-5 shadow-lg border border-purple-100">
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${tracks[currentTrack].color} flex items-center justify-center shadow-lg`}>
              {React.createElement(tracks[currentTrack].icon, { className: "text-white text-3xl" })}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-800 text-lg">
                {getLocalizedText(tracks[currentTrack].title)}
              </h3>
              <p className="text-sm text-gray-500">
                {getLocalizedText(tracks[currentTrack].subtitle)}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs text-gray-400">
                  {formatTime(currentTime)} / {formatTime(tracks[currentTrack].duration)}
                </span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div 
                className={`h-full bg-gradient-to-r ${tracks[currentTrack].color}`}
                initial={{ width: 0 }}
                animate={{ width: `${(currentTime / tracks[currentTrack].duration) * 100}%` }}
              />
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6">
            <button 
              onClick={() => setCurrentTrack((prev) => (prev === 0 ? tracks.length - 1 : prev - 1))}
              className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
            >
              <FaStepBackward />
            </button>
            
            <button 
              onClick={togglePlay}
              className={`w-16 h-16 rounded-full bg-gradient-to-r ${tracks[currentTrack].color} flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all active:scale-95`}
            >
              {isPlaying ? <FaPause className="text-2xl" /> : <FaPlay className="text-2xl ml-1" />}
            </button>
            
            <button 
              onClick={() => setCurrentTrack((prev) => (prev === tracks.length - 1 ? 0 : prev + 1))}
              className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
            >
              <FaStepForward />
            </button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-3 mt-4 px-4">
            <button onClick={() => setIsMuted(!isMuted)} className="text-gray-400 hover:text-gray-600">
              {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
            </button>
            <input
              type="range"
              min="0"
              max="100"
              value={isMuted ? 0 : volume}
              onChange={(e) => setVolume(parseInt(e.target.value))}
              className="flex-1 h-1 bg-gray-200 rounded-full appearance-none cursor-pointer"
            />
            <span className="text-xs text-gray-500 w-8">{isMuted ? 0 : volume}%</span>
          </div>
        </div>
      </motion.div>

      {/* Track List */}
      <motion.div 
        className="mx-4 mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="font-bold text-gray-800 mb-3 px-1">
          {t('moreSounds') || 'More Relaxing Sounds'}
        </h2>
        <div className="space-y-3">
          {tracks.map((track, index) => (
            <motion.button
              key={track.id}
              onClick={() => setCurrentTrack(index)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${
                currentTrack === index 
                  ? 'bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200' 
                  : 'bg-white border border-gray-100 hover:border-purple-200'
              }`}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${track.color} flex items-center justify-center`}>
                <track.icon className="text-white" />
              </div>
              <div className="flex-1 text-left">
                <p className={`font-semibold ${currentTrack === index ? 'text-purple-700' : 'text-gray-800'}`}>
                  {getLocalizedText(track.title)}
                </p>
                <p className="text-xs text-gray-500">
                  {getLocalizedText(track.subtitle)} • {formatTime(track.duration)}
                </p>
              </div>
              {currentTrack === index && isPlaying && (
                <div className="flex gap-0.5">
                  <motion.div 
                    className="w-1 h-4 bg-purple-500 rounded-full"
                    animate={{ height: [16, 8, 16] }}
                    transition={{ repeat: Infinity, duration: 0.5 }}
                  />
                  <motion.div 
                    className="w-1 h-4 bg-purple-500 rounded-full"
                    animate={{ height: [16, 12, 16] }}
                    transition={{ repeat: Infinity, duration: 0.5, delay: 0.1 }}
                  />
                  <motion.div 
                    className="w-1 h-4 bg-purple-500 rounded-full"
                    animate={{ height: [16, 6, 16] }}
                    transition={{ repeat: Infinity, duration: 0.5, delay: 0.2 }}
                  />
                </div>
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Benefits Section */}
      <motion.div 
        className="mx-4 mt-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-4 border border-pink-100">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <FaHeart className="text-pink-500" />
            {t('benefitsForMothers') || 'Benefits for Mothers'}
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: FaMoon, text: t('betterSleep') || 'Better Sleep', color: 'text-indigo-500' },
              { icon: FaHeart, text: t('reducedStress') || 'Reduced Stress', color: 'text-pink-500' },
              { icon: FaWind, text: t('calmMind') || 'Calm Mind', color: 'text-teal-500' },
              { icon: FaBaby, text: t('babyBonding') || 'Baby Bonding', color: 'text-purple-500' },
            ].map((benefit, index) => (
              <div key={index} className="flex items-center gap-2 bg-white/70 rounded-xl p-3">
                <benefit.icon className={`${benefit.color}`} />
                <span className="text-sm text-gray-700 font-medium">{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Relax;
