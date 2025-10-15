# AR Cybersecurity Awareness Platform - Frontend

A modern React-based frontend application for the AR Cybersecurity Awareness Platform, featuring interactive cybersecurity education through augmented reality scenarios, quizzes, and games.

## 🚀 Features

- **🔐 Dual Authentication System**: Separate user and admin login interfaces
- **📧 Email Verification (OTP)**: New users verify email with a 6‑digit code
 - **🔑 Forgot Password (OTP)**: Request a reset code and set a new password
- **👑 Admin Panel Access**: Secure admin-only dashboard with role-based access
- **📱 Responsive Design**: Mobile-first, modern UI with glass effects
- **🎮 Interactive Learning**: AR scenarios, quizzes, and educational games
- **🗂️ DB‑Driven Content**: Quizzes and phishing game content are loaded from the database (no built‑ins)
- **👥 User Management**: Complete user management dashboard for admins
- **🎨 Modern UI/UX**: Beautiful animations and smooth transitions
- **📊 Progress Tracking**: User progress and statistics
- **🌐 PWA Ready**: Progressive Web App capabilities
- **🔒 Role-based Security**: JWT-based authentication with user roles + refresh tokens

## 🛠️ Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + Custom Components
- **Animations**: Framer Motion
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **State Management**: React Hooks + Local Storage

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend API running (see backend README)
- PostgreSQL database (for backend)
- Redis (optional, for caching)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd AR-project
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd AR-project-backend
   npm install
   cd ..
   ```

4. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:5001
   VITE_APP_TITLE=AR Cybersecurity Awareness Platform
   ```

5. **Backend Environment Setup**
   Create a `.env` file in the `AR-project-backend` directory:
   ```env
   DATABASE_URL="your-postgresql-connection-string"
   JWT_SECRET="your-jwt-secret-key"
   PORT=5001
   ```

6. **Database Setup**
   ```bash
   cd AR-project-backend
   npx prisma migrate dev
   node scripts/create-admin.js
   cd ..
   ```

7. **Start the development servers**
   ```bash
   # Terminal 1 - Backend
   cd AR-project-backend
   npm start

   # Terminal 2 - Frontend
   npm run dev
   ```

The application will be available at `http://localhost:5173`

## 🚀 Quick Start

### For Regular Users
1. Open `http://localhost:5173`
2. Select "User Login" tab
3. Click "Don't have an account? Sign up" to register
4. Or click "Continue as Guest" for limited access

### For Administrators
1. Open `http://localhost:5173`
2. Select "Admin Login" tab
3. Use default credentials:
   - **Username**: `admin`
   - **Password**: `AdminSecure123!`
4. Access admin panel at `/admin`

## 🚀 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run preview:render` | Preview for Render deployment |

## 📱 Pages & Features

### 🔐 Authentication (`/`)
- **Dual Login System**: Toggle between User and Admin login
- **User Login**: Secure user authentication with registration
- **Admin Login**: Separate admin authentication with role-based access
- **Guest Access**: Explore without registration (user mode only)
- **Role-based Routing**: Automatic redirection based on user role

### 📖 Introduction (`/introduction`)
- Platform overview and features
- Getting started guide
- Navigation to main features

### 🏠 Dashboard (`/dashboard`)
- **AR Scenarios**: Interactive cybersecurity scenarios
- **Quiz Section**: Knowledge testing
- **Games**: Educational mini-games
- **Progress Tracking**: User statistics
- **Admin Access**: Link to admin panel

### 🎯 AR Scenarios (`/ar-scenarios`)
- **Phishing Email Demo**: Learn to identify suspicious emails
- **Fake Login Page**: Detect fraudulent login pages
- **Password Security**: Visualize password strength
- **Malware USB Detection**: AR warnings for dangerous devices
- **Safe Browsing Tips**: Website security indicators

### 🧠 Quiz System (`/quiz/:scenario?`)
- **DB‑Driven**: Questions are fetched from the backend per category
- **Empty State**: If no questions exist, users see a clear message
- **Instant Feedback**: Real-time scoring and explanations
- **Progress Tracking**: Track quiz completion and scores

### 🎮 Interactive Games (`/game`)
- **Phishing Email Detective**: Loads phishing email entries from DB
- **Empty State**: Shows message if no game content exists
- **Hacker Hunter**: Interactive reaction game (local state)

### 👥 Admin Panel (`/admin`)
- **User Management**: View all registered users
- **Statistics Dashboard**: User metrics and analytics
- **Real-time Data**: Live user information
- **Secure Access**: Admin role authentication required
- **Role-based Access**: Only users with `role: "admin"` can access

## 🎨 UI Components

### Custom Components (`/src/components/ui/`)
- **Button**: Customizable button component
- **Card**: Content container with glass effects
- **Input**: Form input with validation styling
- **Label**: Form labels with accessibility
- **Tabs**: Tabbed navigation component
- **Toast**: Notification system
- **Toaster**: Toast container and management

### Page Components (`/src/pages/`)
- **LoginPage**: Authentication interface
- **IntroductionPage**: Platform introduction
- **Dashboard**: Main user dashboard
- **ARScenarios**: AR scenario selection
- **Quiz**: Quiz interface and logic
- **Game**: Interactive games
- **AdminPanel**: Admin dashboard

## 🔧 Configuration

### Tailwind CSS
The project uses Tailwind CSS with custom configuration:
- **Custom Colors**: Cyber-themed color palette
- **Glass Effects**: Modern glassmorphism design
- **Animations**: Smooth transitions and effects
- **Responsive**: Mobile-first design approach

### Vite Configuration
- **React Plugin**: Fast development with HMR
- **Build Optimization**: Production-ready builds
- **Environment Variables**: Secure configuration
 - **SPA Rewrites**: `static.json` added to serve `index.html` for deep links

## 🎯 AR Scenarios Details

### 1. Phishing Email Demo
- **Difficulty**: Beginner
- **Learning**: Email security awareness
- **AR Features**: Visual email analysis

### 2. Fake Login Page
- **Difficulty**: Intermediate
- **Learning**: Website authentication security
- **AR Features**: Login page validation

### 3. Password Security
- **Difficulty**: Beginner
- **Learning**: Password strength and vulnerabilities
- **AR Features**: Password visualization

### 4. Malware USB Detection
- **Difficulty**: Advanced
- **Learning**: Hardware security threats
- **AR Features**: USB device warnings

### 5. Safe Browsing Tips
- **Difficulty**: Beginner
- **Learning**: Web browsing security
- **AR Features**: Website security indicators

## 🔐 Authentication System

### User Authentication
1. **Registration**: Users create accounts with username, email, and password
2. **Email Verification (OTP)**: Signup sends a 6‑digit code; users verify before login
3. **Login**: Secure authentication with JWT tokens
4. **Access Token**: 7‑day JWT stored client‑side
5. **Refresh Token**: HttpOnly cookie; `/api/auth/refresh` issues new access tokens
6. **Forgot Password (OTP)**: Request code, then reset password with `{ email, code, newPassword }`
7. **Logout**: Secure session termination

### Admin Authentication
1. **Separate Login**: Dedicated admin login interface
2. **Role-based Access**: Only users with `role: "admin"` can access admin panel
3. **Secure Endpoints**: Separate API endpoints for admin authentication
4. **JWT with Roles**: Tokens include role information for authorization
5. **Protected Routes**: Admin panel requires admin role authentication

> Create an admin using the backend script or endpoint and set a strong password.

## 📊 Admin Panel Features

- **User Statistics**: Total users, active users, new users this week
- **User Table**: Complete user information display
- **Real-time Updates**: Refresh user data
- **Secure Access**: JWT-based authentication with admin role
- **Responsive Design**: Works on all devices
- **Role Management**: View and manage user roles
- **Admin Dashboard**: Comprehensive admin interface

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Environment Variables for Production
```env
VITE_API_URL=https://your-backend-api.com
VITE_APP_TITLE=AR Cybersecurity Awareness Platform
```

Backend env (examples):
```env
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret
JWT_EXPIRES_IN=7d
REFRESH_TTL_DAYS=30
PORT=5001
```

### Static Hosting
The built files in `/dist` can be deployed to any static hosting service:
- **Vercel**: `vercel --prod`
- **Netlify**: Drag and drop `/dist` folder
- **GitHub Pages**: Use GitHub Actions
- **AWS S3**: Upload `/dist` contents

For single‑page app routing on static hosts:
- Render: `static.json` with `{ "routes": [{ "src": "/.*", "dest": "/index.html" }] }`
- Netlify: `_redirects` → `/* /index.html 200`
- Nginx: `try_files $uri /index.html;`

### Docker Deployment
```dockerfile
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 🔐 Login Interface

### User Login Features
- **Username/Email**: Login with username or email address
- **Password**: Secure password authentication
- **Registration**: New user account creation
- **Guest Access**: Explore platform without registration
- **Form Validation**: Real-time input validation
- **Password Visibility**: Toggle password visibility

### Admin Login Features
- **Dedicated Interface**: Separate admin login card
- **Admin Credentials**: Username and password authentication
- **Visual Distinction**: Amber/orange theme for admin interface
- **Credential Display**: Default admin credentials shown
- **Role Validation**: Server-side admin role verification
- **Secure Access**: JWT tokens with admin role information
- **Email Verified**: Admin accounts must be verified like users (if created via register)

### Login Type Toggle
- **User Mode**: Standard user login and registration
- **Admin Mode**: Admin-only login interface
- **Visual Indicators**: Clear distinction between login types
- **Responsive Design**: Works on desktop and mobile devices

## 📁 Project Structure

```
AR-project/
├── src/
│   ├── components/
│   │   ├── ui/                    # Reusable UI components
│   │   ├── ProtectedRoute.jsx     # Route protection component
│   │   ├── CallToAction.jsx       # Call-to-action component
│   │   ├── HeroImage.jsx          # Hero image component
│   │   └── WelcomeMessage.jsx     # Welcome message component
│   ├── lib/
│   │   ├── api.js                 # API configuration
│   │   └── utils.js               # Utility functions
│   ├── pages/
│   │   ├── LoginPage.jsx          # Dual authentication page
│   │   ├── IntroductionPage.jsx   # Platform introduction
│   │   ├── Dashboard.jsx          # Main dashboard
│   │   ├── ARScenarios.jsx        # AR scenarios page
│   │   ├── Quiz.jsx               # Quiz interface
│   │   ├── Game.jsx               # Interactive games
│   │   └── AdminPanel.jsx         # Admin dashboard
│   ├── App.jsx                    # Main app component
│   ├── main.jsx                   # App entry point
│   └── index.css                  # Global styles
├── AR-project-backend/
│   ├── routes/
│   │   └── authRoutes.js          # Authentication routes
│   ├── prisma/
│   │   └── schema.prisma          # Database schema
│   ├── scripts/
│   │   └── create-admin.js        # Admin user creation
│   └── server.js                  # Backend server
└── README.md                      # This file
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue to Purple gradients
- **Secondary**: Green to Blue gradients
- **Accent**: Purple to Pink gradients
- **Background**: Dark slate with gradients
- **Glass Effects**: Semi-transparent overlays

### Typography
- **Headings**: Bold, cyber-themed fonts
- **Body**: Clean, readable sans-serif
- **Code**: Monospace for technical content

### Animations
- **Page Transitions**: Smooth fade and slide effects
- **Hover Effects**: Interactive element feedback
- **Loading States**: Engaging loading animations
- **Micro-interactions**: Subtle feedback animations

## 🧪 Testing

### Manual Testing
1. **Authentication**: Test login, registration, logout
2. **Navigation**: Verify all routes work correctly
3. **Responsive**: Test on different screen sizes
4. **Admin Panel**: Verify admin functionality
5. **Quizzes**: Ensure DB contains questions (Admin → Quiz Management)
6. **Games**: Ensure DB contains phishing emails (Admin → Game Content)
7. **Email Verification**: Register a new user → enter OTP → verify success
8. **Forgot Password**: Request code → reset with code and new password
5. **AR Scenarios**: Test all scenario interactions

### Browser Compatibility
- **Chrome**: Full support
- **Firefox**: Full support
- **Safari**: Full support
- **Edge**: Full support
- **Mobile**: Responsive design

## 🐛 Troubleshooting

### Common Issues

1. **Build Errors**
   - Check Node.js version (v18+)
   - Clear node_modules and reinstall
   - Verify all dependencies are installed

2. **API Connection Issues**
   - Verify backend is running
   - Check VITE_API_URL in .env
   - Ensure CORS is configured correctly

3. **Authentication Issues**
   - Check JWT token validity
   - Verify localStorage permissions
   - Clear browser cache and cookies
   - Verify admin credentials are correct
   - Check if user has admin role in database

4. **Styling Issues**
   - Verify Tailwind CSS is properly configured
   - Check for CSS conflicts
   - Ensure all custom styles are imported

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Development Guidelines
- Follow React best practices
- Use TypeScript for new components (optional)
- Maintain consistent styling with Tailwind
- Test on multiple devices and browsers
- Document new features and components

## 🔒 Security Features

### Authentication Security
- **JWT Tokens**: Secure token-based authentication
- **Password Hashing**: Bcrypt encryption for all passwords
- **Role-based Access**: Separate user and admin authentication
- **Input Validation**: Server-side validation for all inputs
- **CORS Protection**: Configured CORS for API security

### Admin Security
- **Separate Endpoints**: Dedicated admin authentication routes
- **Role Verification**: Server-side admin role validation
- **Protected Routes**: Admin panel requires admin role
- **Default Credentials**: Pre-configured admin account for initial setup
- **Password Change**: Admin should change default password

### Data Protection
- **Environment Variables**: Sensitive data in environment files
- **Database Security**: Prisma ORM with parameterized queries
- **Token Expiration**: JWT tokens expire after 7 days
- **Secure Headers**: Proper security headers configuration

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the troubleshooting section
- Review the component documentation
- Test with the provided examples

---

**Built with ❤️ for cybersecurity education**

## 🔗 Related Documentation

- [Backend API Documentation](../AR-project-backend/README.md)
- [Deployment Guide](../DEPLOYMENT_GUIDE.md)
- [Component Library](./src/components/ui/)

- [Component Library](./src/components/ui/)
