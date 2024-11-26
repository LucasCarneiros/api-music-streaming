module.exports = (sequelize, DataTypes) => {
  const Artist = sequelize.define('Artist', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'nome',
    }
  });

  Artist.associate = (models) => {
    Artist.belongsToMany(models.Music, { 
      through: 'MusicArtists', // Nome da tabela associativa
      foreignKey: 'ArtistId',  // Nome da chave estrangeira na tabela associativa
      otherKey: 'MusicId',     // Chave estrangeira para Music
      onDelete: 'CASCADE',     
    });
    Artist.hasMany(models.Album, {
      foreignKey: 'artistId',
      onDelete: 'CASCADE',    
      onUpdate: 'CASCADE',
    
    });
  };

  return Artist;
};


