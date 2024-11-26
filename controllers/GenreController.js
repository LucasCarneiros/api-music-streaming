const { Genre, Music } = require('../models');

module.exports = {
  // CRUD - Criar Gênero
  async create(req, res) {
    try {
      const { name } = req.body;
      const genre = await Genre.create({ name });
      res.status(201).json(genre);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao criar o gênero' });
    }
  },

  // CRUD - Recuperar Gêneros
  async getAll(req, res) {
    try {
      const genres = await Genre.findAll();
      res.status(200).json(genres);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao buscar gêneros' });
    }
  },

  // CRUD - Recuperar Gênero por ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const genre = await Genre.findByPk(id);
      if (!genre) {
        return res.status(404).json({ message: 'Gênero não encontrado' });
      }
      res.status(200).json(genre);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao buscar gênero' });
    }
  },

  // CRUD - Atualizar Gênero
  async update(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const genre = await Genre.findByPk(id);
      if (!genre) {
        return res.status(404).json({ message: 'Gênero não encontrado' });
      }

      genre.name = name || genre.name;

      await genre.save();
      res.status(200).json(genre);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao atualizar gênero' });
    }
  },

  // CRUD - Deletar Gênero
  async delete(req, res) {
    try {
      const { id } = req.params;

      const genre = await Genre.findByPk(id);
      if (!genre) {
        return res.status(404).json({ message: 'Gênero não encontrado' });
      }

      await genre.destroy();
      res.status(200).json({ message: 'Gênero deletado com sucesso' });
      return;
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao deletar gênero' });
    }
  },

  // Relacionar Gênero a Música
  async addMusic(req, res) {
    try {
      const { genreId, musicId } = req.params;
  
      const genre = await Genre.findByPk(genreId);
      if (!genre) {
        return res.status(404).json({ message: 'Gênero não encontrado' });
      }
  
      const music = await Music.findByPk(musicId);
      if (!music) {
        return res.status(404).json({ message: 'Música não encontrada' });
      }
  
      // Atualiza a chave estrangeira genreId na tabela Music
      music.genreId = genreId;
      await music.save();
  
      res.status(200).json({ message: 'Música associada ao gênero com sucesso', music });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao associar música ao gênero' });
    }
  }
};


