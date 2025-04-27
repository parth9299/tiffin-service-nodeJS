'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubscriptionDetails extends Model {
   
    static associate(models) {
      SubscriptionDetails.belongsTo(models.User,{
        foreignKey:'user_id',
          onDelete: 'CASCADE', 
          onUpdate: 'CASCADE'
      });
    }
  }
  SubscriptionDetails.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    subscriptionPlanId: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
    },
    subscriptionStatus: {
      type: DataTypes.ENUM('Pending', 'Active', 'Paused', 'Cancelled', 'Expired'),
      defaultValue: 'Pending',
    },
    paymentStatus: {
      type: DataTypes.ENUM('Paid', 'Unpaid'),
      defaultValue: 'Unpaid',
    },
    totalAmount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    createdBy:{
      type:DataTypes.STRING(50),
      allowNull:false,
    },
    updatedBy:{
      type:DataTypes.STRING(50),
      allowNull:true,
    },
  }, 
  
  {
    sequelize,
    modelName: 'SubscriptionDetails',
    tableName:'subscription_details',
  });
  return SubscriptionDetails;
};