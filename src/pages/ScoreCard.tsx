import React from 'react';
import { useParams } from 'react-router-dom';
import { Award, Share } from 'lucide-react';

export default function ScoreCard() {
  const { userId } = useParams();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm p-8">
        <div className="text-center">
          <Award className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Assessment Score</h1>
          <p className="text-gray-600 mb-8">User ID: {userId}</p>
        </div>

        {/* TODO: Implement actual score display */}
        <div className="space-y-4 mb-8">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-500">Score details will be displayed here</p>
          </div>
        </div>

        <div className="flex justify-center">
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            <Share className="h-5 w-5" />
            Share Results
          </button>
        </div>
      </div>
    </div>
  );
}