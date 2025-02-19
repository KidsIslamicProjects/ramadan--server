const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes.js");
const tasksRoutes = require("./routes/dailyRoutes.js");
const app = express();
const PORT = 3001;

app.use(
  cors({
    origin: ["http://localhost:3000", "https://ramadan-challenge.vercel.app"],
    credentials: true,
  })
);
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://ecommerce:ecommerce123@ecommerce.vmtpii4.mongodb.net/"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api", userRoutes);
app.use("/api", tasksRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
