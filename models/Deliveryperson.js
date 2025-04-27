'use strict';
const {Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Deliveryperson extends Model {

        static associate(models) {
        }
    }
    Deliveryperson.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        contactNumber: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },
        vehicleNumber: {
            type: DataTypes.STRING(20),
            allowNull: true, // optional
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        createdBy: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        updatedBy: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
        {
            sequelize,
            modelName: 'Deliveryperson',
            tableName: 'delivery_person',
        });
    return Deliveryperson;
};
