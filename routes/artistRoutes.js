const express = require('express');
const router = express.Router();
const ArtistController = require('../controllers/ArtistController');

console.log('Artist Controller:', ArtistController);  //mostra o objeto com suas funções

// CRUD de Artistas
router.post('/', ArtistController.create);
router.get('/', ArtistController.getAll);
router.get('/:id', ArtistController.getById);
router.put('/:id', ArtistController.update);
router.delete('/:id', ArtistController.delete);

module.exports = router;
