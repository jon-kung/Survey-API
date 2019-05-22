/** Integration tests for surveys route */

process.env.NODE_ENV = 'test';
const request = require('supertest');
const app = require('../app');
const db = require('../db');

beforeEach(async () => {
  let surveyData = await db.query(` INSERT INTO 
    surveys (id, survey_name)   
    VALUES( 255, 'My Test Survey' ) RETURNING *`);
  let questionData = await db.query(`INSERT INTO 
    questions (id, survey_id, question)   
    VALUES( 255, 255, 'Do you like testing?') RETURNING *`);
  let responseData = await db.query(`INSERT INTO 
    responses (id, question_id, answer)   
    VALUES( 255, 255, false ) RETURNING *`);
});

// ************** BEGINNING of tests for GET routes **************

// TESTING route for getting all surveys
describe('GET /surveys', function() {
  test('gets all surveys', async function() {
    const response = await request(app)
      .get(`/surveys`)
    expect(response.statusCode).toBe(200);
    expect(response.body.surveys[0]).toHaveProperty('id');
    expect(response.body.surveys[0]).toHaveProperty('survey_name');
  });
  // Testing for no results from query
  test('Responds with 404 if no survey is found in the database', async function() {
    await db.query('DELETE FROM surveys');
    const response = await request(app)
      .get(`/surveys`)
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('error');
  });
});

// TESTING route for getting questions from a specific survey
describe('GET /surveys/:id', function() {
  test('gets all questions for survey id 255', async function() {
    const response = await request(app)
      .get(`/surveys/255`)
    expect(response.statusCode).toBe(200);
    expect(response.body.questions[0]).toHaveProperty('id');
    expect(response.body.questions[0].survey_id).toEqual(255);
    expect(response.body.questions[0].question).toEqual('Do you like testing?');
  });
  // Testing for no results from query
  test('Responds with 404 if no survey is found in the database', async function() {
    await db.query('DELETE FROM surveys');
    const response = await request(app)
      .get(`/surveys/255`)
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('error');
  });
});

// TESTING route for getting results of all surveys
describe('GET /surveys/results/all', function() {
  test('gets all survey results', async function() {
    const response = await request(app)
      .get(`/surveys/results/all`)
    expect(response.statusCode).toBe(200);
    expect(response.body.responses[0]).toHaveProperty('id');
    expect(response.body.responses[0]).toHaveProperty('question_id');
    expect(response.body.responses[0]).toHaveProperty('answer');
    expect(response.body.responses[0].question_id).toEqual(255);
    expect(response.body.responses[0].answer).toEqual(false);
  });
  // Testing for no results from query
  test('Responds with 404 if no response is found in the database', async function() {
    await db.query('DELETE FROM surveys');
    const response = await request(app)
      .get(`/surveys/results/all`)
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('error');
  });
});

// TESTING route for getting results of a specific surveys
describe('GET /surveys/results/:id', function() {
  test('gets a specific survey result', async function() {
    const response = await request(app)
      .get(`/surveys/results/255`)
    expect(response.statusCode).toBe(200);
    expect(response.body.responses[0]).toHaveProperty('id');
    expect(response.body.responses[0]).toHaveProperty('question_id');
    expect(response.body.responses[0]).toHaveProperty('answer');
    expect(response.body.responses[0].question_id).toEqual(255);
    expect(response.body.responses[0].answer).toEqual(false);
  });
  // Testing for no results from query
  test('Responds with 404 if no response is found in the database', async function() {
    await db.query('DELETE FROM surveys');
    const response = await request(app)
      .get(`/surveys/results/0`)
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('error');
  });
});

// ************** END of tests for GET routes **************

// ************** START of tests for POST routes **************

// TESTING route to add a survey
describe('POST /surveys', function() {
  test('adds a new survey', async function() {
    const response = await request(app)
      .post(`/surveys`)
      .send({
        survey_name: 'Anotha Survey'
      });
    expect(response.statusCode).toBe(200);
    expect(response.body.survey).toHaveProperty('id');
    expect(response.body.survey).toHaveProperty('survey_name');
    expect(response.body.survey.survey_name).toBe('Anotha Survey');
  });
  test('Responds with 400 if no survey name sent', async function() {
    const response = await request(app)
      .post(`/surveys`)
      .send({});
    expect(response.statusCode).toBe(400);
  });
});

// TESTING route to add a question to a survey
describe('POST /surveys/:id', function() {
  test('adds a new question to a survey', async function() {
    const response = await request(app)
      .post(`/surveys/255`)
      .send({
        survey_id: 255,
        question: "Test question"
      });
    expect(response.statusCode).toBe(200);
    expect(response.body.question).toHaveProperty('id');
    expect(response.body.question).toHaveProperty('survey_id');
    expect(response.body.question).toHaveProperty('question');
    expect(response.body.question.survey_id).toBe(255);
    expect(response.body.question.question).toBe("Test question");

  });
  test('Responds with 404 if survey id is not found', async function() {
    const response = await request(app)
      .post(`/surveys/999`)
      .send({ survey_id: 999, question: 'Bad data'});
    expect(response.statusCode).toBe(404);
  });
});

// TESTING route to take a survey
describe('POST /surveys/take/:id', function() {
  test('adds a response to a survey', async function() {
    const response = await request(app)
      .post(`/surveys/take/255`)
      .send({
        question_id: 255,
        answer: true
      });
    expect(response.statusCode).toBe(200);
    expect(response.body.response).toHaveProperty('id');
    expect(response.body.response).toHaveProperty('question_id');
    expect(response.body.response).toHaveProperty('answer');
    expect(response.body.response.question_id).toBe(255);
    expect(response.body.response.answer).toBe(true);
  });
  test('Responds with 404 if question id is not found', async function() {
    const response = await request(app)
      .post(`/surveys/take/999`)
      .send({ question_id: 999, answer: true });
    expect(response.statusCode).toBe(404);
  });
});

// ************** END of tests for POST routes **************

// ************** START of tests for DELETE routes **************

// DELETE /companies - deletes a company with matching handle provided returning {message: "Company deleted"}
describe('DELETE /surveys/:id', async function() {
  test('deletes a survey', async function() {
    const response = await request(app)
      .delete(`/surveys/255`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: 'Survey deleted' });
  });
  test('Responds with 404 if no survey is found', async function() {
    const response = await request(app)
      .delete(`/surveys/888`);
    expect(response.statusCode).toBe(404);
  });
});

describe('DELETE /surveys/question/:id', async function() {
  test('deletes a question', async function() {
    const response = await request(app)
      .delete(`/surveys/question/255`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: 'Question deleted' });
  });
  test('Responds with 404 if no question is found', async function() {
    const response = await request(app)
      .delete(`/surveys/question/888`);
    expect(response.statusCode).toBe(404);
  });
});
/***************** END OF TESTS for DELETE routes *****************/

// Tear Down - removes records from test DB
afterEach(async function() {
  await db.query('DELETE FROM surveys');
});

afterAll(async function() {
  await db.end();
});
