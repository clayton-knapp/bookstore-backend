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



});
