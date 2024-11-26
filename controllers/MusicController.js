const { Music, Artist, Album, Playlist, Genre } = require('../models');

module.exports = {
  // Criar uma nova música
  async create(req, res) {
    try {
      const music = await Music.create(req.body); 
      return res.status(201).json(music); 
    } catch (error) {
      return res.status(400).json({ error: error.message }); 
    }
  },

  // Listar todas as músicas
  async getAll(req, res,{}) {
    try {
      
      const musics = await Music.findAll(); 
      return res.status(200).json(musics); 
    } catch (error) {
      return res.status(400).json({ error: error.message }); 
    }
  },

   
   async getById(req, res) {
    try {
      const { id } = req.params;
      const { include } = req.query;  
      const includes = include ? include.split(',') : [];
  
      const music = await Music.findByPk(id, {
        include: [
          // Incluir artista  GET /musics/:id?include=artist
          includes.includes('artist') && {
            model: Artist,
            attributes: ['id', 'nome'],
          },
          // Incluir álbum GET /musics/:id?include=artist,album
          includes.includes('album') && {
            model: Album,
            attributes: ['id', 'nome', 'dataLancamento'],
          },
           
          includes.includes('genre') && {
            model: Genre,
            attributes: ['id', 'nome'],
          },
        ].filter(Boolean),  
      });
  
      if (!music) {
        return res.status(404).json({ message: 'Música não encontrada' });
      }
      
      res.status(200).json(music);  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao buscar Música' });
    }
  }, 

  // Atualizar uma música pelo id
  async update(req, res) {
    try {
      const music = await Music.findByPk(req.params.id); 
      if (!music) {
        return res.status(404).json({ error: 'Música não encontrada' }); 
      }
      await music.update(req.body); 
      return res.status(200).json(music); 
    } catch (error) {
      return res.status(400).json({ error: error.message }); 
    }
  },

  // Deletar uma música pelo id
  async delete(req, res) {
    try {
      const music = await Music.findByPk(req.params.id); 
      if (!music) {
        return res.status(404).json({ error: 'Música não encontrada' }); 
      }
      await music.destroy(); 
      res.status(200).json({ message: 'Música deletado com sucesso' });
      return;
    } catch (error) {
      return res.status(400).json({ error: error.message }); 
    }
  },

 // Relacionar música a um álbum
async addToAlbum(req, res) {
  try {
    const { musicId, albumId } = req.params;

    // Busca a música pelo ID
    const music = await Music.findByPk(musicId);
    if (!music) {
      return res.status(404).json({ error: 'Música não encontrada' });
    }

    // Busca o álbum pelo ID
    const album = await Album.findByPk(albumId);
    if (!album) {
      return res.status(404).json({ error: 'Álbum não encontrado' });
    }

    // Atualiza diretamente a chave estrangeira albumId em Music
    music.albumId = albumId;
    await music.save();

    return res.status(200).json({ message: 'Música atribuída ao álbum com sucesso!' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao atribuir música ao álbum', details: error.message });
  }
},

  // Relacionar música a uma playlist
  async addToPlaylist(req, res) {
    try {
      const music = await Music.findByPk(req.params.musicId); 

      const playlist = await Playlist.findByPk(req.params.playlistId); 

      if (!music || !playlist) {
        return res.status(404).json({ error: 'Música ou Playlist não encontrada' }); 
      }

      await playlist.addMusic(music); 

      return res.status(200).json({ message: 'Música adicionada à playlist' }); 
    } catch (error) {
      return res.status(400).json({ error: error.message }); 
    }
  },

    // Método para associar uma música a um gênero
    async addGenre(req, res) {
      try {
        const { musicId, genreId } = req.params;
  
        const music = await Music.findByPk(musicId);
        if (!music) {
          return res.status(404).json({ message: 'Música não encontrada' });
        }
  
        const genre = await Genre.findByPk(genreId);
        if (!genre) {
          return res.status(404).json({ message: 'Gênero não encontrado' });
        }
  
        await music.setGenre(genre);
        res.status(200).json({ message: 'Gênero associado à música com sucesso', music, genre });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao associar gênero à música' });
      }
    },
  
    // Método para associar uma música a um artista
    async addArtist(req, res) {
      try {
        const { musicId, artistId } = req.params;
  
        const music = await Music.findByPk(musicId);
        if (!music) {
          return res.status(404).json({ message: 'Música não encontrada' });
        }
  
        const artist = await Artist.findByPk(artistId);
        if (!artist) {
          return res.status(404).json({ message: 'Artista não encontrado' });
        }
  
        await music.addArtist(artist);
        res.status(200).json({ message: 'Artista associado à música com sucesso', music, artist });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao associar artista à música' });
      }
    }
};


