const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers").dashboard;

router.get("/total", dashboardController.getTotalCounts);

module.exports = router;