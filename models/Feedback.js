'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Feedback extends Model {

    static associate(models) {
       Feedback.belongsTo(models.User,{
        foreignKey:'user_id',
         onDelete: 'CASCADE', 
         onUpdate: 'CASCADE'
       });
       Feedback.belongsTo(models.Order,{
        foreignKey:'order_id',
         onDelete: 'CASCADE', 
         onUpdate: 'CASCADE'
       });
    }
  }
  Feedback.init({

    id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true,
      allowNull:false,
   },
   ratings:{
     type:DataTypes.INTEGER,
     validate:{
       min:1,
       max:10,
     },
   },
   feedback_text:{
     type:DataTypes.TEXT,
     allowNull:true,
   },
   isActive: {
     type: DataTypes.BOOLEAN,
     allowNull: false,
     defaultValue: true, 
   },
   createdAt: {
     type: DataTypes.DATE,
     allowNull: false,
   },
   updatedAt: {
     type: DataTypes.DATE,
     allowNull: false,
   },
  },
  
  {
    sequelize,
    modelName: 'Feedback',
    tableName:'feedback',
  });
  return Feedback;
};