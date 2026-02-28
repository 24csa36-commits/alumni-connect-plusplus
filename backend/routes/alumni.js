import express from "express";
import Alumni from "../models/Alumni.js";

const router = express.Router();

// 🔹 Get all alumni
router.get("/", async (req, res) => {
  try {
    const alumni = await Alumni.find().sort({ createdAt: -1 });
    res.json(alumni);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
