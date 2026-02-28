import Alumni from "../models/Alumni.js";

export const createAlumni = async (req, res) => {
  try {
    const alumni = await Alumni.create(req.body);
    res.status(201).json(alumni);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllAlumni = async (req, res) => {
  try {
    const alumni = await Alumni.find();
    res.json(alumni);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
