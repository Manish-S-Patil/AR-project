import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import prisma from "./prisma/client.js";
// import redis, { ensureRedisConnection } from "./redis/client.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
  origin: true, // Allow all origins for development
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Request/Response logger (redacts sensitive auth payloads)
app.use((req, res, next) => {
  const startTimeMs = Date.now();
  const url = req.originalUrl || req.url;
  const isSensitive =
    url.startsWith('/api/auth') ||
    (req.body && (req.body.password || req.body.currentPassword || req.body.newPassword));

  const safeBody = isSensitive ? '[redacted]' : req.body;
  try {
    console.log('➡️ ', req.method, url, 'body:', JSON.stringify(safeBody));
  } catch {
    console.log('➡️ ', req.method, url, 'body: [unserializable]');
  }

  const originalJson = res.json.bind(res);
  res.json = (payload) => {
    const durationMs = Date.now() - startTimeMs;
    try {
      const preview = isSensitive ? '[redacted]' : JSON.stringify(payload)?.slice(0, 800);
      console.log('⬅️ ', res.statusCode, req.method, url, `${durationMs}ms`, 'resp:', preview);
    } catch {
      console.log('⬅️ ', res.statusCode, req.method, url, `${durationMs}ms`, 'resp: [unserializable]');
    }
    return originalJson(payload);
  };

  res.on('finish', () => {
    // In case response wasn't JSON (e.g., sendStatus, send), still log duration
    const durationMs = Date.now() - startTimeMs;
    if (res.getHeader('content-type')?.toString().includes('application/json')) return;
    console.log('⬅️ ', res.statusCode, req.method, url, `${durationMs}ms`);
  });

  next();
});

// Health check route
app.get("/", (req, res) => {
  res.json({ 
    message: "AR Project Backend API", 
    status: "running",
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/quiz", quizRoutes);

// Startup
async function start() {
  try {
    await prisma.$connect();
    console.log("✅ Prisma connected");
  } catch (err) {
    console.error("❌ Prisma connection failed:", err);
    process.exit(1);
  }

  // Redis temporarily disabled
  console.log("⚠️ Redis disabled for testing");

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📡 Auth endpoints available at http://localhost:${PORT}/api/auth`);
    console.log(`🧩 Quiz endpoints available at http://localhost:${PORT}/api/quiz`);
  });
}

start();
