require('dotenv').config(); 

console.log('DB_URL:', process.env.DB_URL); 
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: 'postgres',
  logging: console.log, 
});

module.exports = sequelize;
