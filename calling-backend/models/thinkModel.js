// levels
// 1: gray, not important
// 2: bronz, good for review
// 3: golden, excellent! to be Bold
// 3: rahbordi => tabloe zekr

const mongoose = require("mongoose");

const thinkSchema = new mongoose.Schema({
  message: { type: String },
  createdAt: { type: Number },
  level: { type: Number },
});

const Think = mongoose.model("Think", thinkSchema);

module.exports = Think;
