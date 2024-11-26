module.exports = (sequelize, DataTypes) => {
  const Music = sequelize.define('Music', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'titulo',
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'duracao',
    },
    albumId: {
      type: DataTypes.INTEGER,
      field: 'AlbumId' 
    },
    genreId: {
      type: DataTypes.INTEGER,
      field: 'GenreId' 
    },

  });

  
  Music.prototype.toJSON = function () {
    const values = { ...this.get() }; 

    delete values.AlbumId;
    delete values.GenreId;

    return values;
  };

  Music.associate = (models) => {

    Music.belongsToMany(models.Artist, { through: 'MusicArtists', 
    foreignKey: 'MusicId',    // Chave estrangeira na tabela intermediária que faz referência à música
    otherKey: 'ArtistId',     // Chave estrangeira na tabela intermediária que faz referência ao artista
    onDelete: 'CASCADE',      
    });

    Music.belongsToMany(models.Playlist, { 
      through: 'PlaylistMusics',
      foreignKey: 'MusicId',     // Chave estrangeira na tabela intermediária que faz referência à música
      otherKey: 'PlaylistId',    // Chave estrangeira na tabela intermediária que faz referência à playlist
      onDelete: 'CASCADE',       
     });

    Music.belongsTo(models.Album,{
      foreignKey: 'AlbumId',    // Chave estrangeira que faz referência ao álbum na tabela Music
      onDelete: 'CASCADE',      
      onUpdate: 'CASCADE',      
    });

    Music.belongsTo(models.Genre,{
      foreignKey: 'GenreId', // Definindo a chave estrangeira na tabela Music
      onDelete: 'CASCADE',    
      onUpdate: 'CASCADE',    
    });
  };

  return Music;
};


