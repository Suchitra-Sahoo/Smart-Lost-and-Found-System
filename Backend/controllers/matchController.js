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

exports.claimMatch = async (req, res) => {
  try {
    const matchId = req.params.matchId;

    const match = await Match.findById(matchId);
    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    }

    // Only the owner of the lost item can claim
    const lostItem = await LostItem.findById(match.lostItemId);
    if (!lostItem) {
      return res.status(404).json({ message: "Lost item not found" });
    }

    if (lostItem.userEmail !== req.user.email) {
      return res.status(403).json({ message: "You cannot claim this item" });
    }

    // Prevent double claim
    if (match.status === "claimed") {
      return res.status(400).json({ message: "This match has already been claimed" });
    }

    // Prevent claim if already rejected
    if (match.status === "rejected") {
      return res.status(400).json({ message: "This match was already rejected. No actions allowed." });
    }

    // Valid pending match → mark as claimed
    match.status = "claimed";
    await match.save();

    // Notify admin 
    await Notification.create({
      userEmail: "admin",
      title: "Item Claimed",
      message: `User ${req.user.email} has claimed their matched item.`,
      data: { matchId, lostItemId: match.lostItemId, foundItemId: match.foundItemId }
    });

    return res.json({ 
      message: "Item successfully claimed", 
      match 
    });

  } catch (error) {
    console.error("ClaimMatch Error:", error);
    return res.status(500).json({ 
      message: "Failed to claim item", 
      error: error.message 
    });
  }
};



exports.rejectMatch = async (req, res) => {
  try {
    const matchId = req.params.matchId;

    const match = await Match.findById(matchId);
    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    }

    // Only the owner of the lost item can reject
    const lostItem = await LostItem.findById(match.lostItemId);
    if (lostItem.userEmail !== req.user.email) {
      return res.status(403).json({ message: "You cannot reject this match" });
    }

    if (match.status !== "pending") {
      return res.status(400).json({ message: "This match is already processed" });
    }

    match.status = "rejected";
    await match.save();

    // Notify admins
    await Notification.create({
      userEmail: "admin",
      title: "Match Rejected",
      message: `User ${req.user.email} has rejected the match.`,
      data: { matchId, lostItemId: match.lostItemId, foundItemId: match.foundItemId }
    });

    res.json({ message: "Match rejected successfully", match });

  } catch (error) {
    res.status(500).json({ message: "Failed to reject match", error: error.message });
  }
};
