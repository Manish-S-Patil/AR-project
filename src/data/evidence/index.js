// Evidence data index - exports all level evidence questions
import { level1Evidence, getRandomLevel1Questions } from './level1';
import { level2Evidence, getRandomLevel2Questions } from './level2';
import { level3Evidence, getRandomLevel3Questions } from './level3';
import { level4Evidence, getRandomLevel4Questions } from './level4';
import { level5Evidence, getRandomLevel5Questions } from './level5';

export const allEvidence = {
  level1: level1Evidence,
  level2: level2Evidence,
  level3: level3Evidence,
  level4: level4Evidence,
  level5: level5Evidence
};

export const getRandomQuestions = (level, count) => {
  switch(level) {
    case 1:
      return getRandomLevel1Questions(count);
    case 2:
      return getRandomLevel2Questions(count);
    case 3:
      return getRandomLevel3Questions(count);
    case 4:
      return getRandomLevel4Questions(count);
    case 5:
      return getRandomLevel5Questions(count);
    default:
      return getRandomLevel1Questions(count);
  }
};

export const QUESTIONS_PER_LEVEL = {
  1: 5,
  2: 7,
  3: 9,
  4: 12,
  5: 15
};

export default {
  allEvidence,
  getRandomQuestions,
  QUESTIONS_PER_LEVEL
};

