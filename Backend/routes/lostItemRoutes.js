const express = require("express");
const router = express.Router();
const { reportLostItem, getLostItems } = require("../controllers/lostItemController");
const { protect } = require("../middleware/authMiddleware");

// Report a lost item
router.post("/", protect, reportLostItem);

module.exports = router;
