const mongoose = require('mongoose');
const attendanceSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'student', required: true },
  date: { type: String, required: true },
  status: { type: String, enum: ['Present', 'Absent', 'Late'], required: true },
  note: { type: String, trim: true, default: '' }
}, { timestamps: true });
attendanceSchema.index({ student: 1, date: 1 }, { unique: true });
module.exports = mongoose.model('attendance', attendanceSchema);
