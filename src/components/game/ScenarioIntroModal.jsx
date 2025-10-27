import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { AlertTriangle, Shield, Target, Trophy, Heart, Clock, Bug, Crown } from 'lucide-react';

const ScenarioIntroModal = ({ 
  isOpen, 
  onClose, 
  scenario, 
  onStart 
}) => {
  if (!isOpen) return null;

  const scenarios = {
    'corporate-breach': {
      title: 'Corporate Data Breach Investigation',
      iconComponent: <Crown className="w-12 h-12 text-yellow-400" />,
      description: 'A major corporation has reported suspicious activity across multiple systems. Your mission is to analyze evidence and perfectly clear each level to secure the network.',
      objectives: [
        'Level-based progression: 1→5. You must answer ALL questions correctly per level to pass.',
        'Per-question timer: 30s on Level 1, then -4s each level (min 14s).',
        'Lives: Start with 3. Wrong or timeout loses 1 life. Extra life after Level 1 and 2 if below 3.',
        'Replacement question: On wrong/timeout, a new question is shown immediately.',
        'Visuals: Mario and Bug race on separate tracks; correct moves Mario forward, mistakes move Bug forward.',
        'Win condition: Clear Level 5 perfectly to earn the trophy.'
      ],
      difficulty: 'Advanced',
      estimatedTime: '5-10 minutes'
    },
    'phishing-campaign': {
      title: 'Phishing Campaign Analysis',
      icon: '🎣',
      description: 'A sophisticated phishing campaign has targeted employees across multiple departments. Your task is to analyze the attack vectors and identify the perpetrators.',
      objectives: [
        'Examine suspicious emails and attachments',
        'Analyze network traffic patterns',
        'Identify social engineering techniques',
        'Track down the source of the campaign'
      ],
      difficulty: 'Intermediate',
      estimatedTime: '3-5 minutes'
    },
    'insider-threat': {
      title: 'Insider Threat Investigation',
      icon: '👤',
      description: 'Suspicious activities suggest an insider may be leaking confidential information. Investigate employee actions and system access patterns.',
      objectives: [
        'Review employee access logs',
        'Analyze file access patterns',
        'Identify unusual data transfers',
        'Build a case against the suspect'
      ],
      difficulty: 'Expert',
      estimatedTime: '7-12 minutes'
    }
  };

  const currentScenario = scenarios[scenario] || scenarios['corporate-breach'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="w-full max-w-2xl mx-4"
      >
        <Card className="glass-effect cyber-border">
          <CardHeader className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="mb-4 flex items-center justify-center gap-3"
            >
              {currentScenario.iconComponent}
              <Shield className="w-10 h-10 text-blue-400" />
            </motion.div>
            <CardTitle className="text-3xl cyber-text mb-2">
              {currentScenario.title}
            </CardTitle>
            <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <AlertTriangle className="w-4 h-4" />
                <span>{currentScenario.difficulty}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Target className="w-4 h-4" />
                <span>{currentScenario.estimatedTime}</span>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Description */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <p className="text-lg text-muted-foreground leading-relaxed">
                {currentScenario.description}
              </p>
            </motion.div>

            {/* Objectives */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-blue-400" />
                Investigation Objectives
              </h3>
              <ul className="space-y-2">
                {currentScenario.objectives.map((objective, index) => (
                  <motion.li
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-start space-x-2"
                  >
                    <div className="w-5 h-5 mt-1 flex-shrink-0 text-blue-400">
                      {index === 0 && <Target className="w-5 h-5" />}
                      {index === 1 && <Clock className="w-5 h-5" />}
                      {index === 2 && <Heart className="w-5 h-5" />}
                      {index === 3 && <AlertTriangle className="w-5 h-5" />}
                      {index === 4 && <Bug className="w-5 h-5" />}
                      {index === 5 && <Trophy className="w-5 h-5" />}
                    </div>
                    <span className="text-sm text-muted-foreground">{objective}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex gap-4 justify-center pt-4"
            >
              <Button
                variant="outline"
                onClick={onClose}
                className="glass-effect"
              >
                Cancel
              </Button>
              <Button
                onClick={onStart}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                Start Investigation
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default ScenarioIntroModal;
