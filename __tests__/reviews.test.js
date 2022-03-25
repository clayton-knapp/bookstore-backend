const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');


describe('bookstore-backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  
  afterAll(() => {
    pool.end();
  });

  it('creates a review', async () => {
    const expected = {
      reviewId: expect.any(String),
      rating: 2,
      reviewerId: '1',
      review:'fruggin sucked',
      bookId: '2'
    };

    const res = await request(app).post('/api/v1/review').send(expected);
    expect(res.body).toEqual(expected);
  });

  it('it gets all reviews and brings back in rank of highest rated and limits to 100', async () => {
    const expected = [
      {
        reviewId: expect.any(String),
        rating: 5,
        review: 'good book',
        bookId: '1',
        title: 'Harry Potter'
      },
      {
        reviewId: expect.any(String),
        rating: 4,
        review: 'meh',
        bookId: '1',
        title: 'Harry Potter'
      },
      {
        reviewId: expect.any(String),
        rating: 3,
        review: 'bad book',
        bookId: '2',
        title: 'Lord of the Rings'
      },
      {
        reviewId: expect.any(String),
        rating: 2,
        review: 'somewhat good',
        bookId: '2',
        title: 'Lord of the Rings'
      },
    ];

    const res = await request(app).get('/api/v1/review');

    expect(res.body).toEqual(expected);

  });



});

