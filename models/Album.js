module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define('Album', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'nome',
    },
    releaseDate: {
      type: DataTypes.DATE,
      field: 'dataLancamento',
    },
  });

  Album.associate = (models) => {
      Album.belongsTo(models.Artist, {         foreignKey: 'artistId',
      onDelete: 'CASCADE',   
      onUpdate: 'CASCADE',   
    });
    Album.hasMany(models.Music, {
      foreignKey: 'albumId', 
      onDelete: 'CASCADE',   
      onUpdate: 'CASCADE',
    });
  };

  return Album;
};

