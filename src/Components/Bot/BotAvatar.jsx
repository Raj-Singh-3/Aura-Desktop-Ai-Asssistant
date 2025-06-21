import React from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff, Brain, Zap } from 'lucide-react';

const BotAvatar = ({ state, isListening }) => {
  const getAvatarVariants = () => {
    switch (state) {
      case 'listening':
        return {
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0],
          transition: { duration: 0.5, repeat: Infinity }
        };
      case 'speaking':
        return {
          scale: [1, 1.05, 1],
          transition: { duration: 0.3, repeat: Infinity }
        };
      case 'processing':
        return {
          rotate: 360,
          transition: { duration: 2, ease: "linear" }
        };
      default:
        return {
          scale: 1,
          rotate: 0,
          y: [0, -10, 0],
          transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        };
    }
  };

  const getPulseColor = () => {
    switch (state) {
      case 'listening': return 'bg-green-500';
      case 'speaking': return 'bg-blue-500';
      case 'processing': return 'bg-yellow-500';
      default: return 'bg-purple-500';
    }
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* Outer Glow Ring */}
      <motion.div
        className={`absolute w-40 h-40 rounded-full ${getPulseColor()} opacity-20`}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Main Avatar Container */}
      <motion.div
        className="relative w-32 h-32 bg-gradient-to-tr from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/20"
        animate={getAvatarVariants()}
      >
        {/* Inner Glow */}
        <div className="absolute inset-2 bg-gradient-to-tr from-purple-400 to-pink-400 rounded-full opacity-50" />
        
        {/* Avatar Icon */}
        <motion.div
          className="relative z-10"
          animate={{
            rotate: state === 'processing' ? [0, 360] : 0
          }}
          transition={{
            duration: 1,
            repeat: state === 'processing' ? Infinity : 0,
            ease: "linear"
          }}
        >
          {state === 'listening' && <Mic className="w-8 h-8 text-white" />}
          {state === 'speaking' && <Zap className="w-8 h-8 text-white" />}
          {state === 'processing' && <Brain className="w-8 h-8 text-white" />}
          {state === 'idle' && <Brain className="w-8 h-8 text-white" />}
        </motion.div>

        {/* Particle Effects */}
        {state === 'processing' && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
                animate={{
                  x: [0, Math.cos(i * 60 * Math.PI / 180) * 50],
                  y: [0, Math.sin(i * 60 * Math.PI / 180) * 50],
                  opacity: [1, 0],
                  scale: [1, 0]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeOut"
                }}
              />
            ))}
          </>
        )}
      </motion.div>

      {/* Status Indicator */}
      <motion.div
        className="mt-4 px-4 py-2 bg-black/50 backdrop-blur-sm border border-purple-500/30 rounded-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${getPulseColor()}`} />
          <span className="text-white text-sm capitalize">{state}</span>
          {isListening && <MicOff className="w-4 h-4 text-red-400" />}
        </div>
      </motion.div>

      {/* Voice Visualization */}
      {isListening && (
        <div className="mt-4 flex space-x-1">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 bg-green-400 rounded-full"
              animate={{
                height: [10, 30, 10],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                delay: i * 0.1
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BotAvatar;