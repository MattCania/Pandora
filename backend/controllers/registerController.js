const { where } = require('sequelize');
const { UserAccounts, UserProfiles, Admins } = require('../models');
const e = require('express');

// Thing got zero validations, more on models fix tho
const handleRegister = async (req, res) => {
  const { 	firstname, lastname,
			middlename, suffix,
			email, password,
			confirmpassword, username,
			contact, secondaryemail,
			jobtitle, organization,
			department, street,
			city, state,
			postal, birthday, 
			gender 
		} = req.body;
  
	if (password !== confirmpassword) return res.status(401).json({message: "Password & Confirm Password Mismatch"})
	
	try {
		await UserAccounts.create({
			firstName: firstname,
			lastName: lastname,
			middleName: middlename || null,
			suffix: suffix || null,
			email: email,
			securedPassword: password,
			createdAt: null,
			updatedAt: null
		})
	} catch (error) {
		console.error(error)
		return res.status(500).json({message: 'Server Error'})
	}

	const newAccount = await UserAccounts.findOne({ 
		where: {
			email: email
		}
	});

	try {
		if (!newAccount) {
			return res.status(500).json({ message: "Failed to retrieve newly created user." });
		}

		const newAccountId = newAccount.userId
	
		await UserProfiles.create({
			profileId: newAccountId,
			userName: username,
			contactNumber: contact,
			secondaryEmail: secondaryemail || null,
			jobTitle: jobtitle || null,
			organization: organization || null,
			department: department || null,
			street: street || null,
			city: city || null,
			state: state || null,
			postal: postal || null,
			birthday: birthday || null,
			gender: gender || null,
			createdAt: null,
			updatedAt: null
		})

		await Admins.create({
			accountId: newAccountId,
			email: email,
			password: password,
		})

		return res.status(200).json({message : "Successful Registration"})
	} catch (error) {
		console.error(error)
		return res.status(500).json({message: 'Server Error'})
	}
	
};


module.exports = {
  handleRegister,
};
