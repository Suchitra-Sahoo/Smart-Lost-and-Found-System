const mongoose = require("mongoose");

const MatchSchema = new mongoose.Schema({
  lostItemId: { type: mongoose.Schema.Types.ObjectId, ref: "LostItem", required: true },
  foundItemId: { type: mongoose.Schema.Types.ObjectId, ref: "FoundItem", required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Match", MatchSchema);
