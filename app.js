/** Express app for survey-test. */

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

// allow both form-encoded and json body parsing
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// allow connections to all routes from any browser
app.use(cors());

/** routes */

const surveyRoutes = require('./routes/surveys');

app.use('/surveys', surveyRoutes);

// add logging system
const morgan = require('morgan');
app.use(morgan('tiny'));

// add API Errors helper
const APIError = require('./helpers/APIError');

/** 404 handler */

app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;

  // pass the error to the next piece of middleware
  return next(err);
});

// global error handler
app.use(function(err, req, res, next) {
  // all errors that get to here get coerced into API Errors
  if (!(err instanceof APIError)) {
    err = new APIError(err.message, err.status);
  }
  return res.status(err.status).json(err);
});

module.exports = app;
