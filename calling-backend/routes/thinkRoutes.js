const express = require("express");
const thinkController = require("../controllers/thinkController");

const router = express.Router();

router
  .route("/")
  .get(thinkController.getAllThinks)
  .post(thinkController.createThink);

router
  .route("/:id")
  .get(thinkController.getThink)
  .patch(thinkController.updateThink)
  .delete(thinkController.deleteThink);

module.exports = router;
