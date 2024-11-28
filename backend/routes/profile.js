const express = require('express')
const router = express.Router()

const profileController = require('../controllers/profileController')

router.get('/user-details', profileController.getUserDetails)

module.exports = router
