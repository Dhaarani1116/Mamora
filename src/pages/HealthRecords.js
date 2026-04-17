import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaFileMedical, FaArrowLeft, FaTrash, FaDownload, FaCalendarAlt } from 'react-icons/fa';
import { format } from 'date-fns';
import { useLanguage } from '../contexts/LanguageContext';

const HealthRecords = () => {
  const { t } = useLanguage();
  const [records, setRecords] = useState([]);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const reports = JSON.parse(localStorage.getItem('maatrucare_reports') || '[]');
    const nutrition = JSON.parse(localStorage.getItem('maatrucare_nutrition') || '[]');
    const reminders = JSON.parse(localStorage.getItem('maatrucare_reminders') || '[]');
    
    const allRecords = [
      ...reports.map(r => ({ ...r, type: 'report' })),
      ...nutrition.map(n => ({ ...n, type: 'nutrition' })),
      ...reminders.map(r => ({ ...r, type: 'reminder' })),
    ].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    setRecords(allRecords);
  }, []);

  const deleteRecord = (index) => {
    const newRecords = [...records];
    newRecords.splice(index, 1);
    setRecords(newRecords);
    // Update localStorage
    localStorage.setItem('maatrucare_reports', JSON.stringify(newRecords.filter(r => r.type === 'report')));
    localStorage.setItem('maatrucare_nutrition', JSON.stringify(newRecords.filter(r => r.type === 'nutrition')));
  };

  const filteredRecords = activeTab === 'all' ? records : records.filter(r => r.type === activeTab);

  const getRecordIcon = (type) => {
    switch(type) {
      case 'report': return <FaFileMedical className="text-blue-500" />;
      case 'nutrition': return <span className="text-2xl">🥗</span>;
      case 'reminder': return <FaCalendarAlt className="text-purple-500" />;
      default: return <FaFileMedical className="text-gray-500" />;
    }
  };

  const getRecordColor = (type) => {
    switch(type) {
      case 'report': return 'bg-blue-50 border-blue-200';
      case 'nutrition': return 'bg-green-50 border-green-200';
      case 'reminder': return 'bg-purple-50 border-purple-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="pb-24 p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold gradient-text mb-2">{t('records')}</h1>
        <p className="text-gray-600 text-sm">Your complete health history</p>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        {['all', 'report', 'nutrition', 'reminder'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === tab 
                ? 'bg-pink-500 text-white' 
                : 'bg-white text-gray-600 border border-gray-200'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: 'Total Records', value: records.length, color: 'bg-pink-100 text-pink-700' },
          { label: 'Reports', value: records.filter(r => r.type === 'report').length, color: 'bg-blue-100 text-blue-700' },
          { label: 'This Month', value: records.filter(r => new Date(r.date).getMonth() === new Date().getMonth()).length, color: 'bg-green-100 text-green-700' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            className={`card ${stat.color} text-center`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-xs">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        {filteredRecords.length === 0 ? (
          <motion.div
            className="card text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-6xl mb-4">📋</div>
            <p className="text-gray-500">No records yet</p>
            <p className="text-sm text-gray-400 mt-1">Start by uploading a report or getting nutrition advice</p>
          </motion.div>
        ) : (
          filteredRecords.map((record, index) => (
            <motion.div
              key={index}
              className={`card ${getRecordColor(record.type)} relative`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center">
                    {getRecordIcon(record.type)}
                  </div>
                  <div className="w-0.5 flex-1 bg-gray-200 my-2" />
                </div>
                
                <div className="flex-1 pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="badge bg-white/80 text-xs mb-2 inline-block">
                        {record.type.charAt(0).toUpperCase() + record.type.slice(1)}
                      </span>
                      <p className="text-xs text-gray-400">
                        {format(new Date(record.date), 'MMM dd, yyyy • h:mm a')}
                      </p>
                    </div>
                    <button 
                      onClick={() => deleteRecord(index)}
                      className="text-red-400 hover:text-red-600 p-1"
                    >
                      <FaTrash className="text-sm" />
                    </button>
                  </div>

                  {record.type === 'report' && (
                    <div className="mt-3">
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div className="bg-white/70 rounded-lg p-2">
                          <p className="text-xs text-gray-500">Hb</p>
                          <p className="font-semibold">{record.hemoglobin?.value || '--'}</p>
                        </div>
                        <div className="bg-white/70 rounded-lg p-2">
                          <p className="text-xs text-gray-500">BP</p>
                          <p className="font-semibold">{record.bloodPressure?.systolic || '--'}</p>
                        </div>
                        <div className="bg-white/70 rounded-lg p-2">
                          <p className="text-xs text-gray-500">Score</p>
                          <p className="font-semibold">{record.healthScore || '--'}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`badge ${
                          record.riskLevel === 'high' ? 'badge-danger' :
                          record.riskLevel === 'medium' ? 'badge-warning' :
                          'badge-success'
                        }`}>
                          {record.riskLevel?.toUpperCase() || 'Unknown'} RISK
                        </span>
                      </div>
                    </div>
                  )}

                  {record.type === 'nutrition' && (
                    <div className="mt-3">
                      <p className="text-sm text-gray-700 mb-2">Symptoms: {record.symptoms}</p>
                      <p className="text-sm font-medium text-pink-600">
                        {record.recommendations?.condition}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {record.recommendations?.foods?.slice(0, 3).map((food, i) => (
                          <span key={i} className="text-xs bg-white px-2 py-1 rounded-full">
                            {food.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {record.type === 'reminder' && (
                    <div className="mt-3">
                      <p className="font-medium text-gray-800">{record.title}</p>
                      <p className="text-sm text-gray-600">{record.time} • {record.frequency}</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Export Button */}
      {records.length > 0 && (
        <motion.button
          className="btn-secondary w-full mt-6 flex items-center justify-center gap-2"
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            const data = JSON.stringify(records, null, 2);
            const blob = new Blob([data], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'maatrucare-health-records.json';
            a.click();
          }}
        >
          <FaDownload /> Export All Records
        </motion.button>
      )}
    </div>
  );
};

export default HealthRecords;
