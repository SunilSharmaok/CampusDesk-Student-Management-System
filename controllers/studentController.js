const StudentData = require("../models/studentModel");

const getStudents = async (req, res) => {
  try {
    const allStudents = await StudentData.find().sort({ createdAt: -1, name: 1 });
    res.status(200).json(allStudents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createStudent = async (req, res) => {
  try {
    const { regId, name, course, section } = req.body;
    if (!regId || !name || !course || !section) {
      return res.status(400).json({ message: "Registration ID, name, course and section are required." });
    }
    const existing = await StudentData.findOne({ regId: Number(regId) });
    if (existing) return res.status(409).json({ message: "A student with this registration ID already exists." });
    const newStudent = new StudentData({
      ...req.body,
      regId: Number(regId),
      name: String(name).trim(),
      course: String(course).trim(),
      section: String(section).trim()
    });
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateStudent = async (req, res) => {
  try {
    const { regId, name, course, section } = req.body;
    if (!regId || !name || !course || !section) {
      return res.status(400).json({ message: "Registration ID, name, course and section are required." });
    }
    const duplicate = await StudentData.findOne({ regId: Number(regId), _id: { $ne: req.params.id } });
    if (duplicate) return res.status(409).json({ message: "Another student already uses this registration ID." });
    const updated = await StudentData.findByIdAndUpdate(
      req.params.id,
      { ...req.body, regId: Number(regId), name: String(name).trim(), course: String(course).trim(), section: String(section).trim() },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: "Student not found." });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const deleted = await StudentData.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Student not found." });
    res.status(200).json({ message: "Student deleted successfully." });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { getStudents, createStudent, updateStudent, deleteStudent };
