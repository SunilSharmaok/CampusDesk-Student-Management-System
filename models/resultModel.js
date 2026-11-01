const mongoose = require('mongoose');
const resultSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'student', required: true },
  subject: { type: String, required: true, trim: true },
  semester: { type: String, required: true, trim: true },
  exam: { type: String, required: true, trim: true, default: 'Internal' },
  marksObtained: { type: Number, required: true, min: 0 },
  maxMarks: { type: Number, required: true, min: 1 },
  remarks: { type: String, trim: true, default: '' }
}, { timestamps: true });
resultSchema.index({ student: 1, subject: 1, semester: 1, exam: 1 }, { unique: true });
module.exports = mongoose.model('result', resultSchema);
