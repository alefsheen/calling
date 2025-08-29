const mongoose = require("mongoose");

const callingSchema = new mongoose.Schema({
  contactID: {
    type: mongoose.Schema.ObjectId,
    ref: "Contact",
    required: [true, "An calling must have a contactID"],
  },
  eventID: {
    type: mongoose.Schema.ObjectId,
    ref: "Event",
    required: [true, "An calling must have a eventID"],
  },
  eventName: { type: String },
  date: { type: Number },
  present_recorder: { type: String },
  present: { type: Boolean, default: false },
  message1_recorder: { type: String },
  message1: { type: String },
  message2_recorder: { type: String },
  message2: { type: String },
  status: { type: String },
});

const Calling = mongoose.model("Calling", callingSchema);

module.exports = Calling;
