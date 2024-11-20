const express = require('express')
const router = express.Router()

const registerController = require('../controllers/registerController')

router.post('/register', registerController.handleRegister)
router.post('/check-duplicates', registerController.checkDuplicates)

module.exports = router