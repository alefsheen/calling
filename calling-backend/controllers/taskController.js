const Task = require("../models/taskModel");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");

exports.createTask = factory.createOne(Task);
exports.getTask = factory.getOne(Task);
exports.getAllTasks = factory.getAll(Task);
exports.updateTask = factory.updateOne(Task);
exports.deleteTask = factory.deleteOne(Task);

exports.resetLevels = catchAsync(async (req, res, next) => {
  const updatedTasks = await Task.updateMany({}, { $set: { level: 0 } });

  if (updatedTasks.modifiedCount === 0) {
    return res.status(404).json({
      status: "fail",
      message: "No tasks were updated.",
    });
  }

  return res.status(200).json({
    status: "success",
    message: `${updatedTasks.modifiedCount} tasks updated successfully!`,
    data: updatedTasks,
  });
});
