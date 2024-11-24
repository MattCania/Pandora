const express = require('express')
const router = express.Router()

const transactionController = require('../controllers/transactionController')

router.get('/get-purchases/:id', transactionController.getPurchases)
router.get('/get-expenses/:id', transactionController.getExpenses)

module.exports = {
	router
}