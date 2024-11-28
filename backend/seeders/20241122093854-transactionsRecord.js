"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert("TransactionRecords", [
			{
				creatorId: 1,
				recordType: "Expenses",
				recordName: "Office Supplies",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				creatorId: 2,
				recordType: "Purchases",
				recordName: "Hardware Purchases",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				creatorId: 3,
				recordType: "Expenses",
				recordName: "Travel Expenses",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				creatorId: 4,
				recordType: "Purchases",
				recordName: "Software Licenses",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);

		await queryInterface.bulkInsert("RecordPermissions", [
			{ recordId: 1, permittedUser: 1, accessLevel: 1 },
			{ recordId: 1, permittedUser: 3, accessLevel: 2 },
			{ recordId: 2, permittedUser: 2, accessLevel: 1 },
			{ recordId: 2, permittedUser: 4, accessLevel: 2 },
			{ recordId: 3, permittedUser: 1, accessLevel: 2 },
			{ recordId: 3, permittedUser: 2, accessLevel: 1 },
			{ recordId: 4, permittedUser: 3, accessLevel: 1 },
			{ recordId: 4, permittedUser: 4, accessLevel: 2 },
		]);

		// Insert Expenses
		const expenses = [];
		for (let i = 1; i <= 4; i++) {
			expenses.push({
				expenseId: i,
				orderNumber: `ORD${i.toString().padStart(3, "0")}`,
				account: "Expenses",
				category: i % 2 === 0 ? "Travel" : "Office",
				paymentType: i % 3 === 0 ? "Credit Card" : "Cash",
				transactionDate: new Date(`2024-0${(i % 12) + 1}-01 10:00:00`),
				description: `Expense Description ${i}`,
				amount: Math.floor(Math.random() * 1000 + 100),
				credit: 0,
				debit: 0,
				currency: "USD",
				vendorCustomer: `Vendor ${i}`,
				invoiceNumber: `INV${i.toString().padStart(3, "0")}`,
				tax: Math.floor(Math.random() * 100),
				balance: Math.floor(Math.random() * 1000),
				createdAt: new Date(),
				updatedAt: new Date(),
			});
		}
		await queryInterface.bulkInsert("Expenses", expenses);

		// Insert Purchases
		const purchases = [];
		for (let i = 1; i <= 4; i++) {
			purchases.push({
				purchaseId: i,
				orderNumber: `ORD${(i + 20).toString().padStart(3, "0")}`,
				account: "Liabilities",
				category: i % 2 === 0 ? "Software" : "Hardware",
				paymentType: i % 3 === 0 ? "Bank Transfer" : "Check",
				transactionDate: new Date(`2024-0${(i % 12) + 1}-10 15:00:00`),
				description: `Purchase Description ${i}`,
				amount: Math.floor(Math.random() * 2000 + 200),
				credit: 0,
				debit: 0,
				currency: "USD",
				vendorCustomer: `Customer ${i}`,
				invoiceNumber: `INV${(i + 20).toString().padStart(3, "0")}`,
				tax: Math.floor(Math.random() * 150),
				balance: Math.floor(Math.random() * 2000),
				createdAt: new Date(),
				updatedAt: new Date(),
			});
		}
		await queryInterface.bulkInsert("Purchases", purchases);

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
