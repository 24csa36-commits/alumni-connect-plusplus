import express from "express";
import Alumni from "../models/Alumni.js";

const router = express.Router();


// 🔹 Create Alumni (POST)
router.post("/", async (req, res) => {
  try {
    const newAlumni = await Alumni.create(req.body);
    res.status(201).json(newAlumni);
  } catch (err) {
    res.status(400).json({
      message: "Failed to create alumni",
      error: err.message,
    });
  }
});


// 🔹 Get all Alumni (GET)
router.get("/", async (req, res) => {
  try {
    const alumniList = await Alumni.find().sort({ createdAt: -1 });
    res.status(200).json(alumniList);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch alumni",
      error: err.message,
    });
  }
});


export default router;