const express = require("express");
const router = express.Router();
const { createSummary, getSummaries, downloadSummaryPdf } = require("../controllers/summaryController");
const auth = require("../middlewares/auth");

router.post("/", auth, createSummary);  
router.get("/", auth, getSummaries);    
router.get("/:id/download", auth, downloadSummaryPdf);

module.exports = router;
