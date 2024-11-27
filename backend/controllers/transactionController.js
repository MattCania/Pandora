const { RecordPermissions, TransactionRecords, UserProfiles, Permissions, Expenses, Purchases, Sequelize } = require("../models");
const { Op } = require('sequelize');

const getTransactions = async (req, res) => {
	const recordType = req.params;
	const userId = req.session.userId;

	try {
		const transaction = await Expenses.findAll({
			include: [
				{
					model: TransactionRecords,
					as: "expenseRecord",
					attributes: ["recordName"],
					where: {
						recordType: recordType
					}
				},
				{
					model: RecordPermissions,
					as: "transactionPermission",
					attributes: ["accessLevel"],
					where: {
						permittedUser: userId,
						accessLevel: {
							[Sequelize.Op.gte]: 1
						}
					}
				},
			],
		});

		if (transaction.length === 0) throw new Error("User Unauthorized")

		res.status(200).json(transaction);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server Error", error: err.message });
	}
};

const createTransaction = async (req, res) => {
	const userId = req.session.userId;
}

const updateTransaction = async (req, res) => {
	const userId = req.session.userId;
}

module.exports = {
	getTransactions,
	createTransaction,
	updateTransaction
};
