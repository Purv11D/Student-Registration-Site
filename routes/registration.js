const express = require("express");
const router = express.Router();
const Registration = require("../models/Registration");

// POST /api/registrations — Register for an event
router.post("/", async (req, res) => {
  try {
    const { fullName, email, phone, eventName, collegeName, year, message } = req.body;

    // Basic validation
    if (!fullName || !email || !eventName) {
      return res.status(400).json({
        success: false,
        message: "Full name, email, and event name are required.",
      });
    }

    // Check for duplicate registration (same email + same event)
    const existing = await Registration.findOne({ email: email.toLowerCase(), eventName });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: `You have already registered for ${eventName}. Your registration ID is ${existing.registrationId}.`,
      });
    }

    const registration = new Registration({
      fullName,
      email,
      phone,
      eventName,
      collegeName,
      year,
      message,
    });

    await registration.save();

    res.status(201).json({
      success: true,
      message: "Registration successful! 🎉",
      data: {
        registrationId: registration.registrationId,
        fullName: registration.fullName,
        eventName: registration.eventName,
        email: registration.email,
        registeredAt: registration.createdAt,
      },
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(". ") });
    }
    console.error("Registration error:", error);
    res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
});

// GET /api/registrations — Get all registrations (admin view)
router.get("/", async (req, res) => {
  try {
    const { event, page = 1, limit = 20 } = req.query;
    const filter = event ? { eventName: event } : {};

    const total = await Registration.countDocuments(filter);
    const registrations = await Registration.find(filter)
      .select("-__v")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      data: registrations,
    });
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
});

// GET /api/registrations/stats — Event-wise stats
router.get("/stats", async (req, res) => {
  try {
    const stats = await Registration.aggregate([
      { $group: { _id: "$eventName", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
    res.json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
});

module.exports = router;
