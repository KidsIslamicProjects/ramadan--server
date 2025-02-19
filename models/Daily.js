const mongoose = require("mongoose");

const dayDataSchema = new mongoose.Schema({
  hijriDate: { type: String, required: true }, // Hijri date (e.g., "الأوّل من رمضان")
  hadith: { type: String, required: true }, // Hadith text
  tafseerQuestion: { type: String, required: true }, // Tafseer question
  tafseerAnswer: { type: String, required: true }, // Tafseer answer
});

const DayData = mongoose.model("DayData", dayDataSchema);

module.exports = DayData;
