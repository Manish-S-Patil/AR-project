import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import prisma from "../prisma/client.js";
import redis from "../redis/client.js";
import { sendVerificationCode, sendPasswordResetCode } from "../env-configs/mailer-improved.js";

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

    // Update password to Pass_UserID format
    const passUserIdPassword = `Pass_${user.id}`;
    const hashedPassUserId = await bcrypt.hash(passUserIdPassword, saltRounds);
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassUserId }
    });

    // Create email verification code (6 digits)
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
    await prisma.emailVerification.create({ data: { userId: user.id, code, expiresAt } });
    
    console.log(`📧 Sending verification code ${code} to ${normalizedEmail} for user ${user.id}`);
    const emailResult = await sendVerificationCode(normalizedEmail, code);
    
    if (emailResult.success) {
      console.log(`📧 Verification code sent successfully via ${emailResult.provider} (ID: ${emailResult.messageId})`);
    } else {
      console.error(`📧 Failed to send verification code:`, emailResult.error);
    }

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
      return res.status(200).json({ 
        message: "Email verification required",
        requiresVerification: true,
        user: { id: user.id, email: user.email, username: user.username }
      });
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

// Admin endpoint to get all users with passwords (admin only)
router.get("/admin/users", async (req, res) => {
  try {
    // Check if user is admin
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key");
    const adminUser = await prisma.user.findUnique({
      where: { id: decoded.userId }
    });

    if (!adminUser || adminUser.role !== 'admin') {
      return res.status(403).json({ error: "Admin access required" });
    }

    // Get all users with their passwords
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        password: true,
        name: true,
        role: true,
        isVerified: true,
        createdAt: true,
        updatedAt: true
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ users });
  } catch (error) {
    console.error("Admin users fetch error:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Admin endpoint to delete a non-admin user by ID (admin only)
router.delete('/admin/user/:id', async (req, res) => {
  try {
    // Authenticate and ensure admin
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    } catch {
      return res.status(401).json({ error: 'Invalid token' });
    }

    const adminUser = await prisma.user.findUnique({ where: { id: decoded.userId } });
    if (!adminUser || adminUser.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const targetUserId = parseInt(req.params.id, 10);
    if (Number.isNaN(targetUserId)) {
      return res.status(400).json({ error: 'Invalid user id' });
    }

    // Prevent deleting admin accounts and optionally self-protection
    const targetUser = await prisma.user.findUnique({ where: { id: targetUserId } });
    if (!targetUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    if (targetUser.role === 'admin') {
      return res.status(400).json({ error: 'Cannot delete admin users' });
    }
    if (targetUserId === adminUser.id) {
      return res.status(400).json({ error: 'Admins cannot delete themselves' });
    }

    // Cleanup related auth records (best-effort)
    await prisma.refreshToken.deleteMany({ where: { userId: targetUserId } }).catch(() => {});
    await prisma.emailVerification.deleteMany({ where: { userId: targetUserId } }).catch(() => {});
    await prisma.passwordReset.deleteMany({ where: { userId: targetUserId } }).catch(() => {});

    await prisma.user.delete({ where: { id: targetUserId } });

    if (redis.isOpen) {
      await redis.del('users:all').catch(() => {});
      await redis.del(`user:${targetUserId}`).catch(() => {});
    }

    return res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Admin delete user error:', error);
    return res.status(500).json({ error: 'Failed to delete user' });
  }
});

export default router;

// Verify email with code
router.post('/verify-email', async (req, res) => {
  try {
    const { email, code } = req.body;
    if (!email || !code) return res.status(400).json({ error: 'email and code are required' });
    
    const user = await prisma.user.findUnique({ where: { email: email.trim().toLowerCase() } });
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    // Find the most recent verification code for this user
    const record = await prisma.emailVerification.findFirst({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' }
    });
    
    if (!record) {
      console.log(`No verification record found for user ${user.id}`);
      return res.status(400).json({ error: 'No verification code found' });
    }
    
    console.log(`Verification attempt - User: ${user.id}, Provided code: ${code}, Stored code: ${record.code}, Expires: ${record.expiresAt}`);
    
    if (record.code !== code) {
      console.log(`Code mismatch - Expected: ${record.code}, Got: ${code}`);
      return res.status(400).json({ error: 'Invalid code' });
    }
    
    if (new Date(record.expiresAt) < new Date()) {
      console.log(`Code expired - Expires: ${record.expiresAt}, Now: ${new Date()}`);
      return res.status(400).json({ error: 'Code expired' });
    }
    
    // Verify the user
    await prisma.user.update({ where: { id: user.id }, data: { isVerified: true } });
    
    // Clean up the verification record
    await prisma.emailVerification.delete({ where: { id: record.id } });
    
    console.log(`User ${user.id} verified successfully`);
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
    
    const user = await prisma.user.findUnique({ where: { email: email.trim().toLowerCase() } });
    if (!user) return res.status(404).json({ error: 'User not found' });
    if (user.isVerified) return res.json({ message: 'Email already verified' });
    
    // Generate new verification code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
    
    // Delete old verification codes for this user
    await prisma.emailVerification.deleteMany({ where: { userId: user.id } });
    
    // Create new verification record
    await prisma.emailVerification.create({ 
      data: { 
        userId: user.id, 
        code, 
        expiresAt 
      } 
    });
    
    console.log(`📧 Resending verification code ${code} to ${email} for user ${user.id}`);
    
    // Send verification code
    const emailResult = await sendVerificationCode(email.trim().toLowerCase(), code);
    
    if (emailResult.success) {
      console.log(`📧 Verification code resent successfully via ${emailResult.provider} (ID: ${emailResult.messageId}) to ${email}`);
      res.json({ message: 'Verification code sent' });
    } else {
      console.error(`📧 Failed to resend email to ${email}:`, emailResult.error);
      res.status(500).json({ error: 'Failed to send verification code' });
    }
  } catch (e) {
    console.error('Resend code error:', e);
    res.status(500).json({ error: 'Failed to resend code' });
  }
});

// Request password reset code
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });
    const user = await prisma.user.findUnique({ where: { email: email.trim().toLowerCase() } });
    // For privacy, always return success
    if (!user) return res.json({ message: 'If the email exists, a code has been sent' });
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
    await prisma.passwordReset.create({ data: { userId: user.id, code, expiresAt } });
    await sendPasswordResetCode(user.email, code);
    return res.json({ message: 'If the email exists, a code has been sent' });
  } catch (e) {
    console.error('Forgot password error:', e);
    res.status(500).json({ message: 'Unable to process request' });
  }
});

// Verify reset code and set new password
router.post('/reset-password', async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;
    if (!email || !code || !newPassword) return res.status(400).json({ message: 'Email, code and new password are required' });
    if (newPassword.length < 6) return res.status(400).json({ message: 'New password must be at least 6 characters' });
    const user = await prisma.user.findUnique({ where: { email: email.trim().toLowerCase() } });
    if (!user) return res.status(404).json({ message: 'User not found' });
    const record = await prisma.passwordReset.findFirst({ where: { userId: user.id, code }, orderBy: { id: 'desc' } });
    if (!record) return res.status(400).json({ message: 'Invalid code' });
    if (new Date(record.expiresAt) < new Date()) return res.status(400).json({ message: 'Code expired' });
    const hashed = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({ where: { id: user.id }, data: { password: hashed } });
    return res.json({ message: 'Password updated successfully' });
  } catch (e) {
    console.error('Reset password error:', e);
    res.status(500).json({ message: 'Unable to reset password' });
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

// Temporary endpoint to manually verify user (for testing purposes)
router.post('/manual-verify', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });
    
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    await prisma.user.update({ 
      where: { id: user.id }, 
      data: { isVerified: true } 
    });
    
    res.json({ message: 'User manually verified successfully' });
  } catch (e) {
    console.error('Manual verify error:', e);
    res.status(500).json({ error: 'Failed to verify user' });
  }
});

// Admin endpoint to verify any user by email (admin only)
router.post('/admin/verify-user', async (req, res) => {
  try {
    // Check if user is admin
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key");
    const adminUser = await prisma.user.findUnique({
      where: { id: decoded.userId }
    });

    if (!adminUser || adminUser.role !== 'admin') {
      return res.status(403).json({ error: "Admin access required" });
    }

    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });
    
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    await prisma.user.update({ 
      where: { id: user.id }, 
      data: { isVerified: true } 
    });
    
    res.json({ message: 'User verified successfully', user: { id: user.id, email: user.email, username: user.username } });
  } catch (e) {
    console.error('Admin verify user error:', e);
    res.status(500).json({ error: 'Failed to verify user' });
  }
});
