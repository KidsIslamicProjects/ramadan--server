const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  password: { type: String },
  age: { type: Number },
  dailyProgress: [
    {
      hijriDate: { type: String },
      score: { type: Number, default: 0 },
      tafseerAnswer: { type: String },
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
