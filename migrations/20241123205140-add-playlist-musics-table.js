'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     // Verifica se a tabela já existe
     const tableExists = await queryInterface.describeTable('PlaylistMusics').catch(() => null);

     if (!tableExists) {
       // Cria a tabela apenas se ela não existir
       await queryInterface.createTable('PlaylistMusics', {
         id: {
           type: Sequelize.INTEGER,
           autoIncrement: true,
           primaryKey: true,
         },
         PlaylistId: {
           type: Sequelize.INTEGER,
           allowNull: false,
           references: {
             model: 'Playlists',
             key: 'id',
           },
           onDelete: 'CASCADE',
           onUpdate: 'CASCADE',
         },
         MusicId: {
           type: Sequelize.INTEGER,
           allowNull: false,
           references: {
             model: 'Music',
             key: 'id',
           },
           onDelete: 'CASCADE',
           onUpdate: 'CASCADE',
         },
         createdAt: {
           type: Sequelize.DATE,
           allowNull: false,
           defaultValue: Sequelize.fn('NOW'),
         },
         updatedAt: {
           type: Sequelize.DATE,
           allowNull: false,
           defaultValue: Sequelize.fn('NOW'),
         },
       });
     }
  },

  async down (queryInterface, Sequelize) {
    // Remove a tabela caso seja necessário desfazer a migração
    await queryInterface.dropTable('PlaylistMusics');
  }
};
