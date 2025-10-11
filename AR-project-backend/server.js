import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
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
  });
}

start();
