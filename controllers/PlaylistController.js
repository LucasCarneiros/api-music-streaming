const { Playlist, User, Music } = require('../models');

module.exports = {
  // Criar uma nova playlist
  async create(req, res) {
    try {
      const playlist = await Playlist.create(req.body); 
      return res.status(201).json(playlist); 
    } catch (error) {
      return res.status(400).json({ error: error.message }); 
    }
  },

  // Listar todas as playlists
  async getAll(req, res) {
    try {
      const playlists = await Playlist.findAll(); 
      return res.status(200).json(playlists); 
    } catch (error) {
      return res.status(400).json({ error: error.message }); 
    }
  },

    // Pegar playlist pelo ID
    async getById(req, res) {
      try {
        const { id } = req.params;
        const { include } = req.query;  

        const includes = include ? include.split(',') : [];

        const playlist = await Playlist.findByPk(id,{
          include: [
            // Incluir usuário URL: GET /playlists/:id?include=user
            includes.includes('user') && {
              model: User,
              attributes: ['id', 'nome', 'email'], 
            },
            // Incluir músicas URL: GET /playlists/:id?include=musics
            includes.includes('musics') && {
              model: Music,
              attributes: ['id', 'titulo', 'duracao'], 
              through: { attributes: [] }, 
            },
          ].filter(Boolean), 

          // URL: GET /playlists/:id?include=user,musics

        });
        if (!playlist) {
          return res.status(404).json({ message: 'Playlist não encontrada' });
        }
        res.status(200).json(playlist);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar Playlist'});
      }
    },
  

  // Atualizar uma playlist pelo id
  async update(req, res) {
    try {
      const playlist = await Playlist.findByPk(req.params.id);
      if (!playlist) {
        return res.status(404).json({ error: 'Playlist não encontrada' });
      }
      await playlist.update(req.body); 
      return res.status(200).json(playlist); 
    } catch (error) {
      return res.status(400).json({ error: error.message }); 
    }
  },

  // Deletar uma playlist pelo id
  async delete(req, res) {
    try {
      const playlist = await Playlist.findByPk(req.params.id); 
      if (!playlist) {
        return res.status(404).json({ error: 'Playlist não encontrada' }); 
      }
      await playlist.destroy(); 
      res.status(200).json({ message: 'Playlist deletado com sucesso' });
      return;
    } catch (error) {
      return res.status(400).json({ error: error.message }); 
    }
  },

  // Relacionar playlist a uma música
  async addMusic(req, res) {
    try {
      const playlist = await Playlist.findByPk(req.params.playlistId); 
      const music = await Music.findByPk(req.params.musicId); 

      if (!playlist || !music) {
        return res.status(404).json({ error: 'Playlist ou Música não encontrada' }); 
      }

      await playlist.addMusic(music); 
      return res.status(200).json({ message: 'Música adicionada à playlist' }); 
    } catch (error) {
      return res.status(400).json({ error: error.message }); 
    }
  },

  // Relacionar playlist a um usuário
  async addUser(req, res) {
    try {
      const { playlistId, userId } = req.params;
  
      // Busca a playlist pelo ID
      const playlist = await Playlist.findByPk(playlistId);
      if (!playlist) {
        return res.status(404).json({ error: 'Playlist não encontrada' });
      }
  
      // Busca o usuário pelo ID
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
  
      // Atualiza diretamente a chave estrangeira userId na tabela Playlist
      playlist.userId = userId;
      await playlist.save();
  
      return res.status(200).json({ message: 'Playlist atribuída ao usuário com sucesso!' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao atribuir playlist ao usuário', details: error.message });
    }
  }
};


