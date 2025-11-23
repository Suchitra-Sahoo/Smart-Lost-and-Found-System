const express = require("express");
const { matchWithCLIP } = require("../controllers/clipController");

const router = express.Router();

router.post("/match", matchWithCLIP);

module.exports = router;
