const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('tiffin_service', 'root', 'root', {
    host: process.env.DB_HOST,
    dialect: 'mysql',
});

sequelize.authenticate().then(() => {
    console.log('Database Connected Successfully');
})
    .catch((err) => {
        console.log('Unable to connect to the server', err);
    });

module.exports = sequelize;