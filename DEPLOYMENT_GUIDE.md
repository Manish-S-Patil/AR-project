# Backend Deployment Guide for Render

## Steps to Deploy Backend to Render

### 1. Create New Web Service on Render
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Select the `AR-project-backend` folder as the root directory

### 2. Configure Build Settings
- **Build Command**: `npm install && npx prisma generate && npx prisma db push`
- **Start Command**: `npm start`
- **Node Version**: 18 or 20

### 3. Environment Variables
Add these environment variables in Render dashboard:
- `DATABASE_URL` (your existing PostgreSQL URL)
- `REDIS_URL` (your existing Redis URL - optional)
- `JWT_SECRET` (generate a secure secret key)
- `NODE_ENV` = `production`

### 4. Update Frontend URL
After deployment, update the frontend code:
- Replace `https://ar-project-backend.onrender.com` with your actual backend URL
- Or set `VITE_API_URL` environment variable in your frontend Render service

### 5. Test the Connection
Once deployed, test:
- Registration: `POST https://your-backend-url.onrender.com/api/auth/register`
- Login: `POST https://your-backend-url.onrender.com/api/auth/login`

## Current Status
- ✅ Frontend deployed: `https://ar-project-331a.onrender.com`
- ❌ Backend needs deployment
- ✅ Authentication system implemented and tested locally
