const { Router } = require('express');
const Author = require('../models/Author');

module.exports = Router()

  .get('/', async (req, res) => {
      const authors = await Author.getAllAuthors();
      res.send(authors);
  })

  .get('/:id', async (req, res) => {
      const author = await Author.getAuthorById(req.params.id);
      res.send(author);
  })