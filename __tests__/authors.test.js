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

  it('gets all authors', async () => {
    const expected = [{
      authorId: '1',
      name: 'JK Rowling',
    }, {
      authorId: '2',
      name: 'JRR Tolken',
    }, {
      authorId: '3',
      name: 'Cliff',
    }];
    const res = await request(app).get('/api/v1/author');
    expect(res.body).toEqual(expected);
  });

  it('gets an author by id', async () => {
    const expected = {
      name: 'JK Rowling',
      dob: '7/31/1965',
      pob: 'Yate, England',
      books: [{
        bookId: '1',
        title: 'Harry Potter',
        released: 1999,
      }, {
        bookId: '3',
        title: 'Harry Potter 3',
        released: 2003,
      }]
    };
    const res = await request(app).get('/api/v1/author/1');
    expect(res.body).toEqual(expected);
  });

  it('creates an author ', async () => {
    const expected = {
      authorId: expect.any(String),
      name: 'Colleen Hoover',
      dob: '7/20/1985',
      pob: 'Portland, USA'
    };
    const res = await request(app).post('/api/v1/author').send(expected);
    expect(res.body).toEqual(expected);
  });
});
