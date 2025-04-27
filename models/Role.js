'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {

    
    static associate(models) {
   
    }
  }
  Role.init({
    id:{
      type:DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    rolename:{
      type:DataTypes.STRING(100),
      unique: true,
      allowNull:false,
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
    modelName: 'Role',
    tableName: 'role',
  });
  return Role;
};