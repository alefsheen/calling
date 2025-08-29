const mongoose = require("mongoose");
const xlsx = require("xlsx");
const Contact = require("./models/contactModel");
require("dotenv").config();

// اتصال به دیتابیس
const mongoURI = process.env.MONGO_PUBLIC_URI;
mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// خواندن فایل اکسل
// const workbook = xlsx.readFile("followers.xlsx");
// const sheetName = workbook.SheetNames[0];
// const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

const updateFollowers = async () => {
  try {
    for (const row of sheetData) {
      const melli = row["کد ملی"];
      const follower = row["پیگیر"];

      if (!melli || !follower) continue;

      const result = await Contact.findOneAndUpdate(
        { melli: melli },
        { $set: { follower: follower } },
        { new: true }
      );

      if (result) {
        console.log(`Updated follower for ${melli} → ${follower}`);
      } else {
        console.warn(`Contact not found for melli: ${melli}`);
      }
    }

    console.log("Update process completed.");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error updating contacts:", error);
    mongoose.connection.close();
  }
};

// updateFollowers();

const removeFollowers = async () => {
  try {
    const result = await Contact.updateMany({}, { $unset: { follower: "" } });
    console.log(
      `Removed 'follower' field from ${result.modifiedCount} contacts.`
    );
  } catch (error) {
    console.error("Error removing followers:", error);
  } finally {
    mongoose.connection.close();
  }
};

removeFollowers();
