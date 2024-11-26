const { User, Playlist } = require('../models');

module.exports = {
  // Criar Usuário
  async create(req, res) {
    try {
      const { username, email, password } = req.body;
      const user = await User.create({ username, email, password });
      res.status(201).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao criar o usuário' });
    }
  },

  // Pegar todos Usuários
  async getAll(req, res) {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao buscar usuários' });
    }
  },

  // Pegar usuario pelo ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const { include } = req.query;  

      const includes = include ? include.split(',') : [];

      const user = await User.findByPk(id,{
        include: [
          // Incluir playlists URL: GET /users/:id?include=playlists
          includes.includes('playlists') && {
            model: Playlist,
            attributes: ['id', 'nome'],  
          },
        ].filter(Boolean),  
      });

      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao buscar usuário' });
    }
  },

  // Atualizar Usuário
  async update(req, res) {
    try {
      const { id } = req.params;
      const { username, email } = req.body;

      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      user.username = username || user.username;
      user.email = email || user.email;

      await user.save();
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao atualizar usuário' });
    }
  },

  // Deletar Usuário
  async delete(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      await user.destroy();
      res.status(200).json({ message: 'Usuário deletado com sucesso' });
      return;
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao deletar usuário' });
    }
  },

  // Relacionar Usuário a Playlist
  async addPlaylist(req, res) {
    try {
      const { userId, playlistId } = req.params;

      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      const playlist = await Playlist.findByPk(playlistId);
      if (!playlist) {
        return res.status(404).json({ message: 'Playlist não encontrada' });
      }

      await user.addPlaylist(playlist);
      res.status(200).json({ message: 'Playlist associada ao usuário com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao associar playlist ao usuário' });
    }
  },
};

