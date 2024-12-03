const bcrypt = require("bcrypt");	// For comparing hashed and unhashed password
const { UserAccounts, UserProfiles } = require("../models");

const handleLogin = async (req, res) => {
	const { email, password } = req.body;

	try {
		const account = await UserAccounts.findOne({
			where: { email: email },
		});

		if (!account) res.status(401).json({message: "Account does not exist"})
		
		const userId = account.userId
		const hashedPassword = account.securedPassword;
		
		const isMatch = await bcrypt.compare(password, hashedPassword);

    	if (!isMatch) res.status(401).json({message: "Password does not match"});

		const profile = await UserProfiles.findOne({
			where:{ profileId: userId }
		})

		if (!profile) throw new Error("Database Profile Error");

		req.session.userId = account.userId;
		req.session.email = account.email;
		req.session.username = profile.userName;
		
		return res.status(200).json({ message: "Successful Log In" });
	} catch (err) {
		req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ message: "Error destroying session", error: err.message });
            }
            return res.status(500).json({ message: "Server Error", error: err.message });
        });
	}
};

module.exports = {
	handleLogin,
};
