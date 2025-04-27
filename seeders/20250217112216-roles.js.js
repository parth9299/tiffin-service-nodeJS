'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('Role', [{
      id:1,
      rolename:"Admin",
      isActive: 1,
      createdAt: new Date(),
      updatedAt: new Date(), 
    },{
      id:2,
      rolename:"Delivery",
      isActive: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);

  },

  async down (queryInterface, Sequelize) {
  
  }
};
