const Daily = require("../models/Daily");

const createDaily = async (req, res) => {
  try {
    const task = new Daily(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All Tasks
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Daily.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Task by ID
const getTaskById = async (req, res) => {
  try {
    const task = await Daily.findById(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createDaily, getAllTasks, getTaskById };
