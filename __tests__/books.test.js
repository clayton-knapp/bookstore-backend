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
      bookId: expect.any(String),
      title: 'big red cliff',
      publisherId: '2',
      released: 1985
    };
    const res = await request(app).post('/api/v1/book').send(expected);
    expect(res.body).toEqual(expected);
  });

  it('get books by publisher id', async () => {
    const expected = [
      { 
        title: 'Harry Potter', 
        bookId: '1' 
      }, 
      { 
        title: 'Harry Potter 3', bookId:'3' 
      }
    ];

    const res = await request(app).get('/api/v1/book/publisher/1');

    expect(res.body).toEqual(expected);
  });

  it('gets a list of books', async () => {
    const expected = [{
      title:'Harry Potter',
      publisherId:'1',
      released:1999,
      bookId:'1'
      
    }, {
      title:'Lord of the Rings',
      publisherId:'2',
      released:1965,
      bookId:'2'
    }, {
      title:'Harry Potter 3',
      publisherId:'1',
      released:2003,
      bookId:'3'
    }];
    const res = await request(app).get('/api/v1/book');

    expect(res.body).toEqual(expected);
  });

  it('gets a book by id', async () => {
    const expected = {
      title: 'Harry Potter',
      released: 1999,
      publisher: {
        publisherId: '1',
        name: 'Random House'
      },
      author: [
        {
          authorId: '1',
          name: 'JK Rowling'
        },
        {
          authorId: '3',
          name: 'Cliff'
        }
      ],
      reviews: [{
        reviewId: '1',
        rating: 5,
        review: 'good book',
        reviewer: {
          reviewerId: '1',
          name: 'bob'
        }
      }, {
        reviewId: '3',
        rating: 4,
        review: 'meh',
        reviewer: {
          reviewerId: '2',
          name: 'zeus'
        } 
      }]
    };

    const res = await request(app).get('/api/v1/book/1');

    expect(res.body).toEqual(expected);
  });
});

