// Survey routes
const express = require('express');
const router = express.Router();
const Survey = require('../models/survey');
const db = require('../db');
const { validate } = require('jsonschema');
const surveySchema = require('../schemas/surveySchema.json');
const APIError = require('../helpers/APIError');

// This route should show all surveys
router.get('/', async function(req, res, next) {
  try {
    let surveys = await Survey.getSurveys();
    return res.json({ surveys });
  } catch (err) {
    err.status = 400;
    return next(err);
  }
});

// this route adds a new survey into our database
router.post('/', async function(req, res, next) {
  const result = validate(req.body, surveySchema);
  if (!result.valid) {
    // pass validation errors to error handler
    let message = result.errors.map(error => error.stack);
    let status = 404;
    let error = new APIError(message, status);
    return next(error);
  }
  // at this point in code, we know we have a valid payload
  try {
    const { category, question, choices } = req.body;
    const survey = await Survey.create({
      category, question, choices
    });
    return res.json({ survey });
  } catch (error) {
    error.status = 409;
    return next(error);
  }
});

// This route should return a single survey found by its id.
router.get('/:id', async function(req, res, next) {
  try {
    let survey = await Survey.getSurveyById(req.params.id);
    return res.json({ survey });
  } catch (err) {
    err.status = 404;
    return next(err);
  }
});

// This route should update a survey's answers
router.patch('/:id', async function(req, res, next) {
  const result = validate(req.body, surveySchema);
  if (!result.valid) {
    // pass validation errors to error handler
    let message = result.errors.map(error => error.stack);
    let status = 404;
    let error = new APIError(message, status);
    return next(error);
  }
  // at this point in code, we know we have a valid payload
  const id = req.params.id;
  const { answers } = req.body;

  try {
    const survey = await Survey.updateSurveyAnswers({
      id,
      answers
    });
    return res.json({ survey });
  } catch (err) {
    err.status = 404;
    return next(err);
  }
});

// This route should get all survey results
router.get('/results', async function(req, res, next) {
  try {
    let surveys = await Survey.getSurveyResults();
    return res.json({ surveys });
  } catch (err) {
    err.status = 404;
    return next(err);
  }
});

// This route should get a survey's results by ID
router.get('/results/:id', async function(req, res, next) {
  try {
    let survey = await Survey.getSurveyResultById(req.params.id);
    return res.json({ survey });
  } catch (err) {
    err.status = 404;
    return next(err);
  }
});

// This route should remove a survey by the ID provided
router.delete('/:id', async function(req, res, next) {
  try {
    await Survey.delete(req.params.id);
    return res.json({ message: 'Survey deleted' });
  } catch (err) {
    err.status = 404;
    return next(err);
  }
});

module.exports = router;
