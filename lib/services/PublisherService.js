const Book = require('../models/Book');
const Publisher = require('../models/Publisher');

module.exports = class PublisherService {
  static async create(publisherId) {
    const books = await Book.getAllByPublisherId(publisherId);
    const publisher = await Publisher.getById(publisherId);
    console.log(books, publisher, '-------**********');
    const combined = { ...publisher, books };
    console.log(combined, 'CCCCCCCCCCCCCC');
    const newBooks = books.map(book => { book.title, book.id; });
    // const filterBooks = books.map(filterBooks => { book.id, book.title; })
    console.log(newBooks, 'LLLLLLLLLLLLLLLLL');
  }
};
