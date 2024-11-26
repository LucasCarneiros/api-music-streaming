const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: 'postgres',
});

const db = {};

fs.readdirSync(__dirname)
  .filter((file) => 
    file !== 'index.js' && 
    file.endsWith('.js') &&
    file !== 'associations.js'
  )
  .forEach((file) => {
    console.log(`Carregando modelo: ${file}`); 
    const modelPath = path.join(__dirname, file);
    const model = require(modelPath);

    if (typeof model !== 'function') {
      console.error(`O arquivo ${file} não exporta uma função!`);
      throw new Error(`Modelo inválido: ${file}`);
    }

    db[model(sequelize, Sequelize.DataTypes).name] = model(sequelize, Sequelize.DataTypes);
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
