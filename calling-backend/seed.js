const mongoose = require("mongoose");
const xlsx = require("xlsx");
const Contact = require("./models/contactModel"); // Adjust the path as needed
const Calling = require("./models/callingModel");
const Setting = require("./models/settingModel");
const Event = require("./models/eventModel");
const Evaluation = require("./models/evaluationModel");
require("dotenv").config();

// MongoDB connection
// const mongoURI = process.env.MONGO_PUBLIC_URI;
const DB =
  "mongodb://root:yqmxp30zy7N1282fD34332yX@chogolisa.liara.cloud:32893/mirkazemi?authSource=admin";

mongoose
  .connect(DB)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Read Excel file
const workbook = xlsx.readFile("contacts29.xlsx"); // Replace 'contacts.xlsx' with your file name
const sheetName = workbook.SheetNames[0];
const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
// console.log(sheetData);

// Seed data
const seedContacts = async () => {
  try {
    const contacts = sheetData;

    await Contact.insertMany(contacts);
    console.log("contacts seeded successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding contacts data:", error);
    mongoose.connection.close();
  }
};

const callingData = [
  {
    contactID: "67c1a3594ab5c186eddc6d77",
    eventID: "67c1a39422e11831c4376d70",
    date: 1737508957,
    eventName: "برنامه پنجشنبه",
    present_recorder: "بادام برجاه",
    present: false,
    message1_recorder: "بادام برجاه",
    message1: "مریض بود و امکان حضور نداشت",
  },
  {
    contactID: "67c1a3594ab5c186eddc6d77",
    eventID: "67c1a39422e11831c4376d71",
    date: 1737184148,
    eventName: "برنامه جمعه",
    present_recorder: "بادام برجاه",
    present: true,
    message1_recorder: "مقصودی",
    message1: "مسافرت بود و امکان حضور نداشت",
  },
  {
    contactID: "67c1a3594ab5c186eddc6d77",
    eventID: "67c1a39422e11831c4376d72",
    date: 1737788957,
    eventName: "برنامه شنبه",
    present_recorder: "بادام برجاه",
    present: false,
    message1_recorder: "آزاد شده",
    message1: "گفت تو راهه و خودشو میرسونه",
  },
];

const eventData = [
  {
    eventName: "برنامه پنجشنبه",
    date: 1737788957,
  },
  {
    eventName: "برنامه جمعه",
    date: 1737184148,
    group: "شهید عاشوری",
  },
  {
    eventName: "برنامه شنبه",
    date: 1737788957,
    group: "شهدای هسته ای",
  },
];

const seedCallings = async () => {
  try {
    await Calling.insertMany(callingData);
    console.log("callings seeded successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding calling data:", error);
    mongoose.connection.close();
  }
};

const seedEvents = async () => {
  try {
    await Event.insertMany(eventData);
    console.log("events seeded successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding event data:", error);
    mongoose.connection.close();
  }
};

const evaluationData = [
  {
    param: "احترام",
    star: 3,
    message: "سر کلاس مودب بود",
    recorder: "شفیعی",
    date: 1737788957,
  },
  {
    param: "نظم",
    star: 2,
    message: "سر کلاس با نظم بود",
    recorder: "سلمانی",
    date: 1737184148,
  },
  {
    param: "نماز",
    star: 1,
    message: "به موقع سر نماز اومد",
    recorder: "حسن گلشن دوست",
    date: 1737588957,
  },
];

// param: { type: String },
// star: { type: Number },
// message: { type: String },
// recorder: { type: String },
// date: { type: Number },

const seedEvaluation = async () => {
  try {
    await Evaluation.insertMany(evaluationData);
    console.log("evaluations seeded successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding evaluation data:", error);
    mongoose.connection.close();
  }
};

const seedSetting = async () => {
  try {
    await Setting.insertMany([
      {
        settingName: "شورای عمومی",
        date: 1737788957,
      },
    ]);
    console.log("setting seeded successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding setting data:", error);
    mongoose.connection.close();
  }
};

seedContacts();
// seedEvents();
// seedCallings();
// seedSetting();
// seedEvaluation();
