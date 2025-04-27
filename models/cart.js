'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      Cart.belongsTo(models.User,{
        foreignKey:'user_id',
        onDelete:'CASCADE',
        onUpdate:'CASCADE',
      });
      Cart.belongsTo(models.Tiffin,{
        foreignKey:'tiffin_id',
        onDelete:'CASCADE',
        onUpdate:'CASCADE',
      });
    }
  }
  Cart.init({
     id:{
       type:DataTypes.INTEGER,
       primaryKey: true,
       autoIncrement: true,
       allowNull: false
     },
     quantity:{
      type:DataTypes.INTEGER,
      allowNull: false,
     },
     price:{
      type:DataTypes.INTEGER,
      allowNull: false,
     },
     price:{
      type:DataTypes.INTEGER,
      allowNull: false,
     },
     totalPrice:{
      type:DataTypes.INTEGER,
      allowNull:false,
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
    modelName: 'Cart',
    tableName:'cart'
  });
  return Cart;
};