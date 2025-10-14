import express from "express";
import prisma from "../prisma/client.js";
import { authenticateToken } from "./authRoutes.js";

const router = express.Router();

// Public: get list of categories
router.get("/categories", async (req, res) => {
  try {
    const categories = await prisma.quizCategory.findMany({
      orderBy: { id: "asc" },
      select: { id: true, key: true, title: true, description: true }
    });
    res.json({ categories });
  } catch (err) {
    console.error("Fetch categories error:", err);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

// Public: get questions for a category key
router.get("/category/:key", async (req, res) => {
  try {
    const key = req.params.key;
    const category = await prisma.quizCategory.findUnique({
      where: { key },
      include: {
        questions: {
          orderBy: { id: "asc" },
          include: { options: { orderBy: { id: "asc" } } }
        }
      }
    });
    if (!category) return res.status(404).json({ error: "Category not found" });

    // normalize payload for frontend
    const payload = {
      key: category.key,
      title: category.title,
      description: category.description || "",
      questions: category.questions.map((q) => ({
        id: q.id,
        question: q.question,
        explanation: q.explanation || "",
        options: q.options.map((o) => o.text),
        correctIndex: Math.max(0, q.options.findIndex((o) => o.isCorrect))
      }))
    };
    res.json(payload);
  } catch (err) {
    console.error("Fetch questions error:", err);
    res.status(500).json({ error: "Failed to fetch questions" });
  }
});

// Admin: create/update category
router.post("/admin/category", authenticateToken, async (req, res) => {
  try {
    if (req.user?.role !== "admin") return res.status(403).json({ error: "Admin only" });
    const { key, title, description } = req.body;
    if (!key || !title) return res.status(400).json({ error: "key and title are required" });
    const upserted = await prisma.quizCategory.upsert({
      where: { key },
      update: { title, description },
      create: { key, title, description }
    });
    res.status(201).json(upserted);
  } catch (err) {
    console.error("Upsert category error:", err);
    res.status(500).json({ error: "Failed to save category" });
  }
});

// Admin: create question with options
router.post("/admin/question", authenticateToken, async (req, res) => {
  try {
    if (req.user?.role !== "admin") return res.status(403).json({ error: "Admin only" });
    const { categoryKey, question, explanation, options, correctIndex } = req.body;
    if (!categoryKey || !question || !Array.isArray(options) || options.length < 2) {
      return res.status(400).json({ error: "categoryKey, question and at least 2 options required" });
    }
    if (correctIndex == null || correctIndex < 0 || correctIndex >= options.length) {
      return res.status(400).json({ error: "valid correctIndex required" });
    }
    const category = await prisma.quizCategory.findUnique({ where: { key: categoryKey } });
    if (!category) return res.status(404).json({ error: "Category not found" });

    const created = await prisma.quizQuestion.create({
      data: {
        question,
        explanation: explanation || null,
        categoryId: category.id,
        options: {
          create: options.map((text, idx) => ({ text, isCorrect: idx === correctIndex }))
        }
      },
      include: { options: true }
    });
    res.status(201).json(created);
  } catch (err) {
    console.error("Create question error:", err);
    res.status(500).json({ error: "Failed to create question" });
  }
});

export default router;


