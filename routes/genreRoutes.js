const express = require('express');
const router = express.Router();
const GenreController = require('../controllers/GenreController');

console.log('Genre Controller:', GenreController);  //mostra o objeto com suas funções

// CRUD de Gêneros
router.post('/', GenreController.create);
router.get('/', GenreController.getAll);
router.get('/:id', GenreController.getById);
router.put('/:id', GenreController.update);
router.delete('/:id', GenreController.delete);

// Relacionar Gênero a Música
router.post('/:genreId/music/:musicId', GenreController.addMusic);

module.exports = router;
