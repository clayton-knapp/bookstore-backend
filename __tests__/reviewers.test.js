const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Reviewer = require('../lib/models/Reviewer');

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

  it ('gets a reviewer by id', async () => {
    const expected = {
      reviewerId: '1',
      name: 'bob',
      company: 'Nike',
      reviews: [{ 
        reviewId: '1',
        rating:5,
        review: 'good book',
        bookId: '1',
        title: 'Harry Potter'
      },
      {
        reviewId: '2',
        rating:2,
        review: 'somewhat good',
        bookId: '2',
        title:'Lord of the Rings'
      }]  
    };
    const res = await request(app).get('/api/v1/reviewer/1');
    expect(res.body).toEqual(expected);
  });

  it('gets all reviewers', async () => {
    const expected = [{
      name: 'bob',
      company:'Nike',
      reviewerId:'1'
    },
    {
      name:'zeus',
      company:'addidas',
      reviewerId:'2'
    },
    {
      company: 'somewhere',
      name: 'no review guy',
      reviewerId: '3',
    }];
    const res = await request(app).get('/api/v1/reviewer');
    expect(res.body).toEqual(expected);
  });

  it ('deletes a reviewer only if they have no reviews', async () => {
    const expected = await Reviewer.insert({ reviewerId:'4', name:'Clayton', company:'ClayAndBrosCo' });

    const res = await request(app).delete('/api/v1/reviewer/4');
    expect(res.body).toEqual(expected);
  });

  it ('tries to delete a reviewer with reviews', async () => {
    // const expected = 404;

    const res = await request(app).delete('/api/v1/reviewer/1');
    // console.log('rebody****', res.body);
    expect(res.body.message).toEqual('Cannot delete reviews with a review');
  });

  it('updates a reviewer by id', async () => {
    const expected = {
      name: 'Jimbo',
      company:'Nike',
      reviewerId:'1'
    };

    const res = await request(app)
      .patch('/api/v1/reviewer/1')
      .send(
        { 
          name: 'Jimbo', 
          // company: 'Fred Meyer' 
        }
      );

    expect(res.body).toEqual(expected);

  });


});
