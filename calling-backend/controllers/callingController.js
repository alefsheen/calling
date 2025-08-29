const Calling = require("../models/callingModel");
const factory = require("./handlerFactory");
const catchAsync = require("../utils/catchAsync");
const Event = require("../models/eventModel");

// exports.createCalling = factory.createOne(Calling);
exports.getCalling = factory.getOne(Calling);
exports.getAllCallings = factory.getAll(Calling);
// exports.updateCalling = factory.updateOne(Calling);
exports.deleteCalling = factory.deleteOne(Calling);

exports.createOrUpdateCalling = catchAsync(async (req, res, next) => {
  const {
    contactID,
    eventID,
    present_recorder,
    present,
    message1_recorder,
    message1,
    message2_recorder,
    message2,
  } = req.body;

  let calling = await Calling.findOne({ contactID, eventID });

  // console.log(message1_recorder ?? calling.message1_recorder);
  if (calling) {
    calling.present_recorder = present_recorder ?? calling.present_recorder;
    calling.present = present !== undefined ? present : calling.present;
    calling.message1_recorder = message1_recorder ?? calling.message1_recorder;
    calling.message1 = message1 ?? calling.message1;
    calling.message2_recorder = message2_recorder ?? calling.message2_recorder;
    calling.message2 = message2 ?? calling.message2;

    await calling.save();
    return res.status(200).json({
      status: "success",
      message: "Calling updated successfully!",
      data: calling,
    });
  } else {
    const event = await Event.findOne({ _id: eventID });
    calling = await Calling.create({
      contactID,
      eventID,
      date: event.date,
      eventName: event.eventName,
      present_recorder,
      present,
      message1_recorder,
      message1,
      message2_recorder,
      message2,
    });
    return res.status(201).json({
      status: "success",
      message: "Calling created successfully!",
      data: calling,
    });
  }
});
