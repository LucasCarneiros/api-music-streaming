module.exports = (sequelize, DataTypes) => {
  const Playlist = sequelize.define('Playlist', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'nome',
    },
    description: {
      type: DataTypes.TEXT,
      field: 'descricao',
    },
    userId: {
      type: DataTypes.INTEGER,
      field: 'UserId'
    },
  });

  // Sobrescrevendo o método toJSON
  Playlist.prototype.toJSON = function () {
    const values = { ...this.get() }; 
    
    delete values.UserId;

    return values;
  };

  Playlist.associate = (models) => {
    Playlist.belongsTo(models.User,{
      foreignKey: 'UserId', // Chave estrangeira que faz referência ao usuário
      onDelete: 'CASCADE',       
      onUpdate: 'CASCADE',       
    });

    Playlist.belongsToMany(models.Music, { through: 'PlaylistMusics',
      foreignKey: 'PlaylistId',  // Chave estrangeira na tabela intermediária que faz referência à playlist
      otherKey: 'MusicId',      // Chave estrangeira na tabela intermediária que faz referência à música
      onDelete: 'CASCADE',
     });
  };

  return Playlist;
};

