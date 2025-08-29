const express = require("express");
const rotinController = require("../controllers/rotinController");

const router = express.Router();

router
  .route("/")
  .get(rotinController.getAllRotins)
  .post(rotinController.createRotin);

router
  .route("/:id")
  .get(rotinController.getRotin)
  .patch(rotinController.updateRotin)
  .delete(rotinController.deleteRotin);

module.exports = router;
