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
    
    await book.getAuthors(req.params.id);

    await book.getReviews(req.params.id);
    console.log('******BOOK*****', book);
    // console.log(book);

    const newBook = {
      title: book.title,
      released: book.released,
      publisher: book.publisher,
      author: book.author,
      reviews: book.review
    };

    
    res.send(newBook);
  });
  





