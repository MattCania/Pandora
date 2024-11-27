const { UserAccounts, UserProfiles } = require("../models");

const getUserDetails = async (req, res) =>{
	const userId = req.session.userId

	if (!userId) return res.status(400).json({message: "No logged in user"})

	try {
		const user = await UserAccounts.findOne({
			where: { userId: userId },
		});

		if (!user) {
			throw new Error("Error User Details");
		}

		const profile = await UserProfiles.findOne({
			where:{ profileId: userId }
		})

		if (!profile) throw new Error("Error User Profile")
		
		return res.status(200).json({ message: "Fetched User Details", user, profile});
	} catch (err) {
		req.session.destroy();
		return res.status(500).json({ message: "Server Error", error: err.message });
	}
}

module.exports = {
	getUserDetails
}