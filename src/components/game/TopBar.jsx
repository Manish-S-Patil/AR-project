import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Star, Target, Zap, Heart, Search } from 'lucide-react';

const TopBar = ({ score, timeLeft, level, investigationProgress, lives, questionsAnswered, maxQuestions, questionTimer }) => {
  const getTimeColor = (time) => {
    if (time > 20) return 'text-green-400';
    if (time > 10) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getTimePulse = (time) => {
    if (time <= 10) return 'animate-pulse';
    return '';
  };

  return (
    <div className="bg-black/20 backdrop-blur-sm border-b border-white/10 p-2 lg:p-4">
      {/* Mobile Layout */}
      <div className="lg:hidden space-y-3">
        {/* Mobile: Title and Level */}
        <div className="flex items-center justify-between">
          <motion.div
            className="text-lg font-bold cyber-text flex items-center"
            animate={{ 
              textShadow: [
                "0 0 5px #3b82f6",
                "0 0 10px #3b82f6",
                "0 0 5px #3b82f6"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Search className="w-4 h-4 mr-2" />
            Trace The Threat
          </motion.div>
          <div className="text-sm text-muted-foreground">
            Level {level}
          </div>
        </div>

        {/* Mobile: Stats Row */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* Score */}
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-xs text-muted-foreground">Score:</span>
            <motion.span 
              className="font-mono text-sm text-yellow-400"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 0.3 }}
            >
              {score}
            </motion.span>
          </div>

          {/* Lives */}
          {lives !== undefined && (
            <div className="flex items-center space-x-1">
              <Heart className="w-4 h-4 text-red-400" />
              <span className="text-xs text-muted-foreground">Lives:</span>
              <span className="font-mono text-sm text-red-400">
                {lives}
              </span>
            </div>
          )}

          {/* Timer - Show question timer if available */}
          <div className="flex items-center space-x-1">
            <Clock className={`w-4 h-4 ${questionTimer !== undefined ? getTimeColor(questionTimer) : getTimeColor(timeLeft)}`} />
            <span className="text-xs text-muted-foreground">Time:</span>
            <motion.span 
              className={`font-mono text-sm ${
                questionTimer !== undefined ? getTimeColor(questionTimer) : getTimeColor(timeLeft)
              } ${
                questionTimer !== undefined ? getTimePulse(questionTimer) : getTimePulse(timeLeft)
              }`}
              animate={(questionTimer !== undefined && questionTimer <= 10) || (!questionTimer && timeLeft <= 10) ? {
                scale: [1, 1.1, 1],
                color: ['#ef4444', '#fbbf24', '#ef4444']
              } : {}}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              {questionTimer !== undefined ? `${questionTimer}s` : `${timeLeft}s`}
            </motion.span>
          </div>

          {/* Question Progress */}
          {questionsAnswered !== undefined && maxQuestions !== undefined && (
            <div className="flex items-center space-x-1">
              <Target className="w-4 h-4 text-orange-400" />
              <span className="text-xs text-muted-foreground">Q:</span>
              <span className="font-mono text-sm text-orange-400">
                {questionsAnswered}/{maxQuestions}
              </span>
            </div>
          )}

          {/* Clues */}
          <div className="flex items-center space-x-1">
            <Zap className="w-4 h-4 text-purple-400" />
            <span className="text-xs text-muted-foreground">Clues:</span>
            <span className="font-mono text-sm text-purple-400">
              {investigationProgress}
            </span>
          </div>
        </div>

        {/* Mobile: Progress Bar */}
        <div className="w-full bg-gray-700 rounded-full h-1">
          <motion.div
            className="bg-gradient-to-r from-orange-500 via-red-500 to-purple-500 h-1 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(investigationProgress / 10) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="flex items-center justify-between">
          {/* Left - Game Title */}
          <div className="flex items-center space-x-4">
            <motion.div
              className="text-2xl font-bold cyber-text flex items-center"
              animate={{ 
                textShadow: [
                  "0 0 5px #3b82f6",
                  "0 0 10px #3b82f6",
                  "0 0 5px #3b82f6"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Search className="w-6 h-6 mr-2" />
              Trace The Threat
            </motion.div>
            <div className="text-sm text-muted-foreground">
              Level {level}
            </div>
          </div>

          {/* Center - Progress Indicator */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-orange-400" />
              <span className="text-sm text-muted-foreground">Progress:</span>
              <div className="flex items-center space-x-1">
                {[...Array(10)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      i < investigationProgress ? 'bg-orange-400' : 'bg-gray-600'
                    }`}
                    animate={i < investigationProgress ? {
                      scale: [1, 1.2, 1],
                      opacity: [1, 0.7, 1]
                    } : {}}
                    transition={{ 
                      duration: 0.5, 
                      delay: i * 0.1,
                      repeat: Infinity 
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right - Stats */}
          <div className="flex items-center space-x-6">
            {/* Score */}
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-sm text-muted-foreground">Score:</span>
              <motion.span 
                className="font-mono text-lg text-yellow-400"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 0.3 }}
              >
                {score}
              </motion.span>
            </div>

            {/* Timer */}
            <div className="flex items-center space-x-2">
              <Clock className={`w-5 h-5 ${questionTimer !== undefined ? getTimeColor(questionTimer) : getTimeColor(timeLeft)}`} />
              <span className="text-sm text-muted-foreground">Time:</span>
              <motion.span 
                className={`font-mono text-lg ${
                  questionTimer !== undefined ? getTimeColor(questionTimer) : getTimeColor(timeLeft)
                } ${
                  questionTimer !== undefined ? getTimePulse(questionTimer) : getTimePulse(timeLeft)
                }`}
                animate={(questionTimer !== undefined && questionTimer <= 10) || (!questionTimer && timeLeft <= 10) ? {
                  scale: [1, 1.1, 1],
                  color: ['#ef4444', '#fbbf24', '#ef4444']
                } : {}}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                {questionTimer !== undefined ? `${questionTimer}s` : `${timeLeft}s`}
              </motion.span>
            </div>

            {/* Investigation Progress */}
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-purple-400" />
              <span className="text-sm text-muted-foreground">Clues:</span>
              <span className="font-mono text-lg text-purple-400">
                {investigationProgress}
              </span>
            </div>
          </div>
        </div>

        {/* Desktop: Progress Bar */}
        <div className="mt-3 w-full bg-gray-700 rounded-full h-1">
          <motion.div
            className="bg-gradient-to-r from-orange-500 via-red-500 to-purple-500 h-1 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(investigationProgress / 10) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
