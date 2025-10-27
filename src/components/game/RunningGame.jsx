import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Play, RotateCcw, Shield, Heart, Clock, Trophy, PartyPopper, Skull } from 'lucide-react';
import { getRandomQuestions, QUESTIONS_PER_LEVEL } from '../../data/evidence';

const RunningGame = ({ 
  onGameComplete, 
  onGameOver, 
  initialScore = 0 
}) => {
  // Game State
  const [gameState, setGameState] = useState('ready'); // ready, running, paused, completed, gameOver
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(initialScore);
  const [lives, setLives] = useState(3);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isShieldActive, setIsShieldActive] = useState(false);
  const [avatarPosition, setAvatarPosition] = useState(0);
  const [bugsPosition, setBugsPosition] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [bugsSpeed, setBugsSpeed] = useState(0.5);
  const [avatarSpeed, setAvatarSpeed] = useState(1);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [questionsCorrect, setQuestionsCorrect] = useState(0);
  const [levelComplete, setLevelComplete] = useState(false);
  
  const timerRef = useRef(null);
  const animationRef = useRef(null);
  const gameAreaRef = useRef(null);

  // Game Configuration
  const MAX_LEVELS = 5;
  const TIME_DECREASE = 5;
  const MIN_TIME = 5;
  const BUGS_CATCH_DISTANCE = 20; // pixels
  const AVATAR_GOAL_DISTANCE = 80; // percentage of screen width
  
  // Level-specific question counts (imported from evidence folder)
  const [questionPool, setQuestionPool] = useState([]);

  // Calculate time for current level
  const getTimeForLevel = (levelNum) => {
    return Math.max(MIN_TIME, 30 - (levelNum - 1) * TIME_DECREASE);
  };

  // Start the game
  const startGame = () => {
    // Load questions for level 1
    const questions = getRandomQuestions(1, QUESTIONS_PER_LEVEL[1]);
    setQuestionPool(questions);
    
    setGameState('running');
    setLevel(1);
    setScore(initialScore);
    setLives(3);
    setTimeLeft(getTimeForLevel(1));
    setAvatarPosition(0);
    setBugsPosition(0);
    setBugsSpeed(0.5);
    setAvatarSpeed(1);
    setQuestionsAnswered(0);
    setQuestionsCorrect(0);
    setLevelComplete(false);
    generateQuestion();
    startTimer();
    startAnimation();
  };

  // Generate a random question from pool
  const generateQuestion = () => {
    if (questionPool.length === 0) return;
    const randomQuestion = questionPool[Math.floor(Math.random() * questionPool.length)];
    setCurrentQuestion(randomQuestion);
    setUserAnswer(null);
    setShowResult(false);
  };

  // Start the countdown timer
  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Start the running animation
  const startAnimation = () => {
    const animate = () => {
      if (gameState !== 'running') return;

      setAvatarPosition(prev => {
        const newPos = prev + avatarSpeed;
        if (newPos >= AVATAR_GOAL_DISTANCE) {
          handleLevelComplete();
          return AVATAR_GOAL_DISTANCE;
        }
        return newPos;
      });

      setBugsPosition(prev => {
        const newPos = prev + bugsSpeed;
        return Math.min(newPos, 100);
      });

      // Check if bugs caught the avatar
      if (bugsPosition >= avatarPosition - BUGS_CATCH_DISTANCE && !isShieldActive) {
        handleBugsCaught();
      }

      animationRef.current = requestAnimationFrame(animate);
    };
    animate();
  };

  // Handle time running out
  const handleTimeUp = () => {
    clearInterval(timerRef.current);
    cancelAnimationFrame(animationRef.current);
    setGameState('paused');
    setShowResult(true);
    setIsCorrect(false);
  };

  // Handle bugs catching the avatar
  const handleBugsCaught = () => {
    clearInterval(timerRef.current);
    cancelAnimationFrame(animationRef.current);
    setGameState('paused');
    setShowResult(true);
    setIsCorrect(false);
  };

  // Handle level completion
  const handleLevelComplete = () => {
    clearInterval(timerRef.current);
    cancelAnimationFrame(animationRef.current);
    setGameState('paused');
    setShowResult(true);
    setIsCorrect(true);
  };

  // Handle level failure
  const handleLevelFailed = () => {
    clearInterval(timerRef.current);
    cancelAnimationFrame(animationRef.current);
    setGameState('paused');
    setShowResult(true);
    setIsCorrect(false);
  };

  // Handle user answer
  const handleAnswer = (answerIndex) => {
    if (gameState !== 'running') return;
    
    setUserAnswer(answerIndex);
    const correct = answerIndex === currentQuestion.correct;
    setIsCorrect(correct);
    
    // Update question counters
    setQuestionsAnswered(prev => prev + 1);
    if (correct) {
      setQuestionsCorrect(prev => prev + 1);
    }
    
    if (correct) {
      // Activate shield and continue running
      setIsShieldActive(true);
      setScore(prev => prev + 100 * level);
      
      // Shield blocks bugs temporarily
      setTimeout(() => {
        setIsShieldActive(false);
      }, 2000);
    } else {
      // Wrong answer - bugs get closer
      setBugsPosition(prev => Math.min(prev + 20, 100));
      setBugsSpeed(prev => prev + 0.2);
    }
    
    // Check if level is complete
    const questionsNeeded = QUESTIONS_PER_LEVEL[level];
    if (questionsAnswered + 1 >= questionsNeeded) {
      // Level complete - check if enough correct answers
      const correctNeeded = Math.ceil(questionsNeeded * 0.6); // 60% correct to pass
      if (questionsCorrect + (correct ? 1 : 0) >= correctNeeded) {
        setLevelComplete(true);
        handleLevelComplete();
      } else {
        // Not enough correct answers - lose a life
        handleLevelFailed();
      }
    } else {
      // Continue with next question
      setTimeout(() => {
        generateQuestion();
      }, 1000);
    }
  };

  // Handle result confirmation
  const handleResultConfirm = () => {
    if (isCorrect && levelComplete) {
      if (level >= MAX_LEVELS) {
        // Game won!
        setGameState('completed');
        setScore(prev => prev * 2); // Double score on win
      } else {
        // Level completed successfully
        // Add life for levels 3 and 4
        if (level === 3 || level === 4) {
          setLives(prev => Math.min(prev + 1, 3));
        }
        
        // Next level - load new questions
        const nextLevel = level + 1;
        const questions = getRandomQuestions(nextLevel, QUESTIONS_PER_LEVEL[nextLevel]);
        setQuestionPool(questions);
        
        setLevel(nextLevel);
        setTimeLeft(getTimeForLevel(nextLevel));
        setAvatarPosition(0);
        setBugsPosition(0);
        setBugsSpeed(prev => prev + 0.1);
        setAvatarSpeed(prev => prev + 0.1);
        setQuestionsAnswered(0);
        setQuestionsCorrect(0);
        setLevelComplete(false);
        generateQuestion();
        setGameState('running');
        startTimer();
        startAnimation();
      }
    } else {
      // Level failed - lose a life
      setLives(prev => {
        const newLives = prev - 1;
        if (newLives <= 0) {
          setGameState('gameOver');
          return 0;
        }
        return newLives;
      });
      
      // Reset for retry
      setTimeLeft(getTimeForLevel(level));
      setAvatarPosition(0);
      setBugsPosition(0);
      setQuestionsAnswered(0);
      setQuestionsCorrect(0);
      setLevelComplete(false);
      generateQuestion();
      setGameState('running');
      startTimer();
      startAnimation();
    }
    setShowResult(false);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  // Render the running game area
  const renderGameArea = () => (
    <div 
      ref={gameAreaRef}
      className="relative w-full h-64 bg-gradient-to-r from-green-400 via-green-500 to-green-600 overflow-hidden rounded-lg border-2 border-green-300"
      style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 21px)' }}
    >
      {/* Background clouds */}
      <div className="absolute top-4 left-8 w-12 h-6 bg-white/30 rounded-full"></div>
      <div className="absolute top-8 right-16 w-8 h-4 bg-white/20 rounded-full"></div>
      <div className="absolute top-6 right-32 w-10 h-5 bg-white/25 rounded-full"></div>
      
      {/* Background trees */}
      <div className="absolute bottom-2 left-16 w-4 h-8 bg-green-800 rounded-t-full"></div>
      <div className="absolute bottom-2 left-24 w-3 h-6 bg-green-800 rounded-t-full"></div>
      <div className="absolute bottom-2 right-20 w-5 h-10 bg-green-800 rounded-t-full"></div>
      
      {/* Ground line with texture */}
      <div className="absolute bottom-0 w-full h-3 bg-gradient-to-t from-green-700 to-green-600">
        <div className="absolute top-0 left-0 w-full h-1 bg-green-500/50"></div>
      </div>
      
      {/* Mario-style Avatar */}
      <motion.div
        className="absolute bottom-2 z-20"
        style={{ left: `${avatarPosition}%` }}
        animate={gameState === 'running' ? {
          y: [0, -15, 0],
          rotate: [0, 3, -3, 0]
        } : {}}
        transition={{ duration: 0.5, repeat: Infinity }}
      >
        <div className="relative">
          {/* Enhanced Shield effect */}
          {isShieldActive && (
            <>
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="absolute -top-3 -left-3 w-20 h-20 rounded-full border-4 border-blue-400 bg-blue-400/20 flex items-center justify-center"
              >
                <Shield className="w-10 h-10 text-blue-400" />
              </motion.div>
              
              {/* Shield energy particles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-blue-300 rounded-full"
                  initial={{ 
                    x: 0, 
                    y: 0, 
                    scale: 1,
                    opacity: 1 
                  }}
                  animate={{ 
                    x: Math.cos(i * 60 * Math.PI / 180) * 30,
                    y: Math.sin(i * 60 * Math.PI / 180) * 30,
                    scale: 0,
                    opacity: 0
                  }}
                  transition={{ 
                    duration: 1.5, 
                    delay: i * 0.1,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}
                />
              ))}
              
              {/* Shield pulse effect */}
              <motion.div
                className="absolute -top-4 -left-4 w-24 h-24 rounded-full border-2 border-blue-300 opacity-50"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            </>
          )}
          
          {/* Mario Character Image */}
          <div className="relative" style={{ width: '50px', height: '66px' }}>
            {/* Mario sprite image */}
            <motion.img
              src="/models/mario.png"
              alt="Mario Runner"
              className="drop-shadow-lg"
              style={{
                width: '50px',
                height: '66px',
                imageRendering: 'auto',
                transformOrigin: 'center bottom'
              }}
              animate={gameState === 'running' ? {
                y: [0, -8, 0],
                rotate: [0, 3, -3, 0]
              } : {}}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
            
            {/* Running dust particles */}
            {gameState === 'running' && (
              <div className="absolute -bottom-2 left-0">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-gray-400 rounded-full"
                    animate={{
                      x: [0, -10, -20],
                      y: [0, Math.random() * 5, 0],
                      opacity: [1, 0.5, 0]
                    }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.1,
                      repeat: Infinity
                    }}
                    style={{
                      left: `${i * 5}px`
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Enhanced Bugs */}
      <motion.div
        className="absolute bottom-2 z-10"
        style={{ left: `${bugsPosition}%` }}
        animate={gameState === 'running' ? {
          x: [0, 8, 0],
          rotate: [0, 15, -15, 0],
          scale: [1, 1.1, 1]
        } : {}}
        transition={{ duration: 0.4, repeat: Infinity }}
      >
        <div className="relative">
          {/* Main bug body */}
          <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center border-2 border-red-700 shadow-lg">
            {/* Bug eyes */}
            <div className="absolute top-2 left-2 w-2 h-2 bg-white rounded-full"></div>
            <div className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full"></div>
            <div className="absolute top-2.5 left-2.5 w-1 h-1 bg-black rounded-full"></div>
            <div className="absolute top-2.5 right-2.5 w-1 h-1 bg-black rounded-full"></div>
            
            {/* Bug mouth */}
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-red-700 rounded-full"></div>
            
            {/* Bug antennae */}
            <div className="absolute -top-1 left-3 w-1 h-3 bg-red-600 rounded-full"></div>
            <div className="absolute -top-1 right-3 w-1 h-3 bg-red-600 rounded-full"></div>
            <div className="absolute -top-2 left-3 w-1 h-1 bg-red-400 rounded-full"></div>
            <div className="absolute -top-2 right-3 w-1 h-1 bg-red-400 rounded-full"></div>
          </div>
          
          {/* Bug legs */}
          <div className="absolute bottom-0 left-1 w-1 h-2 bg-red-600 rounded-full transform rotate-45"></div>
          <div className="absolute bottom-0 left-3 w-1 h-2 bg-red-600 rounded-full transform rotate-45"></div>
          <div className="absolute bottom-0 right-1 w-1 h-2 bg-red-600 rounded-full transform -rotate-45"></div>
          <div className="absolute bottom-0 right-3 w-1 h-2 bg-red-600 rounded-full transform -rotate-45"></div>
          
          {/* Threatening aura */}
          <motion.div
            className="absolute -inset-2 rounded-full border-2 border-red-400 opacity-50"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </div>
      </motion.div>

      {/* Enhanced Goal line */}
      <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-b from-yellow-300 to-yellow-500 border-l-4 border-yellow-600 shadow-lg">
        {/* Goal flag */}
        <div className="absolute top-4 left-1 w-2 h-8 bg-red-500"></div>
        <div className="absolute top-4 left-3 w-4 h-6 bg-red-500 rounded-r-lg"></div>
        <div className="absolute top-5 left-3.5 w-3 h-4 bg-white rounded-r"></div>
        
        {/* Goal sparkles */}
        <motion.div
          className="absolute top-2 left-1 w-1 h-1 bg-yellow-300 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-6 left-1 w-1 h-1 bg-yellow-300 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
        />
      </div>
      
      {/* Progress indicators */}
      <div className="absolute top-2 left-2 right-2 flex justify-between text-white text-sm font-bold">
        <span>Level {level}</span>
        <span className="text-center">
          Questions: {questionsAnswered}/{QUESTIONS_PER_LEVEL[level]}
        </span>
        <span>{timeLeft}s</span>
      </div>
    </div>
  );

  // Render question card
  const renderQuestion = () => {
    if (!currentQuestion) return null;

    return (
      <Card className="glass-effect cyber-border mb-4">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Cybersecurity Question</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-base font-medium">{currentQuestion.question}</p>
            <div className="grid grid-cols-1 gap-2">
              {currentQuestion.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={gameState !== 'running'}
                  className={`w-full h-12 text-left justify-start ${
                    userAnswer === index 
                      ? (isCorrect ? 'bg-green-500' : 'bg-red-500')
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                  size="lg"
                >
                  {String.fromCharCode(65 + index)}. {option}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  // Render result modal
  const renderResult = () => {
    if (!showResult) return null;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="bg-gray-900 rounded-lg p-6 max-w-md mx-4"
        >
          <div className="text-center">
            {isCorrect ? (
              <>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="mb-4"
                >
                  <PartyPopper className="w-16 h-16 text-green-400 mx-auto" />
                </motion.div>
                <h3 className="text-2xl font-bold text-green-400 mb-2">Level Complete!</h3>
                <p className="text-white/80 mb-2">
                  {level >= MAX_LEVELS ? 'You completed all levels!' : `Level ${level} Complete!`}
                </p>
                <p className="text-sm text-green-300 mb-4">
                  Answered {questionsCorrect}/{QUESTIONS_PER_LEVEL[level]} questions correctly
                  {level === 3 || level === 4 ? ' - Life restored!' : ''}
                </p>
                <p className="text-sm text-gray-400 mb-4">
                  {currentQuestion?.explanation}
                </p>
              </>
            ) : (
              <>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-6xl mb-4"
                >
                  💥
                </motion.div>
                <h3 className="text-2xl font-bold text-red-400 mb-2">
                  {lives <= 1 ? 'Game Over!' : 'Level Failed!'}
                </h3>
                <p className="text-white/80 mb-2">
                  {lives <= 1 ? 'The bugs caught you!' : 'Not enough correct answers!'}
                </p>
                <p className="text-sm text-red-300 mb-4">
                  Answered {questionsCorrect}/{QUESTIONS_PER_LEVEL[level]} questions correctly
                  {lives > 1 ? ' - Life lost!' : ''}
                </p>
                <p className="text-sm text-gray-400 mb-4">
                  {currentQuestion?.explanation}
                </p>
              </>
            )}
            <Button
              onClick={handleResultConfirm}
              className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              size="lg"
            >
              {isCorrect ? (level >= MAX_LEVELS ? 'View Results' : 'Next Level') : 'Try Again'}
            </Button>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  // Render game over screen
  const renderGameOver = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center"
    >
      <Card className="glass-effect cyber-border max-w-md mx-auto">
        <CardHeader>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-6xl mb-4"
          >
            <Skull className="w-16 h-16 text-red-400 mx-auto mb-4" />
          </motion.div>
          <CardTitle className="text-2xl text-red-400">Game Over!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-4xl font-bold text-white">{score}</div>
          <p className="text-muted-foreground">Final Score</p>
          <div className="flex gap-3 justify-center">
            <Button
              onClick={startGame}
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 h-12"
              size="lg"
            >
              <Play className="w-4 h-4 mr-2" />
              Play Again
            </Button>
            <Button
              onClick={onGameOver}
              variant="outline"
              className="glass-effect h-12"
              size="lg"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Back to Menu
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  // Render win screen
  const renderWin = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center"
    >
      <Card className="glass-effect cyber-border max-w-md mx-auto">
        <CardHeader>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-6xl mb-4"
          >
            <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          </motion.div>
          <CardTitle className="text-2xl text-yellow-400">Victory!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-4xl font-bold text-white">{score}</div>
          <p className="text-muted-foreground">Final Score (Doubled!)</p>
          <p className="text-sm text-green-400">You completed all {MAX_LEVELS} levels!</p>
          <div className="flex gap-3 justify-center">
            <Button
              onClick={startGame}
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 h-12"
              size="lg"
            >
              <Play className="w-4 h-4 mr-2" />
              Play Again
            </Button>
            <Button
              onClick={() => onGameComplete(score)}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 h-12"
              size="lg"
            >
              <Trophy className="w-4 h-4 mr-2" />
              Complete
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  // Render ready screen
  const renderReady = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center"
    >
      <Card className="glass-effect cyber-border max-w-md mx-auto">
        <CardHeader>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-6xl mb-4"
          >
            🏃‍♂️
          </motion.div>
          <CardTitle className="text-2xl">Cybersecurity Runner</CardTitle>
          <p className="text-muted-foreground">
            Answer questions correctly to keep running and avoid the bugs!
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-blue-400" />
                <span>Time decreases each level</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-green-400" />
                <span>Correct answers activate shield</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="w-4 h-4 text-red-400" />
                <span>3 lives total</span>
              </div>
              <div className="flex items-center space-x-2">
                <Trophy className="w-4 h-4 text-yellow-400" />
                <span>Double score on completion</span>
              </div>
            </div>
            <div className="text-xs text-gray-400 space-y-1">
              <div><strong>Level 1:</strong> 5 questions</div>
              <div><strong>Level 2:</strong> 7 questions</div>
              <div><strong>Level 3:</strong> 9 questions + 1 life</div>
              <div><strong>Level 4:</strong> 12 questions + 1 life</div>
              <div><strong>Level 5:</strong> 15 questions (Final!)</div>
            </div>
          </div>
          <Button
            onClick={startGame}
            className="w-full h-12 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
            size="lg"
          >
            <Play className="w-4 h-4 mr-2" />
            Start Running
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {/* Game Stats */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <span className="text-white font-bold">{score}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-red-400" />
            <span className="text-white font-bold">{lives}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-blue-400" />
          <span className="text-white font-bold">{timeLeft}s</span>
        </div>
      </div>

      {/* Game Area */}
      {gameState !== 'ready' && gameState !== 'gameOver' && gameState !== 'completed' && renderGameArea()}

      {/* Game Content */}
      {gameState === 'ready' && renderReady()}
      {gameState === 'running' && renderQuestion()}
      {gameState === 'gameOver' && renderGameOver()}
      {gameState === 'completed' && renderWin()}

      {/* Result Modal */}
      <AnimatePresence>
        {renderResult()}
      </AnimatePresence>
    </div>
  );
};

export default RunningGame;
