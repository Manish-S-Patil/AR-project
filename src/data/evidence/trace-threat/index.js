// Trace The Threat Evidence Index
// Central export for all level evidence data

import { level1Evidence, getRandomLevel1Evidence } from './level1';
import { level2Evidence, getRandomLevel2Evidence } from './level2';
import { level3Evidence, getRandomLevel3Evidence } from './level3';
import { level4Evidence, getRandomLevel4Evidence } from './level4';
import { level5Evidence, getRandomLevel5Evidence } from './level5';

// Re-export all level data for external use
export { level1Evidence, getRandomLevel1Evidence };
export { level2Evidence, getRandomLevel2Evidence };
export { level3Evidence, getRandomLevel3Evidence };
export { level4Evidence, getRandomLevel4Evidence };
export { level5Evidence, getRandomLevel5Evidence };

// Helper function to get random evidence for any level
export const getRandomTraceEvidence = (level, count) => {
  switch(level) {
    case 1:
      return getRandomLevel1Evidence(count);
    case 2:
      return getRandomLevel2Evidence(count);
    case 3:
      return getRandomLevel3Evidence(count);
    case 4:
      return getRandomLevel4Evidence(count);
    case 5:
      return getRandomLevel5Evidence(count);
    default:
      return getRandomLevel1Evidence(count);
  }
};

