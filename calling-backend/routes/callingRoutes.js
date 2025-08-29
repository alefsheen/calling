const express = require("express");
const callingController = require("../controllers/callingController");

const router = express.Router();

router
  .route("/")
  .get(callingController.getAllCallings)
  .post(callingController.createOrUpdateCalling);

router
  .route("/:id")
  .get(callingController.getCalling)
  // .patch(callingController.updateCalling)
  .delete(callingController.deleteCalling);

module.exports = router;
