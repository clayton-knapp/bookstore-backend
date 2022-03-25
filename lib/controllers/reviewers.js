const { Router } = require('express');
const Reviewer = require('../models/Reviewer');

module.exports = Router()

  .post('/', async (req, res) => {
    const reviewer = await Reviewer.insert(req.body);
    res.send(reviewer);
  })

  .get('/:id', async (req, res) => {
    const reviewer = await Reviewer.getReviewerById(req.params.id);
    await reviewer.getReview(req.params.id);

    res.send(reviewer);
  })
  
  .get('/', async (req, res) => {
    const reviewers = await Reviewer.getAllReviewers();
      
    res.send(reviewers);
  })

  .delete('/:id', async (req, res) => {

    const reviews = await Reviewer.getReviewerById(req.params.id);
    await reviews.getReview(req.params.id);

    console.log('REVIEWS****', reviews);

    
    if(reviews.reviews.length === 0){
      const reviewer = await Reviewer.deleteReviewerById(req.params.id);
      res.send(reviewer);
    }
    else {
      const error = 'Cannot delete';
      res.send(error);
    }
    
  
  });
