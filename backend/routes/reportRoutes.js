const express = require('express');
const router = express.Router();
const { getReports, generateReport } = require('../controllers/reportController');
const { protect } = require('../middleware/auth');

router.get('/', getReports);
router.post('/', protect, generateReport);

module.exports = router;
