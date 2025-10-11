# Complete Website Hosting Guide for Render

## 🚀 Full Stack Deployment Guide

This guide covers deploying both your **Frontend** (React/Vite) and **Backend** (Node.js/Express) to Render.

---

## 📋 Prerequisites

- GitHub repository with your code
- Render account (free tier available)
- Database (PostgreSQL) - can use Render's free tier
- Optional: Redis for caching

---

## 🔧 Backend Deployment (Node.js/Express)

### Step 1: Create Backend Service
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Select the **`AR-project-backend`** folder as the root directory

### Step 2: Configure Backend Settings
- **Name**: `ar-project-backend` (or your preferred name)
- **Environment**: `Node`
- **Build Command**: `npm install && npx prisma generate && npx prisma db push`
- **Start Command**: `npm start`
- **Node Version**: `18` or `20`

### Step 3: Backend Environment Variables
Add these in the **Environment** tab:
```
DATABASE_URL = your-postgresql-connection-string
JWT_SECRET = your-secure-jwt-secret-key
NODE_ENV = production
REDIS_URL = your-redis-url (optional)
```

### Step 4: Deploy Backend
- Click **"Create Web Service"**
- Wait 2-3 minutes for deployment
- Note your backend URL: `https://your-backend-name.onrender.com`

---

## 🎨 Frontend Deployment (React/Vite)

### Step 1: Create Frontend Service
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"Static Site"**
3. Connect your GitHub repository
4. Select the **root directory** (not the backend folder)

### Step 2: Configure Frontend Settings
- **Name**: `ar-project-frontend` (or your preferred name)
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `dist`

### Step 3: Frontend Environment Variables
Add these in the **Environment** tab:
```
VITE_API_URL = https://your-backend-name.onrender.com
```

### Step 4: Deploy Frontend
- Click **"Create Static Site"**
- Wait 2-3 minutes for deployment
- Note your frontend URL: `https://your-frontend-name.onrender.com`

---

## 🔗 Connecting Frontend to Backend

### Option 1: Environment Variable (Recommended)
1. In your frontend service, add:
   ```
   VITE_API_URL = https://your-backend-name.onrender.com
   ```
2. Redeploy your frontend

### Option 2: Update Code Directly
Update your frontend code to use the backend URL:
```javascript
const apiUrl = import.meta.env.VITE_API_URL || 'https://your-backend-name.onrender.com';
```

---

## 🧪 Testing Your Deployment

### Test Backend
```bash
# Test health endpoint
curl https://your-backend-name.onrender.com/

# Test registration
curl -X POST https://your-backend-name.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"testpass123","name":"Test User"}'

# Test login
curl -X POST https://your-backend-name.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"testpass123"}'
```

### Test Frontend
1. Visit your frontend URL
2. Try registering a new account
3. Try logging in with existing credentials
4. Check browser console for any errors

---

## 🔧 Troubleshooting

### Common Issues

#### CORS Errors
- **Problem**: Frontend can't connect to backend
- **Solution**: Ensure backend CORS is configured to allow your frontend domain

#### Environment Variables Not Working
- **Problem**: Frontend still uses localhost
- **Solution**: Redeploy frontend after adding environment variables

#### Build Failures
- **Problem**: Deployment fails during build
- **Solution**: Check build logs, ensure all dependencies are in package.json

#### Database Connection Issues
- **Problem**: Backend can't connect to database
- **Solution**: Verify DATABASE_URL is correct and database is accessible

---

## 📊 Current Status

### ✅ Completed
- ✅ Authentication system implemented
- ✅ Backend API endpoints working
- ✅ Frontend authentication UI
- ✅ CORS configuration
- ✅ Password hashing and JWT tokens

### 🚀 Ready for Deployment
- 🎯 Backend: `https://ar-project-5ojn.onrender.com` (already deployed)
- 🎯 Frontend: Needs deployment with environment variable
- 🎯 Database: Connected and working
- 🎯 Authentication: Fully functional

---

## 🎉 Final Steps

1. **Deploy your frontend** using the steps above
2. **Set the environment variable** `VITE_API_URL`
3. **Test the complete system**
4. **Share your live website URL!**

Your authentication system is production-ready! 🚀
