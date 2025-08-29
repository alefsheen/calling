const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  phone: { type: String },
  phone_f: { type: String },
  phone_m: { type: String },
  phone_h: { type: String },
  lastName: { type: String },
  group: { type: String },
  group2: { type: String },
  role: { type: String },
  melli: { type: String },
  father: { type: String },
  follower: { type: String },
  active: { type: Boolean, default: true },
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
