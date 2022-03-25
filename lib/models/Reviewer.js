const pool = require('../utils/pool');

module.exports = class Reviewer{
  reviewerId;
  name;
  company;

  constructor(row) {
    this.reviewerId = row.reviewer_id;
    this.name = row.name;
    this.company = row.company;
  }

  static async insert({ name, company }) {
    const { rows } = await pool.query(
      `
          INSERT INTO
          reviewer (name, company)
          VALUES
          ($1, $2)
          RETURNING
          *
          `,
      [name, company]
    );
    return new Reviewer(rows[0]);
  }

  static async getReviewerById(id) {
    const { rows } = await pool.query(
      `
          SELECT
          name, company
          FROM
          reviewer
          WHERE
            reviewer_id = $1
          `,
      [id]
    );
    return new Reviewer(rows[0]);
  }

  async

};
