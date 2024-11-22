const express =require('express')
const router = express.Router()

const recordsController = require('../controllers/recordsController')

router.get('/get-transactions/:user', recordsController.getRecords);

module.exports = router;