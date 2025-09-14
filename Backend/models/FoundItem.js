const mongoose = require("mongoose");

const FoundItemSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  itemDescription: { type: String, required: true },
  placeFound: { type: String, required: true },
  timeFound: { type: String, required: true },
  dateFound: { type: Date, required: true },
  userName: { type: String, required: true }, // auto from login
  userEmail: { type: String, required: true },
  image: { type: String, required: true }, // auto from login
}, { timestamps: true });

module.exports = mongoose.model("FoundItem", FoundItemSchema);
