import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from './components/ui/toaster';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import IntroductionPage from './pages/IntroductionPage';
import Dashboard from './pages/Dashboard';
import ARScenarios from './pages/ARScenarios';
import Quiz from './pages/Quiz';
import Game from './pages/Game';
import AdminPanel from './pages/AdminPanel';

function App() {
  return (
    <>
      <Helmet>
        <title>AR Cybersecurity Awareness Platform</title>
        <meta name="description" content="Augmented Reality as a Catalyst for Cybersecurity Awareness: Empowering Digital Citizens in a Connected World" />
      </Helmet>
      <Router>
        <div className="min-h-screen cyber-grid">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route 
              path="/introduction" 
              element={
                <ProtectedRoute>
                  <IntroductionPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/ar-scenarios" 
              element={
                <ProtectedRoute>
                  <ARScenarios />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/quiz/:scenario?" 
              element={
                <ProtectedRoute>
                  <Quiz />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/game" 
              element={
                <ProtectedRoute>
                  <Game />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute requireAdmin={true}>
                  <AdminPanel />
                </ProtectedRoute>
              } 
            />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </>
  );
}

export default App;