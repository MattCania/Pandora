const express = require('express')
const router = express.Router()

const recoveryController = require('../controllers/recoveryController')

router.post('/account-confirmation', recoveryController.authRecovery)
router.post('/recover-email/:email', recoveryController.handleRecovery)

module.exports = router