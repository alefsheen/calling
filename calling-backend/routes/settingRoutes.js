const express = require("express");
const settingController = require("../controllers/settingController");

const router = express.Router();

router
  .route("/")
  .get(settingController.getSetting)
  .post(settingController.createOrUpdateSetting)
  .delete(settingController.deleteSetting);

module.exports = router;
