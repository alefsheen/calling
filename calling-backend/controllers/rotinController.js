const Rotin = require("../models/rotinModel");
const factory = require("./handlerFactory");

exports.createRotin = factory.createOne(Rotin);
exports.getRotin = factory.getOne(Rotin);
exports.getAllRotins = factory.getAll(Rotin);
exports.updateRotin = factory.updateOne(Rotin);
exports.deleteRotin = factory.deleteOne(Rotin);
