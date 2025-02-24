const express = require("express");
const {
  createDole,
  getAllDoles,
  getDoleById,
} = require("../controllers/doleController.js");

const router = express.Router();

router.post("/dole", createDole);
router.get("/doles", getAllDoles);
router.get("/dole/:id", getDoleById);

module.exports = router;
