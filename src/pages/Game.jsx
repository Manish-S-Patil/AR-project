import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  RotateCcw, 
  Target, 
  Trophy,
  Clock,
  Star,
  Shield,
  AlertTriangle,
  CheckCircle,
  Skull,
  Heart,
  HeartCrack,
  RotateCcw as Refresh,
  Home,
  Crown,
  PartyPopper
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { toast } from '../components/ui/use-toast';
import API_CONFIG from '../lib/api';
import { progressTracker } from '../lib/progressTracker';
import GameArea from '../components/game/GameArea';
import TraceRunnerHUD from '../components/game/TraceRunnerHUD';
import ScenarioIntroModal from '../components/game/ScenarioIntroModal';
import RunningGame from '../components/game/RunningGame';
import { getRandomQuestions, QUESTIONS_PER_LEVEL } from '../data/evidence';
import { getRandomTraceEvidence } from '../data/evidence/trace-threat';
import '../styles/pages.css';

const Game = () => {
  const navigate = useNavigate();
  const [selectedGame, setSelectedGame] = useState(null);
  const [gameState, setGameState] = useState('menu'); // menu, playing, paused, completed
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [level, setLevel] = useState(1);

  // Phishing Game State
  const [phishingEmails, setPhishingEmails] = useState([]);
  const [currentEmail, setCurrentEmail] = useState(0);

  // Trace The Threat Game State
  const [shuffledEvidence, setShuffledEvidence] = useState([]);
  const [currentEvidence, setCurrentEvidence] = useState(0);
  const [collectedEvidence, setCollectedEvidence] = useState([]);
  const [investigationProgress, setInvestigationProgress] = useState(0);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [showFailureAnimation, setShowFailureAnimation] = useState(false);
  const [animationMessage, setAnimationMessage] = useState('');
  const [avatarState, setAvatarState] = useState('neutral'); // neutral, success, failure
  const [showScenarioIntro, setShowScenarioIntro] = useState(false);
  const [currentScenario, setCurrentScenario] = useState('corporate-breach');

  const [noGameContent, setNoGameContent] = useState(false);
  const [gameStartTime, setGameStartTime] = useState(null);
  
  // Trace The Threat Level System
  const [traceThreatLevel, setTraceThreatLevel] = useState(1);
  const [traceThreatLives, setTraceThreatLives] = useState(3);
  const [traceThreatQuestionsAnswered, setTraceThreatQuestionsAnswered] = useState(0);
  const [traceThreatQuestionsCorrect, setTraceThreatQuestionsCorrect] = useState(0);
  const [traceThreatEvidencePool, setTraceThreatEvidencePool] = useState([]);
  const [traceThreatMaxQuestions, setTraceThreatMaxQuestions] = useState(5);
  const [questionTimer, setQuestionTimer] = useState(30); // 30 seconds per question
  const [timerActive, setTimerActive] = useState(false);
  const [showGameOver, setShowGameOver] = useState(false);
  
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  
  // Per-question timer effect for Trace The Threat
  useEffect(() => {
    if (selectedGame === 'trace-threat' && gameState === 'playing' && timerActive && questionTimer > 0) {
      const timer = setTimeout(() => {
        setQuestionTimer(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (questionTimer === 0 && timerActive) {
      // Time up - mark as wrong and move to next question
      handleQuestionTimeout();
    }
  }, [questionTimer, timerActive, gameState, selectedGame]);
  
  // Calculate time per question based on level
  const getTimePerQuestion = (level = traceThreatLevel) => {
    // Level 1: 30s, Level 2: 26s, Level 3: 22s, Level 4: 18s, Level 5: 14s
    return Math.max(14, 30 - (level - 1) * 4);
  };

  // Start timer for new question
  useEffect(() => {
    if (selectedGame === 'trace-threat' && gameState === 'playing') {
      const timePerQuestion = getTimePerQuestion();
      setQuestionTimer(timePerQuestion);
      setTimerActive(true);
    }
  }, [currentEvidence, selectedGame, gameState, traceThreatLevel]);

  // Record game completion
  const recordGameCompletion = async (gameId, finalScore) => {
    const timeSpent = gameStartTime ? Math.round((Date.now() - gameStartTime) / 1000) : 0;
    
    // Record locally first
    progressTracker.recordScenarioCompletion(gameId, finalScore, timeSpent);
    
    // Try to record on server if user is logged in
    if (userData.token && !userData.isGuest) {
      try {
        const response = await fetch(API_CONFIG.getUrl(API_CONFIG.endpoints.progress.recordScenarioCompletion), {
          method: 'POST',
          headers: API_CONFIG.getAuthHeaders(userData.token),
          body: JSON.stringify({
            scenarioKey: gameId,
            score: finalScore,
            timeSpent
          })
        });
        
        if (response.ok) {
          console.log('Game completion recorded on server');
        } else {
          console.log('Server recording failed, using local storage');
        }
      } catch (error) {
        console.log('Server recording failed, using local storage:', error);
      }
    }
    
    toast({
      title: "Game Completed!",
      description: `You scored ${finalScore} points in ${selectedGame?.title}!`,
      duration: 3000
    });
  };

  const games = [
    {
      id: 'phishing-detector',
      title: 'Phishing Email Detective',
      description: 'Identify phishing emails before they fool you!',
      icon: Target,
      color: 'from-red-500 to-pink-500',
      difficulty: 'Beginner'
    },
    {
      id: 'trace-threat',
      title: 'Trace The Threat',
      description: 'Analyze digital evidence to trace cyber threats!',
      icon: Target,
      color: 'from-orange-500 to-red-500',
      difficulty: 'Advanced'
    },
    {
      id: 'cyber-runner',
      title: 'Cybersecurity Runner',
      description: 'Run from bugs while answering security questions!',
      icon: Play,
      color: 'from-green-500 to-blue-500',
      difficulty: 'Intermediate'
    }
  ];

  // Evidence data for Trace The Threat game
  const evidenceData = [
    {
      id: 1,
      type: 'email',
      title: 'Suspicious Login Alert',
      content: 'Multiple failed login attempts detected from IP 192.168.1.100 at 2:34 AM. User account: admin@company.com',
      isSuspicious: true,
      timestamp: '2024-01-15 02:34:15',
      source: 'Security System'
    },
    {
      id: 2,
      type: 'log',
      title: 'Database Query Log',
      content: 'SELECT * FROM users WHERE email = "admin@company.com" AND password = "password123"',
      isSuspicious: true,
      timestamp: '2024-01-15 02:35:22',
      source: 'Database Server'
    },
    {
      id: 3,
      type: 'file',
      title: 'System Configuration',
      content: 'Default admin password changed from "admin123" to "SecurePass2024!" on 2024-01-10',
      isSuspicious: false,
      timestamp: '2024-01-10 09:15:30',
      source: 'IT Department'
    },
    {
      id: 4,
      type: 'email',
      title: 'Phishing Attempt Blocked',
      content: 'Email from "security@company-security.com" blocked by spam filter. Subject: "Urgent: Verify your account"',
      isSuspicious: true,
      timestamp: '2024-01-15 14:22:45',
      source: 'Email Security'
    },
    {
      id: 5,
      type: 'log',
      title: 'Network Traffic Analysis',
      content: 'Unusual data transfer: 2.3GB uploaded to external server at 3:15 AM. Source: workstation-042',
      isSuspicious: true,
      timestamp: '2024-01-15 03:15:18',
      source: 'Network Monitor'
    },
    {
      id: 6,
      type: 'file',
      title: 'Employee Training Record',
      content: 'Cybersecurity training completed by John Smith on 2024-01-12. Score: 95/100',
      isSuspicious: false,
      timestamp: '2024-01-12 16:30:00',
      source: 'HR System'
    },
    {
      id: 7,
      type: 'log',
      title: 'Application Error Log',
      content: 'ERROR: SQL injection attempt detected in user input field. Query: "DROP TABLE users; --"',
      isSuspicious: true,
      timestamp: '2024-01-15 11:45:33',
      source: 'Web Application'
    },
    {
      id: 8,
      type: 'email',
      title: 'IT Maintenance Notice',
      content: 'Scheduled maintenance window: Sunday 2:00 AM - 4:00 AM. All systems will be temporarily unavailable.',
      isSuspicious: false,
      timestamp: '2024-01-14 10:00:00',
      source: 'IT Department'
    },
    {
      id: 9,
      type: 'log',
      title: 'Firewall Rule Violation',
      content: 'Blocked connection attempt from 203.0.113.42 to port 22 (SSH). Country: Unknown',
      isSuspicious: true,
      timestamp: '2024-01-15 08:12:07',
      source: 'Firewall'
    },
    {
      id: 10,
      type: 'file',
      title: 'Backup Verification',
      content: 'Daily backup completed successfully. 1.2TB of data backed up to secure cloud storage.',
      isSuspicious: false,
      timestamp: '2024-01-15 06:00:00',
      source: 'Backup System'
    }
  ];

  // Removed built-in phishing email seed; content must come from the backend

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameState === 'playing') {
      endGame();
    }
  }, [timeLeft, gameState]);

  // Load phishing emails from backend when starting the phishing game
  useEffect(() => {
    if (selectedGame === 'phishing-detector' && gameState === 'playing') {
      (async () => {
        try {
          setNoGameContent(false);
          const res = await fetch(API_CONFIG.getUrl(API_CONFIG.endpoints.game.phishingEmails), {
            headers: API_CONFIG.getDefaultHeaders()
          });
          if (res.ok) {
            const data = await res.json();
            const emails = (data.emails || []).map(e => ({
              id: e.id,
              sender: e.sender,
              subject: e.subject,
              content: e.content,
              isPhishing: e.isPhishing,
              indicators: e.indicators || []
            }));
            if (emails.length) {
              setPhishingEmails(shuffleArray(emails));
              return;
            }
          }
          // no content available
          setNoGameContent(true);
          setPhishingEmails([]);
        } catch (e) {
          setNoGameContent(true);
          setPhishingEmails([]);
        }
      })();
    } else if (selectedGame === 'trace-threat' && gameState === 'playing') {
      // Initialize Trace The Threat game with shuffled evidence
      setShuffledEvidence(shuffleArray([...evidenceData]));
      setCurrentEvidence(0);
      setCollectedEvidence([]);
      setInvestigationProgress(0);
    }
  }, [selectedGame, gameState]);

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };


  const startGame = (gameId) => {
    setSelectedGame(gameId);
    setScore(0);
    setTimeLeft(60);
    setLevel(1);
    setGameStartTime(Date.now()); // Record start time
    setCurrentEmail(0);
    setCurrentEvidence(0);
    setCollectedEvidence([]);
    setInvestigationProgress(0);
    setShowSuccessAnimation(false);
    setShowFailureAnimation(false);
    setAnimationMessage('');
    setAvatarState('neutral');
    setShowGameOver(false);
    
    if (gameId === 'trace-threat') {
      // Initialize Trace The Threat level system
      setTraceThreatLevel(1);
      setTraceThreatLives(3);
      setTraceThreatQuestionsAnswered(0);
      setTraceThreatQuestionsCorrect(0);
      setTraceThreatMaxQuestions(QUESTIONS_PER_LEVEL[1]);
      setQuestionTimer(30); // Level 1: 30 seconds per question
      setTimerActive(false);
      
      // Load evidence data for level 1 from trace-threat folder
      const level1Evidence = getRandomTraceEvidence(1, QUESTIONS_PER_LEVEL[1]);
      setTraceThreatEvidencePool(level1Evidence);
      
      // Initialize with evidence
      setShuffledEvidence(level1Evidence);
      
      setShowScenarioIntro(true);
    } else if (gameId === 'cyber-runner') {
      // Cyber Runner game manages its own state
      setGameState('playing');
    } else {
      setGameState('playing');
    }
  };

  const pauseGame = () => {
    setGameState('paused');
  };

  const resumeGame = () => {
    setGameState('playing');
  };

  const endGame = () => {
    setGameState('completed');
    
    // Record game completion
    if (selectedGame) {
      recordGameCompletion(selectedGame.id, score);
    }
    
    // Save score to localStorage
    const gameScores = JSON.parse(localStorage.getItem('gameScores') || '{}');
    const gameKey = selectedGame;
    if (!gameScores[gameKey] || score > gameScores[gameKey]) {
      gameScores[gameKey] = score;
      localStorage.setItem('gameScores', JSON.stringify(gameScores));
      toast({
        title: "New High Score!",
        description: `You scored ${score} points in ${games.find(g => g.id === selectedGame)?.title}!`
      });
    }
  };

  const [showQuitConfirm, setShowQuitConfirm] = useState(false);

  const confirmQuitGame = () => {
    setShowQuitConfirm(false);
    setGameState('menu');
    setSelectedGame(null);
    setScore(0);
    setTimeLeft(60);
    setLevel(1);
    setCurrentEmail(0);
    setCurrentEvidence(0);
    setCollectedEvidence([]);
    setInvestigationProgress(0);
    setShowSuccessAnimation(false);
    setShowFailureAnimation(false);
    setAnimationMessage('');
    // Reset trace-threat specific state
    setTraceThreatLevel(1);
    setTraceThreatLives(3);
    setTraceThreatQuestionsAnswered(0);
    setTraceThreatQuestionsCorrect(0);
    setTraceThreatEvidencePool([]);
    setTraceThreatMaxQuestions(0);
    setQuestionTimer(undefined);
    setTimerActive(false);
    setShowGameOver(false);
  };

  const resetGame = () => {
    setShowQuitConfirm(true);
  };

  const handlePhishingAnswer = (isPhishing) => {
    const email = phishingEmails[currentEmail];
    const correct = email.isPhishing === isPhishing;
    
    if (correct) {
      setScore(score + 10);
      toast({
        title: "Correct!",
        description: isPhishing ? "You spotted the phishing email!" : "You correctly identified this as safe!",
        variant: "default"
      });
    } else {
      toast({
        title: "Incorrect",
        description: isPhishing ? "This was actually a safe email." : "This was a phishing attempt!",
        variant: "destructive"
      });
    }

    setTimeout(() => {
      if (currentEmail < phishingEmails.length - 1) {
        setCurrentEmail(currentEmail + 1);
      } else {
        // Reshuffle and continue with the same fetched set
        setPhishingEmails(shuffleArray([...phishingEmails]));
        setCurrentEmail(0);
        setLevel(level + 1);
      }
    }, 1500);
  };

  const handleEvidenceAnalysis = (isSuspicious) => {
    const evidence = shuffledEvidence[currentEvidence];
    const correct = evidence.isSuspicious === isSuspicious;
    
    // Stop timer for this question
    setTimerActive(false);
    
    // Update question counters ONLY for correct answers
    if (correct) {
      setTraceThreatQuestionsAnswered(prev => prev + 1);
      setTraceThreatQuestionsCorrect(prev => prev + 1);
    }
    
    if (correct) {
      // No points for individual questions - points awarded on level completion
      if (isSuspicious) {
        setCollectedEvidence([...collectedEvidence, evidence]);
        setInvestigationProgress(investigationProgress + 1);
      }
      // Set avatar to success state
      setAvatarState('success');
      // Show success animation
      setShowSuccessAnimation(true);
      setAnimationMessage(isSuspicious ? "Threat Neutralized!" : "System Secure!");
      
      // Reset avatar after animation
      setTimeout(() => {
        setShowSuccessAnimation(false);
        setAvatarState('neutral');
      }, 3000);
    } else {
      // No score penalty for wrong answers
      
      // Reduce life on wrong answer
      setTraceThreatLives(prev => {
        const newLives = prev - 1;
        if (newLives <= 0) {
          // Game over - show game over screen
          setShowGameOver(true);
          setGameState('game-over');
          return 0;
        }
        return newLives;
      });
      
      // Set avatar to failure state
      setAvatarState('failure');
      // Show failure animation
      setShowFailureAnimation(true);
      setAnimationMessage("Firewall Breached! Life Lost!");
      
      // Reset avatar after animation
      setTimeout(() => {
        setShowFailureAnimation(false);
        setAvatarState('neutral');
      }, 3000);
      
      // Show replacement question after wrong answer
      setTimeout(() => {
        // Get a new random question from the current level's evidence pool
        const newEvidence = getRandomTraceEvidence(traceThreatLevel, 1)[0];
        
        // Replace current evidence with new one
        const updatedEvidence = [...shuffledEvidence];
        updatedEvidence[currentEvidence] = newEvidence;
        setShuffledEvidence(updatedEvidence);
        
        // Reset timer for new question
        const timePerQuestion = getTimePerQuestion();
        setQuestionTimer(timePerQuestion);
        setTimerActive(true);
        
        // Show notification about replacement question
        toast({
          title: "New Question Loaded",
          description: "Try again with a fresh question!",
        });
      }, 2000);
    }

    // Check if level is complete (only for correct answers)
    if (correct) {
      const questionsNeeded = traceThreatMaxQuestions;
      if (traceThreatQuestionsAnswered >= questionsNeeded) {
        // Level complete - check if ALL questions were answered correctly
        const totalCorrect = traceThreatQuestionsCorrect;
        if (totalCorrect === questionsNeeded) {
          // Level complete - advance or win
          if (traceThreatLevel >= 5) {
            // Game won! Show trophy
            const finalPoints = QUESTIONS_PER_LEVEL[5];
            setScore(prev => prev + finalPoints);
            toast({
              title: "VICTORY!",
              description: `Perfect! +${finalPoints} points! You've completed all levels! Trophy earned!`,
            });
            endGame();
          } else {
            // Advance to next level
            advanceToNextLevel();
          }
        } else {
          // Level failed - not all correct, retry level
          handleLevelRetry();
        }
      } else {
        // Continue with next evidence (only for correct answers)
        setTimeout(() => {
          if (currentEvidence < shuffledEvidence.length - 1) {
            setCurrentEvidence(currentEvidence + 1);
          } else {
            // Reshuffle for more questions
            setShuffledEvidence(shuffleArray([...traceThreatEvidencePool]));
            setCurrentEvidence(0);
          }
        }, 1500);
      }
    }
  };

  const advanceToNextLevel = () => {
    const nextLevel = traceThreatLevel + 1;
    
    // Award points based on level completion
    // Level 1: 5 points, Level 2: 7 points, Level 3: 9 points, Level 4: 12 points, Level 5: 15 points
    const pointsAwarded = QUESTIONS_PER_LEVEL[traceThreatLevel];
    setScore(prev => prev + pointsAwarded);
    
    // Life addition rules:
    // Level 1 completion: +1 life (if < 3)
    // Level 2 completion: +1 life (if < 3) 
    // Level 3 completion: +1 life (if < 3, max 3)
    // Level 4 completion: +1 life (if < 3, max 3)
    // Level 5 completion: Win trophy
    if (traceThreatLevel === 1 || traceThreatLevel === 2) {
      setTraceThreatLives(prev => {
        if (prev < 3) {
          toast({
            title: "Life Restored!",
            description: `Level ${traceThreatLevel} complete! You've earned an extra life.`,
          });
          return prev + 1;
        }
        return prev;
      });
    } else if (traceThreatLevel === 3 || traceThreatLevel === 4) {
      setTraceThreatLives(prev => {
        if (prev < 3) {
          toast({
            title: "Life Restored!",
            description: `Level ${traceThreatLevel} complete! You've earned an extra life.`,
          });
          return prev + 1;
        }
        return prev;
      });
    }
    
    // Update level state BEFORE loading next level evidence
    setTraceThreatLevel(nextLevel);
    setLevel(nextLevel);
    
    // Load evidence for next level from trace-threat folder
    const nextLevelEvidence = getRandomTraceEvidence(nextLevel, QUESTIONS_PER_LEVEL[nextLevel]);
    setTraceThreatEvidencePool(nextLevelEvidence);
    setShuffledEvidence(nextLevelEvidence);
    
    // Reset for next level
    setTraceThreatQuestionsAnswered(0);
    setTraceThreatQuestionsCorrect(0);
    setTraceThreatMaxQuestions(QUESTIONS_PER_LEVEL[nextLevel]);
    setCurrentEvidence(0);
    
    // Reset timer with new level timing
    const newTimePerQuestion = getTimePerQuestion(nextLevel);
    setQuestionTimer(newTimePerQuestion);
    
    toast({
      title: `Level ${nextLevel} Starting!`,
      description: `Perfect! +${pointsAwarded} points earned! Time per question is now ${newTimePerQuestion}s`,
    });
  };

  const handleLevelRetry = () => {
    toast({
      title: "Level Failed!",
      description: `Need ALL ${traceThreatMaxQuestions} questions correct to pass. Retrying level...`,
      variant: "destructive"
    });
    
    // Reset for retry - reload evidence for current level
    setTraceThreatQuestionsAnswered(0);
    setTraceThreatQuestionsCorrect(0);
    setCurrentEvidence(0);
    
    // Load fresh evidence for current level
    const retryEvidence = getRandomTraceEvidence(traceThreatLevel, traceThreatMaxQuestions);
    setTraceThreatEvidencePool(retryEvidence);
    setShuffledEvidence(retryEvidence);
    
    // Reset timer
    const timePerQuestion = getTimePerQuestion();
    setQuestionTimer(timePerQuestion);
  };

  const handleNextEvidence = () => {
    if (currentEvidence < shuffledEvidence.length - 1) {
      setCurrentEvidence(currentEvidence + 1);
    }
  };

  const handleQuestionTimeout = () => {
    // Time ran out - mark as wrong answer automatically
    setTimerActive(false);
    setQuestionTimer(0);
    
    // DON'T increment question count on timeout - user didn't answer
    // Just reduce life and show replacement question
    
    // Reduce life on timeout
    setTraceThreatLives(prev => {
      const newLives = prev - 1;
      if (newLives <= 0) {
        // Game over - show game over screen
        setShowGameOver(true);
        setGameState('game-over');
        return 0;
      }
      return newLives;
    });
    
    // Set avatar to failure state
    setAvatarState('failure');
    setShowFailureAnimation(true);
    setAnimationMessage("Time's Up! Life Lost!");
    
    // Reset avatar after animation
    setTimeout(() => {
      setShowFailureAnimation(false);
      setAvatarState('neutral');
    }, 3000);
    
    // Show replacement question after timeout
    setTimeout(() => {
      // Get a new random question from the current level's evidence pool
      const newEvidence = getRandomTraceEvidence(traceThreatLevel, 1)[0];
      
      // Replace current evidence with new one
      const updatedEvidence = [...shuffledEvidence];
      updatedEvidence[currentEvidence] = newEvidence;
      setShuffledEvidence(updatedEvidence);
      
      // Reset timer for new question
      const timePerQuestion = getTimePerQuestion();
      setQuestionTimer(timePerQuestion);
      setTimerActive(true);
      
      // Show notification about replacement question
      toast({
        title: "New Question Loaded",
        description: "Time's up! Try again with a fresh question!",
      });
    }, 2000);
    
    // Don't check for level completion on timeout
    // User needs to answer questions to progress
  };

  const handlePreviousEvidence = () => {
    if (currentEvidence > 0) {
      setCurrentEvidence(currentEvidence - 1);
    }
  };

  const handleStartInvestigation = () => {
    setShowScenarioIntro(false);
    setGameState('playing');
    const timePerQuestion = getTimePerQuestion();
    setTimerActive(true); // Start the question timer
    setQuestionTimer(timePerQuestion); // Reset to level-appropriate time
  };

  const handlePlayAgain = () => {
    setShowGameOver(false);
    // Reset all game state
    setSelectedGame('trace-threat');
    setScore(0);
    setTimeLeft(60);
    setTraceThreatLevel(1);
    setTraceThreatLives(3);
    setTraceThreatQuestionsAnswered(0);
    setTraceThreatQuestionsCorrect(0);
    setCurrentEvidence(0);
    setQuestionTimer(undefined);
    setTimerActive(false);
    // Load new evidence
    const initialEvidence = getRandomTraceEvidence(1, QUESTIONS_PER_LEVEL[1]);
    setShuffledEvidence(initialEvidence);
    setTraceThreatEvidencePool(initialEvidence);
    setTraceThreatMaxQuestions(QUESTIONS_PER_LEVEL[1]);
    // Start timer for first question
    const initialTime = getTimePerQuestion();
    setQuestionTimer(initialTime);
    setTimerActive(true);
  };

  const handleReturnToMenu = () => {
    setShowGameOver(false);
    confirmQuitGame(); // Directly quit without confirmation
  };

  const renderGameOverScreen = () => (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-red-900 to-purple-900">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-black/40 backdrop-blur-sm border border-red-500/30 rounded-2xl p-8 max-w-md w-full mx-4 text-center"
      >
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mb-4"
        >
          <Skull className="w-16 h-16 text-red-400 mx-auto" />
        </motion.div>
        
        <h2 className="text-3xl font-bold text-red-400 mb-2">Game Over!</h2>
        <p className="text-gray-300 mb-6">
          You've run out of lives! Better luck next time, detective.
        </p>
        
        <div className="space-y-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePlayAgain}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200"
          >
            <Refresh className="w-4 h-4 mr-2" />
            Play Again
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReturnToMenu}
            className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Quit Game
          </motion.button>
        </div>
        
        <div className="mt-6 text-sm text-gray-400">
          <p>Final Score: <span className="text-yellow-400 font-bold">{score}</span></p>
          <p>Level Reached: <span className="text-orange-400 font-bold">{traceThreatLevel}</span></p>
        </div>
      </motion.div>
    </div>
  );

  const renderGameMenu = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
      {games.map((game) => (
        <motion.div
          key={game.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="cursor-pointer"
          onClick={() => startGame(game.id)}
        >
          <Card className="glass-effect cyber-border hover:glow-effect transition-all duration-300 h-full">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className={`p-2 lg:p-3 rounded-lg bg-gradient-to-r ${game.color} glow-effect`}>
                  <game.icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-base lg:text-lg">{game.title}</CardTitle>
                  <CardDescription className="text-sm lg:text-base">{game.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between">
                <span className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${game.color} text-white`}>
                  {game.difficulty}
                </span>
                <Button
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 h-10 lg:h-9"
                  size="lg"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Play
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );

  const renderPhishingGame = () => {
    if (noGameContent) {
      return (
        <div className="space-y-6">
          <Card className="glass-effect cyber-border max-w-md mx-auto text-center">
            <CardHeader>
              <CardTitle className="text-xl">No game content added yet</CardTitle>
              <CardDescription>
                The phishing email entries are not available in the database.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      );
    }
    if (!phishingEmails.length) return null;
    
    const email = phishingEmails[currentEmail];
    
    return (
      <div className="space-y-6">
        <Card className="glass-effect cyber-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Email #{currentEmail + 1}</CardTitle>
              <div className="flex items-center space-x-4">
                <div className="text-sm text-muted-foreground">Level {level}</div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <span className="font-mono text-cyan-400">{timeLeft}s</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="font-mono text-yellow-400">{score}</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-muted/20 border">
                <div className="text-sm text-muted-foreground mb-2">From: {email.sender}</div>
                <div className="font-semibold mb-3">Subject: {email.subject}</div>
                <div className="text-sm">{email.content}</div>
              </div>
              
              <div className="flex flex-col lg:flex-row gap-3 lg:gap-4 justify-center">
                <Button
                  onClick={() => handlePhishingAnswer(true)}
                  className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 h-12 lg:h-10 w-full lg:w-auto"
                  size="lg"
                >
                  🎣 Phishing
                </Button>
                <Button
                  onClick={() => handlePhishingAnswer(false)}
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 h-12 lg:h-10 w-full lg:w-auto"
                  size="lg"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Safe
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderTraceThreatGame = () => {
    if (!shuffledEvidence.length) return null;
    
    const evidence = shuffledEvidence[currentEvidence];
    
    return (
      <div className="space-y-6">
        <Card className="glass-effect cyber-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Evidence #{currentEvidence + 1}</CardTitle>
              <div className="flex items-center space-x-4">
                <div className="text-sm text-muted-foreground">Level {level}</div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <span className="font-mono text-cyan-400">{timeLeft}s</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="font-mono text-yellow-400">{score}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-orange-400" />
                  <span className="font-mono text-orange-400">{investigationProgress}</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-muted/20 border">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${
                      evidence.type === 'email' ? 'bg-blue-500' : 
                      evidence.type === 'log' ? 'bg-red-500' : 'bg-green-500'
                    }`}></div>
                    <span className="text-sm font-medium text-muted-foreground uppercase">
                      {evidence.type}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {evidence.timestamp}
                  </div>
                </div>
                <div className="font-semibold mb-2 text-lg">{evidence.title}</div>
                <div className="text-sm mb-3">{evidence.content}</div>
                <div className="text-xs text-muted-foreground">
                  Source: {evidence.source}
                </div>
              </div>
              
              <div className="flex flex-col lg:flex-row gap-3 lg:gap-4 justify-center">
                <Button
                  onClick={() => handleEvidenceAnalysis(true)}
                  className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 h-12 lg:h-10 w-full lg:w-auto"
                  size="lg"
                >
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Suspicious
                </Button>
                <Button
                  onClick={() => handleEvidenceAnalysis(false)}
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 h-12 lg:h-10 w-full lg:w-auto"
                  size="lg"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Legitimate
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Investigation Progress */}
        {collectedEvidence.length > 0 && (
          <Card className="glass-effect cyber-border">
            <CardHeader>
              <CardTitle className="text-lg">Investigation Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-sm text-muted-foreground">
                  Suspicious evidence collected: {collectedEvidence.length}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {collectedEvidence.map((evidence, index) => (
                    <div key={index} className="p-2 rounded bg-red-500/10 border border-red-500/20">
                      <div className="text-xs font-medium text-red-400">{evidence.title}</div>
                      <div className="text-xs text-muted-foreground">{evidence.source}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  const renderSuccessAnimation = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
    >
      <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
        {/* Shield/Fence Animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="w-24 h-24 lg:w-32 lg:h-32 mx-auto mb-6"
        >
          <div className="w-full h-full bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center glow-effect">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="text-4xl lg:text-6xl"
            >
              <Shield className="w-8 h-8 text-blue-400" />
            </motion.div>
          </div>
        </motion.div>

        {/* Virus Elimination Particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: 0, 
              y: 0, 
              scale: 1,
              opacity: 1 
            }}
            animate={{ 
              x: Math.cos(i * 45 * Math.PI / 180) * 80,
              y: Math.sin(i * 45 * Math.PI / 180) * 80,
              scale: 0,
              opacity: 0
            }}
            transition={{ 
              duration: 1.5, 
              delay: 0.5,
              ease: "easeOut"
            }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl lg:text-2xl"
          >
            🦠
          </motion.div>
        ))}

        {/* Success Message */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center max-w-md"
        >
          <h3 className="text-xl lg:text-2xl font-bold text-green-400 mb-2">
            {animationMessage}
          </h3>
          <p className="text-white/80 mb-6 text-sm lg:text-base">
            Great job! The system is protected.
          </p>
          <Button
            onClick={() => setShowSuccessAnimation(false)}
            className="w-full h-12 lg:h-10 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-base lg:text-sm font-semibold"
            size="lg"
          >
            Continue Investigation
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );

  const renderFailureAnimation = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-red-900/80"
    >
      <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
        {/* Red Overlay with Glitch Effect */}
        <motion.div
          animate={{ 
            filter: [
              "hue-rotate(0deg) contrast(1)",
              "hue-rotate(90deg) contrast(1.2)",
              "hue-rotate(180deg) contrast(0.8)",
              "hue-rotate(270deg) contrast(1.1)",
              "hue-rotate(360deg) contrast(1)"
            ]
          }}
          transition={{ duration: 0.5, repeat: 3 }}
          className="w-24 h-24 lg:w-32 lg:h-32 mx-auto mb-6 bg-gradient-to-br from-red-500 to-red-700 rounded-lg flex items-center justify-center"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 0.3, repeat: 2 }}
            className="text-4xl lg:text-6xl"
          >
            💻
          </motion.div>
        </motion.div>

        {/* Digital Static Effect */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ 
                duration: 0.1, 
                delay: i * 0.05,
                repeat: 3
              }}
              className="absolute w-1 h-1 bg-red-400"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>

        {/* Failure Message */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center max-w-md"
        >
          <h3 className="text-xl lg:text-2xl font-bold text-red-400 mb-2">
            {animationMessage}
          </h3>
          <p className="text-white/80 mb-6 text-sm lg:text-base">
            Uh oh! The firewall wasn't activated in time. Try again.
          </p>
          <Button
            onClick={() => setShowFailureAnimation(false)}
            className="w-full h-12 lg:h-10 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-base lg:text-sm font-semibold"
            size="lg"
          >
            Retry Analysis
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );

  const renderGameContent = () => {
    if (selectedGame === 'phishing-detector') {
      return renderPhishingGame();
    } else if (selectedGame === 'trace-threat') {
      return (
        <div className="space-y-4">
          {/* Mario-style HUD overlay for Trace The Threat */}
          <TraceRunnerHUD
            level={traceThreatLevel}
            questionsAnswered={traceThreatQuestionsAnswered}
            maxQuestions={traceThreatMaxQuestions}
            timer={questionTimer}
            lives={traceThreatLives}
            show={true}
          />

          {/* Core gameplay area below the HUD */}
          <GameArea
            gameState={gameState}
            score={score}
            timeLeft={timeLeft}
            level={traceThreatLevel}
            investigationProgress={investigationProgress}
            evidence={shuffledEvidence}
            currentEvidence={currentEvidence}
            onEvidenceAnalysis={handleEvidenceAnalysis}
            onNextEvidence={handleNextEvidence}
            onPreviousEvidence={handlePreviousEvidence}
            collectedEvidence={collectedEvidence}
            avatarState={avatarState}
            lives={traceThreatLives}
            questionsAnswered={traceThreatQuestionsAnswered}
            maxQuestions={traceThreatMaxQuestions}
            questionTimer={questionTimer}
          />
        </div>
      );
    } else if (selectedGame === 'cyber-runner') {
      return (
        <RunningGame
          onGameComplete={(finalScore) => {
            setScore(finalScore);
            recordGameCompletion('cyber-runner', finalScore);
            setGameState('completed');
          }}
          onGameOver={() => {
            setGameState('completed');
          }}
          initialScore={score}
        />
      );
    }
    return null;
  };

  const renderGameCompleted = () => {
    const gameScores = JSON.parse(localStorage.getItem('gameScores') || '{}');
    const highScore = gameScores[selectedGame] || 0;
    const isNewRecord = score >= highScore;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl mx-auto p-4"
      >
        <Card className="glass-effect cyber-border text-center">
          <CardHeader className="pb-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="mx-auto mb-4"
            >
              <Trophy className={`w-12 h-12 lg:w-16 lg:h-16 ${isNewRecord ? 'text-yellow-400' : 'text-purple-400'}`} />
            </motion.div>
            <CardTitle className="text-2xl lg:text-3xl cyber-text">Game Over!</CardTitle>
            <CardDescription className="text-base lg:text-lg">
              {games.find(g => g.id === selectedGame)?.title}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <div className="text-4xl lg:text-6xl font-bold cyber-text mb-2">
                {score}
              </div>
              <p className="text-lg lg:text-xl text-muted-foreground">
                Final Score
              </p>
              {isNewRecord && (
                <p className="text-yellow-400 font-medium mt-2 text-sm lg:text-base">New High Score!</p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col gap-3 lg:flex-row lg:gap-4 justify-center"
            >
              <Button
                onClick={() => startGame(selectedGame)}
                variant="outline"
                className="glass-effect h-12 lg:h-10 w-full lg:w-auto"
                size="lg"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Play Again
              </Button>
              <Button
                onClick={confirmQuitGame}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 h-12 lg:h-10 w-full lg:w-auto"
                size="lg"
              >
                Choose Game
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  return (
    <div className="page-container">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 lg:mb-8"
        >
          <Button
            variant="outline"
            onClick={() => navigate('/dashboard')}
            className="glass-effect mb-4 h-10 lg:h-9 w-full lg:w-auto"
            size="lg"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-2xl lg:text-4xl font-bold cyber-text mb-2">
            Cybersecurity Games
          </h1>
          <p className="text-muted-foreground text-sm lg:text-base">
            Learn cybersecurity through interactive games and challenges
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {gameState === 'menu' && (
            <motion.div
              key="menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {renderGameMenu()}
            </motion.div>
          )}

          {gameState === 'playing' && (
            <motion.div
              key="playing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-4 lg:mb-6 gap-4">
                <h2 className="text-xl lg:text-2xl font-bold">
                  {games.find(g => g.id === selectedGame)?.title}
                </h2>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={pauseGame}
                    className="glass-effect h-10 lg:h-9 flex-1 lg:flex-none"
                    size="lg"
                  >
                    <Pause className="w-4 h-4 mr-2" />
                    Pause
                  </Button>
                  <Button
                    variant="outline"
                    onClick={resetGame}
                    className="glass-effect h-10 lg:h-9 flex-1 lg:flex-none"
                    size="lg"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Quit
                  </Button>
                </div>
              </div>
              {renderGameContent()}
            </motion.div>
          )}

          {gameState === 'paused' && (
            <motion.div
              key="paused"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <Card className="glass-effect cyber-border max-w-md mx-auto">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl lg:text-2xl">Game Paused</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-3xl lg:text-4xl font-bold cyber-text">{score}</div>
                  <p className="text-muted-foreground text-sm lg:text-base">Current Score</p>
                  <div className="flex flex-col lg:flex-row gap-3 lg:gap-4 justify-center">
                    <Button
                      onClick={resumeGame}
                      className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 h-12 lg:h-10 w-full lg:w-auto"
                      size="lg"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Resume
                    </Button>
                    <Button
                      variant="outline"
                      onClick={resetGame}
                      className="glass-effect h-12 lg:h-10 w-full lg:w-auto"
                      size="lg"
                    >
                      Quit Game
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {gameState === 'completed' && (
            <motion.div
              key="completed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {renderGameCompleted()}
            </motion.div>
          )}

          {gameState === 'game-over' && (
            <motion.div
              key="game-over"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {renderGameOverScreen()}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Animation Overlays */}
        <AnimatePresence>
          {showSuccessAnimation && renderSuccessAnimation()}
          {showFailureAnimation && renderFailureAnimation()}
        </AnimatePresence>

        {/* Quit Confirmation Dialog - Only show during active gameplay */}
        <AnimatePresence>
          {showQuitConfirm && gameState === 'playing' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gradient-to-br from-gray-900 via-red-900 to-gray-900 border border-red-500/30 rounded-2xl p-6 max-w-md w-full"
              >
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="w-8 h-8 text-red-400" />
                  <h3 className="text-2xl font-bold text-white">Quit Game?</h3>
                </div>
                
                <p className="text-gray-300 mb-6">
                  Your progress will not be saved. You may lose your current score and points.
                  <br />
                  Are you sure you want to quit?
                </p>
                
                <div className="flex gap-3">
                  <Button
                    onClick={confirmQuitGame}
                    className="flex-1 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
                    size="lg"
                  >
                    <Skull className="w-4 h-4 mr-2" />
                    Yes, Quit
                  </Button>
                  <Button
                    onClick={() => setShowQuitConfirm(false)}
                    variant="outline"
                    className="flex-1 glass-effect"
                    size="lg"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scenario Intro Modal */}
        <ScenarioIntroModal
          isOpen={showScenarioIntro}
          onClose={() => setShowScenarioIntro(false)}
          scenario={currentScenario}
          onStart={handleStartInvestigation}
        />
      </div>
    </div>
  );
};

export default Game;