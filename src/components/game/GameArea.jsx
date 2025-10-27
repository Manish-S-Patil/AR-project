import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';
import { Menu, X, Target } from 'lucide-react';
import PlayerAvatar from './PlayerAvatar';
import EvidenceViewer from './EvidenceViewer';
import SuspectBoard from './SuspectBoard';
import TopBar from './TopBar';

const GameArea = ({ 
  gameState, 
  score, 
  timeLeft, 
  level, 
  investigationProgress,
  evidence,
  currentEvidence,
  onEvidenceAnalysis,
  onNextEvidence,
  onPreviousEvidence,
  collectedEvidence,
  avatarState,
  lives,
  questionsAnswered,
  maxQuestions,
  questionTimer
}) => {
  const [isSuspectBoardOpen, setIsSuspectBoardOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Top Bar */}
      <TopBar 
        score={score}
        timeLeft={timeLeft}
        level={level}
        investigationProgress={investigationProgress}
        lives={lives}
        questionsAnswered={questionsAnswered}
        maxQuestions={maxQuestions}
        questionTimer={questionTimer}
      />

      {/* Mobile Layout - Vertical Stack */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Mobile: Avatar + Progress Bar (Top) */}
        <div className="lg:hidden p-4 border-b border-white/10">
          <PlayerAvatar 
            state={avatarState}
            score={score}
            level={level}
            isMobile={true}
          />
        </div>

        {/* Mobile: Evidence Viewer (Center) */}
        <div className="flex-1 p-2 lg:p-4">
          <EvidenceViewer
            evidence={evidence}
            currentIndex={currentEvidence}
            onEvidenceAnalysis={onEvidenceAnalysis}
            onNext={onNextEvidence}
            onPrevious={onPreviousEvidence}
            isMobile={true}
          />
        </div>

        {/* Desktop: Left Panel - Player Avatar */}
        <div className="hidden lg:block w-1/4 p-4">
          <PlayerAvatar 
            state={avatarState}
            score={score}
            level={level}
            isMobile={false}
          />
        </div>

        {/* Desktop: Center Panel - Evidence Viewer */}
        <div className="hidden lg:block w-1/2 p-4">
          <EvidenceViewer
            evidence={evidence}
            currentIndex={currentEvidence}
            onEvidenceAnalysis={onEvidenceAnalysis}
            onNext={onNextEvidence}
            onPrevious={onPreviousEvidence}
            isMobile={false}
          />
        </div>

        {/* Desktop: Right Panel - Suspect/Clue Board */}
        <div className="hidden lg:block w-1/4 p-4">
          <SuspectBoard
            collectedEvidence={collectedEvidence}
            investigationProgress={investigationProgress}
            score={score}
            isMobile={false}
          />
        </div>
      </div>

      {/* Mobile: Suspect Board Toggle Button */}
      <div className="lg:hidden fixed bottom-4 right-4 z-40">
        <Button
          onClick={() => setIsSuspectBoardOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg"
          size="lg"
        >
          <Target className="w-6 h-6" />
        </Button>
      </div>

      {/* Mobile: Suspect Board Bottom Sheet */}
      <AnimatePresence>
        {isSuspectBoardOpen && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="lg:hidden fixed inset-x-0 bottom-0 z-50 bg-gray-900/95 backdrop-blur-sm border-t border-white/10 rounded-t-2xl"
            style={{ height: '70vh' }}
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Investigation Board</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsSuspectBoardOpen(false)}
                  className="text-white hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <div className="h-full overflow-y-auto">
                <SuspectBoard
                  collectedEvidence={collectedEvidence}
                  investigationProgress={investigationProgress}
                  score={score}
                  isMobile={true}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile: Backdrop for Bottom Sheet */}
      <AnimatePresence>
        {isSuspectBoardOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsSuspectBoardOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default GameArea;
