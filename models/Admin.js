'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    static associate(models) {
      Admin.belongsTo(models.Role, {
        foreignKey: 'roleId',
        as: 'role',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  Admin.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    roleId: {
      field: 'role_id',
      type: DataTypes.INTEGER,
      reference: {
        model: 'Role',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    username: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(100),
      uniquie: true,
    },
    phoneNumber: {
      field: "phone_number",
      type: DataTypes.STRING(15),
      allowNull: false,

    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updatedAt: {
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
      modelName: 'Admin',
      tableName: 'admin',
    });
  return Admin;
};