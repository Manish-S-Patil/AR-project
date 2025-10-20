# 📊 Frontend API Logging System

This guide explains the comprehensive request/response logging system implemented for the frontend APIs.

## 🌟 Features

### 📝 Comprehensive Logging
- **Request Logging**: Method, URL, headers, and body
- **Response Logging**: Status, duration, and response data
- **Error Logging**: Detailed error information with context
- **Performance Tracking**: Request duration measurement
- **Data Sanitization**: Automatic redaction of sensitive information

### 🔒 Security Features
- **Sensitive Data Redaction**: Passwords, tokens, and codes are automatically redacted
- **Header Sanitization**: Authorization headers are sanitized
- **Nested Object Handling**: Deep sanitization of complex objects
- **Safe Logging**: No sensitive data is exposed in console logs

## 🚀 Usage

### Basic API Calls
```javascript
import { ApiService } from './lib/api.js';

// All API calls automatically include logging
const response = await ApiService.auth.login({
  username: 'user',
  password: 'password'
});
```

### Log Output Example
```
🌐 [2024-01-15T10:30:45.123Z] API Request
📤 POST https://ar-project-5ojn.onrender.com/api/auth/login
📋 Headers: { "Content-Type": "application/json" }
📦 Body: { "username": "user", "password": "[REDACTED]" }

🌐 [2024-01-15T10:30:45.456Z] API Response
📥 POST https://ar-project-5ojn.onrender.com/api/auth/login
📊 Status: 200 OK
⏱️ Duration: 333ms
📦 Response: { "token": "[REDACTED]", "user": { "id": 1, "username": "user" } }
```

## 🔧 Configuration

### Environment Variables
```env
VITE_API_URL=https://ar-project-5ojn.onrender.com
```

### API Configuration
```javascript
import { API_CONFIG, ApiService } from './lib/api.js';

// Access configuration
console.log('API Base URL:', API_CONFIG.baseURL);

// Use service functions
const users = await ApiService.auth.admin.getUsers(token);
```

## 📋 Available API Services

### 🔐 Authentication
```javascript
// User operations
await ApiService.auth.login(credentials);
await ApiService.auth.register(userData);
await ApiService.auth.verifyPhone(verificationData);
await ApiService.auth.resendPhoneCode(phoneData);
await ApiService.auth.changePassword(passwordData, token);
await ApiService.auth.forgotPassword(emailData);
await ApiService.auth.resetPassword(resetData);
await ApiService.auth.getProfile(token);

// Admin operations
await ApiService.auth.admin.getUsers(token);
await ApiService.auth.admin.deleteUser(userId, token);
```

### 🧠 Quiz Management
```javascript
// Public quiz operations
await ApiService.quiz.getCategories();
await ApiService.quiz.getByCategory(categoryKey);

// Admin quiz operations
await ApiService.quiz.admin.upsertCategory(categoryData, token);
await ApiService.quiz.admin.createQuestion(questionData, token);
await ApiService.quiz.admin.getAllQuestions(token);
await ApiService.quiz.admin.updateQuestion(questionId, questionData, token);
await ApiService.quiz.admin.deleteQuestion(questionId, token);
```

### 🎮 Game Content
```javascript
// Public game operations
await ApiService.game.getPhishingEmails();

// Admin game operations
await ApiService.game.admin.createPhishingEmail(emailData, token);
await ApiService.game.admin.updatePhishingEmail(emailId, emailData, token);
await ApiService.game.admin.getAllPhishingEmails(token);
await ApiService.game.admin.deletePhishingEmail(emailId, token);
```

### 📊 Progress Tracking
```javascript
await ApiService.progress.getProgress(token);
await ApiService.progress.recordQuizAttempt(attemptData, token);
await ApiService.progress.recordScenarioCompletion(completionData, token);
await ApiService.progress.getQuizAttempts(token);
await ApiService.progress.getScenarioCompletions(token);
```

## 🛠️ Logging Features

### 📤 Request Logging
- **Method**: HTTP method (GET, POST, PUT, DELETE)
- **URL**: Full endpoint URL
- **Headers**: Request headers (sanitized)
- **Body**: Request body (sanitized)
- **Timestamp**: ISO timestamp

### 📥 Response Logging
- **Status**: HTTP status code and text
- **Duration**: Request duration in milliseconds
- **Data**: Response data (sanitized)
- **Timestamp**: ISO timestamp

### ❌ Error Logging
- **Error Details**: Full error information
- **Context**: Request method and URL
- **Duration**: Time until error occurred
- **Stack Trace**: Error stack trace

## 🔒 Data Sanitization

### Automatically Redacted Fields
- `password` → `[REDACTED]`
- `token` → `[REDACTED]`
- `authorization` → `[REDACTED]`
- `authToken` → `[REDACTED]`
- `code` → `[REDACTED]`

### Nested Object Handling
```javascript
// Input
{
  user: {
    username: "test",
    password: "secret123",
    profile: {
      email: "test@example.com",
      token: "abc123"
    }
  }
}

// Logged Output
{
  user: {
    username: "test",
    password: "[REDACTED]",
    profile: {
      email: "test@example.com",
      token: "[REDACTED]"
    }
  }
}
```

## 🎯 Performance Tracking

### Duration Measurement
- **Start Time**: Captured before request
- **End Time**: Captured after response
- **Duration**: Calculated in milliseconds
- **Performance API**: Uses `performance.now()` for accuracy

### Log Format
```
⏱️ Duration: 333ms
```

## 🚨 Error Handling

### Automatic Error Logging
- **Network Errors**: Connection failures
- **HTTP Errors**: 4xx, 5xx status codes
- **Parse Errors**: JSON parsing failures
- **Timeout Errors**: Request timeouts

### Error Context
```javascript
❌ [2024-01-15T10:30:45.123Z] API Error
📤 POST https://ar-project-5ojn.onrender.com/api/auth/login
⏱️ Duration: 5000ms
🚨 Error: NetworkError: Failed to fetch
```

## 🔧 Customization

### Disable Logging
```javascript
// To disable logging, modify the Logger object
Logger.logRequest = () => {};
Logger.logResponse = () => {};
Logger.logError = () => {};
```

### Custom Logging
```javascript
// Add custom logging logic
const originalLogRequest = Logger.logRequest;
Logger.logRequest = (method, url, headers, body) => {
  // Custom logic here
  originalLogRequest(method, url, headers, body);
};
```

## 📱 Browser Console

### Console Groups
- **Collapsible Groups**: Organized request/response pairs
- **Color Coding**: Different colors for requests, responses, and errors
- **Emoji Icons**: Visual indicators for different log types

### Console Output
```
🌐 [timestamp] API Request
  📤 POST /api/auth/login
  📋 Headers: {...}
  📦 Body: {...}

🌐 [timestamp] API Response
  📥 POST /api/auth/login
  📊 Status: 200 OK
  ⏱️ Duration: 333ms
  📦 Response: {...}
```

## 🧪 Testing

### Example Usage
```javascript
import { authExamples } from './lib/api-usage-examples.js';

// Test complete authentication flow
try {
  const result = await authExamples.registerUser({
    username: 'testuser',
    email: 'test@example.com',
    phoneNumber: '1234567890',
    name: 'Test User',
    password: 'SecurePassword123!',
    verificationCode: '123456'
  });
  
  console.log('Registration successful:', result);
} catch (error) {
  console.error('Registration failed:', error);
}
```

## 🔍 Debugging

### Common Issues
1. **CORS Errors**: Check backend CORS configuration
2. **Authentication Errors**: Verify JWT token validity
3. **Network Errors**: Check API URL and connectivity
4. **Parse Errors**: Verify response format

### Debug Commands
```javascript
// Check API configuration
console.log('API Base URL:', API_CONFIG.baseURL);

// Test API connectivity
fetch(API_CONFIG.baseURL)
  .then(response => console.log('API Status:', response.status))
  .catch(error => console.error('API Error:', error));
```

## 📊 Log Analysis

### Performance Monitoring
- **Slow Requests**: Identify requests taking >1000ms
- **Error Rates**: Track failed requests
- **Success Rates**: Monitor successful requests
- **Response Times**: Analyze API performance

### Security Monitoring
- **Sensitive Data**: Ensure no sensitive data in logs
- **Authentication**: Monitor auth token usage
- **Authorization**: Track admin operations

---

## 🎉 Benefits

✅ **Complete Visibility**: See all API requests and responses  
✅ **Performance Tracking**: Monitor request durations  
✅ **Error Debugging**: Detailed error information  
✅ **Security**: Automatic data sanitization  
✅ **Development**: Easy debugging and testing  
✅ **Production**: Safe logging for production environments  

The logging system provides comprehensive visibility into all API interactions while maintaining security and performance standards.
