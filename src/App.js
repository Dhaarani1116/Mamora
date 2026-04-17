import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { LanguageProvider } from './contexts/LanguageContext';
import { OfflineProvider } from './contexts/OfflineContext';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Nutrition from './pages/Nutrition';
import ReportAnalysis from './pages/ReportAnalysis';
import HealthRecords from './pages/HealthRecords';
import Emergency from './pages/Emergency';
import Reminders from './pages/Reminders';
import NearbyHospitals from './pages/NearbyHospitals';
import Pharmacy from './pages/Pharmacy';
import Chatbot from './pages/Chatbot';
import Relax from './pages/Relax';
import Exercises from './pages/Exercises';
import BottomNav from './components/BottomNav';
import InstallPrompt from './components/InstallPrompt';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showInstall, setShowInstall] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setShowInstall(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('maatrucare_user', JSON.stringify({ id: 1, name: 'User' }));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('maatrucare_user');
  };

  return (
    <LanguageProvider>
      <OfflineProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
            <AnimatePresence mode="wait">
              <Routes>
                <Route 
                  path="/login" 
                  element={
                    isAuthenticated ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />
                  } 
                />
                <Route 
                  path="/" 
                  element={
                    isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
                  } 
                />
                <Route 
                  path="/dashboard" 
                  element={
                    isAuthenticated ? (
                      <>
                        <Dashboard onLogout={handleLogout} />
                        <BottomNav />
                      </>
                    ) : <Navigate to="/login" />
                  } 
                />
                <Route 
                  path="/nutrition" 
                  element={
                    isAuthenticated ? (
                      <>
                        <Nutrition />
                        <BottomNav />
                      </>
                    ) : <Navigate to="/login" />
                  } 
                />
                <Route 
                  path="/reports" 
                  element={
                    isAuthenticated ? (
                      <>
                        <ReportAnalysis />
                        <BottomNav />
                      </>
                    ) : <Navigate to="/login" />
                  } 
                />
                <Route 
                  path="/records" 
                  element={
                    isAuthenticated ? (
                      <>
                        <HealthRecords />
                        <BottomNav />
                      </>
                    ) : <Navigate to="/login" />
                  } 
                />
                <Route 
                  path="/emergency" 
                  element={
                    isAuthenticated ? (
                      <>
                        <Emergency />
                        <BottomNav />
                      </>
                    ) : <Navigate to="/login" />
                  } 
                />
                <Route 
                  path="/reminders" 
                  element={
                    isAuthenticated ? (
                      <>
                        <Reminders />
                        <BottomNav />
                      </>
                    ) : <Navigate to="/login" />
                  } 
                />
                <Route 
                  path="/hospitals" 
                  element={
                    isAuthenticated ? (
                      <>
                        <NearbyHospitals />
                        <BottomNav />
                      </>
                    ) : <Navigate to="/login" />
                  } 
                />
                <Route 
                  path="/pharmacy" 
                  element={
                    isAuthenticated ? (
                      <>
                        <Pharmacy />
                        <BottomNav />
                      </>
                    ) : <Navigate to="/login" />
                  } 
                />
                <Route 
                  path="/chatbot" 
                  element={
                    isAuthenticated ? (
                      <>
                        <Chatbot />
                        <BottomNav />
                      </>
                    ) : <Navigate to="/login" />
                  } 
                />
                <Route 
                  path="/relax" 
                  element={
                    isAuthenticated ? (
                      <>
                        <Relax />
                        <BottomNav />
                      </>
                    ) : <Navigate to="/login" />
                  } 
                />
                <Route 
                  path="/exercises" 
                  element={
                    isAuthenticated ? (
                      <>
                        <Exercises />
                        <BottomNav />
                      </>
                    ) : <Navigate to="/login" />
                  } 
                />
              </Routes>
            </AnimatePresence>
            {showInstall && <InstallPrompt onClose={() => setShowInstall(false)} />}
          </div>
        </Router>
      </OfflineProvider>
    </LanguageProvider>
  );
}

export default App;
