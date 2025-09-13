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


