const LostItem = require("../models/LostItem");
const FoundItem = require("../models/FoundItem");

// Get all lost items posted by the logged-in user
exports.getMyLostItems = async (req, res) => {
  try {
    const userEmail = req.user.email;
    const items = await LostItem.find({ userEmail }).sort({ createdAt: -1 });
    res.json({ items });
  } catch (error) {
    console.error("Get My Lost Items Error:", error);
    res.status(500).json({
      message: "Failed to fetch your lost items",
      error: error.message,
    });
  }
};

// Get all found items posted by the logged-in user
exports.getMyFoundItems = async (req, res) => {
  try {
    const userEmail = req.user.email;
    const items = await FoundItem.find({ userEmail }).sort({ createdAt: -1 });
    res.json({ items });
  } catch (error) {
    console.error("Get My Found Items Error:", error);
    res.status(500).json({
      message: "Failed to fetch your found items",
      error: error.message,
    });
  }
};
