import mongoose from "mongoose";

const alumniSchema = new mongoose.Schema({
  name: { type: String, required: true },
  headline: String,
  email: String,
  department: String,
  company: String,
  graduationYear: String,
  linkedinId: String,
  profileImage: String,
}, { timestamps: true });

export default mongoose.model("Alumni", alumniSchema);
