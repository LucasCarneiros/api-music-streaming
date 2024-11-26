const express = require('express');
const router = express.Router();

//rotas específicas de cada modelo
const albumRoutes = require('./albumRoutes');
const artistRoutes = require('./artistRoutes');
const musicRoutes = require('./musicRoutes');
const playlistRoutes = require('./playlistRoutes');
const userRoutes = require('./userRoutes');
const genreRoutes = require('./genreRoutes');

// Integra as rotas ao arquivo principal
router.use('/albums', albumRoutes);
router.use('/artists', artistRoutes);
router.use('/music', musicRoutes);
router.use('/playlists', playlistRoutes);
router.use('/users', userRoutes);
router.use('/genres', genreRoutes);


module.exports = router;
