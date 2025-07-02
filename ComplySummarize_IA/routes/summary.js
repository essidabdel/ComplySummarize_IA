const express = require("express");
const router = express.Router();
const { createSummary, getSummaries } = require("../controllers/summaryController");
const auth = require("../middlewares/auth");

router.post("/", auth, createSummary); 
router.get("/", auth, getSummaries);    

module.exports = router;
