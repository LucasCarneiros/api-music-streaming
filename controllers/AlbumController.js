const { Album, Artist, Genre, Music } = require('../models');

module.exports = {
  // Criar um novo álbum
  async create(req, res) {
    console.log('Chamando a função createAlbum');
    try {
      const album = await Album.create(req.body);  
      return res.status(201).json(album);  
    } catch (error) {
      return res.status(400).json({ error: error.message });  
    }
  },

  // Listar todos os álbuns
  async getAll(req, res) {
    console.log('Chamando a função listAlbum');  
    try {
      const albums = await Album.findAll();  
      return res.status(200).json(albums);  
    } catch (error) {
      return res.status(400).json({ error: error.message });  
    }
  },

     // Pegar album pelo ID
     async getById(req, res) {
      try {
        const { id } = req.params;
        const includeArtist = req.query.includeArtist === 'true'; // Verifica se deve incluir o artista
        const includeMusics = req.query.includeMusics === 'true'; // Verifica se deve incluir as músicas

        const album = await Album.findByPk(id, {
          include: [
            // Inclui o artista dono do álbum URL: GET /albums/1?includeArtist=true
            ...(includeArtist
              ? [{
                  model: Artist,
                  attributes: ['id', 'nome'], // Atributos que sao retornados do artista
                }]
              : []),
    
            // Inclui as músicas do álbum URL: GET /albums/1?includeMusics=true
            ...(includeMusics
              ? [{
                  model: Music,
                  attributes: ['id', 'titulo', 'duracao'], // Atributos das músicas retornados 
                }]
              : []),
          ],

          /* Buscar Álbum pelo ID Com Artista e Músicas
          URL: GET /albums/1?includeArtist=true&includeMusics=true*/

        });
        if (!album) {
          return res.status(404).json({ message: 'Album não encontrado' });
        }
        res.status(200).json(album);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar Album'});
      }
    },
  

  // Atualizar um álbum pelo id
  async update(req, res) {
    console.log('Chamando a função updateAlbum');
    try {
      const album = await Album.findByPk(req.params.id);  
      if (!album) {
        return res.status(404).json({ error: 'Álbum não encontrado' });  
      }
      await album.update(req.body);  
      return res.status(200).json(album);  
    } catch (error) {
      return res.status(400).json({ error: error.message });  
    }
  },

  // Deletar um álbum pelo id
  async delete(req, res) {
    try {
      const album = await Album.findByPk(req.params.id);  
      if (!album) {
        return res.status(404).json({ error: 'Álbum não encontrado' });  
      }
      await album.destroy();  
      res.status(200).json({ message: 'Album deletado com sucesso' });
      return;  
    } catch (error) {
      return res.status(400).json({ error: error.message });  
    }
  },

  async addArtist(req, res) {
    try {
      const { albumId, artistId } = req.params;
  
      const album = await Album.findByPk(albumId);
      const artist = await Artist.findByPk(artistId);
  
      if (!album || !artist) {
        return res.status(404).json({ message: 'Álbum ou Artista não encontrado' });
      }
  
      // Atualiza a chave estrangeira artistId no álbum
      album.artistId = artistId;
      await album.save();
  
      res.status(200).json({ message: 'Artista associado ao álbum com sucesso', album });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao associar artista ao álbum', error: error.message });
    }
  }
  
};


