const express = require("express");
const router = express.Router();
const { reportFoundItem, getFoundItems } = require("../controllers/foundItemController");
const { protect } = require("../middleware/authMiddleware");

// Report a found item
router.post("/", protect, reportFoundItem);

module.exports = router;
