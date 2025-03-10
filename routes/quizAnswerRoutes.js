const express = require("express");
const {
  submitQuizAnswers,
  checkIfQuizAlreadySubmitted,
} = require("../controllers/quizAnswerController");

const router = express.Router();

router.post("/answers", submitQuizAnswers); // POST endpoint for submitting quiz answers
router.get("/status/:userId", checkIfQuizAlreadySubmitted); // POST endpoint for submitting quiz answers

module.exports = router;
