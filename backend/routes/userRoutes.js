import express from "express";
import prisma from "../prisma/client.js";
import redis from "../redis/client.js";

const router = express.Router();

// Get all users
router.get("/", async (req, res) => {
  try {
    const cacheKey = "users:all";
    const cached = await redis.get(cacheKey);
    if (cached) {
      return res.json(JSON.parse(cached));
    }
    const users = await prisma.user.findMany();
    await redis.set(cacheKey, JSON.stringify(users), { EX: 60 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Create user
router.post("/", async (req, res) => {
  const { name, email } = req.body;
  try {
    const user = await prisma.user.create({ data: { name, email } });
    await redis.del("users:all");
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: "Failed to create user" });
  }
});

export default router;
