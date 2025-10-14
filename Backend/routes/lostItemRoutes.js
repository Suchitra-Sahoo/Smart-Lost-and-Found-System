const express = require("express");
const router = express.Router();
const { reportLostItem, getLostItems, deleteLostItem } = require("../controllers/lostItemController");
const { protect } = require("../middleware/authMiddleware");

// Report a lost item
router.post("/", protect, reportLostItem);
// Get all lost items
router.get("/", protect, getLostItems);
router.delete("/:id", protect, deleteLostItem);


module.exports = router;
