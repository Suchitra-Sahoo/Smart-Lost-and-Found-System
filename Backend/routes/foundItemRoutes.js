const express = require("express");
const router = express.Router();
const { reportFoundItem, getFoundItems} = require("../controllers/foundItemController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

// Report a found item
router.post("/", protect, upload.single("image"), reportFoundItem);
router.get("/", protect, getFoundItems);

module.exports = router;
