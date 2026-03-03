import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: String,
  targetDepartment: String,
  targetBatch: Number,
  targetSkills: [String],
  eventDate: Date,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Event", eventSchema);