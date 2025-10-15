import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import prisma from "../prisma/client.js";
import redis from "../redis/client.js";

const router = express.Router();

const REFRESH_COOKIE = 'refresh_token';
const REFRESH_TTL_DAYS = parseInt(process.env.REFRESH_TTL_DAYS || '30', 10);

function createAccessToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET || "your-secret-key", { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });
}

function generateRefreshTokenValue() {
  return crypto.randomBytes(48).toString('hex');
}

async function issueRefreshToken(res, userId) {
  const token = generateRefreshTokenValue();
  const expiresAt = new Date(Date.now() + REFRESH_TTL_DAYS * 24 * 60 * 60 * 1000);
  await prisma.refreshToken.create({ data: { token, userId, expiresAt } });
  const isProd = process.env.NODE_ENV === 'production';
  res.cookie(REFRESH_COOKIE, token, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    expires: expiresAt,
    path: '/'
  });
}

// Register new user
router.post("/register", async (req, res) => {
  try {
    const { username, email, password, name } = req.body;

    // Validate required fields
    if (!username || !email || !password) {
      return res.status(400).json({ 
        error: "Username, email, and password are required" 
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check if username already exists
    const existingByUsername = await prisma.user.findUnique({ where: { username } });
    if (existingByUsername) {
      return res.status(400).json({ error: "Username already exists" });
    }
    // Check if email already exists (normalized)
    const existingByEmail = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    if (existingByEmail) {
      return res.status(400).json({ error: "Email already in use" });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user (unverified)
    const user = await prisma.user.create({
      data: {
        username,
        email: normalizedEmail,
        password: hashedPassword,
        name: name || username,
        isVerified: false
      }
    });

    // Create email verification code (6 digits)
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
    await prisma.emailVerification.create({ data: { userId: user.id, code, expiresAt } });
    console.log("📧 Verification code for", email, code);

    // Generate tokens
    const token = createAccessToken({ userId: user.id, username: user.username, role: user.role });
    await issueRefreshToken(res, user.id);

    // Clear users cache
    if (redis.isOpen) {
      await redis.del("users:all");
    }

    res.status(201).json({
      message: "User created successfully. Please verify your email.",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name,
        isVerified: user.isVerified
      }
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
});

// Login user
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate required fields
    if (!username || !password) {
      return res.status(400).json({ 
        error: "Username and password are required" 
      });
    }

    // Find user by username or email
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { username: username },
          { email: username }
        ]
      }
    });

    if (!user) {
      return res.status(401).json({ 
        error: "Invalid username or password" 
      });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ 
        error: "Invalid username or password" 
      });
    }

    if (!user.isVerified) {
      return res.status(403).json({ error: "Email not verified. Please check your inbox for the verification code." });
    }

    const token = createAccessToken({ userId: user.id, username: user.username, role: user.role });
    await issueRefreshToken(res, user.id);

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Login failed" });
  }
});

// Admin login endpoint
router.post("/admin/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate required fields
    if (!username || !password) {
      return res.status(400).json({ 
        error: "Username and password are required" 
      });
    }

    // Find admin user by username or email
    const user = await prisma.user.findFirst({
      where: {
        AND: [
          {
            OR: [
              { username: username },
              { email: username }
            ]
          },
          { role: "admin" }
        ]
      }
    });

    if (!user) {
      return res.status(401).json({ 
        error: "Invalid admin credentials" 
      });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ 
        error: "Invalid admin credentials" 
      });
    }

    const token = createAccessToken({ userId: user.id, username: user.username, role: user.role });
    await issueRefreshToken(res, user.id);

    res.json({
      message: "Admin login successful",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ error: "Admin login failed" });
  }
});

// Verify token middleware
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: "Access token required" });
  }

  jwt.verify(token, process.env.JWT_SECRET || "your-secret-key", (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid or expired token" });
    }
    req.user = user;
    next();
  });
};

// Get current user profile
router.get("/profile", authenticateToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
        createdAt: true
      }
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Profile error:", error);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

// Change password endpoint
router.post("/change-password", authenticateToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Validate required fields
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ 
        error: "Current password and new password are required" 
      });
    }

    // Validate new password strength
    if (newPassword.length < 6) {
      return res.status(400).json({ 
        error: "New password must be at least 6 characters long" 
      });
    }

    // Get user with password
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId }
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Verify current password
    const isValidPassword = await bcrypt.compare(currentPassword, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ 
        error: "Current password is incorrect" 
      });
    }

    // Hash new password
    const saltRounds = 10;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update password
    await prisma.user.update({
      where: { id: req.user.userId },
      data: { password: hashedNewPassword }
    });

    // Clear user cache
    if (redis.isOpen) {
      await redis.del("users:all");
      await redis.del(`user:${req.user.userId}`);
    }

    res.json({
      message: "Password changed successfully"
    });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({ error: "Failed to change password" });
  }
});

export default router;

// Verify email with code
router.post('/verify-email', async (req, res) => {
  try {
    const { email, code } = req.body;
    if (!email || !code) return res.status(400).json({ error: 'email and code are required' });
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: 'User not found' });
    const record = await prisma.emailVerification.findFirst({
      where: { userId: user.id, code },
      orderBy: { id: 'desc' }
    });
    if (!record) return res.status(400).json({ error: 'Invalid code' });
    if (new Date(record.expiresAt) < new Date()) return res.status(400).json({ error: 'Code expired' });
    await prisma.user.update({ where: { id: user.id }, data: { isVerified: true } });
    res.json({ message: 'Email verified successfully' });
  } catch (e) {
    console.error('Verify email error:', e);
    res.status(500).json({ error: 'Failed to verify email' });
  }
});

// Resend verification code
router.post('/resend-code', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'email is required' });
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: 'User not found' });
    if (user.isVerified) return res.json({ message: 'Email already verified' });
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
    await prisma.emailVerification.create({ data: { userId: user.id, code, expiresAt } });
    console.log("📧 Verification code for", email, code);
    res.json({ message: 'Verification code sent' });
  } catch (e) {
    console.error('Resend code error:', e);
    res.status(500).json({ error: 'Failed to resend code' });
  }
});
// Refresh token endpoint
router.post('/refresh', async (req, res) => {
  try {
    const rt = req.cookies?.[REFRESH_COOKIE];
    if (!rt) return res.status(401).json({ error: 'No refresh token' });
    const record = await prisma.refreshToken.findUnique({ where: { token: rt } });
    if (!record || record.revokedAt || new Date(record.expiresAt) < new Date()) {
      return res.status(401).json({ error: 'Invalid refresh token' });
    }
    const user = await prisma.user.findUnique({ where: { id: record.userId } });
    if (!user) return res.status(401).json({ error: 'User not found' });
    const token = createAccessToken({ userId: user.id, username: user.username, role: user.role });
    res.json({ token });
  } catch (e) {
    console.error('Refresh error:', e);
    res.status(500).json({ error: 'Failed to refresh token' });
  }
});

// Logout: revoke refresh token
router.post('/logout', async (req, res) => {
  try {
    const rt = req.cookies?.[REFRESH_COOKIE];
    if (rt) {
      await prisma.refreshToken.update({
        where: { token: rt },
        data: { revokedAt: new Date() }
      }).catch(() => {});
    }
    res.clearCookie(REFRESH_COOKIE, { path: '/' });
    res.json({ message: 'Logged out' });
  } catch (e) {
    res.json({ message: 'Logged out' });
  }
});
