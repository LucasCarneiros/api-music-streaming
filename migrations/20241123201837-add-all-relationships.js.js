'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

       // Alteração na tabela 'Albums'
       await queryInterface.addColumn('Albums', 'artistId', {
        type: Sequelize.INTEGER,
        references: {
          model: 'Artists',  // Tabela referenciada
          key: 'id',         // Coluna de referência
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });

       // Alteração na tabela 'Playlists'
    await queryInterface.addColumn('Playlists', 'UserId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

     // Add albumid na tabela 'Music'
     await queryInterface.addColumn('Music', 'AlbumId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Albums',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

     // Alteração na tabela 'Music'
     await queryInterface.addColumn('Music', 'GenreId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Genres',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

  },

  async down (queryInterface, Sequelize) {
     // Reverter a alteração na tabela 'Albums'
     await queryInterface.removeColumn('Albums', 'artistId');

     // Reverter a alteração na tabela 'Playlists'
     await queryInterface.removeColumn('Playlists', 'UserId');
 
     // Reverter a alteração na tabela 'Musics'
     await queryInterface.removeColumn('Music', 'AlbumId');

      // Reverter a alteração na tabela 'Musics'
      await queryInterface.removeColumn('Music', 'GenreId');
  }
};
