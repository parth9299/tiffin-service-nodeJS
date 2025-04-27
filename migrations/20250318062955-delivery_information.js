'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.createTable('delivery_information',{
        id:{
          type:Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        order_id:{
          type:Sequelize.INTEGER,
          reference:{
            model: 'order',
            key:'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
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
        delivery_person_id:{
          type:Sequelize.INTEGER,
          reference:{
            model:'delivery_person',
            key:'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        deliveryAddress:{
          type:Sequelize.STRING(100),
          allowNull:false,
        },
        deliveryDate:{
          type:Sequelize.DATE,
          allowNull: false,
        },
        deliveryStatus:{
          type:Sequelize.ENUM('Pending','Out for Delivery','Delivered'),
          defaultValue: 'Pending',
          allowNull: false,
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
        await queryInterface.dropTable('delivery_information');
  }
};
