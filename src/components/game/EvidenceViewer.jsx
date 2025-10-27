import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { AlertTriangle, CheckCircle } from 'lucide-react';

const EvidenceViewer = ({ 
  evidence, 
  currentIndex, 
  onEvidenceAnalysis, 
  onNext, 
  onPrevious,
  isMobile = false
}) => {
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Handle swipe gestures for mobile
  const handleTouchStart = (e) => {
    if (!isMobile) return;
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!isMobile) return;
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!isMobile || !touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentIndex < evidence.length - 1) {
      onNext();
    }
    if (isRightSwipe && currentIndex > 0) {
      onPrevious();
    }
  };

  if (!evidence || evidence.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center text-gray-400">
          <div className="text-6xl mb-4">🔍</div>
          <p>No evidence available</p>
        </div>
      </div>
    );
  }

  const currentEvidence = evidence[currentIndex];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'email': return '📧';
      case 'log': return '📋';
      case 'file': return '📁';
      default: return '📄';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'email': return 'border-blue-500 bg-blue-500/10';
      case 'log': return 'border-red-500 bg-red-500/10';
      case 'file': return 'border-green-500 bg-green-500/10';
      default: return 'border-gray-500 bg-gray-500/10';
    }
  };

  if (isMobile) {
    return (
      <div className="h-full flex flex-col">
        {/* Mobile: Swipeable Evidence Card */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="flex-1"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <Card className={`h-full glass-effect ${getTypeColor(currentEvidence.type)}`}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="text-xl">
                    {getTypeIcon(currentEvidence.type)}
                  </div>
                  <div>
                    <CardTitle className="text-lg">
                      {currentEvidence.title}
                    </CardTitle>
                    <div className="text-xs text-muted-foreground">
                      Evidence #{currentIndex + 1} of {evidence.length}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  {currentEvidence.timestamp}
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col">
              {/* Mobile: Evidence Content */}
              <div className="flex-1 p-3 rounded-lg bg-muted/20 border mb-4">
                <div className="text-sm leading-relaxed">
                  {currentEvidence.content}
                </div>
                <div className="mt-3 text-xs text-muted-foreground">
                  <strong>Source:</strong> {currentEvidence.source}
                </div>
              </div>

              {/* Mobile: Analysis Buttons - Large and Touch-Friendly */}
              <div className="space-y-3">
                <Button
                  onClick={() => onEvidenceAnalysis(true)}
                  className="w-full h-12 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-base font-semibold"
                  size="lg"
                >
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Mark Suspicious
                </Button>
                <Button
                  onClick={() => onEvidenceAnalysis(false)}
                  className="w-full h-12 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-base font-semibold"
                  size="lg"
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Mark Legitimate
                </Button>
              </div>

              {/* Mobile: Progress Dots */}
              <div className="flex justify-center space-x-2 mt-4">
                {evidence.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentIndex ? 'bg-blue-400' : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  // Desktop Layout
  return (
    <div className="h-full flex flex-col">
      {/* Evidence Card */}
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
        className="flex-1"
      >
        <Card className={`h-full glass-effect ${getTypeColor(currentEvidence.type)}`}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">
                  {getTypeIcon(currentEvidence.type)}
                </div>
                <div>
                  <CardTitle className="text-xl">
                    {currentEvidence.title}
                  </CardTitle>
                  <div className="text-sm text-muted-foreground">
                    Evidence #{currentIndex + 1} of {evidence.length}
                  </div>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                {currentEvidence.timestamp}
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col">
            {/* Evidence Content */}
            <div className="flex-1 p-4 rounded-lg bg-muted/20 border mb-6">
              <div className="text-sm leading-relaxed">
                {currentEvidence.content}
              </div>
              <div className="mt-4 text-xs text-muted-foreground">
                <strong>Source:</strong> {currentEvidence.source}
              </div>
            </div>

            {/* Analysis Buttons */}
            <div className="flex flex-col lg:flex-row gap-3 lg:gap-4 justify-center">
              <Button
                onClick={() => onEvidenceAnalysis(true)}
                className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 flex-1 h-12 lg:h-10"
                size="lg"
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                Mark Suspicious
              </Button>
              <Button
                onClick={() => onEvidenceAnalysis(false)}
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 flex-1 h-12 lg:h-10"
                size="lg"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Mark Legitimate
              </Button>
            </div>

            {/* Progress Dots */}
            <div className="flex justify-center space-x-2 mt-4">
              {evidence.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentIndex ? 'bg-blue-400' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default EvidenceViewer;
