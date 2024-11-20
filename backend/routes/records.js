const express = require('express')
const router = express.Router()

const recordsController = require('../controllers/recordsController')

router.get('/records', recordsController.getRecords)
router.get('/purchases/:id', recordsController.getPurchases)
router.get('/expenses/:id', recordsController.getExpenses)
	
module.exports = router