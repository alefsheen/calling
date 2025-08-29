const Evaluation = require("../models/evaluationModel");
const factory = require("./handlerFactory");
const catchAsync = require("../utils/catchAsync");
const Event = require("../models/eventModel");

// exports.createEvaluation = factory.createOne(Evaluation);
exports.getEvaluation = factory.getOne(Evaluation);
exports.getAllEvaluations = factory.getAll(Evaluation);
// exports.updateEvaluation = factory.updateOne(Evaluation);
exports.deleteEvaluation = factory.deleteOne(Evaluation);

exports.createOrUpdateEvaluation = catchAsync(async (req, res, next) => {
  const { param, star, message, recorder, date, contactID } = req.body;

  let evaluation = await Evaluation.findOne({ contactID, date, param });

  // console.log(message1_recorder ?? evaluation.message1_recorder);
  if (evaluation) {
    evaluation.star = star ?? evaluation.star;
    evaluation.message = message ?? evaluation.message;
    evaluation.recorder = recorder ?? evaluation.recorder;

    await evaluation.save();
    return res.status(200).json({
      status: "success",
      message: "Evaluation updated successfully!",
      data: evaluation,
    });
  } else {
    evaluation = await Evaluation.create({
      contactID,
      date,
      param,
      star,
      message,
      recorder,
    });
    return res.status(201).json({
      status: "success",
      message: "Evaluation created successfully!",
      data: evaluation,
    });
  }
});
