'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('subscription_details', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        reference: {
          model: 'user',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      endDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      subscriptionPlanId: {
        type: Sequelize.INTEGER,
        unique: true,
        allowNull: false,
      },
      subscriptionStatus: {
        type: Sequelize.ENUM('Pending', 'Active', 'Paused', 'Cancelled', 'Expired'),
        defaultValue: 'Pending',
      },
      paymentStatus: {
        type: Sequelize.ENUM('Paid', 'Unpaid'),
        defaultValue: 'Unpaid',
      },
      totalAmount: {
        type: Sequelize.INTEGER,
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
        type:Sequelize.STRING(50),
        allowNull:false,
      },
      updatedBy:{
        type:Sequelize.STRING(50),
        allowNull:true,
      },
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('subscription_details');
  }
};
