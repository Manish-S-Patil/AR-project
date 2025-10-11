# 🌍 Environment Setup Guide

Complete environment configuration for the AR Cybersecurity Awareness Platform.

## 🚀 Your Deployed Applications

- **Frontend**: [https://ar-project-frontend.onrender.com](https://ar-project-frontend.onrender.com)
- **Backend**: [https://ar-project-5ojn.onrender.com](https://ar-project-5ojn.onrender.com)

## 📁 Environment Configurations

### 🔧 Available Environments

| Environment | API URL | Use Case | Description |
|-------------|---------|----------|-------------|
| **development** | `https://ar-project-5ojn.onrender.com` | Development with production API | Frontend development using live backend |
| **production** | `https://ar-project-5ojn.onrender.com` | Production deployment | Live production environment |
| **local** | `http://localhost:5001` | Full local development | Both frontend and backend running locally |
| **staging** | `https://ar-project-5ojn.onrender.com` | Pre-production testing | Testing with production data |

## 🛠️ Quick Setup

### 1. **Development (Recommended)**
```bash
# Use production API for development
./scripts/setup-env.sh development
npm run dev
```

### 2. **Local Development**
```bash
# Use local backend
./scripts/setup-env.sh local
cd AR-project-backend && npm start &  # Start backend
npm run dev                           # Start frontend
```

### 3. **Production**
```bash
# Production settings
./scripts/setup-env.sh production
npm run build
```

## 📋 Environment Files

### Development (`.env.development`)
```env
VITE_API_URL=https://ar-project-5ojn.onrender.com
VITE_APP_TITLE=AR Cybersecurity Awareness Platform
VITE_APP_ENV=development
VITE_APP_DEBUG=true
```

### Production (`.env.production`)
```env
VITE_API_URL=https://ar-project-5ojn.onrender.com
VITE_APP_TITLE=AR Cybersecurity Awareness Platform
VITE_APP_ENV=production
VITE_APP_DEBUG=false
```

### Local (`.env.local`)
```env
VITE_API_URL=http://localhost:5001
VITE_APP_TITLE=AR Cybersecurity Awareness Platform (Local)
VITE_APP_ENV=local
VITE_APP_DEBUG=true
```

### Staging (`.env.staging`)
```env
VITE_API_URL=https://ar-project-5ojn.onrender.com
VITE_APP_TITLE=AR Cybersecurity Awareness Platform (Staging)
VITE_APP_ENV=staging
VITE_APP_DEBUG=true
```

## 🚀 Deployment Scenarios

### Scenario 1: Development with Production API
```bash
# Setup
./scripts/setup-env.sh development

# Start development
npm run dev

# Access: http://localhost:5173
# API: https://ar-project-5ojn.onrender.com
```

### Scenario 2: Full Local Development
```bash
# Terminal 1: Start backend
cd AR-project-backend
npm start

# Terminal 2: Setup and start frontend
./scripts/setup-env.sh local
npm run dev

# Access: http://localhost:5173
# API: http://localhost:5001
```

### Scenario 3: Production Deployment
```bash
# Build for production
./scripts/setup-env.sh production
npm run build

# Deploy dist/ folder to your hosting service
```

## 🔧 Scripts Available

### Environment Setup Script
```bash
# Show available environments
./scripts/setup-env.sh

# Setup specific environment
./scripts/setup-env.sh development
./scripts/setup-env.sh local
./scripts/setup-env.sh production
```

### NPM Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run preview:render  # Preview for Render deployment
```

## 🧪 Testing Your Setup

### Test API Connectivity
```bash
# Test production API
curl https://ar-project-5ojn.onrender.com/

# Test local API (if running)
curl http://localhost:5001/

# Expected response:
# {"message":"AR Project Backend API","status":"running",...}
```

### Test Frontend
```bash
# Start development server
npm run dev

# Open browser: http://localhost:5173
# Check browser console for API calls
```

## 🔐 Authentication Flow

1. **User visits**: [https://ar-project-frontend.onrender.com](https://ar-project-frontend.onrender.com)
2. **Frontend calls**: `https://ar-project-5ojn.onrender.com/api/auth/login`
3. **Backend returns**: JWT token
4. **Admin panel**: Uses token for authenticated requests

## 🌐 CORS Configuration

Your backend is configured to allow requests from:
- `https://ar-project-frontend.onrender.com` (Production frontend)
- `http://localhost:5173` (Local development)
- `http://localhost:3000` (Alternative local port)

## 📊 Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `https://ar-project-5ojn.onrender.com` |
| `VITE_APP_TITLE` | Application title | `AR Cybersecurity Awareness Platform` |
| `VITE_APP_ENV` | Environment name | `production` |
| `VITE_APP_DEBUG` | Debug mode | `true` |

## 🚨 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Check if backend CORS allows your frontend domain
   - Verify API URL is correct

2. **Authentication Errors**
   - Ensure JWT token is valid
   - Check token expiration
   - Verify Authorization header

3. **API Connection Issues**
   - Test API endpoint directly
   - Check network connectivity
   - Verify environment variables

### Debug Commands

```bash
# Check current environment
cat .env

# Test API connectivity
curl $VITE_API_URL/

# Check environment variables
echo $VITE_API_URL
```

## 📱 Mobile Development

For mobile development, update the API URL to use your production backend:

```env
VITE_API_URL=https://ar-project-5ojn.onrender.com
```

## 🔄 Switching Environments

### Quick Environment Switch
```bash
# Switch to development
./scripts/setup-env.sh development

# Switch to local
./scripts/setup-env.sh local

# Switch to production
./scripts/setup-env.sh production
```

### Manual Environment Switch
```bash
# Copy specific environment file
cp env-configs/.env.development .env

# Restart development server
npm run dev
```

## 📋 Environment Checklist

- [ ] Environment file created
- [ ] API URL configured correctly
- [ ] Backend API accessible
- [ ] CORS configured
- [ ] Authentication working
- [ ] Admin panel accessible
- [ ] Database connection stable

---

## 🎯 Current Recommended Setup

**For Development:**
```bash
./scripts/setup-env.sh development
npm run dev
```

**For Production:**
- Frontend: [https://ar-project-frontend.onrender.com](https://ar-project-frontend.onrender.com)
- Backend: [https://ar-project-5ojn.onrender.com](https://ar-project-5ojn.onrender.com)

Your environment is now fully configured! 🚀
