const { Router } = require('express');
// const { getBookById } = require('../models/Book');
const Book = require('../models/Book');


module.exports = Router()
  .get('/publisher/:id', async (req, res) => {
    const books = await Book.getAllByPublisherId(req.params.id);

    const newBooks = books.map((book) => (
      {
        bookId: book.bookId,
        title: book.title
      }
    ));

    res.send(newBooks);
  })

  .post('/', async (req, res) => {
    const book = await Book.insert(req.body);
    const newBook = {
      bookId: book.bookId,
      title: book.title,
      publisherId: book.publisherId,
      released: book.released
    };

    res.send(newBook);
  })
  
  .get('/', async (req, res) => {
    const books = await Book.getAllBooks();

    const newBooks = books.map((book) => (
      {
        bookId: book.bookId,
        title: book.title,
        publisherId: book.publisherId,
        released: book.released
      }
    ));

    res.send(newBooks);
  })

  .get('/:id', async (req, res) => {
    const book = await Book.getBookById(req.params.id);
    // console.log('******BOOK*****', book);

    const bookWithAuthors = await book.getAuthors(req.params.id);
 
    // console.log(bookWithAuthors);

    const newBook = {
      title: bookWithAuthors.title,
      released: bookWithAuthors.released,
      publisher: bookWithAuthors.publisher,
      author: bookWithAuthors.author
    };

    
    res.send(newBook);
  });
  





