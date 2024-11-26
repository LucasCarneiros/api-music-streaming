require('dotenv').config();

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_URL);

sequelize
  .authenticate()
  .then(() => {
    console.log('Conexão bem-sucedida!');
  })
  .catch((err) => {
    console.error('Erro ao conectar:', err);
  });

