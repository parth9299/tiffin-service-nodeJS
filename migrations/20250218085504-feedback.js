'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('feedback',{
        id:{
           type:Sequelize.INTEGER,
           primaryKey:true,
           autoIncrement:true,
           allowNull:false,
        },
        user_id:{
           type:Sequelize.INTEGER,
           reference:{
            model:'user',
            key:'id',
           },
           onUpdate: 'CASCADE',
           onDelete: 'CASCADE',
        },
        order_id:{
          type:Sequelize.INTEGER,
          reference:{
            model:'order',
            key:'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        ratings:{
          type:Sequelize.INTEGER,
          validate:{
            min:1,
            max:10,
          },
        },
        feedback_text:{
          type:Sequelize.TEXT,
          allowNull:true,
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
      await queryInterface.dropTable('feedback');
  }
};
