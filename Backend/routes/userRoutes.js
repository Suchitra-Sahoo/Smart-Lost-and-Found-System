const express = require("express");
const router = express.Router();
const { getTotalUsers, getUserStats } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

// Admin only routes
router.get("/total", protect, getTotalUsers);
router.get("/stats", protect, getUserStats);

module.exports = router;
