const express = require("express");
const {
  createDaily,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/dailyController.js");

const router = express.Router();

router.post("/task", createDaily);
router.get("/tasks", getAllTasks);
router.get("/task/:id", getTaskById);
router.put("/task/:id", updateTask);
router.delete("/task/:id", deleteTask);
module.exports = router;
