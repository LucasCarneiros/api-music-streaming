module.exports = (sequelize, DataTypes) => {
  const Genre = sequelize.define('Genre', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'nome',
    },
  });

  Genre.associate = (models) => {
    Genre.hasMany(models.Music,{
      foreignKey: 'genreId', 
      onDelete: 'CASCADE',    
      onUpdate: 'CASCADE',  
    });
  };

  return Genre;
};

