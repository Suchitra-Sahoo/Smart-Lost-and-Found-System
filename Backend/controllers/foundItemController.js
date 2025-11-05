const FoundItem = require("../models/FoundItem");

// Report a found item
exports.reportFoundItem = async (req, res) => {
  try {
    const { itemName, itemDescription, placeFound, timeFound, dateFound, category } = req.body;

    if (!itemName || !itemDescription || !placeFound || !timeFound || !dateFound || !category) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image is mandatory" });
    }

    const foundItem = await FoundItem.create({
      itemName,
      itemDescription,
      placeFound,
      timeFound,
      dateFound,
      category,
      userName: req.user.fullName,
      userEmail: req.user.email,
      image: req.file.path,
    });

    res.status(201).json({ message: "Found item reported successfully", foundItem });
  } catch (error) {
    console.error("Found Item Error:", error);
    res.status(500).json({
      message: "Failed to report found item",
      error: error.message
    });
  }
};


exports.getFoundItems = async (req, res) => {
  try {
    const items = await FoundItem.find().sort({ createdAt: -1 });
    res.json({ items });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch found items", error: error.message });
  }
};

exports.deleteFoundItem = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const { id } = req.params;
    const deletedItem = await FoundItem.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Found item not found" });
    }

    res.json({ message: "Found item deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete found item",
      error: error.message,
    });
  }
};