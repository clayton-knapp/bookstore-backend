const pool = require('../utils/pool');

module.exports = class Publisher{
  publisherId;
  name;
  city;
  state;
  country;

  constructor(row) {
    this.publisherId = row.publisher_id;
    this.name = row.name;
    this.city = row.city;
    this.state = row.state;
    this.country = row.country;
  }

  static async insert({ name, city, state, country }) {
    const { rows } = await pool.query(
      `
      INSERT INTO
        publisher (name, city, state, country)
      VALUES
        ($1, $2, $3, $4)
      RETURNING
        *
      `,
      [name, city, state, country]
    );

    return new Publisher(rows[0]);
  }

  static async listAllPublishers() {
    const { rows } = await pool.query(
      `
        SELECT
          name, publisher_id
        FROM
          publisher
      `,
    );
    return rows.map((row) => new Publisher(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
        SELECT
          publisher.publisher_id, 
          name, 
          city, 
          state, 
          country, 
          book.book_id, 
          book.title 
        FROM 
          publisher
        LEFT JOIN
          book
        ON
          book.publisher_id = publisher.publisher_id
        WHERE
          publisher.publisher_id=$1
      `,
      [id]
    );
    
    return new Publisher(rows[0]);
  }
};
