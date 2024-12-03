'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      
    await queryInterface.bulkInsert("Roles", [
      {
        roleName: 'Admin'
      },
      {
        roleName: 'Owner'
      },
      {
        roleName: 'Editor'
      },
      {
        roleName: 'Viewer'
      },
    ])
    await queryInterface.bulkInsert("UserRoles", [
      {
        roleId: 1,
        userId: 1
      },
      {
        roleId: 2,
        userId: 2
      },
    ])
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("UserRoles", null, {})
    await queryInterface.bulkDelete("Roles", null, {})
		await queryInterface.sequelize.query('ALTER TABLE UserRoles AUTO_INCREMENT = 1')
		await queryInterface.sequelize.query('ALTER TABLE Roles AUTO_INCREMENT = 1')
  }
};