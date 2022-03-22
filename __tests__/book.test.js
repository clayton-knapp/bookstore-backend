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

  it('get books by publisher id', async () => {
    const expected = [{ title: 'Harry Potter', id: '1' }, { title: 'Harry Potter 3', id:'3' }];

    const res = await request(app).get('/api/v1/book/publisher/1');

    expect(res.body).toEqual(expected);
  });
});

