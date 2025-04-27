'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable('subscription_management', {
         id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            alowNull: false,
         },
         planname: {
            type: Sequelize.STRING(100),
            allowNull: false,
         },
         plandescription: {
            type: Sequelize.STRING(250),
            allowNull: true,
         },
         plantype: {
            type: Sequelize.ENUM('Basic', 'Standard', 'Premium', 'Family'),
            allowNull: false,
         },
         price: {
            type: Sequelize.INTEGER,
            allowNull: false,
         },
         meals_per_day: {
            type: Sequelize.INTEGER,
            alowNull: false,
         },
         createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
         },
         updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
         },
         createdBy:{
            type:Sequelize.INTEGER,
            allowNull:false,
         },
         updatedBy:{
            type:Sequelize.INTEGER,
            allowNull:false,
         }
      })
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable('subscription_management');
   }
};
