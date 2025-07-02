const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);
const summaryRoutes = require("./routes/summary");
app.use("/api/summaries", summaryRoutes);
const uploadRoutes = require("./routes/upload");
app.use("/api/upload", uploadRoutes);
app.use("/uploads", express.static("uploads")); // pour y accéder

app.get("/", (req, res) => {
  res.send("API is running...");
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch((err) => console.error(err));
