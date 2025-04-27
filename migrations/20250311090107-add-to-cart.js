'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
       await queryInterface.createTable('cart',{
          id:{
            type:Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
          },
          user_id:{
            type:Sequelize.INTEGER,
            reference:{
              model:'user',
              key:'id'
            },
            onUpdate: 'CASCADE',
            onDelete:'CASCADE',
          },
          tiffin_id:{
            type:Sequelize.INTEGER,
            reference:{
              model:'tiffin',
              key:'id',
            },
            onUpdate:'CASCADE',
            onDelete:'CASCADE',
          },
          quantity:{
             type:Sequelize.INTEGER,
             allowNull:false,
          },
          price:{
            type:Sequelize.INTEGER,
            allowNull: false,
          },
          totalPrice:{
             type:Sequelize.INTEGER,
             allowNull: false,
          },
          createdAt: {
            type:Sequelize.DATE,
            allowNull: false,
          },
          updatedAt: {
            type:Sequelize.DATE,
            allowNull: false,
          },
       });
  },

  async down (queryInterface, Sequelize) {
       await queryInterface.dropTable('cart')
  }
};
