"use strict";

const bcrypt = require("bcrypt");
const { UserAccounts } = require("../models");


/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const salt = await bcrypt.genSalt(10);
		const mattPass = await bcrypt.hash("matthewgab24", salt);
		const royPass = await bcrypt.hash("josephroy123", salt);

		await queryInterface.bulkInsert("UserAccounts", [
			{
				firstName: "Matthew Gabriel",
				lastName: "Cania",
				middleName: "Menor",
				suffix: null,
				email: "matthewgab24@gmail.com",
				securedPassword: mattPass,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				firstName: "Joseph Roy",
				lastName: "Laganzo",
				middleName: "Largo",
				suffix: null,
				email: "josephroy@gmail.com",
				securedPassword: royPass,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);

		const matt = await UserAccounts.findOne({
			where: { firstName: "Matthew Gabriel" },
		});
		const roy = await UserAccounts.findOne({
			where: { firstName: "Joseph Roy" },
		});

		const mattEmail = matt.email;
		const royEmail = roy.email;
		const mattId = matt.userId;
		const royId = roy.userId;

		await queryInterface.bulkInsert("Admins", [
			{
				accountId: mattId,
				email: mattEmail,
				password: "matthewgab24",
			},
			{
				accountId: royId,
				email: royEmail,
				password: 'josephroy123',
			},
		]);

		await queryInterface.bulkInsert("UserProfiles", [
			{
				profileId: mattId,
				userName: "MattCania",
				contactNumber: "09108273132",
				secondaryEmail: null,
				jobTitle: null,
				organization: null,
				department: null,
				street: null,
				city: null,
				state: null,
				postal: null,
				birthday: "2005-07-24 12:30:00",
				gender: "Male",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				profileId: royId,
				userName: "Patatas",
				contactNumber: "091234567891",
				secondaryEmail: null,
				jobTitle: null,
				organization: null,
				department: null,
				street: null,
				city: null,
				state: null,
				postal: null,
				birthday: "2005-01-18 12:30:00",
				gender: "Male",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("UserAccounts", null, {});
		await queryInterface.bulkDelete("Admins", null, {});
		await queryInterface.bulkDelete("UserProfiles", null, {});
		await queryInterface.sequelize.query('ALTER TABLE UserAccounts AUTO_INCREMENT = 1')
		await queryInterface.sequelize.query('ALTER TABLE UserProfiles AUTO_INCREMENT = 1')
		await queryInterface.sequelize.query('ALTER TABLE Admins AUTO_INCREMENT = 1')
	},
};
