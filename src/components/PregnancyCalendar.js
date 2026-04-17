import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaBaby } from 'react-icons/fa';

const PregnancyCalendar = ({ currentWeek }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();
  
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const navigateMonth = (direction) => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + direction, 1));
  };

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  const days = getDaysInMonth(selectedDate);
  const isToday = (day) => {
    return day === today.getDate() && 
           selectedDate.getMonth() === today.getMonth() && 
           selectedDate.getFullYear() === today.getFullYear();
  };

  // Calculate milestone dates
  const conceptionDate = new Date(today);
  conceptionDate.setDate(today.getDate() - (currentWeek * 7));
  const dueDate = new Date(conceptionDate);
  dueDate.setDate(conceptionDate.getDate() + 280);

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => navigateMonth(-1)} className="p-2 hover:bg-gray-100 rounded-full">
          <FaChevronLeft />
        </button>
        <h3 className="font-semibold text-gray-800">
          {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
        </h3>
        <button onClick={() => navigateMonth(1)} className="p-2 hover:bg-gray-100 rounded-full">
          <FaChevronRight />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {weekDays.map(day => (
          <span key={day} className="text-xs text-gray-400 font-medium">{day}</span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => (
          <motion.button
            key={index}
            className={`aspect-square rounded-lg flex items-center justify-center text-sm relative ${
              day ? 'hover:bg-pink-50' : ''
            } ${isToday(day) ? 'bg-pink-500 text-white font-bold' : 'text-gray-700'}`}
            whileTap={day ? { scale: 0.9 } : {}}
          >
            {day}
            {day && day % 7 === 0 && (
              <div className="absolute bottom-1 w-1 h-1 bg-green-400 rounded-full" />
            )}
          </motion.button>
        ))}
      </div>

      {/* Milestones */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2 text-sm">
          <FaBaby className="text-pink-500" />
          <span className="text-gray-600">Due Date:</span>
          <span className="font-semibold text-pink-600">
            {dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PregnancyCalendar;
