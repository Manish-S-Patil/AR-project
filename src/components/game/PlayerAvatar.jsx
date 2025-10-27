import React from 'react';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle } from 'lucide-react';

const PlayerAvatar = ({ state, score, level, isMobile = false }) => {
  const getAvatarState = () => {
    if (state === 'success') return 'cleaning';
    if (state === 'failure') return 'infected';
    return 'neutral';
  };

  const avatarState = getAvatarState();

  if (isMobile) {
    return (
      <div className="flex items-center space-x-4">
        {/* Mobile: Compact Avatar */}
        <motion.div
          className="relative w-16 h-16"
          animate={avatarState === 'cleaning' ? {
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          } : avatarState === 'infected' ? {
            scale: [1, 0.95, 1],
            filter: [
              "hue-rotate(0deg) saturate(1)",
              "hue-rotate(60deg) saturate(1.5)",
              "hue-rotate(120deg) saturate(1)",
              "hue-rotate(0deg) saturate(1)"
            ]
          } : {}}
          transition={{ 
            duration: 2, 
            repeat: avatarState !== 'neutral' ? Infinity : 0,
            ease: "easeInOut"
          }}
        >
          {/* Main Avatar */}
          <div className={`w-full h-full rounded-full flex items-center justify-center text-2xl ${
            avatarState === 'cleaning' ? 'bg-green-500/20 border-2 border-green-400' :
            avatarState === 'infected' ? 'bg-red-500/20 border-2 border-red-400' :
            'bg-blue-500/20 border-2 border-blue-400'
          }`}>
            {avatarState === 'cleaning' ? <Shield className="w-6 h-6 text-blue-400" /> : 
             avatarState === 'infected' ? <AlertTriangle className="w-6 h-6 text-red-400" /> : 
             <div className="w-6 h-6 bg-gray-400 rounded-full" />}
          </div>

          {/* Cleaning Animation - Bugs being eliminated */}
          {avatarState === 'cleaning' && (
            <>
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    x: 0, 
                    y: 0, 
                    scale: 1,
                    opacity: 1 
                  }}
                  animate={{ 
                    x: Math.cos(i * 90 * Math.PI / 180) * 40,
                    y: Math.sin(i * 90 * Math.PI / 180) * 40,
                    scale: 0,
                    opacity: 0
                  }}
                  transition={{ 
                    duration: 1.5, 
                    delay: i * 0.2,
                    ease: "easeOut"
                  }}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg"
                >
                  🦠
                </motion.div>
              ))}
            </>
          )}

          {/* Infection Animation - Red overlay */}
          {avatarState === 'infected' && (
            <motion.div
              className="absolute inset-0 rounded-full bg-red-500/30"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
          )}
        </motion.div>

        {/* Mobile: Stats */}
        <div className="flex-1">
          <div className="text-sm font-bold text-white">
            Detective Level {level}
          </div>
          <div className="text-xs text-blue-300">
            Score: {score}
          </div>
          <div className="text-xs text-gray-400">
            {avatarState === 'cleaning' && <Shield className="w-4 h-4 mr-1" />}
            {avatarState === 'cleaning' && 'System Protected'}
            {avatarState === 'infected' && <AlertTriangle className="w-4 h-4 mr-1" />}
            {avatarState === 'infected' && 'System Compromised'}
            {avatarState === 'neutral' && 'Analyzing Evidence'}
          </div>
        </div>

        {/* Mobile: Status Indicator */}
        <motion.div
          className={`w-3 h-3 rounded-full ${
            avatarState === 'cleaning' ? 'bg-green-400' :
            avatarState === 'infected' ? 'bg-red-400' :
            'bg-blue-400'
          }`}
          animate={avatarState !== 'neutral' ? {
            scale: [1, 1.2, 1],
            opacity: [1, 0.7, 1]
          } : {}}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </div>
    );
  }

  // Desktop Layout
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <motion.div
        className="relative w-32 h-32 mb-4"
        animate={avatarState === 'cleaning' ? {
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0]
        } : avatarState === 'infected' ? {
          scale: [1, 0.95, 1],
          filter: [
            "hue-rotate(0deg) saturate(1)",
            "hue-rotate(60deg) saturate(1.5)",
            "hue-rotate(120deg) saturate(1)",
            "hue-rotate(0deg) saturate(1)"
          ]
        } : {}}
        transition={{ 
          duration: 2, 
          repeat: avatarState !== 'neutral' ? Infinity : 0,
          ease: "easeInOut"
        }}
      >
        {/* Main Avatar */}
        <div className={`w-full h-full rounded-full flex items-center justify-center text-6xl ${
          avatarState === 'cleaning' ? 'bg-green-500/20 border-2 border-green-400' :
          avatarState === 'infected' ? 'bg-red-500/20 border-2 border-red-400' :
          'bg-blue-500/20 border-2 border-blue-400'
        }`}>
          {avatarState === 'cleaning' ? <Shield className="w-12 h-12 text-blue-400" /> : 
           avatarState === 'infected' ? <AlertTriangle className="w-12 h-12 text-red-400" /> : 
           <div className="w-12 h-12 bg-gray-400 rounded-full" />}
        </div>

        {/* Cleaning Animation - Bugs being eliminated */}
        {avatarState === 'cleaning' && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  x: 0, 
                  y: 0, 
                  scale: 1,
                  opacity: 1 
                }}
                animate={{ 
                  x: Math.cos(i * 60 * Math.PI / 180) * 80,
                  y: Math.sin(i * 60 * Math.PI / 180) * 80,
                  scale: 0,
                  opacity: 0
                }}
                transition={{ 
                  duration: 1.5, 
                  delay: i * 0.2,
                  ease: "easeOut"
                }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl"
              >
                🦠
              </motion.div>
            ))}
          </>
        )}

        {/* Infection Animation - Red overlay */}
        {avatarState === 'infected' && (
          <motion.div
            className="absolute inset-0 rounded-full bg-red-500/30"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
        )}
      </motion.div>

      {/* Player Stats */}
      <div className="text-center space-y-2">
        <div className="text-lg font-bold text-white">
          Detective Level {level}
        </div>
        <div className="text-sm text-blue-300">
          Score: {score}
        </div>
        <div className="text-xs text-gray-400">
          {avatarState === 'cleaning' && <Shield className="w-4 h-4 mr-1 inline" />}
          {avatarState === 'cleaning' && 'System Protected'}
          {avatarState === 'infected' && <AlertTriangle className="w-4 h-4 mr-1 inline" />}
          {avatarState === 'infected' && 'System Compromised'}
          {avatarState === 'neutral' && 'Analyzing Evidence'}
        </div>
      </div>

      {/* Status Indicator */}
      <motion.div
        className={`w-4 h-4 rounded-full mt-4 ${
          avatarState === 'cleaning' ? 'bg-green-400' :
          avatarState === 'infected' ? 'bg-red-400' :
          'bg-blue-400'
        }`}
        animate={avatarState !== 'neutral' ? {
          scale: [1, 1.2, 1],
          opacity: [1, 0.7, 1]
        } : {}}
        transition={{ duration: 1, repeat: Infinity }}
      />
    </div>
  );
};

export default PlayerAvatar;
