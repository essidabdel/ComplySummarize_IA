const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const auth = require("../middlewares/auth");

router.post("/", auth, upload.single("pdf"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "Aucun fichier reçu" });
  res.status(200).json({ message: "PDF reçu", filename: req.file.filename });
});

module.exports = router;
