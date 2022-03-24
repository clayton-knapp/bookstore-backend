const pool = require('../utils/pool');

module.exports = class Book{
  bookId;
  title;
  publisherId;
  released;

  constructor(row) {
    this.bookId = row.book_id;
    this.title = row.title;
    this.publisherId = row.publisher_id;
    this.released = row.released;
    this.publisher = { publisherId: row.publisher_id, name: row.name };
    this.author = { authorId: row.author_id, name: row.name };
  }

  static async getAllByPublisherId(publisherId) {
    const { rows } = await pool.query(
      `
        SELECT
          title, book_id
        FROM
          book
        WHERE
          book.publisher_id=$1
          `,
      [publisherId]
    );
    return rows.map((row) => new Book(row));
  }

  static async insert({ title, publisherId, released }) {
    const { rows } = await pool.query(
      `
      INSERT INTO
        book ( title, publisher_id, released)
      VALUES
      ($1, $2, $3)
      RETURNING
        *
      `,
      [title, publisherId, released]
    );

    return new Book(rows[0]);
  }

  static async getAllBooks() {
    const { rows } = await pool.query(
      `
      SELECT
      *
      FROM
      book
      
      `
    );
    return rows.map((row) => new Book(row));
  }

  static async getBookById(id) {
    const { rows } = await pool.query(
      `
        SELECT
          title, 
          released, 
          publisher.publisher_id, publisher.name
        FROM
          book
        LEFT JOIN
          publisher
        ON
          book.publisher_id = publisher.publisher_id
        WHERE
          book.book_id=$1
      `,
      [id]
    );
    return new Book(rows[0]);
  }

  async getAuthors(bookId) {
    const { rows } = await pool.query(
      `     
SELECT
author.author_id,
author.name
FROM
author
LEFT JOIN
author_book
ON
author_book.author_id = author.author_id
LEFT JOIN
book
ON
book.book_id = author_book.book_id
WHERE
book.book_id=$1;
      `,
      [bookId]
    );

    // console.log('AUTHORS??????', rows);

    const newRows = rows.map(row => ({
      authorId: row.author_id,
      name: row.name
    }));

    this.author = newRows;
    
    // console.log('THIS??????', this);
    

    return this;
  }
};
