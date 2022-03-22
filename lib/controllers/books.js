const { Router } = require('express');
const Book = require('../models/Book');


module.exports = Router()
  .get('/publisher/:id', async (req, res) => {
    const books = await Book.getAllByPublisherId(req.params.id);

    res.send(books);
  });





