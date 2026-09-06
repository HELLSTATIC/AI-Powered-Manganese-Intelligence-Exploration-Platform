const express = require('express');
const router = express.Router();
const { getAllMines, getMineById, createMine } = require('../controllers/mineController');

router.get('/', getAllMines);
router.get('/:id', getMineById);
router.post('/', createMine);

module.exports = router;
