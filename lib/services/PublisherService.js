const Book = require('../models/Book');
const Publisher = require('../models/Publisher');

module.exports = class PublisherService {
  static async create(publisherId) {
    const books = await Book.getAllByPublisherId(publisherId);
    const newBooks = books.map((book) => ({ id: book.id, title: book.title }));
    const publisher = await Publisher.getById(publisherId);
    publisher.books = newBooks;
    console.log('-------BOOKS----------', newBooks);
    // const combined = { ...publisher, books };

    console.log(publisher);

    return publisher;
   
  }
};
