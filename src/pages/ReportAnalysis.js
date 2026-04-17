import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCloudUploadAlt, FaFileMedical, FaCheckCircle, FaExclamationTriangle, FaExclamationCircle } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';

const ReportAnalysis = () => {
  const { t } = useLanguage();
  const [file, setFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileUpload = (e) => {
    const uploaded = e.target.files[0];
    if (uploaded) {
      setFile(uploaded);
      analyzeReport();
    }
  };

  const analyzeReport = () => {
    setAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockResults = {
        hemoglobin: { value: (10 + Math.random() * 4).toFixed(1), unit: 'g/dL', normal: '11.5-15.5' },
        bloodPressure: { systolic: Math.floor(100 + Math.random() * 40), diastolic: Math.floor(60 + Math.random() * 30) },
        bloodSugar: { fasting: Math.floor(70 + Math.random() * 30), postMeal: Math.floor(100 + Math.random() * 60) },
      };

      // Determine risk level
      let riskLevel = 'low';
      const healthScore = calculateHealthScore(mockResults);
      
      if (healthScore < 60) riskLevel = 'high';
      else if (healthScore < 80) riskLevel = 'medium';

      setResult({
        ...mockResults,
        riskLevel,
        healthScore,
        recommendations: generateRecommendations(mockResults, riskLevel)
      });
      
      setAnalyzing(false);
      
      // Save to history
      const history = JSON.parse(localStorage.getItem('maatrucare_reports') || '[]');
      history.push({
        date: new Date().toISOString(),
        ...mockResults,
        riskLevel,
        healthScore
      });
      localStorage.setItem('maatrucare_reports', JSON.stringify(history));
    }, 3000);
  };

  const calculateHealthScore = (results) => {
    let score = 100;
    const hb = parseFloat(results.hemoglobin.value);
    if (hb < 11) score -= 20;
    if (results.bloodPressure.systolic > 140) score -= 15;
    if (results.bloodSugar.fasting > 100) score -= 10;
    return Math.max(0, score);
  };

  const generateRecommendations = (results, riskLevel) => {
    const recs = [];
    const hb = parseFloat(results.hemoglobin.value);
    
    if (hb < 11) {
      recs.push({
        type: 'warning',
        title: 'Low Hemoglobin Detected',
        description: 'Your hemoglobin is below normal. Increase iron-rich foods like spinach, beetroot, and jaggery.',
        action: 'View Diet Plan'
      });
    }
    
    if (results.bloodPressure.systolic > 140) {
      recs.push({
        type: 'danger',
        title: 'High Blood Pressure',
        description: 'Monitor your BP daily. Reduce salt intake and consult your doctor.',
        action: 'Book Appointment'
      });
    }
    
    if (riskLevel === 'low') {
      recs.push({
        type: 'success',
        title: 'Great Health!',
        description: 'Your vitals look good. Keep maintaining a healthy lifestyle.',
        action: 'View Tips'
      });
    }
    
    return recs;
  };

  const getRiskColor = (level) => {
    switch(level) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-green-100 text-green-700 border-green-200';
    }
  };

  const getRiskIcon = (level) => {
    switch(level) {
      case 'high': return <FaExclamationCircle className="text-red-500" />;
      case 'medium': return <FaExclamationTriangle className="text-yellow-500" />;
      default: return <FaCheckCircle className="text-green-500" />;
    }
  };

  return (
    <div className="pb-24 p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold gradient-text mb-2">{t('uploadReport')}</h1>
        <p className="text-gray-600 text-sm">Upload your medical report for AI analysis</p>
      </motion.div>

      {/* Upload Area */}
      <motion.div
        className="card border-dashed border-2 border-pink-300 bg-pink-50/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="text-center py-8">
          <motion.div
            className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg mb-4"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <FaCloudUploadAlt className="text-4xl text-pink-500" />
          </motion.div>
          
          <p className="text-gray-600 mb-4">{t('uploadImage')}</p>
          
          <label className="btn-primary cursor-pointer inline-block">
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileUpload}
              className="hidden"
            />
            Choose File
          </label>
          
          <p className="text-xs text-gray-400 mt-3">Supports: JPG, PNG, PDF</p>
        </div>
      </motion.div>

      {/* Analysis Progress */}
      {analyzing && (
        <motion.div
          className="card mt-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="text-center py-6">
            <motion.div
              className="w-16 h-16 mx-auto border-4 border-pink-200 border-t-pink-500 rounded-full mb-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <p className="text-lg font-semibold text-gray-800">{t('analyzing')}</p>
            <p className="text-sm text-gray-500 mt-2">Extracting vitals with AI...</p>
            
            <div className="mt-4 space-y-2">
              {['Scanning document...', 'Reading hemoglobin levels...', 'Analyzing BP readings...', 'Generating report...'].map((step, i) => (
                <motion.p
                  key={step}
                  className="text-xs text-gray-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.5 }}
                >
                  {step}
                </motion.p>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Results */}
      {result && (
        <motion.div
          className="space-y-4 mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Risk Level */}
          <div className={`card ${getRiskColor(result.riskLevel)}`}>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                {getRiskIcon(result.riskLevel)}
              </div>
              <div>
                <p className="text-sm opacity-80">{t('riskLevel')}</p>
                <p className="text-2xl font-bold capitalize">{result.riskLevel} Risk</p>
                <p className="text-sm">Health Score: {result.healthScore}/100</p>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="progress-bar mt-4 bg-white/50">
              <motion.div
                className={`progress-bar-fill ${
                  result.riskLevel === 'high' ? 'bg-red-500' : 
                  result.riskLevel === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                }`}
                initial={{ width: 0 }}
                animate={{ width: `${result.healthScore}%` }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>

          {/* Vitals Grid */}
          <div className="grid grid-cols-2 gap-3">
            {/* Hemoglobin */}
            <div className="card">
              <p className="text-xs text-gray-500 mb-1">{t('hemoglobin')}</p>
              <p className="text-2xl font-bold text-gray-800">{result.hemoglobin.value}</p>
              <p className="text-xs text-gray-400">{result.hemoglobin.unit}</p>
              <p className="text-xs text-gray-400">Normal: {result.hemoglobin.normal}</p>
              {parseFloat(result.hemoglobin.value) < 11 && (
                <span className="badge-danger mt-2">Low</span>
              )}
            </div>

            {/* Blood Pressure */}
            <div className="card">
              <p className="text-xs text-gray-500 mb-1">{t('bloodPressure')}</p>
              <p className="text-2xl font-bold text-gray-800">
                {result.bloodPressure.systolic}/{result.bloodPressure.diastolic}
              </p>
              <p className="text-xs text-gray-400">mmHg</p>
              <p className="text-xs text-gray-400">Normal: 120/80</p>
              {result.bloodPressure.systolic > 140 && (
                <span className="badge-warning mt-2">Elevated</span>
              )}
            </div>

            {/* Blood Sugar */}
            <div className="card">
              <p className="text-xs text-gray-500 mb-1">{t('bloodSugar')} (Fasting)</p>
              <p className="text-2xl font-bold text-gray-800">{result.bloodSugar.fasting}</p>
              <p className="text-xs text-gray-400">mg/dL</p>
              <p className="text-xs text-gray-400">Normal: 70-100</p>
            </div>

            {/* Health Trend */}
            <div className="card bg-gradient-to-br from-pink-50 to-purple-50">
              <p className="text-xs text-gray-500 mb-1">Health Trend</p>
              <p className="text-2xl font-bold text-gray-800">↗️ +2%</p>
              <p className="text-xs text-gray-400">vs last month</p>
            </div>
          </div>

          {/* Recommendations */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-800">AI Recommendations</h3>
            {result.recommendations.map((rec, index) => (
              <motion.div
                key={index}
                className={`card border-l-4 ${
                  rec.type === 'danger' ? 'border-l-red-500 bg-red-50' :
                  rec.type === 'warning' ? 'border-l-yellow-500 bg-yellow-50' :
                  'border-l-green-500 bg-green-50'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <h4 className="font-semibold text-gray-800">{rec.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{rec.description}</p>
                <button className="text-sm text-pink-600 font-medium mt-2 hover:underline">
                  {rec.action} →
                </button>
              </motion.div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button 
              onClick={() => setResult(null)}
              className="btn-secondary flex-1"
            >
              Upload New Report
            </button>
            <button className="btn-primary flex-1">
              Share with Doctor
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ReportAnalysis;
