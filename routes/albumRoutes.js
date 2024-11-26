const express = require('express');
const router = express.Router();
const AlbumController = require('../controllers/AlbumController');

console.log('Album Controller:', AlbumController);  //mostra o objeto com suas funções

// CRUD de Álbuns
router.post('/', AlbumController.create);
router.get('/', AlbumController.getAll);
router.get('/:id', AlbumController.getById);
router.put('/:id', AlbumController.update);
router.delete('/:id', AlbumController.delete);

// Relacionar Álbum a Artista
router.post('/:albumId/artist/:artistId', AlbumController.addArtist);


module.exports = router;
