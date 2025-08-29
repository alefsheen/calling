const mongoose = require("mongoose");

const evaluationSchema = new mongoose.Schema({
  contactID: {
    type: mongoose.Schema.ObjectId,
    ref: "Contact",
    required: [true, "An calling must have a contactID"],
  },
  date: { type: Number },
  param: { type: String },
  recorder: { type: String },
  star: { type: Number },
  message: { type: String },
});

const Evaluation = mongoose.model("Evaluation", evaluationSchema);

module.exports = Evaluation;
