const express = require('express')
const router = express.Router()
const isAuthenticated = require("../middleware/authenticator");

router.get('/logout', (req, res) => {
	
	req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to log out' });
        }
        res.clearCookie('connect.sid'); // Optional: clear the session cookie
        res.status(200).json({ message: 'Successfully logged out' });
    });
})

router.get('/user-info', isAuthenticated, (req, res) => {
    res.json(req.session)
})

module.exports = router