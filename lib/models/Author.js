const pool = require('../utils/pool');

module.exports = class Author {
  authorId;
  name;
  dob;
  pob;

  constructor(row) {
    this.authorId = row.author_id;
    this.name = row.name;
    if(row.dob){
      this.dob = new Date(row.dob).toLocaleDateString('en-US');
      this.pob = row.pob;
    }
  }

  static async getAllAuthors() {
    const { rows } = await pool.query(
      `
            SELECT
                author_id, name
            FROM
                author
            `
    );
    return rows.map((row) => new Author(row));
  }

  static async getAuthorById(id) {
    const { rows } = await pool.query(
      `
            SELECT
	            name, dob, pob
            FROM
	            author
            WHERE
	            author_id = $1
            `,
      [id]
    );
    console.log(rows, 'ROOOOOOOOWWWSSS');
    return new Author(rows[0]);
  }

  async getAuthorsBooks(publisherId) {
    const { rows } = await pool.query(
      `
     SELECT
        book.book_id,
        title,
        released
        FROM
        book
        LEFT JOIN
        author_book
        ON
        book.book_id = author_book.book_id
        LEFT JOIN
        author
        ON
        author_book.author_id = author.author_id
        WHERE
        author.author_id = $1
        `,
      [publisherId]
    );
    console.log(this, 'THIIIIIIIIIIISSSSS');
    const newRows = rows.map((row) => ({
      title: row.title,
      bookId: row.book_id,
      released: row.released
    }));
    this.books = newRows;
    return this;
  }
};
