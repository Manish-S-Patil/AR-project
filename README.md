# AR Cybersecurity Awareness Platform

A comprehensive cybersecurity education platform featuring interactive AR scenarios, quizzes, and games. Built with React frontend and Node.js backend, featuring email verification, admin management, and modern UI/UX.

## 🚀 Features

### 🔐 Authentication & Security
- **📧 Email Verification**: Staged signup with email verification codes
- **🔑 Password Management**: Secure password setting with temporary passwords
- **👑 Admin Panel**: Complete user management with delete capabilities
- **🔒 Role-based Access**: JWT authentication with user/admin roles
- **🛡️ CORS Protection**: Configured for multiple deployment origins

### 📱 User Experience
- **📱 Responsive Design**: Mobile-first with glass effects and animations
- **🎮 Interactive Learning**: AR scenarios, quizzes, and educational games
- **🗂️ Dynamic Content**: Database-driven quizzes and game content
- **📊 Progress Tracking**: User statistics and completion tracking
- **🌐 PWA Ready**: Progressive Web App capabilities

### 🎯 Educational Content
- **📧 Phishing Detection**: Learn to identify suspicious emails
- **🔐 Password Security**: Visualize password strength and vulnerabilities
- **🌐 Safe Browsing**: Website security indicators and warnings
- **💾 USB Security**: AR warnings for potentially dangerous devices
- **🎯 Quiz System**: Category-based knowledge testing

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS with custom glass effects
- **UI Components**: Radix UI + Custom Components
- **Animations**: Framer Motion
- **Routing**: React Router DOM
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js with Express
- **Database**: PostgreSQL with Prisma ORM
- **Caching**: Redis (optional, graceful fallback)
- **Authentication**: JWT with refresh tokens
- **Email**: Nodemailer with Gmail SMTP
- **Security**: CORS, bcrypt, input validation
- **State Management**: React Hooks + Local Storage

## 📋 Prerequisites

- **Node.js** (v18 or higher)
- **npm** or yarn
- **PostgreSQL** database
- **Redis** (optional, for caching)
- **Gmail App Password** (for email verification)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd file-integrated
   ```

2. **Install dependencies**
   ```bash
   # Frontend dependencies
   npm install

   # Backend dependencies
   cd AR-project-backend
   npm install
   cd ..
   ```

3. **Environment Setup**

   **Frontend** (`.env` in root):
   ```env
   VITE_API_URL=http://localhost:5001
   VITE_APP_TITLE=AR Cybersecurity Awareness Platform
   ```

   **Backend** (`AR-project-backend/.env`):
   ```env
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/ar_project_db"
   
   # JWT Configuration
   JWT_SECRET="your-super-secret-jwt-key"
   JWT_EXPIRES_IN="7d"
   REFRESH_TTL_DAYS=30
   
   # Server
   PORT=5001
   
   # CORS Configuration
   ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173,https://ar-project-beta.vercel.app
   
   # Gmail SMTP Configuration
   GMAIL_USER=your-email@gmail.com
   GMAIL_APP_PASSWORD=your-gmail-app-password
   ```

4. **Database Setup**
   ```bash
   cd AR-project-backend
   npx prisma migrate dev
   npx prisma generate
   node scripts/create-admin.js
   cd ..
   ```

5. **Start Development Servers**
   ```bash
   # Terminal 1 - Backend
   cd AR-project-backend
   npm start

   # Terminal 2 - Frontend
   npm run dev
   ```

   **Access the application:**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5001`

## 🚀 Quick Start

### 📧 Email Verification Signup Flow
1. **Start Registration**: Enter username and email
2. **Receive Code**: Check email for 6-digit verification code
3. **Verify Email**: Enter the code to verify your email
4. **Set Password**: Create your secure password
5. **Complete**: Account ready for login

### 👑 Admin Access
- **Default Admin**: `admin` / `AdminSecure123!`
- **Admin Panel**: Access at `/admin` after login
- **User Management**: View, manage, and delete users
- **Content Management**: Create quizzes and game content

### 🎮 Guest Mode
- **Limited Access**: Explore without registration
- **No Progress Saving**: Guest sessions don't persist
- **Full Content Access**: All educational content available

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

### 📧 Staged Email Verification Signup
1. **Step 1**: Enter username and email → Backend creates account with temporary password
2. **Step 2**: Receive 6-digit verification code via email
3. **Step 3**: Enter verification code → Email gets verified
4. **Step 4**: Set your real password using the temporary password
5. **Complete**: Account ready for login

### 🔑 Password Management
- **Temporary Passwords**: Generated during signup for security
- **Password Change**: Users can change passwords after verification
- **Forgot Password**: Request reset code → Set new password
- **Secure Storage**: All passwords hashed with bcrypt

### 👑 Admin Features
- **User Management**: View all users with complete information
- **Delete Users**: Remove non-admin users (admin protection)
- **Content Management**: Create quizzes and game content
- **Statistics**: User metrics and analytics
- **Role Protection**: Cannot delete admin accounts or self

### 🔒 Security Features
- **JWT Tokens**: 7-day access tokens with refresh tokens
- **Role-based Access**: Separate user/admin authentication
- **CORS Protection**: Configured for multiple deployment origins
- **Input Validation**: Server-side validation for all inputs
- **Email Verification**: Required for all new accounts

## 📊 Admin Panel Features

- **User Statistics**: Total users, active users, new users this week
- **User Table**: Complete user information display
- **Real-time Updates**: Refresh user data
- **Secure Access**: JWT-based authentication with admin role
- **Responsive Design**: Works on all devices
- **Role Management**: View and manage user roles
- **Admin Dashboard**: Comprehensive admin interface

## 🚀 Deployment

### 🌐 Frontend Deployment (Vercel)

1. **Build the project**
```bash
npm run build
```

2. **Deploy to Vercel**
   ```bash
   vercel --prod
   ```

3. **Environment Variables** (Vercel Dashboard)
```env
   VITE_API_URL=https://your-backend-url.onrender.com
   ```

4. **SPA Routing** (`vercel.json` - already configured)
   ```json
   {
     "rewrites": [
       {
         "source": "/((?!api).*)",
         "destination": "/index.html"
       }
     ]
   }
   ```

### 🔧 Backend Deployment (Render)

1. **Environment Variables** (Render Dashboard)
```env
   # Database
   DATABASE_URL=postgresql://user:password@host:port/database
   
   # JWT
   JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
REFRESH_TTL_DAYS=30
   
   # CORS
   ALLOWED_ORIGINS=https://your-frontend.vercel.app,https://your-domain.com
   
   # Gmail SMTP
   GMAIL_USER=your-email@gmail.com
   GMAIL_APP_PASSWORD=your-gmail-app-password
   
   # Optional Redis
   REDIS_URL=redis://user:password@host:port
   ```

2. **Build Command**
   ```bash
   npm install && npx prisma generate && npx prisma db push
   ```

3. **Start Command**
   ```bash
   npm start
   ```

### 📧 Gmail SMTP Setup

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account Settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. **Use App Password** in `GMAIL_APP_PASSWORD` (not your regular password)

### 🔒 Security Configuration

- **CORS**: Configure `ALLOWED_ORIGINS` with your frontend domains
- **JWT Secret**: Use a strong, random secret key
- **Database**: Use connection pooling and SSL in production
- **Redis**: Optional but recommended for caching

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

1. **Email Verification Not Working**
   - Check Gmail App Password is correct (no spaces)
   - Verify 2FA is enabled on Gmail account
   - Check backend logs for SMTP errors
   - Ensure `GMAIL_USER` and `GMAIL_APP_PASSWORD` are set

2. **CORS Errors**
   - Verify `ALLOWED_ORIGINS` includes your frontend domain
   - Check backend logs for CORS debugging messages
   - Ensure frontend URL matches exactly (including https/http)

3. **Database Connection Issues**
   - Verify `DATABASE_URL` format: `postgresql://user:password@host:port/database`
   - Run `npx prisma migrate dev` to sync schema
   - Check if PostgreSQL is running

4. **Redis Connection Issues**
   - Redis is optional - app works without it
   - Check `REDIS_URL` format if using external Redis
   - Backend will log "Redis disabled" if not available

5. **Build Errors**
   - Check Node.js version (v18+)
   - Clear node_modules and reinstall
   - Verify all dependencies are installed

6. **Authentication Issues**
   - Check JWT token validity
   - Verify localStorage permissions
   - Clear browser cache and cookies
   - Verify admin credentials are correct
   - Check if user has admin role in database

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
