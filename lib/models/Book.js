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

    console.log('INSERT****', rows);
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
          title, released, publisher.id, publisher.name
        FROM
          book
        LEFT JOIN
          publisher
        ON
          book.publisher_id = publisher.id
        WHERE
          book.id=$1
      `,
      [id]
    );
    console.log(rows);
    return new Book(rows[0]);
  }

  // async getPublisher() {
  //   const { rows } = await pool.query(
  //     `
  //       SELECT
  //         publisher.id, publisher.name
  //       FROM
  //         publisher
  //       LEFT JOIN
  //         book
  //       ON
  //         publisher.id = book.publisher_id
  //       WHERE
  //         book.publisher_id=$1
  //     `,
  //     [this.id]
  //   );
  //   console.log(rows);
  //   this.publisher = rows;
  //   return this;
  // }
};
