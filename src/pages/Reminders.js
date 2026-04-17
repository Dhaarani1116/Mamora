import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaPlus, FaBell, FaClock, FaCalendarAlt, FaTrash, FaCheck, 
  FaTimes, FaVolumeUp, FaPills, FaWalking, FaTint, FaHeartbeat,
  FaChevronLeft, FaChevronRight
} from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';

// Calendar Component
const Calendar = ({ onDateSelect, markedDates }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const handleDateClick = (day) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDate(dateStr);
    onDateSelect(dateStr);
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const hasEvent = (day) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return markedDates.includes(dateStr);
  };

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-full">
          <FaChevronLeft />
        </button>
        <h3 className="font-bold text-gray-800">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-full">
          <FaChevronRight />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map(day => (
          <div key={day} className="text-center text-xs text-gray-500 py-1">{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {[...Array(firstDayOfMonth)].map((_, i) => <div key={`empty-${i}`} />)}
        {[...Array(daysInMonth)].map((_, i) => {
          const day = i + 1;
          const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const isSelected = selectedDate === dateStr;
          const hasMarkedEvent = hasEvent(day);
          const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();

          return (
            <button
              key={day}
              onClick={() => handleDateClick(day)}
              className={`aspect-square rounded-lg flex items-center justify-center text-sm relative ${
                isSelected ? 'bg-pink-500 text-white' :
                isToday ? 'bg-pink-100 text-pink-600' :
                hasMarkedEvent ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
              }`}
            >
              {day}
              {hasMarkedEvent && !isSelected && <div className="absolute bottom-1 w-1 h-1 bg-blue-500 rounded-full" />}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const Reminders = () => {
  const { t, language } = useLanguage();
  const [reminders, setReminders] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [markedDates, setMarkedDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [alarmRinging, setAlarmRinging] = useState(null);
  const [newReminder, setNewReminder] = useState({
    title: '',
    time: '',
    frequency: 'daily',
    type: 'medicine',
    date: ''
  });

  // Get translations based on language
  const getTypeLabel = (type) => {
    const labels = {
      en: { medicine: 'Medicine', appointment: 'Appointment', exercise: 'Exercise', water: 'Water' },
      ta: { medicine: 'மருந்து', appointment: 'நேரம்', exercise: 'உடற்பயிற்சி', water: 'தண்ணீர்' },
      hi: { medicine: 'दवा', appointment: 'नियुक्ति', exercise: 'व्यायाम', water: 'पानी' }
    };
    return labels[language]?.[type] || labels.en[type];
  };

  const getFrequencyLabel = (freq) => {
    const labels = {
      en: { daily: 'Daily', weekly: 'Weekly', monthly: 'Monthly', once: 'Once' },
      ta: { daily: 'தினமும்', weekly: 'வாரந்தோறும்', monthly: 'மாதந்தோறும்', once: 'ஒருமுறை' },
      hi: { daily: 'रोजाना', weekly: 'साप्ताहिक', monthly: 'मासिक', once: 'एक बार' }
    };
    return labels[language]?.[freq] || labels.en[freq];
  };

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('maatrucare_reminders') || '[]');
    const savedDates = JSON.parse(localStorage.getItem('maatrucare_calendar_dates') || '[]');
    setReminders(saved);
    setMarkedDates(savedDates);
    
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }

    const alarmInterval = setInterval(checkAlarms, 60000);
    return () => clearInterval(alarmInterval);
  }, [reminders]);

  const checkAlarms = () => {
    const now = new Date();
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    reminders.forEach(reminder => {
      if (reminder.active && reminder.time === currentTime) {
        triggerAlarm(reminder);
      }
    });
  };

  const triggerAlarm = (reminder) => {
    setAlarmRinging(reminder);
    
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(t('reminderAlert') || '⏰ Reminder!', {
        body: reminder.title,
        icon: '/logo192.png',
        tag: reminder.id,
        requireInteraction: true,
      });
    }
  };

  const stopAlarm = () => setAlarmRinging(null);

  const markDate = (date) => {
    const updated = markedDates.includes(date) 
      ? markedDates.filter(d => d !== date)
      : [...markedDates, date];
    setMarkedDates(updated);
    localStorage.setItem('maatrucare_calendar_dates', JSON.stringify(updated));
  };

  const addReminder = () => {
    if (!newReminder.title || !newReminder.time) return;
    
    const reminder = {
      id: Date.now(),
      ...newReminder,
      active: true,
      date: new Date().toISOString()
    };
    
    const updated = [...reminders, reminder];
    setReminders(updated);
    localStorage.setItem('maatrucare_reminders', JSON.stringify(updated));
    
    // Schedule notification
    scheduleNotification(reminder);
    
    setShowAdd(false);
    setNewReminder({ title: '', time: '', frequency: 'daily', type: 'medicine' });
  };

  const scheduleNotification = (reminder) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      const [hours, minutes] = reminder.time.split(':');
      const now = new Date();
      const reminderTime = new Date();
      reminderTime.setHours(parseInt(hours), parseInt(minutes), 0);
      
      if (reminderTime <= now) {
        reminderTime.setDate(reminderTime.getDate() + 1);
      }
      
      const timeout = reminderTime.getTime() - now.getTime();
      
      setTimeout(() => {
        new Notification('MaatruCare Reminder', {
          body: reminder.title,
          icon: '/logo192.png',
          badge: '/logo192.png',
          tag: reminder.id,
          requireInteraction: true,
        });
      }, timeout);
    }
  };

  const toggleReminder = (id) => {
    const updated = reminders.map(r => 
      r.id === id ? { ...r, active: !r.active } : r
    );
    setReminders(updated);
    localStorage.setItem('maatrucare_reminders', JSON.stringify(updated));
  };

  const deleteReminder = (id) => {
    const updated = reminders.filter(r => r.id !== id);
    setReminders(updated);
    localStorage.setItem('maatrucare_reminders', JSON.stringify(updated));
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'medicine': return <FaPills />;
      case 'appointment': return <FaHeartbeat />;
      case 'exercise': return <FaWalking />;
      case 'water': return <FaTint />;
      default: return <FaBell />;
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'medicine': return 'bg-blue-100 text-blue-700';
      case 'appointment': return 'bg-green-100 text-green-700';
      case 'exercise': return 'bg-purple-100 text-purple-700';
      case 'water': return 'bg-cyan-100 text-cyan-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="pb-24 p-4 bg-gradient-to-br from-pink-50 to-purple-50 min-h-screen">
      {/* Alarm Modal */}
      <AnimatePresence>
        {alarmRinging && (
          <motion.div
            className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-3xl p-8 text-center max-w-sm w-full"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <FaVolumeUp className="text-4xl text-red-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{t('alarm') || '⏰ Alarm!'}</h2>
              <p className="text-lg text-gray-600 mb-6">{alarmRinging.title}</p>
              <p className="text-sm text-gray-500 mb-6">{alarmRinging.time}</p>
              <button
                onClick={stopAlarm}
                className="w-full py-3 bg-red-500 text-white rounded-xl font-bold text-lg"
              >
                {t('stopAlarm') || 'Stop Alarm'}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center mb-6"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">{t('reminders') || 'Reminders'}</h1>
          <p className="text-gray-600 text-sm">{t('remindersDesc') || 'Never miss your medicines or appointments'}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowCalendar(!showCalendar)}
            className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-colors ${
              showCalendar ? 'bg-purple-500 text-white' : 'bg-white text-purple-500'
            }`}
          >
            <FaCalendarAlt />
          </button>
          <button
            onClick={() => setShowAdd(true)}
            className="w-12 h-12 rounded-full bg-pink-500 text-white flex items-center justify-center shadow-lg hover:bg-pink-600 transition-colors"
          >
            <FaPlus />
          </button>
        </div>
      </motion.div>

      {/* Calendar */}
      <AnimatePresence>
        {showCalendar && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6"
          >
            <Calendar 
              onDateSelect={(date) => {
                setSelectedDate(date);
                markDate(date);
              }}
              markedDates={markedDates}
            />
            <p className="text-center text-sm text-gray-500 mt-2">
              {t('tapToMark') || 'Tap dates to mark important events'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <motion.div className="bg-white rounded-2xl p-4 shadow-sm" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <p className="text-3xl font-bold text-blue-600">{reminders.filter(r => r.active).length}</p>
          <p className="text-sm text-gray-600">{t('activeReminders') || 'Active'}</p>
        </motion.div>
        <motion.div className="bg-white rounded-2xl p-4 shadow-sm" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}>
          <p className="text-3xl font-bold text-green-600">{reminders.filter(r => r.type === 'medicine').length}</p>
          <p className="text-sm text-gray-600">{t('medicines') || 'Medicines'}</p>
        </motion.div>
      </div>

      {/* Reminders List */}
      <div className="space-y-3">
        <AnimatePresence>
          {reminders.length === 0 ? (
            <motion.div className="bg-white rounded-2xl p-8 text-center shadow-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaBell className="text-3xl text-pink-500" />
              </div>
              <p className="text-gray-500">{t('noReminders') || 'No reminders yet'}</p>
              <p className="text-sm text-gray-400 mt-1">{t('addFirstReminder') || 'Add your first reminder'}</p>
            </motion.div>
          ) : (
            reminders.map((reminder, index) => (
              <motion.div
                key={reminder.id}
                className={`bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm ${!reminder.active ? 'opacity-60' : ''}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className={`w-12 h-12 rounded-xl ${getTypeColor(reminder.type)} flex items-center justify-center text-xl`}>
                  {getTypeIcon(reminder.type)}
                </div>
                <div className="flex-1">
                  <p className={`font-medium ${reminder.active ? 'text-gray-800' : 'text-gray-500 line-through'}`}>
                    {reminder.title}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <FaClock />
                    {reminder.time}
                    <span>•</span>
                    <span>{getFrequencyLabel(reminder.frequency)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleReminder(reminder.id)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                      reminder.active ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    <FaCheck className="text-sm" />
                  </button>
                  <button
                    onClick={() => deleteReminder(reminder.id)}
                    className="w-8 h-8 rounded-full bg-red-100 text-red-500 flex items-center justify-center"
                  >
                    <FaTrash className="text-sm" />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Add Reminder Modal */}
      <AnimatePresence>
        {showAdd && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAdd(false)}
          >
            <motion.div
              className="bg-white rounded-3xl p-6 w-full max-w-md"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">{t('addReminder')}</h3>
                <button onClick={() => setShowAdd(false)} className="p-2 hover:bg-gray-100 rounded-full">
                  <FaTimes />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('reminderType') || 'Type'}</label>
                  <div className="grid grid-cols-4 gap-2">
                    {['medicine', 'appointment', 'exercise', 'water'].map(type => (
                      <button
                        key={type}
                        onClick={() => setNewReminder({...newReminder, type})}
                        className={`p-2 rounded-xl transition-colors ${
                          newReminder.type === type ? 'bg-pink-100 ring-2 ring-pink-500' : 'bg-gray-100'
                        }`}
                      >
                        <div className={`w-8 h-8 mx-auto rounded-lg ${getTypeColor(type)} flex items-center justify-center`}>
                          {getTypeIcon(type)}
                        </div>
                        <span className="text-xs mt-1 block">{getTypeLabel(type)}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('title') || 'Title'}</label>
                  <input
                    type="text"
                    value={newReminder.title}
                    onChange={(e) => setNewReminder({...newReminder, title: e.target.value})}
                    placeholder={t('reminderPlaceholder') || 'E.g., Take folic acid'}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('time')}</label>
                  <input
                    type="time"
                    value={newReminder.time}
                    onChange={(e) => setNewReminder({...newReminder, time: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('frequency')}</label>
                  <select
                    value={newReminder.frequency}
                    onChange={(e) => setNewReminder({...newReminder, frequency: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none"
                  >
                    <option value="daily">{getFrequencyLabel('daily')}</option>
                    <option value="weekly">{getFrequencyLabel('weekly')}</option>
                    <option value="monthly">{getFrequencyLabel('monthly')}</option>
                    <option value="once">{getFrequencyLabel('once')}</option>
                  </select>
                </div>
                <button
                  onClick={addReminder}
                  disabled={!newReminder.title || !newReminder.time}
                  className="w-full py-3 bg-pink-500 text-white rounded-xl font-bold disabled:opacity-50"
                >
                  {t('addReminder')}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Reminders;
