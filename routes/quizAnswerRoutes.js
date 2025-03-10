const express = require("express");
const {
  submitQuizAnswers,
  getQuizAnswers,
  checkIfQuizAlreadySubmitted,
} = require("../controllers/quizAnswerController");

const router = express.Router();

router.post("/answers", submitQuizAnswers);
router.get("/answers/:userId", getQuizAnswers);
router.get("/status/:userId", checkIfQuizAlreadySubmitted);

module.exports = router;
