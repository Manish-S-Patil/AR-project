import BackendDemo from "./BackendDemo";
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from './components/ui/toaster';
import LoginPage from './pages/LoginPage';
import IntroductionPage from './pages/IntroductionPage';
import Dashboard from './pages/Dashboard';
import ARScenarios from './pages/ARScenarios';
import Quiz from './pages/Quiz';
import Game from './pages/Game';

function App() {
  return (
    <>
      {/*<BackendDemo />*/}

      <Helmet>
        <title>AR Cybersecurity Awareness Platform</title>
        <meta name="description" content="Augmented Reality as a Catalyst for Cybersecurity Awareness: Empowering Digital Citizens in a Connected World" />
      </Helmet>
      <Router>
        <div className="min-h-screen cyber-grid">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/introduction" element={<IntroductionPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/ar-scenarios" element={<ARScenarios />} />
            <Route path="/quiz/:scenario?" element={<Quiz />} />
            <Route path="/game" element={<Game />} />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </>
  );
}

export default App;