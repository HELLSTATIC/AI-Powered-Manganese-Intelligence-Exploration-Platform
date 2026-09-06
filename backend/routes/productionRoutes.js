const express = require('express');
const router = express.Router();
const { getProductionData, getProductionTrends } = require('../controllers/productionController');

router.get('/', getProductionData);
router.get('/trends', getProductionTrends);

module.exports = router;
