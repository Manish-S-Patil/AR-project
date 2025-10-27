import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Trophy, Shield, Star, Target, AlertTriangle } from 'lucide-react';

const SuspectBoard = ({ collectedEvidence, investigationProgress, score, isMobile = false }) => {
  const getBadges = () => {
    const badges = [];
    
    if (investigationProgress >= 5) {
      badges.push({ icon: Trophy, text: 'Threat Hunter', color: 'bg-yellow-500' });
    }
    if (investigationProgress >= 3) {
      badges.push({ icon: Shield, text: 'Security Expert', color: 'bg-blue-500' });
    }
    if (investigationProgress >= 1) {
      badges.push({ icon: Star, text: 'Evidence Master', color: 'bg-purple-500' });
    }
    
    return badges;
  };

  const getEvidenceTypeCount = () => {
    const counts = { email: 0, log: 0, file: 0 };
    collectedEvidence.forEach(evidence => {
      counts[evidence.type] = (counts[evidence.type] || 0) + 1;
    });
    return counts;
  };

  const typeCounts = getEvidenceTypeCount();
  const badges = getBadges();

  if (isMobile) {
    return (
      <div className="space-y-4">
        {/* Mobile: Investigation Progress */}
        <Card className="glass-effect cyber-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center">
              <Target className="w-4 h-4 mr-2 text-orange-400" />
              Investigation Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-xl font-bold text-orange-400">
                {investigationProgress}
              </div>
              <div className="text-xs text-muted-foreground">
                Suspicious evidence collected
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(investigationProgress / 10) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mobile: Tagged Clues */}
        <Card className="glass-effect cyber-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2 text-red-400" />
              Tagged Clues
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {collectedEvidence.length === 0 ? (
                <div className="text-center text-gray-400 py-2">
                  <div className="text-lg mb-1">🔍</div>
                  <p className="text-xs">No clues tagged yet</p>
                </div>
              ) : (
                collectedEvidence.map((evidence, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-2 rounded bg-red-500/10 border border-red-500/20"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="text-xs">
                          {evidence.type === 'email' ? '📧' : 
                           evidence.type === 'log' ? '📋' : '📁'}
                        </div>
                        <div className="text-xs font-medium text-red-400 truncate">
                          {evidence.title}
                        </div>
                      </div>
                      <Star className="w-3 h-3 text-yellow-400" />
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {evidence.source}
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Mobile: Evidence Type Breakdown */}
        <Card className="glass-effect cyber-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Evidence Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span>📧</span>
                  <span className="text-xs">Emails</span>
                </div>
                <Badge variant="secondary" className="text-xs">{typeCounts.email}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span>📋</span>
                  <span className="text-xs">Logs</span>
                </div>
                <Badge variant="secondary" className="text-xs">{typeCounts.log}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span>📁</span>
                  <span className="text-xs">Files</span>
                </div>
                <Badge variant="secondary" className="text-xs">{typeCounts.file}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mobile: Badges & Achievements */}
        {badges.length > 0 && (
          <Card className="glass-effect cyber-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {badges.map((badge, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.2 }}
                    className={`flex items-center space-x-2 p-2 rounded ${badge.color}/10 border ${badge.color}/20`}
                  >
                    <badge.icon className={`w-3 h-3 ${badge.color.replace('bg-', 'text-')}`} />
                    <span className="text-xs font-medium">{badge.text}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  // Desktop Layout
  return (
    <div className="h-full space-y-4">
      {/* Investigation Progress */}
      <Card className="glass-effect cyber-border">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Target className="w-5 h-5 mr-2 text-orange-400" />
            Investigation Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="text-2xl font-bold text-orange-400">
              {investigationProgress}
            </div>
            <div className="text-sm text-muted-foreground">
              Suspicious evidence collected
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(investigationProgress / 10) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tagged Clues */}
      <Card className="glass-effect cyber-border">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-red-400" />
            Tagged Clues
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {collectedEvidence.length === 0 ? (
              <div className="text-center text-gray-400 py-4">
                <div className="text-2xl mb-2">🔍</div>
                <p className="text-sm">No clues tagged yet</p>
              </div>
            ) : (
              collectedEvidence.map((evidence, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-2 rounded bg-red-500/10 border border-red-500/20"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="text-sm">
                        {evidence.type === 'email' ? '📧' : 
                         evidence.type === 'log' ? '📋' : '📁'}
                      </div>
                      <div className="text-xs font-medium text-red-400 truncate">
                        {evidence.title}
                      </div>
                    </div>
                    <Star className="w-3 h-3 text-yellow-400" />
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {evidence.source}
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Evidence Type Breakdown */}
      <Card className="glass-effect cyber-border">
        <CardHeader>
          <CardTitle className="text-lg">Evidence Types</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <span>📧</span>
                <span className="text-sm">Emails</span>
              </div>
              <Badge variant="secondary">{typeCounts.email}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <span>📋</span>
                <span className="text-sm">Logs</span>
              </div>
              <Badge variant="secondary">{typeCounts.log}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <span>📁</span>
                <span className="text-sm">Files</span>
              </div>
              <Badge variant="secondary">{typeCounts.file}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Badges & Achievements */}
      {badges.length > 0 && (
        <Card className="glass-effect cyber-border">
          <CardHeader>
            <CardTitle className="text-lg">Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {badges.map((badge, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2 }}
                  className={`flex items-center space-x-2 p-2 rounded ${badge.color}/10 border ${badge.color}/20`}
                >
                  <badge.icon className={`w-4 h-4 ${badge.color.replace('bg-', 'text-')}`} />
                  <span className="text-sm font-medium">{badge.text}</span>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SuspectBoard;
