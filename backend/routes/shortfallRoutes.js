const express = require('express');
const router = express.Router();
const { getShortfallAnalysis } = require('../controllers/shortfallController');

router.get('/', getShortfallAnalysis);

module.exports = router;
