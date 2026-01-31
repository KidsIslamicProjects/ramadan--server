const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, unique: true }, // Unique constraint
  password: { type: String },
  dob: { type: Date }, // Changed from 'age' to 'dob'
  gender: { type: String },
  phoneNumber: { type: String },
  country: { type: String },
  avatar: { type: String },
  
  role: { type: String, enum: ['student', 'supervisor'], default: 'student' },
  groupName: { type: String },

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