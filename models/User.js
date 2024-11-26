module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'nome',
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Playlist, {
      foreignKey: 'userId',      // Chave estrangeira que faz referência ao usuário
      onDelete: 'CASCADE',       
      onUpdate: 'CASCADE',       
    });
  };

  return User;
};


