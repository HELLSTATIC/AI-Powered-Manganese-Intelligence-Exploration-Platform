import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import ExplorationMap from './pages/ExplorationMap';
import AIAnalysis from './pages/AIAnalysis';
import ProductionAnalytics from './pages/ProductionAnalytics';
import ShortfallAnalysis from './pages/ShortfallAnalysis';
import MineIntelligence from './pages/MineIntelligence';
import DataUpload from './pages/DataUpload';
import Reports from './pages/Reports';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/exploration" element={<ExplorationMap />} />
        <Route path="/ai-analysis" element={<AIAnalysis />} />
        <Route path="/production" element={<ProductionAnalytics />} />
        <Route path="/shortfall" element={<ShortfallAnalysis />} />
        <Route path="/mines" element={<MineIntelligence />} />
        <Route path="/data-upload" element={<DataUpload />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
