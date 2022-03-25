const pool = require('../utils/pool');

module.exports = class Review{
  reviewId;
  rating;
  reviewerId;
  review;
  bookId;

  constructor(row) {
    this.reviewId = row.review_id;
    this.rating = row.rating;
    this.reviewerId = row.reviewer_id;
    this.review = row.review;
    this.bookId = row.book_id;
    this.title = row.title;
  }

  static async insert({ rating, reviewerId, review, bookId }) {
    const { rows } = await pool.query(
      `
      INSERT INTO
          review (rating, reviewer_id, review, book_id)
      VALUES
        ($1, $2, $3, $4)
      RETURNING
        *
      `,
      [rating, reviewerId, review, bookId]
    );
    return new Review(rows[0]);
  }

  static async getAllReviewsRanked(){
    const { rows } = await pool.query(
      `
    SELECT
	  review_id, 
    rating,
    review, 
    review.book_id, 
    book.title,
    RANK() OVER (ORDER BY rating DESC)
    FROM
      review
    LEFT JOIN
      book
    ON
      book.book_id = review.book_id
    LIMIT
      100;
      `
    );

    console.log(rows);

    return rows.map((row) => new Review(row));
  }
};

