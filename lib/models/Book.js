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
    this.year = row.year;

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
    console.log(rows, '****************');
    return rows.map((row) => new Book(row));
  }
};
