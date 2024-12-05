const { UserAccounts, UserProfiles } = require('../models') 
const iaAuthernticated = require('../middleware/authenticator')

const getAccounts = async (req, res) => {
	
	try{
		const accounts = await UserProfiles.findAll({
			attributes: ['profileId', 'userName']
		})
		if (!accounts) res.status(500).json({message: 'Error Database Fetching'})
	
		res.status(200).json(accounts)
	
	}
	catch(err){
		console.error(`Server Error ${err}`)
		res.status(500).json({message: "Server Error: ", error: err.message})
	}

}

module.exports = {
	getAccounts
}