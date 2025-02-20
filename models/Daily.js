const mongoose = require("mongoose");

const dayDataSchema = new mongoose.Schema({
  hijriDate: { type: String, required: true },
  gregorianDay: { type: Number, required: true },
  hadith: { type: String, required: true },
  tafseerQuestion: { type: String, required: true },
  tafseerAnswer: { type: String, required: true },
});

const DayData = mongoose.model("DayData", dayDataSchema);

module.exports = DayData;
