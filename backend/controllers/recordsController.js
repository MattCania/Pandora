const {
	RecordPermissions,
	TransactionRecords,
	UserProfile,
} = require("../models");

const getRecords = async (req, res) => {
	const username = req.params.user;

	try{
		const results = await RecordPermissions.findAll({
			attributes: [],
			include: [
				{
				model: UserProfile,
				attributes: ["username"],
				required: false,
				where: {
					username: username,
				},
			},
			{
				model: TransactionRecords,
				attributes: ["recordName"],
				required: false,
			},
		],
		raw: true,
	});

	res.status(200).json({message: "Successfully Fetch Transactions", results})

	} 
	catch (err){
		console.err(err)
		res.status(500).json({message: "Server Error", error: err.message})
	}	
	
};

module.exports = {
	getRecords,
};
