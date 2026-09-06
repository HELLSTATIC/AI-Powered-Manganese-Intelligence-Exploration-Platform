const express = require('express');
const router = express.Router();
const { predictPotential, predictReserve, predictFullAnalysis } = require('../controllers/mlController');

router.post('/predict-potential', predictPotential);
router.post('/predict-reserve', predictReserve);
router.post('/full-analysis', predictFullAnalysis);

module.exports = router;
