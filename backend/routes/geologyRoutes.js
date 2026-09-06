const express = require('express');
const router = express.Router();
const { getGeologicalRegions } = require('../controllers/geologyController');

router.get('/', getGeologicalRegions);

module.exports = router;
