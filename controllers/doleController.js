const Dole = require("../models/Dole");

const createDole = async (req, res) => {
  try {
    const dole = new Dole(req.body);
    await dole.save();
    res.status(201).json(dole);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All Doles
const getAllDoles = async (req, res) => {
  try {
    const doles = await Dole.find();
    res.status(200).json(doles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Dole by ID
const getDoleById = async (req, res) => {
  try {
    const dole = await Dole.findById(req.params.id);
    if (!dole) return res.status(404).json({ error: "Dole not found" });
    res.status(200).json(dole);
  } catch (error) {
    s;
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createDole, getAllDoles, getDoleById };
