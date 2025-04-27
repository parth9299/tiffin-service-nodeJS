'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tiffin extends Model {

    static associate(models) {

    }
  }
  Tiffin.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    tiffinName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    tiffinType: {
      type: DataTypes.ENUM('Breakfast', 'Lunch', 'Dinner'),
      allowNull: false,
    },
    tiffinSize: {
      type: DataTypes.ENUM('Small', 'Medium', 'Large'),
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    availabilityStatus: {
      type: DataTypes.ENUM('In Stock', 'Out of Stock'),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    imageURL: {
      type: DataTypes.STRING(255),
      allowNull: false,
      get() {
        const rawValue = this.getDataValue('imageURL');
        return rawValue ? process.env.API_BASEURL + '/' + rawValue : "";
      }
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
      modelName: 'Tiffin',
      tableName:'tiffin'
    });
  return Tiffin;
};