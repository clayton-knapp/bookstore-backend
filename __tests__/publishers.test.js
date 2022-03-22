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

  it('creates a publisher', async() => {
    const expected = {
      name: 'Perigree',
      city: 'Portland',
      state: 'OR',
      country: 'USA'
    };

    const res = await request(app).post('/api/v1/publisher').send(expected);

    expect(res.body).toEqual({ id: expect.any(String), ...expected });

  });
});
