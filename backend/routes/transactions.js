const express = require('express')
const cron = require("node-cron");
const router = express.Router();
const { Expenses, Purchases } = require("../models");

const transactionController = require('../controllers/transactionController')

router.get('/get-purchases/:recordId', transactionController.getPurchases)
router.get('/get-expenses/:recordId', transactionController.getExpenses)
router.get('/get-expenseTransaction/:transactionId', transactionController.getExpenseTransaction)
router.get('/get-purchaseTransaction/:transactionId', transactionController.getPurchaseTransaction)
router.post('/create-expense/:recordId', transactionController.createExpenses)
router.post('/create-purchase/:recordId', transactionController.createPurchases)
router.post('/update-expense/:transactionId', transactionController.updateExpenses)
router.post('/update-purchase/:transactionId', transactionController.updatePurchases)
router.delete('/delete-expense/:transactionId', transactionController.deleteExpenses)
router.delete('/delete-purchase/:transactionId', transactionController.deletePurchases)

module.exports = router
