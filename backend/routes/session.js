const express = require('express');
const isAuthenticated = require('../middleware/authenticator');
const router = express.Router();

router.get('/authenticate', isAuthenticated, (req, res) => {
	if (req.session.user){
		res.json({ message: "User info retrieved", user: req.session.user });
	}
	else{
		res.status(404).json({ message: "User either logged off or unfound"})
	}
});

router.get('/user-info', (req, res) => {
	if (req.session.user) {
		res.json({
			id: req.session.user.user_id,
			username: req.session.user.username,
			firstname: req.session.user.firstname, 
			lastname: req.session.user.lastname,   
			email: req.session.user.email
		});
	}
	else{
		res.status(401).json({ message: "Unauthorized"})
	}
})

module.exports = router;
