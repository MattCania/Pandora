const express = require('express')
const router = express.Router()

const accountController = require('../controllers/accountsController')

router.get('/get-profiles', accountController.getAccounts)

module.exports = router