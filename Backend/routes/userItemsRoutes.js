const express = require("express");
const router = express.Router();
const { getMyLostItems, getMyFoundItems } = require("../controllers/userItemsController");
const { protect } = require("../middleware/authMiddleware"); 

router.get("/my-lost-items", protect, getMyLostItems);
router.get("/my-found-items", protect, getMyFoundItems);

module.exports = router;
