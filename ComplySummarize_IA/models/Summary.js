const mongoose = require("mongoose");

const summarySchema = new mongoose.Schema({
  content: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  filename: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Summary", summarySchema);
