const Setting = require("../models/settingModel");
const catchAsync = require("../utils/catchAsync");

exports.createOrUpdateSetting = catchAsync(async (req, res, next) => {
  const { activeEvent } = req.body;

  let setting = await Setting.findOne();

  if (setting) {
    setting.activeEvent = activeEvent;
    await setting.save();
    return res.status(200).json({
      status: "success",
      message: "Setting updated successfully!",
      data: setting,
    });
  } else {
    setting = await Setting.create({ activeEvent });
    return res.status(201).json({
      status: "success",
      message: "Setting created successfully!",
      data: setting,
    });
  }
});

exports.getSetting = catchAsync(async (req, res, next) => {
  const setting = await Setting.findOne();

  if (!setting) {
    return res.status(404).json({
      status: "fail",
      message: "No setting found.",
    });
  }

  res.status(200).json({
    status: "success",
    setting: setting,
  });
});

exports.deleteSetting = catchAsync(async (req, res) => {
  await Setting.deleteOne();
  res
    .status(200)
    .json({ status: "success", message: "Setting deleted successfully!" });
});
