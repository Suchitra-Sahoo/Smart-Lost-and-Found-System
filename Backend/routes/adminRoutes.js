const express = require("express");
const router = express.Router();
const { getAllStudentsWithItems, getAllStaffWithItems } = require("../controllers/adminUserController.js");
const { protect } = require("../middleware/authMiddleware"); 

// Admin-only routes
router.get("/students-details", protect, getAllStudentsWithItems);
router.get("/staff-details", protect, getAllStaffWithItems);

module.exports = router;
