import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import prisma from "./prisma/client.js";
import redis, { ensureRedisConnection } from "./redis/client.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);

// Startup
async function start() {
  try {
    await prisma.$connect();
    console.log("✅ Prisma connected");
  } catch (err) {
    console.error("❌ Prisma connection failed:", err);
    process.exit(1);
  }

  try {
    await ensureRedisConnection();
    console.log("✅ Redis connected");
  } catch (err) {
    console.warn("⚠️ Redis not available, continuing without cache.");
  }

  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
}

start();
