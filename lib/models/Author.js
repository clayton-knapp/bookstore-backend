const pool = require('../utils/pool');

module.exports = class Author {
    authorId;
    name;
    dob;
    pob;

    constructor(row) {
        this.authorId = row.author_id;
        this.name = row.name;
        this.dob = row.dob;
        this.pob = row.pob;
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
        return new Author(rows[0]);
    }

    async getAuthorsBooks(bookId) {
        const { rows } = await pool.query(
            `
            `
        )
    }
}