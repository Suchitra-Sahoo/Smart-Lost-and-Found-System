const FoundItem = require("../models/FoundItem");

// Report a found item
exports.reportFoundItem = async (req, res) => {
  try {
    const {
      itemName,
      itemDescription,
      placeFound,
      timeFound,
      dateFound
    } = req.body;

    // Validate required fields
    if (!itemName || !itemDescription || !placeFound || !timeFound || !dateFound) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    const foundItem = await FoundItem.create({
      itemName,
      itemDescription,
      placeFound,
      timeFound,
      dateFound,
      userName: req.user.fullName, // auto from login
      userEmail: req.user.email    // auto from login
    });

    res.status(201).json({ message: "Found item reported successfully", foundItem });
  } catch (error) {
    console.error("Found Item Error:", error); // log full error
    res.status(500).json({
      message: "Failed to report found item",
      error: error.message // show exact issue
    });
  }
};

