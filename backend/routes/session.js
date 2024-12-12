const express = require('express')
const router = express.Router()
const isAuthenticated = require("../middleware/authenticator");
const { UserAccounts, UserProfiles } = require("../models");

router.get('/logout', (req, res) => {
	
	req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to log out' });
        }
        res.clearCookie('connect.sid'); // Optional: clear the session cookie
        res.status(200).json({ message: 'Successfully logged out' });
    });
})

router.get('/user-info', isAuthenticated, async (req, res) => {

    const session = req.session

    if (!session) return res.status(401).json({message: "Unauthorized Access"})

	const userId = req.session.userId

	try {
		const user = await UserAccounts.findOne({
			where: { userId: userId },
            attributes:{
                exclude: ['securedPassword', 'email', 'createdAt', 'updatedAt']
            }
		});

		if (!user) {
			throw new Error("Error User Details");
		}

		const profile = await UserProfiles.findOne({
			where:{ profileId: userId },
            attributes:{
                exclude: ['createdAt', 'updatedAt']
            }
		})

		if (!profile) throw new Error("Error User Profile")
			
		console.log(profile)
		
		return res.status(200).json({ message: "Fetched User Details", session, user, profile});
	} catch (err) {
		req.session.destroy();
		return res.status(500).json({ message: "Server Error", error: err.message });
	}
})

module.exports = router