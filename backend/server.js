import express from "express";
import axios from "axios";
import mongoose from "mongoose";
import Alumni from "./models/Alumni.js";
import alumniRoutes from "./routes/alumni.js";
import cors from "cors";
import eventRoutes from "./routes/eventRoutes.js";

import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/alumni", alumniRoutes);
app.use("/api/events", eventRoutes);

// 🔹 MongoDB connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.log(err));

// 🔹 LinkedIn login redirect
app.get("/auth/linkedin", (req, res) => {
  const url =
    "https://www.linkedin.com/oauth/v2/authorization" +
    "?response_type=code" +
    `&client_id=${process.env.CLIENT_ID}` +
    `&redirect_uri=${process.env.REDIRECT_URI}` +
    "&scope=openid profile email";

  res.redirect(url);
});

// 🔹 LinkedIn callback
app.get("/auth/linkedin/callback", async (req, res) => {
  try {
    const code = req.query.code;
    if (!code) return res.status(400).send("Code missing");

    // 🔑 Exchange code → token
    const tokenRes = await axios.post(
      "https://www.linkedin.com/oauth/v2/accessToken",
      null,
      {
        params: {
          grant_type: "authorization_code",
          code,
          redirect_uri: process.env.REDIRECT_URI,
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
        },
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    const accessToken = tokenRes.data.access_token;

    // 👤 Get LinkedIn user profile
    const profileRes = await axios.get(
      "https://api.linkedin.com/v2/userinfo",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    const profile = profileRes.data;
    console.log(profile);
    // 💾 Save alumni if not exists
    let alumni = await Alumni.findOne({ linkedinId: profile.sub });

    if (!alumni) {
      alumni = await Alumni.create({
        linkedinId: profile.sub,
        name: profile.name,
        email: profile.email,
        picture: profile.picture,
      });
    }

    // 🔁 Redirect to frontend
    res.redirect("http://localhost:3000");
  } catch (err) {
    console.error(err);
    res.status(500).json(err.message);
  }
});

// 🔹 Get all alumni (for students)
// app.get("/api/alumni", async (req, res) => {
//   try {
//     const alumni = await Alumni.find();
//     res.json(alumni);
//   } catch (err) {
//     res.status(500).json(err.message);
//   }
// });
// 🔹 Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Backend running on http://localhost:${PORT}`)
);
