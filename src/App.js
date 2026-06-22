import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { LanguageProvider } from './contexts/LanguageContext';
import { OfflineProvider } from './contexts/OfflineContext';

import Login from './pages/Login';
import Dashboard from './pages/MaternalDashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('maatrucare_user') !== null;
  });

  const handleLogin = () => {
    setIsAuthenticated(true);
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
                  path="/dashboard" 
                  element={
                    isAuthenticated ? (
                      <Dashboard onLogout={handleLogout} />
                    ) : <Navigate to="/login" />
                  } 
                />
                <Route 
                  path="*" 
                  element={
                    isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
                  } 
                />
              </Routes>
            </AnimatePresence>
          </div>
        </Router>
      </OfflineProvider>
    </LanguageProvider>
  );
}

export default App;
