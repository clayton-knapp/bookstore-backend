const pool = require('../utils/pool');

module.exports = class Book{
  id;
  title;
  publisherId;
  year;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.publisherId = row.publisher_id;
    this.released = row.released;

  }

  static async getAllByPublisherId(publisherId) {
    const { rows } = await pool.query(
      `
          SELECT
          title, id
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
};
