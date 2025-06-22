import React, { useRef, useState } from "react";

const Camera = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isCaptured, setIsCaptured] = useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play(); // ensure video starts playing
      }
      setIsCameraOn(true);
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    setIsCameraOn(false);
  };

  const capturePhoto = (delay = 0) => {
    if (!videoRef.current) return;
    setIsCaptured(false);
    setTimeout(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      ctx.drawImage(videoRef.current, 0, 0);
      const dataUrl = canvas.toDataURL("image/png");
      setPhoto(dataUrl);
      setIsCaptured(true);
    }, delay * 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Aura Camera Assistant</h1>

      {!isCameraOn ? (
        <button
          onClick={startCamera}
          className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl font-semibold text-white shadow-md transition-all"
        >
          Open Camera
        </button>
      ) : (
        <>
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="rounded-xl shadow-lg border-4 border-purple-600 w-full max-w-md"
          />

          <div className="flex flex-wrap justify-center space-x-2 space-y-2 mt-4">
            <button
              onClick={() => capturePhoto(0)}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
            >
              Capture Now
            </button>
            <button
              onClick={() => capturePhoto(5)}
              className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-lg"
            >
              Capture in 5s
            </button>
            <button
              onClick={() => capturePhoto(10)}
              className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg"
            >
              Capture in 10s
            </button>
            <button
              onClick={stopCamera}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
            >
              Close Camera
            </button>
          </div>

          <canvas ref={canvasRef} className="hidden" />
        </>
      )}

      {isCaptured && photo && (
        <div className="mt-6">
          <h2 className="text-xl mb-2">Captured Photo:</h2>
          <img
            src={photo}
            alt="Captured"
            className="rounded-xl border-4 border-white shadow-xl max-w-md"
          />
        </div>
      )}
    </div>
  );
};

export default Camera;
