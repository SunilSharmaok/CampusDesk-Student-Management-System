const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  regId: { type: Number, required: true },
  name: { type: String, required: true, trim: true },
  course: { type: String, required: true, trim: true },
  section: { type: String, required: true, trim: true, default: "A" },
  email: { type: String, trim: true, default: "" },
  phone: { type: String, trim: true, default: "" },
  year: { type: String, default: "1st Year" }
}, { timestamps: true });

module.exports = mongoose.model("student", studentSchema);
