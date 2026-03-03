require("dotenv").config();
const mongoose = require("mongoose");

const { createServer } = require("http");
const { Server } = require("socket.io");

const app = require("./app");
const Contact = require("./models/contactModel");

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on("updateCalling", (data) => {
    io.emit("updateCalling", data);
  });
  socket.on("updatePresents", (data) => {
    io.emit("updatePresents", data);
  });
  // socket.on("sync", (type, contact) => {
  //   async function updateContact() {
  //     try {
  //       const updatedContact = await Contact.findByIdAndUpdate(
  //         contact._id,
  //         contact,
  //         {
  //           new: true,
  //           runValidators: true,
  //         }
  //       );
  //       if (!updatedContact) {
  //         throw new AppError("No contact found with that ID", 404);
  //       }
  //       console.log(type);
  //       if (type === "updateMessage")
  //         socket.broadcast.emit("sendToAll", type, updatedContact);
  //       else io.emit("sendToAll", type, updatedContact);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   }
  //   updateContact();
  // });
});

const port = process.env.PORT || 3000;

httpServer.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

// const dotenv = require("dotenv");

// process.on('uncaughtException', err => {
//   console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
//   console.log(err.name, err.message);
//   process.exit(1);
// });

// dotenv.config({ path: "./config.env" });

const DB = process.env.MONGO_URI;
mongoose.connect(DB).then(() => {
  console.log("DB connection successful!");
  // bot_init();
});

// simpleSend();

// process.on('unhandledRejection', err => {
//   console.log('UNHANDLED REJECTION! 💥 Shutting down...');
//   console.log(err.name, err.message);
//   server.close(() => {
//     process.exit(1);
//   });
// });

// process.on('SIGTERM', () => {
//   console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
//   server.close(() => {
//     console.log('💥 Process terminated!');
//   });
// });
