const express = require("express");
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  submitTask,
  loginUser,
  submitDole,
} = require("../controllers/userController.js");

const router = express.Router();

router.post("/users", createUser);
router.post("/tasks/submit", submitTask);
router.post("/tasks/dole", submitDole);
router.post("/login", loginUser);
router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

module.exports = router;
