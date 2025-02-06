import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Calendar, Users, Clock, Brain, ArrowRight, Copy } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

interface TestSession {
  id: string;
  title: string;
  date: string;
  startTime: string;
  maxParticipants: number;
  duration: number;
  isLive: boolean;
  status: 'scheduled' | 'in-progress' | 'completed';
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Get rooms from localStorage
  const rooms = JSON.parse(localStorage.getItem('testRooms') || '[]');
  const sessions: TestSession[] = rooms.map((room: any) => ({
    id: room.id,
    title: room.title,
    date: room.date,
    startTime: room.startTime,
    maxParticipants: room.maxParticipants,
    duration: room.duration,
    isLive: room.isLive,
    status: 'scheduled'
  }));

  const copyRoomId = async (id: string) => {
    await navigator.clipboard.writeText(id);
    toast.success('Room ID copied to clipboard');
  };

  const getStatusColor = (status: TestSession['status']) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name || 'Creator'}!</h1>
          <p className="text-gray-600">Manage your assessment sessions and create new ones.</p>
        </div>
        <button
          onClick={() => navigate('/create')}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          New Assessment
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl p-6 text-white">
          <Brain className="h-8 w-8 mb-4" />
          <h3 className="text-xl font-semibold mb-1">Active Sessions</h3>
          <p className="text-3xl font-bold">{sessions.length}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <Users className="h-8 w-8 mb-4" />
          <h3 className="text-xl font-semibold mb-1">Total Participants</h3>
          <p className="text-3xl font-bold">
            {sessions.reduce((acc, session) => acc + session.maxParticipants, 0)}
          </p>
        </div>
        <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl p-6 text-white">
          <Clock className="h-8 w-8 mb-4" />
          <h3 className="text-xl font-semibold mb-1">Hours Scheduled</h3>
          <p className="text-3xl font-bold">
            {Math.round(sessions.reduce((acc, session) => acc + session.duration, 0) / 60)}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Your Assessment Rooms</h2>
        </div>
        {sessions.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p>No assessment rooms created yet.</p>
            <button
              onClick={() => navigate('/create')}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
            >
              <Plus className="h-4 w-4" />
              Create your first assessment
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {sessions.map((session) => (
              <div key={session.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{session.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(session.status)}`}>
                        {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                      </span>
                      {session.isLive && (
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                          Live Session
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-6 text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{session.date} at {session.startTime}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>{session.maxParticipants} participants</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{session.duration} minutes</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => copyRoomId(session.id)}
                      className="p-2 text-gray-400 hover:text-gray-600 rounded transition-colors"
                      title="Copy room ID"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => navigate(`/room/${session.id}`)}
                      className="flex items-center gap-2 px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    >
                      Join Room
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}