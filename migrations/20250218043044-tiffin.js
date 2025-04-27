'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
       await queryInterface.createTable('tiffin',{
          id:{
             type:Sequelize.INTEGER,
             primaryKey:true,
             autoIncrement:true,
             allowNull:false,
          },
          tiffinName:{
            type:Sequelize.STRING(100),
            allowNull:false,
          },
          tiffinType:{
            type:Sequelize.ENUM('Breakfast','Lunch','Dinner'),
            allowNull:false,
          },
          tiffinSize:{
            type:Sequelize.ENUM('Small','Medium','Large'),
            allowNull:false,
          },
          price:{
            type:Sequelize.INTEGER,
            allowNull:false,
          },
          availabilityStatus:{
            type:Sequelize.ENUM('In Stock','Out of Stock'),
            allowNull:false,
          },
          description:{
            type:Sequelize.STRING(200),
            allowNull:true,
          },
          imageURL:{
            type:Sequelize.STRING(255),
            allowNull:false,
          },
          isActive: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true, 
          },
          createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
       })
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.dropTable('tiffin')
  }
};
