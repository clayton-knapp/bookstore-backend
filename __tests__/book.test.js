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

  it('creates a book', async () => {
    const expected = {
      title: 'big red cliff',
      publisherId: '2',
      released: 1985
    };
    const res = await request(app).post('/api/v1/book').send(expected);
    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  it('get books by publisher id', async () => {
    const expected = [{ title: 'Harry Potter', id: '1' }, { title: 'Harry Potter 3', id:'3' }];

    const res = await request(app).get('/api/v1/book/publisher/1');

    expect(res.body).toEqual(expected);
  });

  it('gets a list of books', async () => {
    const expected = [{
      title:'Harry Potter',
      publisherId:'1',
      released:1999,
      id:'1'
      
    }, {
      title:'Lord of the Rings',
      publisherId:'2',
      released:1965,
      id:'2'
    }, {
      title:'Harry Potter 3',
      publisherId:'1',
      released:2003,
      id:'3'
    }];
    const res = await request(app).get('/api/v1/book');

    expect(res.body).toEqual(expected);
  });
});

