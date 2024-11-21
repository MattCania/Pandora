const bcrypt = require('bcrypt')
const { UserAccounts, Admins } = require("../models");

const authRecovery = async (req, res) => {
	const { email } = req.body;

	try {
		const user = await UserAccounts.findOne({
			where: {
				email: email,
			},
		});

		if (!user) {
			throw new Error("Invalid Request");
		}

		res.status(200).json({message: "Successful Email Confirmation", redirectUrl: `/user/account-recovery?email=${encodeURIComponent(email)}`})
		
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}

}

const handleRecovery = async (req, res) => {
	const { email, password, confirmpassword} = req.body
	const salt = await bcrypt.genSalt(10)

	if (password !== confirmpassword) return res.status(401).json({message: "Password Mismatch"})

	try{
		const user = await UserAccounts.findOne({
			where: {
				email: email
			}
		})

		if (!user) {
			throw new Error("Invalid Credentials");
		}

		const hashedPassword = await bcrypt.hash(password, salt)

		await UserAccounts.update(
			{
				securedPassword: hashedPassword,
			},
			{
				where: {
					email: email
				}
			}
		)

		await Admins.update(
			{
				password: password
			},
			{
				where: {
					email: email
				}
			}
		)

		res.status(200).json({message: "Successfully Changed Password"})
	}
	catch (err){
		console.log(err)
		return res.status(500).json({message: err.message})
	}

}

module.exports = {
	handleRecovery,
	authRecovery
}