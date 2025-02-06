import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import CreateRoom from './pages/CreateRoom';
import JoinRoom from './pages/JoinRoom';
import TestRoom from './pages/TestRoom';
import WaitingRoom from './pages/WaitingRoom';
import SpectateRoom from './pages/SpectateRoom';
import ScoreCard from './pages/ScoreCard';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
          <Navbar />
          <div className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/create" element={<CreateRoom />} />
              <Route path="/join" element={<JoinRoom />} />
              <Route path="/room/:roomId" element={<TestRoom />} />
              <Route path="/waiting/:roomId" element={<WaitingRoom />} />
              <Route path="/spectate/:roomId" element={<SpectateRoom />} />
              <Route path="/score/:userId" element={<ScoreCard />} />
            </Routes>
          </div>
          <Toaster position="top-right" />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;