import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import prisma from "./prisma/client.js";
import { ensureRedisConnection } from "./redis/client.js";

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
    await ensureRedisConnection();
    console.log("✅ Redis connected");
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  } catch (err) {
    console.error("❌ DB Connection Error:", err);
    process.exit(1);
  }
}

start();
