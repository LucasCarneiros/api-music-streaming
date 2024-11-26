const { Artist, Album, Music, Genre, Playlist } = require('../models');

module.exports = {
  // Criar um novo artista
  async create(req, res) {
    try {
      const artist = await Artist.create(req.body);  
      return res.status(201).json(artist);  
    } catch (error) {
      return res.status(400).json({ error: error.message });  
    }
  },

  // Listar todos os artistas
  async getAll(req, res) {
    try {
      const artists = await Artist.findAll();  
      return res.status(200).json(artists);  
    } catch (error) {
      return res.status(400).json({ error: error.message });  
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const includeAlbums = req.query.includeAlbums === 'true';  
      const includeMusics = req.query.includeMusics === 'true';
  
      console.log(`Buscando artista com ID: ${id}`);
      console.log(`Incluir álbuns: ${includeAlbums}, Incluir músicas: ${includeMusics}`);
    
      const artist = await Artist.findByPk(id, {
        include: [
          ...(includeAlbums
            ? [{
                model: Album,
                attributes: ['id', 'nome', 'dataLancamento'],
              }]
            : []),
          
          ...(includeMusics
            ? [{
                model: Music, 
                through: { attributes: [] }, 
                attributes: ['id', 'titulo', 'duracao'],
              }]
            : []),
        ],
      });
  
      if (!artist) {
        console.error(`Artista com ID ${id} não encontrado.`);
        return res.status(404).json({ message: 'Artista não encontrado' });
      }
  
      console.log('Dados carregados:', JSON.stringify(artist, null, 2));
      res.status(200).json(artist);
  
    } catch (error) {
      console.error('Erro ao buscar artista:', error);
      res.status(500).json({ message: 'Erro ao buscar artista' });
    }
  },

      //obs:Buscar Artista pelo ID Com Álbuns e Músicas URL: GET /artists/1?includeAlbums=true&includeMusics=true
    

  // Atualizar dados de um artista pelo id
  async update(req, res) {
    try {
      const artist = await Artist.findByPk(req.params.id);  
      if (!artist) {
        return res.status(404).json({ error: 'Artista não encontrado' });  
      }
      await artist.update(req.body);  
      return res.status(200).json(artist);  
    } catch (error) {
      return res.status(400).json({ error: error.message });  
    }
  },

  // Deletar um artista pelo id
  async delete(req, res) {
    try {
      const artist = await Artist.findByPk(req.params.id);  
      if (!artist) {
        return res.status(404).json({ error: 'Artista não encontrado' });  
      }
      await artist.destroy();  
      res.status(200).json({ message: 'Artista deletado com sucesso' });
      return;  
    } catch (error) {
      return res.status(400).json({ error: error.message });  
    }
  },

  // Relacionar artista a um álbum
  async addAlbum(req, res) {
    try {
      const artist = await Artist.findByPk(req.params.artistId);  
      const album = await Album.findByPk(req.params.albumId);  

      if (!artist || !album) {
        return res.status(404).json({ error: 'Artista ou Álbum não encontrado' });  
      }

      await artist.addAlbum(album);  
      return res.status(200).json({ message: 'Álbum adicionado ao artista' });  
    } catch (error) {
      return res.status(400).json({ error: error.message });  
    }
  },

  // Relacionar artista a uma música
  async addMusic(req, res) {
    try {
      const artist = await Artist.findByPk(req.params.artistId);  
      const music = await Music.findByPk(req.params.musicId);  

      if (!artist || !music) {
        return res.status(404).json({ error: 'Artista ou Música não encontrado' });  
      }

      await artist.addMusic(music);  
      return res.status(200).json({ message: 'Música adicionada ao artista' });  
    } catch (error) {
      return res.status(400).json({ error: error.message });  
    }
  }
};


