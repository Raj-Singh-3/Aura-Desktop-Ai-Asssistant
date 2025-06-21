import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff } from 'lucide-react';

const VoiceRecognition = ({ onVoiceCommand, setIsListening, setBotState }) => {
  const [isSupported, setIsSupported] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Check if speech recognition is supported
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setIsSupported(true);
      
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';
      
      recognitionInstance.onstart = () => {
        setIsActive(true);
        setIsListening(true);
        setBotState('listening');
      };
      
      recognitionInstance.onend = () => {
        setIsActive(false);
        setIsListening(false);
        setBotState('idle');
      };
      
      recognitionInstance.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        
        if (event.results[event.results.length - 1].isFinal) {
          onVoiceCommand(transcript);
          setBotState('processing');
        }
      };
      
      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsActive(false);
        setIsListening(false);
        setBotState('idle');
      };
      
      setRecognition(recognitionInstance);
    }
  }, [onVoiceCommand, setIsListening, setBotState]);

  const toggleListening = () => {
    if (!recognition) return;
    
    if (isActive) {
      recognition.stop();
    } else {
      recognition.start();
    }
  };

  // Auto-activate voice recognition on space key press
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === 'Space' && !event.repeat) {
        event.preventDefault();
        toggleListening();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isActive]);

  if (!isSupported) {
    return (
      <div className="fixed bottom-4 right-4 bg-red-600 text-white p-4 rounded-lg shadow-lg">
        <p>Voice recognition not supported in this browser</p>
      </div>
    );
  }

  return (
    <motion.button
      onClick={toggleListening}
      className={`fixed bottom-4 right-4 w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
        isActive 
          ? 'bg-red-600 hover:bg-red-700' 
          : 'bg-purple-600 hover:bg-purple-700'
      }`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      animate={isActive ? {
        boxShadow: [
          "0 0 0 0 rgba(239, 68, 68, 0.7)",
          "0 0 0 10px rgba(239, 68, 68, 0)",
          "0 0 0 20px rgba(239, 68, 68, 0)"
        ]
      } : {}}
      transition={{
        boxShadow: {
          duration: 1.5,
          repeat: isActive ? Infinity : 0,
          ease: "easeOut"
        }
      }}
    >
      {isActive ? (
        <MicOff className="w-8 h-8 text-white" />
      ) : (
        <Mic className="w-8 h-8 text-white" />
      )}
      
      {/* Tooltip */}
      <div className="absolute bottom-full mb-2 bg-black/80 text-white px-3 py-1 rounded text-sm whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
        {isActive ? 'Stop Listening' : 'Start Listening (Space)'}
      </div>
    </motion.button>
  );
};

export default VoiceRecognition;