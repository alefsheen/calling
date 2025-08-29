// levels
// 1: gray, not important
// 2: bronz, good for review
// 3: golden, excellent! to be Bold
// 3: rahbordi => tabloe zekr

const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  message: { type: String },
  createdAt: { type: Number },
  level: { type: Number },
  category: { type: String },
  estimate: { type: Number },
  status: { type: Number },
  sprint: { type: Number },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
