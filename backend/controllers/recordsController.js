const {
	sequelize,
	RecordPermissions,
	TransactionRecords,
	UserProfiles,
	Permissions,
	UserAccounts,
} = require("../models");
const { Op, Sequelize } = require("sequelize");

const getRecords = async (req, res) => {
	const userId = req.params.user;

	try {

		const records = await RecordPermissions.findAll({
			where: { permittedUser: userId },
			include: [
				{
					model: UserProfiles,
					as: 'userProfiles',
					attributes: ['userName'],
				},
				{
					model: TransactionRecords,
					as: 'transactionId',
					attributes: ['recordName', 'recordType']
				},
				{
					model: Permissions,
					as: 'userAccess',
					attributes: ['accessType']
				}
			]
		})

		const result = records.map(record => record.get({ plain: true }));

		console.log(result)

		res.status(200).json({ message: "Successfully Fetch Transactions", results: result });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server Error", error: err.message });
	}
};

module.exports = {
	getRecords,
};
