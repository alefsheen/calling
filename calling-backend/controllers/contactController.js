const Contact = require("../models/contactModel");
const factory = require("./handlerFactory");

exports.createContact = factory.createOne(Contact);
exports.getContact = factory.getOne(Contact);
exports.getAllContacts = factory.getAll(Contact);
exports.updateContact = factory.updateOne(Contact);
exports.deleteContact = factory.deleteOne(Contact);
