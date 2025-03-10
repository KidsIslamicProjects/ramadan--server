const QuizAnswer = require("../models/Quizs");
const User = require("../models/User");

const submitQuizAnswers = async (req, res) => {
  try {
    const { userId, answers } = req.body;

    if (!userId || !answers) {
      return res
        .status(400)
        .json({ message: "User ID and answers are required." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    let totalScore = 0;
    const answerResults = [];

    // Process answers
    for (const ans of answers) {
      const { question, selectedAnswer, correctAnswer, score } = ans;
      const isCorrect = selectedAnswer === correctAnswer;
      totalScore += isCorrect ? score : 0;

      answerResults.push({
        question,
        selectedAnswer,
        correctAnswer,
        score: isCorrect ? score : 0,
        isCorrect,
      });
    }

    const quizAnswer = new QuizAnswer({
      userId: user._id,
      answers: answerResults,
      totalScore,
    });

    await quizAnswer.save();

    res.json({
      message: "Answers submitted successfully.",
      totalScore,
      answerResults,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while submitting answers." });
  }
};

const getQuizAnswers = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    const quizAnswers = await QuizAnswer.find({ userId }).populate(
      "userId",
      "name"
    );

    if (!quizAnswers || quizAnswers.length === 0) {
      return res
        .status(404)
        .json({ message: "No quiz answers found for this user." });
    }

    res.json(quizAnswers);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching quiz answers." });
  }
};

const checkIfQuizAlreadySubmitted = async (req, res) => {
  try {
    const { userId } = req.params; // Expecting userId to be passed as a URL parameter

    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if the user has already submitted the quiz
    const existingSubmission = await QuizAnswer.findOne({ userId });

    if (existingSubmission) {
      return res.status(200).json({
        message: "Quiz already submitted.",
        alreadySubmitted: true,
        totalScore: existingSubmission.totalScore,
        submissionDate: existingSubmission.createdAt,
      });
    }

    return res.status(200).json({
      message: "Quiz not submitted yet.",
      alreadySubmitted: false,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while checking the submission." });
  }
};

module.exports = {
  submitQuizAnswers,
  getQuizAnswers,
  checkIfQuizAlreadySubmitted,
};
// Khodor
