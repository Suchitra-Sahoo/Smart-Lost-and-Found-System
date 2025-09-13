const mongoose = require("mongoose");

const LostItemSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  itemDescription: { type: String, required: true },
  dateLost: { type: Date, required: true },
  timeRange: { type: String, required: true },
  location: { type: String, required: true },
  userName: { type: String, required: true }, // auto from login
  userEmail: { type: String, required: true }, // auto from login
  itemCategory: { type: String },
  identificationMark: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("LostItem", LostItemSchema);
