'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert("Permissions", [
      {
        accessType: 'Admin'
      },
      {
        accessType: 'Owner'
      },
      {
        accessType: 'Editor'
      },
      {
        accessType: 'Viewer'
      }
    ])
    
    
  
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Permissions", null, {})
		await queryInterface.sequelize.query('ALTER TABLE Permissions AUTO_INCREMENT = 1')
  }
};
