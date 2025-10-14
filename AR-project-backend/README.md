# AR Cybersecurity Awareness Platform - Backend

A robust Node.js backend API for the AR Cybersecurity Awareness Platform, providing user authentication, user management, and admin functionality.

## 🚀 Features

- **Dual Authentication System**: Separate user and admin authentication endpoints
- **Role-based Access Control**: User roles (user/admin) with different permissions
- **User Authentication**: JWT-based authentication with bcrypt password hashing
- **Admin Authentication**: Dedicated admin login with role verification
- **User Management**: Complete CRUD operations for user accounts
- **Admin Panel**: Secure admin endpoints for user management
- **Database Integration**: PostgreSQL with Prisma ORM
- **Caching**: Redis integration for improved performance
- **Security**: CORS enabled, input validation, and secure password handling
 - **Quizzes & Game Content**: DB-backed quiz categories/questions and phishing game entries
 - **Refresh Tokens**: HttpOnly cookie-based refresh flow for access token renewal
 - **Request Logging**: Lightweight request/response logger with redaction

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT + bcryptjs
- **Caching**: Redis
- **Environment**: dotenv
 - **Cookies**: cookie-parser (for refresh tokens)

## 📋 Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- Redis server (optional, for caching)
- npm or yarn

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd AR-project-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/ar_cybersecurity_db"
   
   # JWT Secret
   JWT_SECRET="your-super-secret-jwt-key-here"
   JWT_EXPIRES_IN="7d"
   REFRESH_TTL_DAYS="30"
   
   # Server
   PORT=5001
   
   # Redis (optional)
   REDIS_URL="redis://localhost:6379"
   ```

4. **Database Setup**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma migrate dev
   
   # Create default admin user
   node scripts/create-admin.js
   ```

5. **Default Admin Credentials**
   The setup script creates a default admin user:
   - **Username**: `admin`
   - **Password**: `AdminSecure123!`
   - **Email**: `admin@arcyberguard.com`
   - **Role**: `admin`

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```
The server will start with nodemon for auto-restart on file changes.

### Production Mode
```bash
npm start
```

The server will be available at `http://localhost:5001`

## 📚 API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | Register a new user | No |
| POST | `/login` | User login | No |
| POST | `/admin/login` | Admin login | No |
| GET | `/profile` | Get current user profile | Yes |
| POST | `/refresh` | Issue new access token from refresh cookie | No (cookie) |
| POST | `/logout` | Revoke refresh token and clear cookie | No (cookie) |

### User Routes (`/api/users`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Get all users (basic) | No |
| POST | `/` | Create a new user | No |
| GET | `/admin/all` | Get all users (admin) | Yes |

### Quiz Routes (`/api/quiz`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/categories` | List quiz categories | No |
| GET | `/category/:key` | Get questions for a category | No |
| POST | `/admin/category` | Upsert category | Yes (admin) |
| POST | `/admin/question` | Create question with options | Yes (admin) |

### Game Routes (`/api/game`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/phishing-emails` | List active phishing email entries | No |
| POST | `/admin/phishing-email` | Create phishing email entry | Yes (admin) |
| PATCH | `/admin/phishing-email/:id` | Update/toggle phishing email | Yes (admin) |

## 🔐 Authentication System

The API uses short‑lived access JWTs with role-based access control and long‑lived refresh tokens (HttpOnly cookie). Include the access token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### User Roles
- **user**: Default role for regular users
- **admin**: Administrative role with elevated permissions

### Authentication & Session Flow
1. **User Registration / Login / Admin Login**: Issues an access JWT (default 7d) and sets a `refresh_token` cookie (default 30d).
2. **Accessing Protected Routes**: Send the access token via `Authorization: Bearer <token>`.
3. **Refresh**: When the access token expires, call `POST /api/auth/refresh` (cookie is sent automatically) to receive a new access token.
4. **Logout**: `POST /api/auth/logout` revokes the current refresh token and clears the cookie.
5. **Role Verification**: Server validates user role for protected endpoints.

### Registration Request
```json
POST /api/auth/register
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepassword123",
  "name": "John Doe"
}
```

### User Login Request
```json
POST /api/auth/login
{
  "username": "johndoe",
  "password": "securepassword123"
}
```

### Admin Login Request
```json
POST /api/auth/admin/login
{
  "username": "admin",
  "password": "AdminSecure123!"
}
```

### Response Format
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com",
    "name": "John Doe",
    "role": "user"
  }
}
```

### Admin Login Response
```json
{
  "message": "Admin login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "admin",
    "email": "admin@arcyberguard.com",
    "name": "System Administrator",
    "role": "admin"
  }
}
```

## 🗄️ Database Schema

### User Model
```prisma
model User {
  id       Int     @id @default(autoincrement())
  username String  @unique
  email    String  @unique
  password String
  name     String?
  role     String  @default("user") // "user" or "admin"
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

### Quiz & Game Models (Prisma)

```prisma
model QuizCategory {
  id          Int            @id @default(autoincrement())
  key         String         @unique
  title       String
  description String?
  questions   QuizQuestion[]
  createdAt   DateTime       @default(now())
  updatedAt   DateTime       @updatedAt
}

model QuizQuestion {
  id          Int           @id @default(autoincrement())
  question    String
  explanation String?
  categoryId  Int
  category    QuizCategory  @relation(fields: [categoryId], references: [id])
  options     QuizOption[]
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt
}

model QuizOption {
  id          Int          @id @default(autoincrement())
  text        String
  isCorrect   Boolean      @default(false)
  questionId  Int
  question    QuizQuestion @relation(fields: [questionId], references: [id])
}

model PhishingEmail {
  id         Int      @id @default(autoincrement())
  sender     String
  subject    String
  content    String
  isPhishing Boolean  @default(true)
  indicators String[]
  active     Boolean  @default(true)
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}

model RefreshToken {
  id        Int      @id @default(autoincrement())
  token     String   @unique
  userId    Int
  user      User     @relation(fields: [userId], references: [id])
  expiresAt DateTime
  revokedAt DateTime?
  createdAt DateTime @default(now())
}
```
```

## 🔒 Security Features

- **Password Hashing**: Uses bcryptjs with salt rounds
- **JWT Tokens**: Secure token-based authentication with role information
- **Role-based Access**: Separate authentication for users and admins
- **Admin Verification**: Server-side admin role validation
- **CORS**: Configurable cross-origin resource sharing
- **Input Validation**: Request body validation
- **SQL Injection Protection**: Prisma ORM prevents SQL injection
- **Rate Limiting**: Can be easily added with express-rate-limit

## 👑 Admin Management

### Creating Admin Users
Admin users can be created using the provided script:

```bash
node scripts/create-admin.js
```

### Admin User Properties
- **Username**: Must be unique
- **Email**: Must be unique
- **Password**: Hashed with bcrypt
- **Role**: Set to "admin"
- **Name**: Display name for the admin

### Admin Authentication
- **Separate Endpoint**: `/api/auth/admin/login`
- **Role Validation**: Only users with `role: "admin"` can authenticate
- **JWT Token**: Includes role information for frontend authorization
- **Security**: Same security measures as user authentication

### Admin Script Features
- **Duplicate Check**: Prevents creating multiple admin users
- **Secure Password**: Generates strong default password
- **Database Integration**: Uses Prisma for database operations
- **Error Handling**: Comprehensive error handling and logging

## 🧪 Testing

Test the API endpoints using tools like Postman, curl, or the included test script:

```bash
# Test basic connectivity
curl http://localhost:5001/

# Test user registration
curl -X POST http://localhost:5001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"testpass123","name":"Test User"}'

# Test admin login
curl -X POST http://localhost:5001/api/auth/admin/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"AdminSecure123!"}'
```

## 📁 Project Structure

```
AR-project-backend/
├── models/                 # Database models (if using separate model files)
├── prisma/
│   ├── client.js          # Prisma client configuration
│   ├── schema.prisma      # Database schema
│   └── migrations/        # Database migrations
├── redis/
│   └── client.js          # Redis client configuration
├── routes/
│   ├── authRoutes.js      # Authentication routes (user & admin)
│   └── userRoutes.js      # User management routes
├── scripts/
│   └── create-admin.js    # Admin user creation script
├── server.js              # Main server file
├── package.json           # Dependencies and scripts
└── .env                   # Environment variables
```

## 🚀 Deployment

### Environment Variables for Production
```env
NODE_ENV=production
DATABASE_URL="postgresql://user:pass@host:port/db"
JWT_SECRET="your-production-secret-key"
PORT=5001
REDIS_URL="redis://your-redis-host:6379"
```

### Docker Deployment (Optional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run prisma:generate
EXPOSE 5001
CMD ["npm", "start"]
```

## 🔧 Configuration

### CORS & Cookies
The server is configured to allow all origins in development with `credentials: true` for cookie support. For production, set explicit origins and keep `credentials: true` so refresh cookies work:

```javascript
app.use(cors({
  origin: ['https://yourdomain.com', 'https://www.yourdomain.com'],
  credentials: true
}));
app.use(cookieParser());
```

### Redis Configuration
Redis is optional but recommended for caching. If Redis is not available, the application will continue to work without caching.

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Verify DATABASE_URL in .env file
   - Ensure PostgreSQL is running
   - Check database credentials

2. **JWT Token Issues**
   - Verify JWT_SECRET is set in .env
   - Check token expiration (default: 7 days). If using refresh flow, ensure `cookie-parser` is enabled and cookies are allowed by CORS.

3. **Redis Connection Issues**
   - Redis is optional - app works without it
   - Check REDIS_URL if using Redis

4. **Admin Authentication Issues**
   - Verify admin user exists in database
   - Check if user has `role: "admin"`
   - Verify admin credentials are correct
   - Run `node scripts/create-admin.js` to create admin user
   - Check JWT token includes role information
 - If access token expired, call `/api/auth/refresh` to obtain a new token

### Logs
The server logs important events to the console. Check the terminal output for error messages.

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the troubleshooting section above
- Review the API documentation

---

**Built with ❤️ for cybersecurity education**
