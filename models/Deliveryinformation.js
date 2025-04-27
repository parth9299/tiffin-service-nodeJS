
'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Deliveryinformation extends Model {
        static associate(models) {
            Deliveryinformation.belongsTo(models.Order, {
                foreignKey: 'order_id',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            });
            Deliveryinformation.belongsTo(models.User, {
                foreignKey: 'user_id',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            });
            Deliveryinformation.belongsTo(models.Deliveryperson, {
                foreignKey: 'delivery_person_id',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            });
        }
    }

    Deliveryinformation.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            deliveryAddress: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            deliveryDate: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            deliveryStatus: {
                type: DataTypes.ENUM('Pending', 'Out for Delivery', 'Delivered'),
                defaultValue: 'Pending',
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
            modelName: 'Deliveryinformation',
            tableName: 'delivery_information',
        }
    );

    return Deliveryinformation;
};
