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
    const reviewer = await Reviewer.deleteReviewerById(req.params.id);

    res.send(reviewer);
  });
