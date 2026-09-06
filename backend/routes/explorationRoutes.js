const express = require('express');
const router = express.Router();
const { getExplorationZones, getRecommendations } = require('../controllers/explorationController');

router.get('/zones', getExplorationZones);
router.get('/recommendations', getRecommendations);

module.exports = router;
