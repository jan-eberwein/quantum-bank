const express = require('express');
const { getTransactionsByAccount } = require('../controllers/transactionController');

const router = express.Router();

router.get('/accounts/:accountId', getTransactionsByAccount);

module.exports = router;
