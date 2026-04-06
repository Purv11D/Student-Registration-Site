const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    eventName: { type: String, required: true },
    collegeName: String,
    year: String,
    message: String,

    registrationId: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

// Generate registration ID before saving
registrationSchema.pre("save", function (next) {
  if (!this.registrationId) {
    const prefix = this.eventName.substring(0, 3).toUpperCase();
    const random = Math.floor(100000 + Math.random() * 900000);
    this.registrationId = `${prefix}-${random}`;
  }
  next();
});

module.exports = mongoose.model("Registration", registrationSchema);
