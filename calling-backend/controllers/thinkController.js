const Think = require("../models/thinkModel");
const factory = require("./handlerFactory");

exports.createThink = factory.createOne(Think);
exports.getThink = factory.getOne(Think);
exports.getAllThinks = factory.getAll(Think);
exports.updateThink = factory.updateOne(Think);
exports.deleteThink = factory.deleteOne(Think);
