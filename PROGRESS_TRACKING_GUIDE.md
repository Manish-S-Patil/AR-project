# Progress Tracking System - How It Works

## Overview

The progress tracking system monitors user engagement and completion across different activities in the AR Cybersecurity platform. It tracks:

- **Scenarios Completed**: AR scenarios and interactive games
- **Quizzes Passed**: Quiz attempts with 80%+ score
- **Total Score**: Cumulative points from all activities

## How "Scenarios Completed" Works

### 1. **AR Scenarios** (`/ar-scenarios`)
- **Trigger**: When a user completes an AR simulation (reaches step 3)
- **Location**: `src/pages/ARScenarios.jsx`
- **Process**:
  1. User starts simulation → `setScenarioStartTime(Date.now())`
  2. Simulation progresses through steps 0, 1, 2, 3
  3. When step 3 is reached → `recordScenarioCompletion(selectedScenario)`
  4. Records completion with score (85) and time spent

### 2. **Interactive Games** (`/game`)
- **Trigger**: When a game session ends (time runs out or user completes)
- **Location**: `src/pages/Game.jsx`
- **Process**:
  1. User starts game → `setGameStartTime(Date.now())`
  2. Game runs for 60 seconds or until completion
  3. When game ends → `recordGameCompletion(gameId, finalScore)`
  4. Records completion with actual score and time spent

### 3. **Quiz Completion** (`/quiz/:scenario`)
- **Trigger**: When user completes a quiz (answers all questions)
- **Location**: `src/pages/Quiz.jsx`
- **Process**:
  1. User starts quiz → `setStartTime(Date.now())`
  2. User answers all questions
  3. When quiz completes → `recordQuizAttempt(score, totalQuestions, timeSpent)`
  4. If score ≥ 80% → counts as "Quiz Passed"

## Data Storage

### Local Storage (Always Available)
- **File**: `src/lib/progressTracker.js`
- **Key**: `ar_cyber_progress`
- **Structure**:
```javascript
{
  scenariosCompleted: 0,
  quizzesPassed: 0,
  totalScore: 0,
  completedScenarios: ['phishing', 'fake-login'],
  quizAttempts: [...]
}
```

### Database (When Logged In)
- **Models**: `UserProgress`, `ScenarioCompletion`, `QuizAttempt`
- **API**: `/api/progress/*` endpoints
- **Fallback**: If server fails, uses local storage

## Progress Calculation

### Scenarios Completed
```javascript
// Counts unique scenario completions
scenariosCompleted = completedScenarios.length
```

### Quizzes Passed
```javascript
// Counts quiz attempts with 80%+ score
quizzesPassed = quizAttempts.filter(attempt => attempt.passed).length
```

### Total Score
```javascript
// Sum of all quiz scores
totalScore = quizAttempts.reduce((sum, attempt) => sum + attempt.score, 0)
```

## Real-Time Updates

### Dashboard Display
- **File**: `src/pages/Dashboard.jsx`
- **Refresh**: Manual refresh button + automatic on page load
- **Progress Bars**: Animated progress bars showing completion percentage
- **Live Data**: Shows current counts (e.g., "3/5 scenarios completed")

### Progress Demo
- **File**: `src/pages/ProgressDemo.jsx`
- **Route**: `/progress-demo`
- **Features**:
  - Real-time progress visualization
  - Simulate quiz attempts and scenario completions
  - Reset progress for testing
  - Shows recent quiz attempts

## How Progress Changes When You Add Quizzes

### Automatic Updates
1. **Quiz Completion** → `recordQuizAttempt()` called
2. **Score Check** → If ≥ 80%, increments `quizzesPassed`
3. **Score Addition** → Adds to `totalScore`
4. **Dashboard Refresh** → Progress bars update automatically

### Manual Refresh
- Click refresh button in Dashboard progress card
- Progress demo updates in real-time
- Local storage updates immediately

## Testing the System

### 1. **Test Scenarios**
- Go to `/ar-scenarios`
- Select any scenario
- Click "Start Simulation"
- Wait for completion (4.5 seconds)
- Check Dashboard progress

### 2. **Test Games**
- Go to `/game`
- Select any game
- Play for 60 seconds
- Check Dashboard progress

### 3. **Test Quizzes**
- Go to `/quiz/general` or any scenario quiz
- Complete the quiz
- If score ≥ 80%, check "Quizzes Passed" counter

### 4. **Test Progress Demo**
- Go to `/progress-demo`
- Use "Simulate Quiz Attempt" and "Complete Random Scenario" buttons
- Watch progress update in real-time

## Database Schema

```sql
-- User progress summary
UserProgress {
  userId: Int (unique)
  scenariosCompleted: Int
  quizzesPassed: Int
  totalScore: Int
  lastUpdated: DateTime
}

-- Individual scenario completions
ScenarioCompletion {
  userId: Int
  scenarioKey: String (e.g., 'phishing', 'fake-login')
  completed: Boolean
  score: Int?
  timeSpent: Int?
}

-- Individual quiz attempts
QuizAttempt {
  userId: Int
  categoryKey: String (e.g., 'general', 'phishing')
  score: Int
  totalQuestions: Int
  passed: Boolean (score >= 80%)
  timeSpent: Int?
  answers: Json?
}
```

## API Endpoints

- `GET /api/progress/progress` - Get user progress
- `POST /api/progress/quiz-attempt` - Record quiz attempt
- `POST /api/progress/scenario-completion` - Record scenario completion
- `GET /api/progress/quiz-attempts` - Get quiz history
- `GET /api/progress/scenario-completions` - Get scenario history

## Key Features

✅ **Real-time Updates**: Progress updates immediately after completion
✅ **Dual Storage**: Local storage + database for reliability
✅ **Automatic Calculation**: No manual counting required
✅ **Visual Feedback**: Animated progress bars and toast notifications
✅ **Testing Tools**: Progress demo for easy testing
✅ **Fallback Support**: Works offline with local storage
✅ **Score Tracking**: Detailed scoring and timing information
✅ **History**: Keeps track of all attempts and completions
