const express = require('express');
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const matchController = require('../controllers/matchController');

router.post('/match', auth.protect, matchController.matchItems);

module.exports = router;
