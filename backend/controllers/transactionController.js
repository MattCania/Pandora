const { RecordPermissions, TransactionRecords, UserProfiles, Permissions, Expenses, Purchases, Sequelize } = require("../models");
const { Op } = require('sequelize');

const getExpenses = async (req, res) => {
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

const getPurchases = async (req, res) => {
	const recordType = req.params;
	const userId = req.session.userId;

	try {
		const transaction = await Purchases.findAll({
			include: [
				{
					model: TransactionRecords,
					as: "purchaseRecord",
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

const deleteTransaction = async (req, res) => {
	const { transaction } = req.params.transaction
	const { transactionId } = req.params.transactionId



}

module.exports = {
	getExpenses,
	getPurchases,
	createTransaction,
	updateTransaction,
	deleteTransaction
};
