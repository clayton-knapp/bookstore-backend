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

  it('creates a reviewer ', async () =>
  {
    const expected = {
      reviewerId: expect.any(String),
      name: 'Steven',
      company:'Google'
    };
    const res = await request(app).post('/api/v1/reviewer').send(expected);
    expect(res.body).toEqual(expected);
  });
});
