const express = require('express');
const router = express.Router();
const MusicController = require('../controllers/MusicController');

console.log('Music Controller:', MusicController);  //mostra o objeto com suas funções

// CRUD de Músicas
router.post('/', MusicController.create);
router.get('/', MusicController.getAll);
router.get('/:id', MusicController.getById);
router.put('/:id', MusicController.update);
router.delete('/:id', MusicController.delete);

// Relacionar Música a Artista
router.post('/:musicId/artist/:artistId',(req, res, next) => {
    console.log('Endpoint /:musicId/artist/:artistId foi chamado');
    next(); // Passa para o controlador
  }, MusicController.addArtist);

// Relacionar Música a Gênero
router.post('/:musicId/genre/:genreId', MusicController.addGenre);

// Relacionar Música a Playlist
router.post('/:musicId/playlist/:playlistId', MusicController.addToPlaylist);

// Relacionar Música a Álbum
router.post('/:musicId/album/:albumId', MusicController.addToAlbum);

module.exports = router;
