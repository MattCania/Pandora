"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert("TransactionRecords", [
			{
				creatorId: 1,
				recordType: "Expenses",
				recordName: "General Expenses",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				creatorId: 2,
				recordType: "Purchases",
				recordName: "General Purchases",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);

		await queryInterface.bulkInsert("RecordPermissions", [
			{
				recordId: 1,
				permittedUser: 1,
				accessLevel: 1,
			},
			{
				recordId: 1,
				permittedUser: 2,
				accessLevel: 2,
			},
			{
				recordId: 2,
				permittedUser: 1,
				accessLevel: 2,
			},
			{
				recordId: 2,
				permittedUser: 2,
				accessLevel: 1,
			},
		]);

		await queryInterface.bulkInsert("Expenses", [
			{
				expenseId: 1,
				orderNumber: "ORD001",
				account: "Expenses",
				category: "Expense",
				paymentType: "Credit Card",
				transactionDate: new Date("2024-01-01 10:00:00"),
				description: "Office supplies purchase",
				amount: 150,
				credit: 0,
				debit: 0,
				currency: "USD",
				vendorCustomer: "Office Supplies Inc.",
				invoiceNumber: "INV001",
				tax: 15,
				balance: 135,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);

		await queryInterface.bulkInsert("Purchases", [
			{
				purchaseId: 2,
				orderNumber: "ORD004",
				account: "Liabilities",
				category: "Liability",
				paymentType: "Check",
				transactionDate: new Date("2024-02-10 15:00:00"),
				description: "Loan payment",
				amount: 500,
				credit: 0,
				debit: 0,
				currency: "USD",
				vendorCustomer: "Bank XYZ",
				invoiceNumber: "INV004",
				tax: 50,
				balance: 450,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Expenses", null, {});
		await queryInterface.bulkDelete("Purchases", null, {});
		await queryInterface.bulkDelete("TransactionRecords", null, {});
		await queryInterface.bulkDelete("RecordPermissions", null, {});
		await queryInterface.sequelize.query(
			"ALTER TABLE Expenses AUTO_INCREMENT = 1"
		);
		await queryInterface.sequelize.query(
			"ALTER TABLE Purchases AUTO_INCREMENT = 1"
		);
		await queryInterface.sequelize.query(
			"ALTER TABLE TransactionRecords AUTO_INCREMENT = 1"
		);
		await queryInterface.sequelize.query(
			"ALTER TABLE RecordPermissions AUTO_INCREMENT = 1"
		);
	},
};
