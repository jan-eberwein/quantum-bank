const express = require('express');
const { getAllCategories } = require('../controllers/categoryController');

const router = express.Router();

// Endpoint to get all transaction categories
router.get('/', getAllCategories);

module.exports = router;
