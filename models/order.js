'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      Order.belongsTo(models.Tiffin, {
        foreignKey: 'tiffin_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  Order.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    // userId:{
    //   field:'user_id',
    //   type:DataTypes.INTEGER,
    // },
    // tiffinId:{
    //   field:'tiffin_id',
    //   type:DataTypes.INTEGER,
    // },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      field:'orderDate',
      type: DataTypes.DATE,
      defaultValue :sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false,
    },
    updatedAt:{
      type: DataTypes.DATE,
      defaultValue :sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: true,
    },
    orderStatus: {
      type: DataTypes.ENUM('Pending', 'Completed', 'Cancelled'),
      defaultValue: 'Pending',
      allowNull: false,
    },
    paymentStatus: {
      type: DataTypes.ENUM('Paid', 'Unpaid'),
      defaultValue: 'Unpaid',
      allowNull: false,
    },
    deliveryDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    createdBy: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    updatedBy: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },

  },

    {
      sequelize,
      modelName: 'Order',
      tableName: 'order'
    });
  return Order;
};