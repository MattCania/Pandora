const express = require('express')
const router = express.Router()

router.post('/logout', (req, res) => {
	
	req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to log out' });
        }
        res.clearCookie('connect.sid'); // Optional: clear the session cookie
        res.status(200).json({ message: 'Successfully logged out' });
    });

})

module.exports = router