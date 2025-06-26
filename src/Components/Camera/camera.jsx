// import React, { useRef, useState } from "react";

// const Camera = () => {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [photo, setPhoto] = useState(null);
//   const [isCameraOn, setIsCameraOn] = useState(false);

//   const startCamera = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//         await videoRef.current.play();
//       }
//       setIsCameraOn(true);
//     } catch (error) {
//       console.error("Error accessing camera:", error);
//       alert("Camera access denied or not available.");
//     }
//   };

//   const stopCamera = () => {
//     const stream = videoRef.current?.srcObject;
//     if (stream) {
//       stream.getTracks().forEach((track) => track.stop());
//       videoRef.current.srcObject = null;
//     }
//     setIsCameraOn(false);
//   };

//   const capturePhoto = () => {
//     const canvas = canvasRef.current;
//     const video = videoRef.current;
//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;
//     const ctx = canvas.getContext("2d");
//     ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
//     const imageDataUrl = canvas.toDataURL("image/png");
//     setPhoto(imageDataUrl);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 text-white p-6">
//       <h1 className="text-3xl font-bold mb-6">Aura Camera Assistant</h1>

//       {/* ✅ Video always rendered */}
//       <video
//         ref={videoRef}
//         autoPlay
//         muted
//         playsInline
//         className={`rounded-xl shadow-lg border-4 border-purple-600 w-full max-w-md ${
//           isCameraOn ? "" : "hidden"
//         }`}
//       />

//       {!isCameraOn ? (
//         <button
//           onClick={startCamera}
//           className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl font-semibold text-white shadow-md transition-all"
//         >
//           Open Camera
//         </button>
//       ) : (
//         <>
//           <div className="flex flex-wrap justify-center gap-3 mt-4">
//             <button
//               onClick={capturePhoto}
//               className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
//             >
//               Capture
//             </button>
//             <button
//               onClick={stopCamera}
//               className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
//             >
//               Close Camera
//             </button>
//           </div>
//           <canvas ref={canvasRef} className="hidden" />
//         </>
//       )}

//       {photo && (
//         <div className="mt-6">
//           <h2 className="text-xl mb-2">Captured Photo:</h2>
//           <img
//             src={photo}
//             alt="Captured"
//             className="rounded-xl border-4 border-white shadow-xl max-w-md"
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Camera;







import React, { useRef, useState } from "react";

const Camera = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // Start Camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setIsCameraOn(true);
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert("Camera access denied or not available.");
    }
  };

  // Stop Camera
  const stopCamera = () => {
    const stream = videoRef.current?.srcObject;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraOn(false);
    setCountdown(0);
  };

  // Capture Photo Immediately
  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageDataUrl = canvas.toDataURL("image/png");
    setPhoto(imageDataUrl);
  };

  // Capture Photo After Delay with Countdown
  const captureWithDelay = (seconds) => {
    setCountdown(seconds);

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(countdownInterval);
          capturePhoto();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Download Captured Image
  const downloadPhoto = () => {
    if (!photo) return;
    const a = document.createElement("a");
    a.href = photo;
    a.download = "captured_photo.png";
    a.click();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Aura Camera Assistant</h1>

      {/* ✅ Video always rendered */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className={`rounded-xl shadow-lg border-4 border-purple-600 w-full max-w-md ${
          isCameraOn ? "" : "hidden"
        }`}
      />

      {/* Countdown Display */}
      {countdown > 0 && (
        <div className="text-6xl font-bold mb-4 animate-pulse">{countdown}</div>
      )}

      {/* Buttons */}
      {!isCameraOn ? (
        <button
          onClick={startCamera}
          className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl font-semibold text-white shadow-md transition-all"
        >
          Open Camera
        </button>
      ) : (
        <>
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            <button
              onClick={capturePhoto}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
            >
              Capture Now
            </button>
            <button
              onClick={() => captureWithDelay(5)}
              className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-lg"
            >
              Capture in 5s
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

      {/* Captured Photo */}
      {photo && (
        <div className="mt-6 flex flex-col items-center">
          <h2 className="text-xl mb-2">Captured Photo:</h2>
          <img
            src={photo}
            alt="Captured"
            className="rounded-xl border-4 border-white shadow-xl max-w-md"
          />
          <button
            onClick={downloadPhoto}
            className="bg-indigo-600 hover:bg-indigo-700 mt-4 px-4 py-2 rounded-lg"
          >
            Download Photo
          </button>
        </div>
      )}
    </div>
  );
};

export default Camera;

