const express = require('express');

const app = express();

// Built in middleware
app.use(express.json());

// App routes
app.use('/api/v1/publisher', require('./controllers/publishers'));
app.use('/api/v1/book', require('./controllers/books'));
app.use('/api/v1/author', require('./controllers/authors'));
app.use('/api/v1/reviewer', require('./controllers/reviewers'));
app.use('/api/v1/review', require('./controllers/reviews'));
// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
