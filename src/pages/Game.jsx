import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  RotateCcw, 
  Target, 
  Zap,
  Trophy,
  Clock,
  Star
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { toast } from '../components/ui/use-toast';
import API_CONFIG from '../lib/api';
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

  // Hacker Game State
  const [hackers, setHackers] = useState([]);
  const [clickedHackers, setClickedHackers] = useState([]);

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
      id: 'hacker-hunter',
      title: 'Catch the Hacker',
      description: 'Click on suspicious activities to stop cyber attacks!',
      icon: Zap,
      color: 'from-purple-500 to-blue-500',
      difficulty: 'Intermediate'
    }
  ];

  const phishingEmailData = [
    {
      id: 1,
      sender: 'security@paypaI.com',
      subject: 'URGENT: Account Suspended - Verify Now!',
      content: 'Your account has been suspended due to suspicious activity. Click here to verify immediately or lose access forever!',
      isPhishing: true,
      indicators: ['Misspelled domain (paypaI vs paypal)', 'Urgent language', 'Threats of account loss']
    },
    {
      id: 2,
      sender: 'newsletter@techcompany.com',
      subject: 'Weekly Tech Newsletter',
      content: 'Here are this week\'s top tech stories and updates from our team.',
      isPhishing: false,
      indicators: ['Legitimate sender', 'Normal subject', 'No urgent calls to action']
    },
    {
      id: 3,
      sender: 'support@bank-security.net',
      subject: 'Security Alert: Login from New Device',
      content: 'We detected a login from a new device. If this wasn\'t you, click here to secure your account.',
      isPhishing: true,
      indicators: ['Suspicious domain', 'Generic greeting', 'Pressure to click link']
    },
    {
      id: 4,
      sender: 'hr@yourcompany.com',
      subject: 'Team Meeting Tomorrow',
      content: 'Don\'t forget about our team meeting tomorrow at 2 PM in the conference room.',
      isPhishing: false,
      indicators: ['Internal sender', 'Normal business content', 'No suspicious links']
    },
    {
      id: 5,
      sender: 'winner@lottery-international.biz',
      subject: 'Congratulations! You\'ve Won $1,000,000!',
      content: 'You\'ve been selected as our grand prize winner! Send your personal details to claim your prize.',
      isPhishing: true,
      indicators: ['Too good to be true', 'Requests personal info', 'Suspicious domain']
    }
  ];

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
          // fallback to local seed
          setPhishingEmails(shuffleArray([...phishingEmailData]));
        } catch (e) {
          setPhishingEmails(shuffleArray([...phishingEmailData]));
        }
      })();
    } else if (selectedGame === 'hacker-hunter' && gameState === 'playing') {
      generateHackers();
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

  const generateHackers = () => {
    const newHackers = [];
    for (let i = 0; i < 5 + level; i++) {
      newHackers.push({
        id: i,
        x: Math.random() * 80 + 10,
        y: Math.random() * 80 + 10,
        type: Math.random() > 0.7 ? 'malicious' : 'safe',
        clicked: false
      });
    }
    setHackers(newHackers);
  };

  const startGame = (gameId) => {
    setSelectedGame(gameId);
    setGameState('playing');
    setScore(0);
    setTimeLeft(60);
    setLevel(1);
    setCurrentEmail(0);
    setClickedHackers([]);
  };

  const pauseGame = () => {
    setGameState('paused');
  };

  const resumeGame = () => {
    setGameState('playing');
  };

  const endGame = () => {
    setGameState('completed');
    
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

  const resetGame = () => {
    setGameState('menu');
    setSelectedGame(null);
    setScore(0);
    setTimeLeft(60);
    setLevel(1);
    setCurrentEmail(0);
    setClickedHackers([]);
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
        // Reshuffle and continue
        setPhishingEmails(shuffleArray([...phishingEmailData]));
        setCurrentEmail(0);
        setLevel(level + 1);
      }
    }, 1500);
  };

  const handleHackerClick = (hackerId) => {
    const hacker = hackers.find(h => h.id === hackerId);
    if (!hacker || clickedHackers.includes(hackerId)) return;

    setClickedHackers([...clickedHackers, hackerId]);

    if (hacker.type === 'malicious') {
      setScore(score + 5);
      toast({
        title: "Good catch!",
        description: "You stopped a cyber attack!",
        variant: "default"
      });
    } else {
      setScore(Math.max(0, score - 2));
      toast({
        title: "Oops!",
        description: "That was a legitimate user.",
        variant: "destructive"
      });
    }

    // Generate new hackers when all are clicked
    if (clickedHackers.length + 1 >= hackers.length) {
      setTimeout(() => {
        generateHackers();
        setClickedHackers([]);
        setLevel(level + 1);
      }, 1000);
    }
  };

  const renderGameMenu = () => (
    <div className="grid md:grid-cols-2 gap-6">
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
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${game.color} glow-effect`}>
                  <game.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">{game.title}</CardTitle>
                  <CardDescription>{game.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${game.color} text-white`}>
                  {game.difficulty}
                </span>
                <Button
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
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
              
              <div className="flex gap-4 justify-center">
                <Button
                  onClick={() => handlePhishingAnswer(true)}
                  className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
                >
                  🎣 Phishing
                </Button>
                <Button
                  onClick={() => handlePhishingAnswer(false)}
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                >
                  ✅ Safe
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderHackerGame = () => (
    <div className="space-y-6">
      <Card className="glass-effect cyber-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Catch the Hackers!</CardTitle>
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
          <div className="relative w-full game-field-height bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg overflow-hidden border-2 border-purple-500/30">
            <img 
              className="w-full h-full object-cover opacity-40" 
              alt="Cyber network background"
             src="https://images.unsplash.com/photo-1471896486552-5dc315aa7ea3" />
            
            {hackers.map((hacker) => (
              <motion.button
                key={hacker.id}
                className={`absolute w-8 h-8 rounded-full border-2 transition-all duration-300 ${
                  clickedHackers.includes(hacker.id)
                    ? hacker.type === 'malicious'
                      ? 'bg-red-500 border-red-400'
                      : 'bg-green-500 border-green-400'
                    : hacker.type === 'malicious'
                    ? 'bg-red-500/70 border-red-400 hover:bg-red-500 pulse-glow'
                    : 'bg-blue-500/70 border-blue-400 hover:bg-blue-500'
                }`}
                style={{
                  left: `${hacker.x}%`,
                  top: `${hacker.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                onClick={() => handleHackerClick(hacker.id)}
                disabled={clickedHackers.includes(hacker.id)}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                {hacker.type === 'malicious' ? '💀' : '👤'}
              </motion.button>
            ))}
            
            <div className="absolute bottom-4 left-4 right-4">
              <div className="glass-effect rounded-lg p-3">
                <p className="text-sm text-center">
                  Click on the red hackers (💀) to stop attacks! Avoid clicking innocent users (👤).
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderGameContent = () => {
    if (selectedGame === 'phishing-detector') {
      return renderPhishingGame();
    } else if (selectedGame === 'hacker-hunter') {
      return renderHackerGame();
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
        className="max-w-2xl mx-auto"
      >
        <Card className="glass-effect cyber-border text-center">
          <CardHeader>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="mx-auto mb-4"
            >
              <Trophy className={`w-16 h-16 ${isNewRecord ? 'text-yellow-400' : 'text-purple-400'}`} />
            </motion.div>
            <CardTitle className="text-3xl cyber-text">Game Over!</CardTitle>
            <CardDescription className="text-lg">
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
              <div className="text-6xl font-bold cyber-text mb-2">
                {score}
              </div>
              <p className="text-xl text-muted-foreground">
                Final Score
              </p>
              {isNewRecord && (
                <p className="text-yellow-400 font-medium mt-2">🎉 New High Score!</p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                onClick={() => startGame(selectedGame)}
                variant="outline"
                className="glass-effect"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Play Again
              </Button>
              <Button
                onClick={resetGame}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
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
          className="mb-8"
        >
          <Button
            variant="outline"
            onClick={() => navigate('/dashboard')}
            className="glass-effect mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-4xl font-bold cyber-text mb-2">
            Cybersecurity Games
          </h1>
          <p className="text-muted-foreground">
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
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  {games.find(g => g.id === selectedGame)?.title}
                </h2>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={pauseGame}
                    className="glass-effect"
                  >
                    <Pause className="w-4 h-4 mr-2" />
                    Pause
                  </Button>
                  <Button
                    variant="outline"
                    onClick={resetGame}
                    className="glass-effect"
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
                <CardHeader>
                  <CardTitle className="text-2xl">Game Paused</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-4xl font-bold cyber-text">{score}</div>
                  <p className="text-muted-foreground">Current Score</p>
                  <div className="flex gap-4 justify-center">
                    <Button
                      onClick={resumeGame}
                      className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Resume
                    </Button>
                    <Button
                      variant="outline"
                      onClick={resetGame}
                      className="glass-effect"
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
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Game;