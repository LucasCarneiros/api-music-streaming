const express = require('express');
const router = express.Router();
const PlaylistController = require('../controllers/PlaylistController');

console.log('Playlist Controller:', PlaylistController);  //mostra o objeto com suas funções

// CRUD de Playlists
router.post('/', PlaylistController.create);
router.get('/', PlaylistController.getAll);
router.get('/:id', PlaylistController.getById);
router.put('/:id', PlaylistController.update);
router.delete('/:id', PlaylistController.delete);

// Relacionar Playlist a Música
router.post('/:playlistId/music/:musicId', PlaylistController.addMusic);

// Relacionar Playlist a Usuário
router.post('/:playlistId/user/:userId', PlaylistController.addUser);

module.exports = router;
