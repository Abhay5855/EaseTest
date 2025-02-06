import React from 'react';
import { useParams } from 'react-router-dom';
import { Clock } from 'lucide-react';

export default function WaitingRoom() {
  const { roomId } = useParams();

  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="bg-white rounded-xl shadow-sm p-8">
        <Clock className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Waiting Room</h1>
        <p className="text-gray-600 mb-4">Room ID: {roomId}</p>
        <p className="text-gray-500">
          Please wait while the host starts the assessment. The room will automatically open when ready.
        </p>
        <div className="mt-8">
          <div className="animate-pulse flex justify-center items-center space-x-2">
            <div className="h-2 w-2 bg-indigo-600 rounded-full"></div>
            <div className="h-2 w-2 bg-indigo-600 rounded-full"></div>
            <div className="h-2 w-2 bg-indigo-600 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}