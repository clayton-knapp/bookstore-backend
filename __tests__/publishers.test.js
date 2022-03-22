const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
// const Publisher = require('../lib/models/Publisher');

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

  it('gets all publishers', async () => {
    const expected = [{ id: '1', name: 'Random House' }, { id: '2', name: 'Penguin' }];

    const res = await request(app).get('/api/v1/publisher');

    expect(res.body).toEqual(expected);
  });

  it('gets publisher by id', async () => {
    const expected = { id: expect.any(String), name: 'Random House', city: 'New York City', state: 'NY', country: 'USA', books: [{ id: '1', title:'Harry Potter' }] };

    const res = await request(app).get(`/api/v1/publisher/${expected.id}`);

    expect(res.body).toEqual(expected);
  });
});
