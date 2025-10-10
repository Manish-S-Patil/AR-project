import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Camera, 
  ArrowLeft, 
  Play, 
  Pause, 
  RotateCcw, 
  AlertTriangle,
  CheckCircle,
  Eye,
  EyeOff
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { toast } from '../components/ui/use-toast';

const ARScenarios = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationStep, setSimulationStep] = useState(0);
  const [showThreat, setShowThreat] = useState(false);

  const scenarios = {
    'phishing': {
      title: 'Phishing Email Detection',
      description: 'Learn to identify suspicious emails through AR visualization',
      steps: [
        'Point your camera at an email',
        'AR highlights suspicious elements',
        'Learn what makes it dangerous',
        'Practice identifying threats'
      ],
      threats: [
        { type: 'Suspicious sender', position: 'top-left', color: 'red' },
        { type: 'Urgent language', position: 'center', color: 'orange' },
        { type: 'Suspicious link', position: 'bottom-right', color: 'red' }
      ]
    },
    'fake-login': {
      title: 'Fake Login Page Detection',
      description: 'Detect fraudulent login pages with AR warnings',
      steps: [
        'Scan a login page',
        'AR checks URL authenticity',
        'Identifies security indicators',
        'Shows safety recommendations'
      ],
      threats: [
        { type: 'Fake URL', position: 'top-center', color: 'red' },
        { type: 'No HTTPS', position: 'top-right', color: 'orange' },
        { type: 'Missing security badge', position: 'bottom-left', color: 'yellow' }
      ]
    },
    'weak-password': {
      title: 'Password Security Visualization',
      description: 'Visualize password strength and vulnerabilities',
      steps: [
        'Enter a password',
        'AR shows strength meter',
        'Highlights weaknesses',
        'Suggests improvements'
      ],
      threats: [
        { type: 'Too short', position: 'left', color: 'red' },
        { type: 'No special chars', position: 'center', color: 'orange' },
        { type: 'Common word', position: 'right', color: 'yellow' }
      ]
    },
    'malware-usb': {
      title: 'Malware USB Detection',
      description: 'AR warnings for potentially dangerous USB devices',
      steps: [
        'Point camera at USB device',
        'AR scans for threats',
        'Shows risk assessment',
        'Provides safety guidance'
      ],
      threats: [
        { type: 'Unknown device', position: 'top-center', color: 'red' },
        { type: 'Suspicious files', position: 'bottom-left', color: 'orange' },
        { type: 'Auto-run detected', position: 'bottom-right', color: 'red' }
      ]
    },
    'safe-browsing': {
      title: 'Safe Browsing Tips',
      description: 'AR overlays showing website security indicators',
      steps: [
        'Scan a website',
        'AR checks security status',
        'Shows trust indicators',
        'Provides browsing tips'
      ],
      threats: [
        { type: 'Unsecured connection', position: 'top-left', color: 'orange' },
        { type: 'Suspicious ads', position: 'center-right', color: 'yellow' },
        { type: 'Download warning', position: 'bottom-center', color: 'red' }
      ]
    }
  };

  useEffect(() => {
    if (location.state?.scenario) {
      setSelectedScenario(location.state.scenario);
    }
  }, [location.state]);

  const startSimulation = () => {
    setIsSimulating(true);
    setSimulationStep(0);
    setShowThreat(false);
    
    // Simulate AR scanning process
    const interval = setInterval(() => {
      setSimulationStep(prev => {
        if (prev >= 3) {
          clearInterval(interval);
          setShowThreat(true);
          return prev;
        }
        return prev + 1;
      });
    }, 1500);
  };

  const stopSimulation = () => {
    setIsSimulating(false);
    setSimulationStep(0);
    setShowThreat(false);
  };

  const resetSimulation = () => {
    stopSimulation();
    setTimeout(() => startSimulation(), 500);
  };

  const handleTakeQuiz = () => {
    navigate(`/quiz/${selectedScenario}`);
  };

  const renderARView = () => {
    if (!selectedScenario || !scenarios[selectedScenario]) return null;

    const scenario = scenarios[selectedScenario];

    return (
      <div className="relative w-full h-96 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg overflow-hidden border-2 border-purple-500/30">
        {/* Camera View Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20">
          <img 
            className="w-full h-full object-cover opacity-60" 
            alt="AR camera view background"
           src="https://images.unsplash.com/photo-1651505942687-efc26cb528ba" />
        </div>

        {/* Scanning Animation */}
        {isSimulating && !showThreat && (
          <motion.div
            className="absolute inset-0 border-2 border-cyan-400"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="scan-line absolute inset-0" />
            <motion.div
              className="absolute top-4 left-4 text-cyan-400 text-sm font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Scanning... {Math.min(simulationStep + 1, 4)}/4
            </motion.div>
          </motion.div>
        )}

        {/* AR Threat Indicators */}
        <AnimatePresence>
          {showThreat && scenario.threats.map((threat, index) => (
            <motion.div
              key={index}
              className={`absolute ${getPositionClass(threat.position)} transform -translate-x-1/2 -translate-y-1/2`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.3, type: "spring", stiffness: 200 }}
            >
              <div className={`flex items-center space-x-2 px-3 py-2 rounded-full border-2 ${getThreatColor(threat.color)} glass-effect`}>
                <AlertTriangle className="w-4 h-4" />
                <span className="text-sm font-medium">{threat.type}</span>
              </div>
              <motion.div
                className={`absolute -inset-2 rounded-full border-2 ${getThreatColor(threat.color)} opacity-50`}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* AR UI Elements */}
        {isSimulating && (
          <div className="absolute bottom-4 left-4 right-4">
            <div className="glass-effect rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-sm text-green-400">AR Active</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {scenario.steps[Math.min(simulationStep, scenario.steps.length - 1)]}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const getPositionClass = (position) => {
    const positions = {
      'top-left': 'top-1/4 left-1/4',
      'top-center': 'top-1/4 left-1/2',
      'top-right': 'top-1/4 right-1/4',
      'center': 'top-1/2 left-1/2',
      'center-right': 'top-1/2 right-1/4',
      'bottom-left': 'bottom-1/4 left-1/4',
      'bottom-center': 'bottom-1/4 left-1/2',
      'bottom-right': 'bottom-1/4 right-1/4',
      'left': 'top-1/2 left-1/4',
      'right': 'top-1/2 right-1/4'
    };
    return positions[position] || 'top-1/2 left-1/2';
  };

  const getThreatColor = (color) => {
    const colors = {
      'red': 'border-red-500 text-red-400 bg-red-500/10',
      'orange': 'border-orange-500 text-orange-400 bg-orange-500/10',
      'yellow': 'border-yellow-500 text-yellow-400 bg-yellow-500/10'
    };
    return colors[color] || colors.red;
  };

  if (!selectedScenario) {
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-4xl mx-auto">
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
              AR Cyber Threat Scenarios
            </h1>
            <p className="text-muted-foreground">
              Select a scenario to begin your AR cybersecurity training
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(scenarios).map(([key, scenario]) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="cursor-pointer"
                onClick={() => setSelectedScenario(key)}
              >
                <Card className="glass-effect cyber-border hover:glow-effect transition-all duration-300 h-full">
                  <CardHeader>
                    <CardTitle className="text-lg">{scenario.title}</CardTitle>
                    <CardDescription>{scenario.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                      Start Scenario
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const scenario = scenarios[selectedScenario];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            variant="outline"
            onClick={() => setSelectedScenario(null)}
            className="glass-effect mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Scenarios
          </Button>
          <h1 className="text-4xl font-bold cyber-text mb-2">
            {scenario.title}
          </h1>
          <p className="text-muted-foreground">
            {scenario.description}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* AR View */}
          <div className="lg:col-span-2">
            <Card className="glass-effect cyber-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Camera className="w-6 h-6 text-purple-400" />
                    <CardTitle>AR Camera View</CardTitle>
                  </div>
                  <div className="flex items-center space-x-2">
                    {!isSimulating ? (
                      <Button
                        onClick={startSimulation}
                        className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Start AR
                      </Button>
                    ) : (
                      <>
                        <Button
                          variant="outline"
                          onClick={stopSimulation}
                          className="glass-effect"
                        >
                          <Pause className="w-4 h-4 mr-2" />
                          Stop
                        </Button>
                        <Button
                          variant="outline"
                          onClick={resetSimulation}
                          className="glass-effect"
                        >
                          <RotateCcw className="w-4 h-4 mr-2" />
                          Reset
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {renderARView()}
              </CardContent>
            </Card>
          </div>

          {/* Controls and Info */}
          <div className="space-y-6">
            {/* Scenario Steps */}
            <Card className="glass-effect cyber-border">
              <CardHeader>
                <CardTitle className="text-lg">How It Works</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {scenario.steps.map((step, index) => (
                    <motion.div
                      key={index}
                      className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
                        isSimulating && simulationStep >= index
                          ? 'bg-purple-500/20 border border-purple-500/30'
                          : 'bg-muted/20'
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        isSimulating && simulationStep >= index
                          ? 'bg-purple-500 text-white'
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {index + 1}
                      </div>
                      <span className="text-sm">{step}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Threat Detection */}
            {showThreat && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="glass-effect cyber-border border-red-500/30">
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="w-5 h-5 text-red-400" />
                      <CardTitle className="text-lg text-red-400">Threats Detected</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {scenario.threats.map((threat, index) => (
                        <motion.div
                          key={index}
                          className="flex items-center space-x-3 p-2 rounded-lg bg-red-500/10 border border-red-500/20"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.2 }}
                        >
                          <AlertTriangle className="w-4 h-4 text-red-400" />
                          <span className="text-sm text-red-400">{threat.type}</span>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Actions */}
            <Card className="glass-effect cyber-border">
              <CardHeader>
                <CardTitle className="text-lg">Next Steps</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={handleTakeQuiz}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                >
                  Take Quiz
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    toast({
                      title: "🚧 Feature Coming Soon!",
                      description: "Advanced AR features will be available in the next update! 🚀"
                    });
                  }}
                  className="w-full glass-effect"
                >
                  Advanced Mode
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ARScenarios;