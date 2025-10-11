# Environment Configuration Guide

This guide explains how to configure the AR Cybersecurity Awareness Platform for different environments.

## 🌍 Environment Variables

The application uses environment variables to configure API endpoints and other settings.

### Frontend Environment Variables

| Variable | Description | Default | Example |
|----------|-------------|---------|---------|
| `VITE_API_URL` | Backend API URL | `https://ar-project-5ojn.onrender.com` | `https://your-api.com` |
| `VITE_APP_TITLE` | Application title | `AR Cybersecurity Awareness Platform` | `My App` |
| `VITE_APP_ENV` | Environment name | `production` | `development` |

## 🔧 Configuration Files

### Development (.env)
```env
# Frontend Environment Variables
VITE_API_URL=https://ar-project-5ojn.onrender.com
VITE_APP_TITLE=AR Cybersecurity Awareness Platform
VITE_APP_ENV=production
```

### Production (.env.production)
```env
# Production Environment Variables
VITE_API_URL=https://ar-project-5ojn.onrender.com
VITE_APP_TITLE=AR Cybersecurity Awareness Platform
VITE_APP_ENV=production
```

### Staging (.env.staging)
```env
# Staging Environment Variables
VITE_API_URL=https://staging-api.yourdomain.com
VITE_APP_TITLE=AR Cybersecurity Awareness Platform (Staging)
VITE_APP_ENV=staging
```

## 🚀 Deployment Scenarios

### 1. Local Development
- **Frontend**: `http://localhost:5173`
- **Backend**: `https://ar-project-5ojn.onrender.com` (Production API)
- **Use Case**: Development with production backend

### 2. Local Full Stack
- **Frontend**: `http://localhost:5173`
- **Backend**: `http://localhost:5001` (Local backend)
- **Use Case**: Full local development

### 3. Production Deployment
- **Frontend**: `https://your-frontend-domain.com`
- **Backend**: `https://ar-project-5ojn.onrender.com`
- **Use Case**: Live production environment

## 🔄 Switching Environments

### To use Production API (Current Setup)
```bash
# Update .env file
echo "VITE_API_URL=https://ar-project-5ojn.onrender.com" > .env

# Restart development server
npm run dev
```

### To use Local Backend
```bash
# Update .env file
echo "VITE_API_URL=http://localhost:5001" > .env

# Start local backend
cd AR-project-backend && npm start

# Start frontend
npm run dev
```

## 🧪 Testing API Connection

### Test Production API
```bash
curl https://ar-project-5ojn.onrender.com/
# Expected: {"message":"AR Project Backend API","status":"running",...}
```

### Test Local API
```bash
curl http://localhost:5001/
# Expected: {"message":"AR Project Backend API","status":"running",...}
```

## 📱 Frontend API Configuration

The frontend uses a centralized API configuration in `src/lib/api.js`:

```javascript
const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_URL || 'https://ar-project-5ojn.onrender.com',
  endpoints: {
    auth: {
      login: '/api/auth/login',
      register: '/api/auth/register',
      profile: '/api/auth/profile'
    },
    users: {
      all: '/api/users/',
      admin: '/api/users/admin/all'
    }
  }
};
```

## 🔐 Authentication Flow

1. **User logs in** → Frontend calls `POST /api/auth/login`
2. **Backend returns JWT token** → Frontend stores in localStorage
3. **Admin panel access** → Frontend includes token in Authorization header
4. **Backend validates token** → Returns user data if valid

## 🌐 CORS Configuration

The backend is configured to allow all origins in development:
```javascript
app.use(cors({
  origin: true, // Allow all origins for development
  credentials: true
}));
```

For production, update the CORS configuration in `server.js`:
```javascript
app.use(cors({
  origin: ['https://your-frontend-domain.com'],
  credentials: true
}));
```

## 🚨 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Check backend CORS configuration
   - Verify API URL is correct
   - Ensure credentials are included

2. **Authentication Errors**
   - Verify JWT token is valid
   - Check token expiration
   - Ensure Authorization header is included

3. **API Connection Issues**
   - Test API endpoint directly with curl
   - Check network connectivity
   - Verify environment variables

### Debug Commands

```bash
# Check environment variables
echo $VITE_API_URL

# Test API connectivity
curl -X GET $VITE_API_URL/

# Test authentication
curl -X POST $VITE_API_URL/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"test"}'
```

## 📋 Environment Checklist

- [ ] Environment variables configured
- [ ] API URL is accessible
- [ ] CORS configured correctly
- [ ] Authentication working
- [ ] Admin panel accessible
- [ ] Database connection stable

---

**Current Setup**: Frontend → Production API (https://ar-project-5ojn.onrender.com)
