const Book = require('../models/Book');
const Publisher = require('../models/Publisher');

module.exports = class PublisherService {
  static async create({ publisherId }) {
    const books = await Book.getAllByPublisherId(publisherId);
    const publisher = await Publisher.getById(publisherId);
    console.log(books, publisher)
  }
};
