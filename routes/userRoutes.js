const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

console.log('User Controller:', UserController);  //mostra o objeto com suas funções

// CRUD de Usuários
router.post('/', UserController.create);
router.get('/', UserController.getAll);
router.get('/:id', UserController.getById);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.delete);

// Relacionar Usuário a Playlist
router.post('/:userId/playlist/:playlistId', UserController.addPlaylist);

module.exports = router;
