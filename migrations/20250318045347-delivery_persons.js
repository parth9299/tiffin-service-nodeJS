'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
        await queryInterface.createTable('delivery_person',{
           id:{
            type:Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
           },
           name:{
             type:Sequelize.STRING(20),
             allowNull: false,
           },
           contactNumber:{
             type:Sequelize.STRING(15),
             allowNull: false,
           },
           vehicleNumber:{
            type:Sequelize.STRING(20),
            allowNull: true,  // optional 
           },
           createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          updatedAt: {
            type: Sequelize.DATE,
            allowNull: true,
          },
          createdBy:{
            type:Sequelize.INTEGER,
            allowNull:false,
         },
         updatedBy:{
            type:Sequelize.INTEGER,
            allowNull:true,
         },

        })
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.dropTable('delivery_person');
  }
};

