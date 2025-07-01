const express = require("express");
const router = express.Router();
const { createSummary, getSummaries } = require("../controllers/summaryController");
const auth = require("../middlewares/auth");

router.post("/", auth, createSummary);  // créer un résumé
router.get("/", auth, getSummaries);    // voir tous les siens

module.exports = router;
