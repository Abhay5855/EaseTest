import React from 'react';
import { useParams } from 'react-router-dom';
import { Eye } from 'lucide-react';

export default function SpectateRoom() {
  const { roomId } = useParams();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-2 mb-6">
          <Eye className="h-6 w-6 text-indigo-600" />
          <h1 className="text-2xl font-bold text-gray-900">Spectator View</h1>
        </div>
        <p className="text-gray-600 mb-4">Room ID: {roomId}</p>
        {/* TODO: Implement spectator view interface */}
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-gray-500">Spectator view interface will be implemented here</p>
        </div>
      </div>
    </div>
  );
}