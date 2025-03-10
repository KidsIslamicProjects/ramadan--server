const mongoose = require("mongoose");

const quizAnswerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    answers: [
      {
        question: { type: String, required: true },
        selectedAnswer: { type: String, required: true, default: "" },
        correctAnswer: { type: String, required: true },
        score: { type: Number, required: true },
        isCorrect: { type: Boolean, required: true },
      },
    ],
    totalScore: { type: Number, required: true },
  },
  { timestamps: true }
);

const QuizAnswer = mongoose.model("QuizAnswer", quizAnswerSchema);

module.exports = QuizAnswer;
