const mongoose = require("mongoose");

const doleSchema = new mongoose.Schema({
  hijriDate: { type: String, required: true },
  gregorianDay: { type: Number, required: true },
  dole: { type: String, required: true },
});

const Dole = mongoose.model("Dole", doleSchema);

module.exports = Dole;
