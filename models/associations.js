const db = require('./index'); 

const { Music, Artist, Playlist, Album, Genre, User } = db;

// associações entre os modelos
if (Music && Artist) {
  Music.belongsToMany(Artist, { through: 'MusicArtists' }); // Muitos-para-muitos
  Artist.belongsToMany(Music, { through: 'MusicArtists' }); // Muitos-para-muitos
}

if (Music && Playlist) {
  Music.belongsToMany(Playlist, { through: 'PlaylistMusics' }); // Muitos-para-muitos
  Playlist.belongsToMany(Music, { through: 'PlaylistMusics' }); // Muitos-para-muitos
}

if (Music && Album) {
  Music.belongsTo(Album); // Uma música pertence a um álbum
  Album.hasMany(Music); // Um álbum possui muitas músicas
}

if (Music && Genre) {
  Music.belongsTo(Genre); // Uma música pertence a um gênero
  Genre.hasMany(Music); // Um gênero possui muitas músicas
}

if (Playlist && User) {
  Playlist.belongsTo(User); // Uma playlist pertence a um usuário
  User.hasMany(Playlist); // Um usuário pode ter várias playlists
}

module.exports = db;
