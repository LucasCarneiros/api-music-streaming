'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Renomear colunas na tabela Music
    await queryInterface.renameColumn('Music', 'albumId', 'AlbumId');
    await queryInterface.renameColumn('Music', 'genreId', 'GenreId');

    // Renomear coluna na tabela Playlists
    await queryInterface.renameColumn('Playlists', 'userId', 'UserId');
  },

  async down (queryInterface, Sequelize) {
     // Reverter mudanças (renomear de volta)
     await queryInterface.renameColumn('Music', 'AlbumId', 'albumId');
     await queryInterface.renameColumn('Music', 'GenreId', 'genreId');
     await queryInterface.renameColumn('Playlists', 'UserId', 'userId');
  }
};
