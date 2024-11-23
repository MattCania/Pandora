const {
	RecordPermissions,
	TransactionRecords,
	UserProfiles,
	Permissions,
} = require("../models");

const getRecords = async (req, res) => {
	const userId = req.params.user;

	try {
		const records = await RecordPermissions.findAll({
			where: { permittedUser: userId },
			include: [
				{
					model: UserProfiles,
					as: "userProfiles",
					attributes: ["userName"],
				},
				{
					model: TransactionRecords,
					as: "transactionId",
					attributes: ["recordName", "recordType"],
				},
				{
					model: Permissions,
					as: "userAccess",
					attributes: ["accessType"],
				},
			],
		});

		res.status(200).json(records);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server Error", error: err.message });
	}
};

const createRecord = async (req, res) => {
	const userId = req.session.userId;
	const { creatorId, recordType, recordName } = req.body;

	try {
		const results = await TransactionRecords.create({
			creatorId: creatorId || userId,
			recordType: recordType,
			recordName: recordName,
			createdAt: createdAt || new DATE(),
			updatedAt: new DATE() 
		});
		if (!results.ok) throw new Error("Record Creation Failure")

		res.status(200).json({message: "Successful Record Creation", results})
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server Error", error: err.message });
	}
};

const updateRecord = async (req, res) => {
	const userId = req.session.userId;
	const { creatorId, recordType, recordName } = req.body;

	try {
		const results = await TransactionRecords.update({
			creatorId: creatorId || userId,
			recordType: recordType,
			recordName: recordName,
			createdAt: createdAt || new DATE(),
			updatedAt: new DATE() 
		});

		if (!results.ok) throw new Error("Record Update Failure")

		res.status(200).json({message: "Successful Record Changes", results})
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server Error", error: err.message });
	}
}

module.exports = {
	getRecords,
	createRecord,
	updateRecord
};
