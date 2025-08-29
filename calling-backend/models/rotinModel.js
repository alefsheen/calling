// levels
// 1: gray, not important
// 2: bronz, good for review
// 3: golden, excellent! to be Bold
// 3: rahbordi => tabloe zekr

const mongoose = require("mongoose");

const rotinSchema = new mongoose.Schema({
  message: { type: String },
  createdAt: { type: Number },
  logs: { type: String },
  estimate: { type: Number },
});

const Rotin = mongoose.model("Rotin", rotinSchema);

module.exports = Rotin;
