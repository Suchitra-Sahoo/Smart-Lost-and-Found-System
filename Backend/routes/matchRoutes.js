const express = require('express');
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const matchController = require('../controllers/matchController');

router.post('/match', auth.protect, matchController.matchItems);
router.post('/match/:matchId/claim', auth.protect, matchController.claimMatch);
router.post('/match/:matchId/reject', auth.protect, matchController.rejectMatch);


module.exports = router;
