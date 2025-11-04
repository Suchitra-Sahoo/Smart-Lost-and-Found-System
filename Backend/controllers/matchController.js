const Match = require("../models/Match");
const LostItem = require("../models/LostItem");
const FoundItem = require("../models/FoundItem");
const Notification = require("../models/Notification");

exports.matchItems = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const { lostItemId, foundItemId } = req.body;
    if (!lostItemId || !foundItemId) {
      return res.status(400).json({ message: "lostItemId and foundItemId are required" });
    }

    const lost = await LostItem.findById(lostItemId);
    const found = await FoundItem.findById(foundItemId);

    if (!lost || !found) {
      return res.status(404).json({ message: "Lost or Found item not found" });
    }

    // Save match
    const match = await Match.create({
      lostItemId,
      foundItemId,
    });

    // Send notification to the lost item owner
    await Notification.create({
      userEmail: lost.userEmail,
      title: "A found item may match your lost item",
      message: `Admin has matched a found item with your lost item "${lost.itemName}".`,
      data: { lostItemId, foundItemId, matchId: match._id }
    });

    res.json({
      message: "Items matched & user notified",
      match
    });

  } catch (error) {
    console.error("Match Error:", error);
    res.status(500).json({
      message: "Failed to match items",
      error: error.message
    });
  }
};
