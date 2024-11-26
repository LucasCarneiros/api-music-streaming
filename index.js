require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Inicializando modelos e associações
const db = require('./models');
require('./models/associations'); 

const app = express();

app.use(cors());
app.use(bodyParser.json());

const mainRoutes = require('./routes/mainRoutes'); 
app.use('/api', mainRoutes); // Prefixo '/api' para todas as rotas

// Sincronizar banco de dados
db.sequelize.sync().then(() => {
  console.log('Banco de dados sincronizado');
}).catch((error) => {
  console.error('Erro ao sincronizar banco de dados:', error);
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});


