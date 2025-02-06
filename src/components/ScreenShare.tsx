import React, { useState } from 'react';
import { Monitor, AlertCircle } from 'lucide-react';

export default function ScreenShare() {
  const [isSharing, setIsSharing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startScreenShare = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      const videoElement = document.getElementById('screen-share') as HTMLVideoElement;
      if (videoElement) {
        videoElement.srcObject = stream;
        setIsSharing(true);
        setError(null);
      }
    } catch (err) {
      setError('Failed to start screen sharing. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Screen Share</h3>
        {!isSharing && (
          <button
            onClick={startScreenShare}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Monitor className="h-4 w-4" />
            Start Sharing
          </button>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-600 mb-4">
          <AlertCircle className="h-5 w-5" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
        <video
          id="screen-share"
          autoPlay
          className="w-full h-full object-contain"
        />
        {!isSharing && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-500">
            <p>Screen share will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
}