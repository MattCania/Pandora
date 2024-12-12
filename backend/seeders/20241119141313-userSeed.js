"use strict";

const bcrypt = require("bcrypt");
const { UserAccounts } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const salt = await bcrypt.genSalt(10);
    const mattPass = await bcrypt.hash("matthewgab24", salt);
    const royPass = await bcrypt.hash("josephroy123", salt);

    console.log("seeding accounts");
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

    console.log("seeding ADMINS");
    await queryInterface.bulkInsert("Admins", [
      {
        accountId: mattId,
        email: mattEmail,
        password: "matthewgab24",
      },
      {
        accountId: royId,
        email: royEmail,
        password: "josephroy123",
      },
    ]);

    console.log("seeding Profiles");
    await queryInterface.bulkInsert("UserProfiles", [
      {
        profileId: mattId,
        userName: "MattCania",
        contactNumber: "09108273132",
        secondaryEmail: "caniamatthew24@gmail.com",
        currency: "PHP",
        organization: "Matt Books",
        city: "caloocan",
        state: "metro Manila",
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
        currency: "PHP",
        organization: "MattBooks",
        city: null,
        state: null,
        birthday: "2005-01-18",
        gender: "Male",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    console.log("seeding Wallets");
    await queryInterface.bulkInsert("UserWallets", [
      {
        userId: mattId,
        income: 30000,
        recurrance: "Monthly",
        wallet: 30000,
      },
      {
        userId: royId,
        income: 50000,
        recurrance: "Semi-Monthly",
        wallet: 50000,
      },
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Admins", null, {});
    await queryInterface.bulkDelete("UserProfiles", null, {});
    await queryInterface.bulkDelete("UserAccounts", null, {});
    await queryInterface.sequelize.query(
      "ALTER TABLE UserAccounts AUTO_INCREMENT = 1"
    );
    await queryInterface.sequelize.query(
      "ALTER TABLE UserProfiles AUTO_INCREMENT = 1"
    );
    await queryInterface.sequelize.query(
      "ALTER TABLE Admins AUTO_INCREMENT = 1"
    );
  },
};
