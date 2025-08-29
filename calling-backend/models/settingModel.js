const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema({
  activeEvent: {
    type: mongoose.Schema.ObjectId,
    ref: "Event",
    required: [true, "An calling must have a eventID"],
  },
});

const Setting = mongoose.model("Setting", settingSchema);

module.exports = Setting;
