# AR Cybersecurity Awareness Platform - Frontend

A modern React-based frontend application for the AR Cybersecurity Awareness Platform, featuring interactive cybersecurity education through augmented reality scenarios, quizzes, and games.

## 🚀 Features

- **🔐 User Authentication**: Secure login and registration system
- **📱 Responsive Design**: Mobile-first, modern UI with glass effects
- **🎮 Interactive Learning**: AR scenarios, quizzes, and educational games
- **👥 Admin Panel**: Complete user management dashboard
- **🎨 Modern UI/UX**: Beautiful animations and smooth transitions
- **📊 Progress Tracking**: User progress and statistics
- **🌐 PWA Ready**: Progressive Web App capabilities

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

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd AR-project-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:5001
   VITE_APP_TITLE=AR Cybersecurity Awareness Platform
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`

## 🚀 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run preview:render` | Preview for Render deployment |

## 📱 Pages & Features

### 🔐 Authentication (`/`)
- **Login**: Secure user authentication
- **Registration**: New user account creation
- **Guest Access**: Explore without registration

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
- **General Quiz**: Comprehensive cybersecurity knowledge test
- **Scenario-specific**: Targeted quizzes for each AR scenario
- **Instant Feedback**: Real-time scoring and explanations
- **Progress Tracking**: Track quiz completion and scores

### 🎮 Interactive Games (`/game`)
- **Educational Mini-games**: Learn through play
- **Cybersecurity Concepts**: Reinforce learning objectives
- **Engaging Interface**: Fun and interactive experience

### 👥 Admin Panel (`/admin`)
- **User Management**: View all registered users
- **Statistics Dashboard**: User metrics and analytics
- **Real-time Data**: Live user information
- **Secure Access**: Authentication required

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

## 🔐 Authentication Flow

1. **Registration**: Users create accounts with username, email, and password
2. **Login**: Secure authentication with JWT tokens
3. **Token Storage**: Secure token management in localStorage
4. **Session Management**: Automatic token validation
5. **Logout**: Secure session termination

## 📊 Admin Panel Features

- **User Statistics**: Total users, active users, new users this week
- **User Table**: Complete user information display
- **Real-time Updates**: Refresh user data
- **Secure Access**: JWT-based authentication
- **Responsive Design**: Works on all devices

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

### Static Hosting
The built files in `/dist` can be deployed to any static hosting service:
- **Vercel**: `vercel --prod`
- **Netlify**: Drag and drop `/dist` folder
- **GitHub Pages**: Use GitHub Actions
- **AWS S3**: Upload `/dist` contents

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

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                 # Reusable UI components
│   ├── CallToAction.jsx    # Call-to-action component
│   ├── HeroImage.jsx       # Hero image component
│   └── WelcomeMessage.jsx  # Welcome message component
├── lib/
│   └── utils.js            # Utility functions
├── pages/
│   ├── LoginPage.jsx       # Authentication page
│   ├── IntroductionPage.jsx # Platform introduction
│   ├── Dashboard.jsx       # Main dashboard
│   ├── ARScenarios.jsx     # AR scenarios page
│   ├── Quiz.jsx            # Quiz interface
│   ├── Game.jsx            # Interactive games
│   └── AdminPanel.jsx      # Admin dashboard
├── App.jsx                 # Main app component
├── main.jsx                # App entry point
└── index.css               # Global styles
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
