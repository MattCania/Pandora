const { UserAccounts, UserProfiles } = require("../models");

const getUserDetails = async (req, res) =>{
	const userId = req.session.userId

	try {
		const user = await UserAccounts.findOne({
			where: { userId: userId },
		});

		if (!user) throw new Error("Error Account Details");

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

const updateProfile = async (req, res) => {
	const profileId = req.session.userId
	const {
		userName, contactNumber,
		secondaryEmail, country,
		jobTitle, organization,
		department, street,
		city, state,
		postal, birthday,
		gender
	} = req.body

	try {
		const response = await UserProfiles.update({
			where: {
				profileId: profileId
			},
			userName: userName,
			contactNumber: contactNumber || null,
			secondaryEmail: secondaryEmail || null,
			country: country || null,
			jobTitle: jobTitle || null,
			organization: organization || null,
			department: department || null,
			street: street || null,
			city: city || null,
			state: state || null,
			postal: postal || null,
			birthday: birthday || null,
			gender: gender || null,
		})

		if (!response.ok) throw new Error("Error Updating Profile")

		res.status(500).json({message: "Successfully Updated Profile"})
	} catch (err) {
		return res.status(500).json({ message: "Server Error", error: err.message });
	}

}

module.exports = {
	getUserDetails,
	updateProfile
}