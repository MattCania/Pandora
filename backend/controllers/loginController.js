const bcrypt = require("bcrypt");	// For comparing hashed and unhashed password
const { UserAccounts, UserProfiles } = require("../models");

const handleLogin = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await UserAccounts.findOne({
			where: { email: email },
		});

		if (!user) {
			req.session.destroy();
			throw new Error("Invalid Credentials");
		}
		
		const userId = user.userId
		const hashedPassword = user.securedPassword;
		const isMatch = await bcrypt.compare(password, hashedPassword);

    	if (!isMatch) throw new Error("Invalid Credentials");

		const profile = await UserProfiles.findOne({
			where:{ profileId: userId }
		})

		if (!profile) throw new Error("Error Email Profile")

		req.session.userId = user.userId;
		req.session.email = user.email;
		req.session.username = profile.userName;

		return res.status(200).json({ message: "Successful Log In" });
	} catch (err) {
		req.session.destroy();
		return res.status(500).json({ message: "Server Error", error: err.message });
	}
};


module.exports = {
	handleLogin,
};
