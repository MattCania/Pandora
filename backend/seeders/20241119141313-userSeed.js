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
			// Additional users
			{
				firstName: "Jane",
				lastName: "Doe",
				middleName: "Marie",
				suffix: null,
				email: "jane.doe@example.com",
				securedPassword: await bcrypt.hash("password123", salt),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				firstName: "John",
				lastName: "Smith",
				middleName: "Andrew",
				suffix: null,
				email: "john.smith@example.com",
				securedPassword: await bcrypt.hash("securePass456", salt),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				firstName: "Alice",
				lastName: "Johnson",
				middleName: "Emily",
				suffix: null,
				email: "alice.johnson@example.com",
				securedPassword: await bcrypt.hash("aliceSecure", salt),
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
				secondaryEmail: "caniamatthew24@gmail.com",
				jobTitle: "Head",
				organization: "Matt Books",
				department: "Main Department",
				street: "crispulo st",
				city: "caloocan",
				state: "metro Manila",
				postal: "1400",
				birthday: "2005-07-24",
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
				birthday: "2005-01-18",
				gender: "Male",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
				{
					profileId: 3, // Replace with Jane's actual userId
					userName: "JaneDoe",
					contactNumber: null,
					secondaryEmail: "jane.doe.secondary@example.com",
					jobTitle: "Designer",
					organization: "Doe Designs",
					department: "Creative",
					street: "Main Street",
					city: "Springfield",
					state: "IL",
					postal: "62704",
					birthday: "1995-05-14",
					gender: "Female",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					profileId: 4, // Replace with John's actual userId
					userName: "JohnSmith",
					contactNumber: "09012345678",
					secondaryEmail: "john.smith.secondary@example.com",
					jobTitle: "Developer",
					organization: "Tech Solutions",
					department: "Development",
					street: "Elm Street",
					city: "Metropolis",
					state: "NY",
					postal: "10001",
					birthday: "1990-08-21",
					gender: "Male",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					profileId: 5, // Replace with Alice's actual userId
					userName: "AliceJohnson",
					contactNumber: "09098765432",
					secondaryEmail: "alice.johnson.secondary@example.com",
					jobTitle: "Manager",
					organization: "Johnson Enterprises",
					department: "Operations",
					street: "Market Street",
					city: "Los Angeles",
					state: "CA",
					postal: "90001",
					birthday: "1988-03-12",
					gender: "Female",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			
		]);
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Admins", null, {});
		await queryInterface.bulkDelete("UserProfiles", null, {});
		await queryInterface.bulkDelete("UserAccounts", null, {});
		await queryInterface.sequelize.query('ALTER TABLE UserAccounts AUTO_INCREMENT = 1')
		await queryInterface.sequelize.query('ALTER TABLE UserProfiles AUTO_INCREMENT = 1')
		await queryInterface.sequelize.query('ALTER TABLE Admins AUTO_INCREMENT = 1')
	},
};
