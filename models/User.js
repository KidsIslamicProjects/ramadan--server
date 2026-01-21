const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  password: { type: String },
  age: { type: Number },
  gender: { type: String },
  phoneNumber: { type: String },
  country: { type: String },
  avatar: { type: String },
  evaluation: { type: String, default: "" },
  dailyTasksProgress: [
    {
      hijriDate: { type: String },
      score: { type: Number, default: 0 },
      tafseerAnswer: { type: String },
      hadith: { type: String },
      tasks: [String],
    },
  ],
  dailyDoleProgress: [
    {
      hijriDate: { type: String },
      done: { type: Boolean, default: false },
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
