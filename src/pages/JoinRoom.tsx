import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, User, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function JoinRoom() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    roomCode: '',
    name: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Check if room exists in localStorage (demo purposes)
    const rooms = JSON.parse(localStorage.getItem('testRooms') || '[]');
    const room = rooms.find((r: any) => r.id === formData.roomCode.toUpperCase());

    if (!room) {
      setError('Invalid room code. Please check and try again.');
      return;
    }

    // Store participant info
    const participant = {
      name: formData.name,
      joinedAt: new Date().toISOString(),
    };
    localStorage.setItem(`participant_${room.id}`, JSON.stringify(participant));

    toast.success('Successfully joined the room!');
    navigate(`/waiting/${formData.roomCode.toUpperCase()}`);
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Join Assessment Room</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-sm">
        {error && (
          <div className="flex items-center gap-2 p-4 bg-red-50 text-red-700 rounded-lg">
            <AlertCircle className="h-5 w-5" />
            <p>{error}</p>
          </div>
        )}

        <div>
          <label htmlFor="roomCode" className="block text-sm font-medium text-gray-700 mb-2">
            Room Code
          </label>
          <div className="relative">
            <LogIn className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              id="roomCode"
              value={formData.roomCode}
              onChange={(e) => setFormData({ ...formData, roomCode: e.target.value })}
              className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
              placeholder="Enter room code"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Your Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
              placeholder="Enter your full name"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <LogIn className="h-5 w-5" />
          Join Room
        </button>
      </form>
    </div>
  );
}