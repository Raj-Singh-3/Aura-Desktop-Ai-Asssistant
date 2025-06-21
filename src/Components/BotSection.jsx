import React from 'react';

const BotSection = ({ isListening, botStatus, onStartListening, onStopListening }) => {
  return (
    <div className="w-[30%] bg-gradient-to-b from-[#1e1e3f] to-[#2a2a5a] flex flex-col items-center justify-center border-r-2 border-[#3a3a6a] relative">
      <div className={`w-52 h-52 rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center mb-5 relative shadow-[0_0_30px_rgba(102,126,234,0.5)] animate-pulse ${
        isListening ? 'animate-speaking' : ''
      }`}>
        <div className="text-6xl animate-blink z-10">🤖</div>
        <div className="absolute w-full h-full rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] opacity-30 animate-spin-slow" />
      </div>

      <div className="text-2xl font-bold mb-2 bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">AURA</div>

      <div className="text-[#a0a0ff] text-sm text-center px-5 mb-5">{botStatus}</div>

      <div className="flex gap-4">
        <button
          title="Start Voice Command"
          onClick={onStartListening}
          className={`w-14 h-14 rounded-full text-white text-2xl transition-all duration-300 shadow-md ${
            isListening
              ? 'bg-gradient-to-br from-[#4ecdc4] to-[#44a08d] animate-pulse'
              : 'bg-gradient-to-br from-[#ff6b6b] to-[#ff8e8e] hover:scale-110 hover:shadow-lg'
          }`}
        >
          🎤
        </button>
        <button
          title="Stop Listening"
          onClick={onStopListening}
          className="w-14 h-14 rounded-full bg-gradient-to-br from-[#ff6b6b] to-[#ff8e8e] text-white text-2xl transition-all duration-300 shadow-md hover:scale-110 hover:shadow-lg"
        >
          ⏹️
        </button>
      </div>
    </div>
  );
};

export default BotSection;
