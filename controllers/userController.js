const User = require("../models/User");

const submitDole = async (req, res) => {
  try {
    const { userId, hijriDate } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if a record for today's hijriDate already exists
    let progressEntry = user.dailyDoleProgress.find(
      (entry) => entry.hijriDate === hijriDate
    );

    if (progressEntry) {
      progressEntry.done = true;
    } else {
      user.dailyDoleProgress.push({
        hijriDate,
        done: true,
      });
    }

    await user.save();

    res.status(200).json({ message: "Daily Dole updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const submitTask = async (req, res) => {
  const { userId, hijriDate, tasks, tafseerAnswer, hadith } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const existingProgress = user.dailyTasksProgress.find(
      (entry) => entry.hijriDate === hijriDate
    );

    if (existingProgress) {
      return res
        .status(400)
        .json({ error: "Tasks for this date are already submitted." });
    }

    // Calculate Score
    let score = tasks.length; // 1 point per task
    if (hadith) score += 2;
    if (tafseerAnswer === "Completed") score += 2;

    // Save Progress including tasks
    user.dailyTasksProgress.push({
      hijriDate,
      score,
      tafseerAnswer,
      hadith: hadith,
      tasks,
    });

    await user.save();

    res.json({ message: "Submission successful", score });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create User
const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { name, password } = req.body;

    const user = await User.findOne({ name });

    if (!user) {
      return res.status(400).json({ error: "المستخدم غير موجود!" });
    }

    if (user.password !== password) {
      return res.status(400).json({ error: "كلمة المرور غير صحيحة!" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get User by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update User
const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete User
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  deleteUser,
  submitTask,
  submitDole,
  updateUser,
  createUser,
  getUserById,
  getUsers,
  loginUser,
};
