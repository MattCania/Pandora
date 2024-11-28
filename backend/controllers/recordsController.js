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
				},
				{
					model: Permissions,
					as: "userAccess",
				},
			],
		});

		res.status(200).json(records);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server Error", error: err.message });
	}
};

const getSingleRecord = async (req, res) => {
	const recordId = req.params.recordId
	console.log(recordId)

	try {
		const results = await TransactionRecords.findOne({
			where: {recordId: recordId}
		})

		if (!results) throw new Error("Result Unfound")

		res.status(200).json(results);
		
	} catch (err) {
		
		console.error(err);
		res.status(500).json({ message: "Server Error", error: err.message });
	}


}

const createRecord = async (req, res) => {
	const userId = req.session.userId;
	const { recordType, recordName } = req.body;

	try {
		const results = await TransactionRecords.create({
			creatorId: userId,
			recordType: recordType,
			recordName: recordName,
			createdAt: new Date(),
			updatedAt: new Date() 
		});
		if (!results) throw new Error("Record Creation Failure")

		const newRecordId = results.recordId

		const response = await RecordPermissions.create({
			recordId: newRecordId,
			permittedUser: userId,
			accessLevel: 1
		})

		if (!response) throw new Error("Record Creation Failure")

		res.status(200).json({message: "Successful Record Creation", results})
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server Error", error: err.message });
	}
};

const updateRecord = async (req, res) => {
	const { recordType, recordName } = req.body;
	const recordId = req.params.recordId

	try {
		const results = await TransactionRecords.update(
			{
			recordType: recordType,
			recordName: recordName,
			updatedAt: new Date() 
			},{
				where:{recordId:recordId},
			}
		);

		if (!results) throw new Error("Record Update Failure")

		res.status(200).json({message: "Successful Record Changes", results})
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server Error", error: err.message });
	}
}

const deleteRecord = async (req, res) => {
	const recordId = req.params.recordId
	const userId = req.session.userId;

	try {
		const results = await TransactionRecords.destroy({
			where: {recordId: recordId}
		})

		if (!results) throw new Error("Record Deletion Failure")

		// const response = await RecordPermissions.destroy({
		// 	where: {
		// 		recordId: recordId,
		// 		userId: userId
		// 	}
		// })
		
		// if (!response) throw new Error("Record Deletion Failure")

		res.status(200).json({message: "Successful Record Deletion", results})
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server Error", error: error.message });
	}



}

module.exports = {
	getRecords,
	createRecord,
	updateRecord,
	getSingleRecord,
	deleteRecord
};
