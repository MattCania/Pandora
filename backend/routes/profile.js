const express = require('express')
const router = express.Router()
const isAuthenticated = require('../middleware/authenticator')

const profileController = require('../controllers/profileController')

router.get('/user-details', isAuthenticated, profileController.getUserDetails)

module.exports = router
