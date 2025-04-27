'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('order', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            user_id: {
                type: Sequelize.INTEGER,
                reference: {
                    model: 'user',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            tiffin_id: {
                type: Sequelize.INTEGER,
                reference: {
                    model: 'tiffin',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            quantity: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            address: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            totalPrice: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            orderDate: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            orderStatus: {
                type: Sequelize.ENUM('Pending', 'Completed', 'Cancelled'),
                defaultValue: 'Pending',
                allowNull: false,
            },
            paymentStatus: {
                type: Sequelize.ENUM('Paid', 'Unpaid'),
                defaultValue: 'Unpaid',
                allowNull: false,
            },
            deliveryDate: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            createdBy: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            updatedBy: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
        })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('order')
    }
};
