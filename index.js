const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes.js");
const tasksRoutes = require("./routes/dailyRoutes.js");
const dolesRoutes = require("./routes/doleRoutes.js");
const quizAnswerRoutes = require("./routes/quizAnswerRoutes.js");

const app = express();
const PORT = 3001;

app.use(
  cors({
    origin: ["http://localhost:3000", "https://aakida.vercel.app"],
    credentials: true,
  }),
);
app.use(express.json());

mongoose
  .connect("mongodb+srv://AlMu3in:Tahatata123@al-mu3in.x3zsopm.mongodb.net/")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api", userRoutes);
app.use("/api", tasksRoutes);
app.use("/api", dolesRoutes);
app.use("/api", quizAnswerRoutes);
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
