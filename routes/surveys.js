// Survey routes
const express = require('express');
const router = express.Router();
const Survey = require('../models/survey');
const Question = require('../models/question');
const { validate } = require('jsonschema');
const surveySchema = require('../schemas/surveySchema.json');
const questionSchema = require('../schemas/surveySchema.json');
const responseSchema = require('../schemas/responseSchema.json');
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
    const { surveyName } = req.body;
    const survey = await Survey.create(surveyName);
    return res.json({ survey });
  } catch (error) {
    error.status = 409;
    return next(error);
  }
});

// this route adds a new question to a survey
router.post('/:id', async function(req, res, next) {
  const result = validate(req.body, questionSchema);
  if (!result.valid) {
    // pass validation errors to error handler
    let message = result.errors.map(error => error.stack);
    let status = 404;
    let error = new APIError(message, status);
    return next(error);
  }
  // at this point in code, we know we have a valid payload
  try {
    const surveyId = req.params.id;
    const { question } = req.body;
    const survey = await Question.create(surveyId, question);
    return res.json({ survey });
  } catch (error) {
    error.status = 409;
    return next(error);
  }
});

// This route should return all questions from a specific survey.
router.get('/:surveyId', async function(req, res, next) {
  try {
    let survey = await Question.getQuestionsFromSurvey(req.params.surveyId);
    return res.json({ survey });
  } catch (err) {
    err.status = 404;
    return next(err);
  }
});

// This route should allow someone to take a survey
router.post('/take/:id', async function(req, res, next) {
  const questionId = req.params.id;
  const { answer } = req.body;
  const result = validate(req.body, responseSchema);
  if (!result.valid) {
    // pass validation errors to error handler
    let message = result.errors.map(error => error.stack);
    let status = 404;
    let error = new APIError(message, status);
    return next(error);
  }
  try {
    const survey = await Question.answerQuestion(questionId, answer);
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

// This route should remove a question by the ID provided
router.delete('/question/:id', async function(req, res, next) {
  try {
    await Question.delete(req.params.id);
    return res.json({ message: 'Survey deleted' });
  } catch (err) {
    err.status = 404;
    return next(err);
  }
});



module.exports = router;
