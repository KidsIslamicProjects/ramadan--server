const express = require("express");
const {
  createDaily,
  getAllTasks,
  getTaskById,
} = require("../controllers/dailyController.js");

const router = express.Router();

router.post("/task", createDaily);
router.get("/tasks", getAllTasks);
router.get("/task/:id", getTaskById);

module.exports = router;
