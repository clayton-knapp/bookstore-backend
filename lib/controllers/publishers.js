const { Router } = require('express');
const Publisher = require('../models/Publisher');
const PublisherService = require('../services/PublisherService');



module.exports = Router()
  .post('/', async(req, res) => {
    const publisher = await Publisher.insert(req.body);

    res.send(publisher);
  })

  .get('/', async(req, res) => {
    const publishers = await Publisher.listAllPublishers();

    res.send(publishers);
  })

  .get('/:id', async (req, res) => {
    const publisher = await PublisherService.create(req.params.id);

    res.send(publisher);
  });
