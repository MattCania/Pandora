const express = require('express')
const router = express.Router()

const transactionController = require('../controllers/transactionController')

router.get('/get-purchases/:recordId', transactionController.getPurchases)
router.get('/get-expenses/:recordId', transactionController.getExpenses)
router.post('/create-transactions', transactionController.createTransaction)
router.post('/update-transactions/:transaction/:transactionId', transactionController.updateTransaction)
router.post('/delete-transactions/:transaction/:transactionId', transactionController.deleteTransaction)

module.exports = router
