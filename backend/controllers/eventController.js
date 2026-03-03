import Event from "../models/Event.js";
import Notification from "../models/Notification.js";
import Alumni from "../models/Alumni.js";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const createEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body);
    const alumniList = await Alumni.find();

    for (const alumni of alumniList) {

      const deptMatch = event.targetDepartment === alumni.department;
      const batchMatch = event.targetBatch === alumni.batch;
      const skillMatch = alumni.skills?.some(skill =>
        event.targetSkills?.includes(skill)
      );

      if (
        event.category === "fundraiser" ||
        deptMatch ||
        batchMatch ||
        skillMatch
      ) {

        await Notification.create({
          userId: alumni._id,
          eventId: event._id,
          message: `New Event: ${event.title}`
        });

        if (alumni.email) {
          await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: alumni.email,
            subject: `Invitation: ${event.title}`,
            html: `
              <h2>${event.title}</h2>
              <p>${event.description}</p>
              <p>Date: ${new Date(event.eventDate).toDateString()}</p>
              ${
                alumni.linkedinUrl
                  ? `<a href="${alumni.linkedinUrl}">Connect on LinkedIn</a>`
                  : ""
              }
            `
          });
        }
      }
    }

    res.status(201).json({ message: "Event created & recommendations sent" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};