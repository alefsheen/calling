const express = require("express");
const evaluationController = require("../controllers/evaluationController");

const router = express.Router();

router
  .route("/")
  .get(evaluationController.getAllEvaluations)
  .post(evaluationController.createOrUpdateEvaluation);

router
  .route("/:id")
  .get(evaluationController.getEvaluation)
  // .patch(evaluationController.updateEvaluation)
  .delete(evaluationController.deleteEvaluation);

module.exports = router;
