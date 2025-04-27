'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('admin',{
      id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      role_id:{
        type:Sequelize.INTEGER,
        reference:{
          model:'Role',
          key:'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      username:{
        type:Sequelize.STRING(100),
        allowNull:false,
      },
      password:{
        type:Sequelize.STRING(100),
        allowNull: true,
      },
      email:{
        type:Sequelize.STRING(100),
        uniquie: true,
      },
      phone_number:{
        type:Sequelize.STRING(15),
        allowNull:false,

      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true, 
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      createdBy:{
        type:Sequelize.STRING(50),
        allowNull:true,
      },
      updatedBy:{
        type:Sequelize.STRING(50),
        allowNull:true,
      },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('admin');
  }
};
