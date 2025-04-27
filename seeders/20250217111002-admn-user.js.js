'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash('Riya@1109', 10); // You can set your own password

    await queryInterface.bulkInsert('Admin', [{
      role_id:1,
      username:"Admin",
      password: hashedPassword,
      email: 'riya@yopmail.com',
      phone_number: '9427353885',
      isActive: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: 1,
      updatedBy: 1,
    }]);
  },

  async down (queryInterface, Sequelize) {
    
  }
};
