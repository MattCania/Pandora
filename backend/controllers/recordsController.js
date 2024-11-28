const { RecordPermissions, TransactionRecords, UserProfiles, Permissions } = require("../models");

const getRecords = async (req, res) => {
	const userId = await req.params.user;
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
					as: "transactionPermission",
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
	const { creatorId, recordType, recordName, creationDate } = req.body;

	try {
		const results = await TransactionRecords.create({
			creatorId: creatorId || userId,
			recordType: recordType,
			recordName: recordName,
			createdAt: creationDate || new DATE(),
			updatedAt: new Date() 
		});
		if (!results) throw new Error("Record Creation Failure")

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
			updatedAt: new DATE() 
		});

		if (!results) throw new Error("Record Update Failure")

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
