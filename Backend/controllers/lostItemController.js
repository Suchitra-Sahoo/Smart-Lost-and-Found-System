const LostItem = require("../models/LostItem");

// Report a lost item
exports.reportLostItem = async (req, res) => {
  try {
    const {
      itemName,
      itemDescription,
      dateLost,
      timeRange,
      location,
      itemCategory,
      identificationMark
    } = req.body;

    if (!itemName || !itemDescription || !dateLost || !timeRange || !location) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    const lostItem = await LostItem.create({
      itemName,
      itemDescription,
      dateLost,
      timeRange,
      location,
      userName: req.user.fullName, // auto from login
      userEmail: req.user.email,   // auto from login
      itemCategory,
      identificationMark
    });

    res.status(201).json({ message: "Lost item reported successfully", lostItem });
  } catch (error) {
    console.error("Lost Item Error:", error); 
    res.status(500).json({
      message: "Failed to report lost item",
      error: error.message 
    });
  }
};

// Get all lost items
exports.getLostItems = async (req, res) => {
  try {
    const items = await LostItem.find().sort({ createdAt: -1 }); // newest first
    res.json({ items });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch lost items", error: error.message });
  }
};

exports.deleteLostItem = async (req, res) => {
  try {
    // Check if the user making the request is an admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const { id } = req.params;

    const deletedItem = await LostItem.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Lost item not found" });
    }

    res.json({ message: "Lost item deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete lost item",
      error: error.message,
    });
  }
};

