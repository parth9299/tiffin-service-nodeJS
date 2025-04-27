'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubscriptionManagement extends Model {

    static associate(models) {
  
    }
  }
  SubscriptionManagement.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      alowNull: false,
   },
   planname: {
      type: DataTypes.STRING(100),
      allowNull: false,
   },
   plandescription: {
      type: DataTypes.STRING(250),
      allowNull: true,
   },
   plantype: {
      type: DataTypes.ENUM('Basic', 'Standard', 'Premium', 'Family'),
      allowNull: false,
   },
   price: {
      type: DataTypes.INTEGER,
      allowNull: false,
   },
   meals_per_day: {
      type: DataTypes.INTEGER,
      allowNull: false,
   },  createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      
   },
   updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      
   },
   createdBy:{
      type:DataTypes.INTEGER,
      allowNull:false,
   },
   updatedBy:{
      type:DataTypes.INTEGER,
      allowNull:true,
   }
  },
  
  {
    sequelize,
    modelName: 'SubscriptionManagement',
    tableName: 'subscription_management',
  });
  return SubscriptionManagement;
};