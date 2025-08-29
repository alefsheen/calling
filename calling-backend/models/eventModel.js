const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  eventName: { type: String },
  date: { type: Number },
  group: { type: String, default: "همه" },
  // group2: { type: String, default: "سطح 1" },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
