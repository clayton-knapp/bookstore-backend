const { Router } = require('express');
const Author = require('../models/Author');

module.exports = Router()

  .get('/', async (req, res) => {
    const authors = await Author.getAllAuthors();
    res.send(authors);
  })

  .get('/:id', async (req, res) => {
    const author = await Author.getAuthorById(req.params.id);
    await author.getAuthorsBooks(req.params.id);
    console.log(author, typeof author.dob, 'AUUUTHPOORR');

    res.send(author);
  })

  .post('/', async (req, res) => {
    const author = await Author.insert(req.body);
    res.send(author);
  });
