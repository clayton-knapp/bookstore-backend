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
          name, company, reviewer_id
          FROM
          reviewer
          WHERE
            reviewer_id = $1
          `,
      [id]
    );
    return new Reviewer(rows[0]);
  }

  async getReview(reviewerId){
    const { rows } = await pool.query(
      `
      SELECT
      book.book_id,
      title,
      review,
      rating,
      review_id
      FROM
      book
      LEFT JOIN
      review
      ON
      book.book_id = review.book_id
      LEFT JOIN
      reviewer
      ON
      review.reviewer_id = reviewer.reviewer_id
      WHERE
      reviewer.reviewer_id = $1
      `,
      [reviewerId]
    );
    const newRows = rows.map((row) => ({
      title: row.title,
      review: row.review,
      rating: row.rating,
      bookId: row.book_id,
      reviewId: row.review_id
    }));

    this.reviews = newRows;
    console.log(newRows, 'NEEWWW ROWWWS');
    return this;
  }

  static async getAllReviewers() {
    const { rows } = await pool.query(
      `
          SELECT
          name, company, reviewer_id
          FROM
          reviewer
          `
    );
    return rows.map((row) => new Reviewer(row));
  }

  static async deleteReviewerById(reviewerId){
    const { rows } = await pool.query(
      `
          DELETE FROM
          reviewer
          WHERE
          reviewer_id=$1
          RETURNING
          *
          `,
      [reviewerId]
    );
    return new Reviewer(rows[0]);
  }

};
