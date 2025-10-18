import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { progressTracker } from '../lib/progressTracker';
import { toast } from '../components/ui/use-toast';
import { RefreshCw, Trophy, Target, Clock } from 'lucide-react';

const ProgressDemo = () => {
  const [progress, setProgress] = useState({
    scenariosCompleted: 0,
    quizzesPassed: 0,
    totalScore: 0,
    completedScenarios: [],
    recentQuizAttempts: []
  });

  const refreshProgress = () => {
    const currentProgress = progressTracker.getProgressSummary();
    setProgress(currentProgress);
  };

  useEffect(() => {
    refreshProgress();
  }, []);

  const simulateQuizAttempt = () => {
    const score = Math.floor(Math.random() * 5) + 1; // 1-5 correct
    const totalQuestions = 5;
    const timeSpent = Math.floor(Math.random() * 120) + 30; // 30-150 seconds
    
    progressTracker.recordQuizAttempt('demo', score, totalQuestions, score >= 4, timeSpent);
    refreshProgress();
    
    toast({
      title: "Quiz Attempt Recorded",
      description: `Scored ${score}/${totalQuestions} (${Math.round((score/totalQuestions)*100)}%)`
    });
  };

  const simulateScenarioCompletion = () => {
    const scenarios = ['phishing', 'fake-login', 'weak-password', 'malware-usb', 'safe-browsing'];
    const randomScenario = scenarios[Math.floor(Math.random() * scenarios.length)];
    
    if (!progress.completedScenarios.includes(randomScenario)) {
      progressTracker.recordScenarioCompletion(randomScenario, 85, 300);
      refreshProgress();
      
      toast({
        title: "Scenario Completed",
        description: `Completed ${randomScenario} scenario`
      });
    } else {
      toast({
        title: "Already Completed",
        description: `You've already completed the ${randomScenario} scenario`
      });
    }
  };

  const resetProgress = () => {
    progressTracker.resetProgress();
    refreshProgress();
    toast({
      title: "Progress Reset",
      description: "All progress has been cleared"
    });
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Progress Tracking Demo
          </h1>
          <p className="text-muted-foreground text-lg">
            See how progress tracking works in real-time
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Current Progress */}
          <Card className="glass-effect cyber-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  Current Progress
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={refreshProgress}
                  className="p-2"
                >
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Scenarios Completed</span>
                    <span>{progress.scenariosCompleted}/5</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(progress.scenariosCompleted / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Quizzes Passed</span>
                    <span>{progress.quizzesPassed}/5</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(progress.quizzesPassed / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="pt-2 border-t border-muted">
                  <div className="flex justify-between text-sm">
                    <span>Total Score</span>
                    <span className="font-semibold text-green-400">{progress.totalScore}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Completed Scenarios */}
          <Card className="glass-effect cyber-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-400" />
                Completed Scenarios
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {progress.completedScenarios.length > 0 ? (
                  progress.completedScenarios.map((scenario, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="capitalize">{scenario.replace('-', ' ')}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-sm">No scenarios completed yet</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Quiz Attempts */}
        <Card className="glass-effect cyber-border mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-purple-400" />
              Recent Quiz Attempts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {progress.recentQuizAttempts.length > 0 ? (
                progress.recentQuizAttempts.slice(-5).map((attempt, index) => (
                  <div key={attempt.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <span className="font-medium capitalize">{attempt.categoryKey}</span>
                      <div className="text-sm text-muted-foreground">
                        {attempt.score}/{attempt.totalQuestions} correct
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-semibold ${attempt.passed ? 'text-green-400' : 'text-red-400'}`}>
                        {Math.round((attempt.score / attempt.totalQuestions) * 100)}%
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {attempt.timeSpent}s
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-sm">No quiz attempts yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Demo Controls */}
        <Card className="glass-effect cyber-border">
          <CardHeader>
            <CardTitle>Demo Controls</CardTitle>
            <CardDescription>
              Simulate quiz attempts and scenario completions to see progress tracking in action
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={simulateQuizAttempt}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                Simulate Quiz Attempt
              </Button>
              <Button
                onClick={simulateScenarioCompletion}
                className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
              >
                Complete Random Scenario
              </Button>
              <Button
                onClick={resetProgress}
                variant="destructive"
              >
                Reset Progress
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProgressDemo;
