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

  let surveys = surveyData.rows[0];
  let questions = questionData.rows[0];
  let responses = responseData.rows[0];
});

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
/////

// describe('GET query string params', async function() {
//   // TESTING route for getting specific companies with a search query
//   describe('GET /companies?search', async function() {
//     test('gets specific company(s) with query of name or handle', async function() {
//       const response = await request(app)
//         .get(`/companies?search=testCompany`)
//         .send({ _token: auth.token });
//       expect(response.statusCode).toBe(200);
//       expect(response.body.companies[0].name).toBe('testCompany');
//     });
//     // Testing for no results from query
//     test('Responds with 200 if no company is found', async function() {
//       const response = await request(app)
//         .get(`/companies?search=BADSEARCH`)
//         .send({ _token: auth.token });
//       expect(response.statusCode).toBe(200);
//       expect(response.body.companies).toEqual([]);
//     });
//   });

//   // TESTING route to find a company with min employee count of query
//   describe('GET /companies?min_employees', async function() {
//     test('gets specific company(s) with query of min_employees', async function() {
//       const response = await request(app)
//         .get(`/companies?min_employees=99`)
//         .send({ _token: auth.token });
//       expect(response.statusCode).toBe(200);
//       expect(response.body.companies[0].name).toBe('testCompany');
//     });
//     // Testing for no results from query
//     test('Responds with 200 if no company is found', async function() {
//       const response = await request(app)
//         .get(`/companies?min_employees=101`)
//         .send({ _token: auth.token });
//       expect(response.statusCode).toBe(200);
//       expect(response.body.companies).toEqual([]);
//     });
//   });

//   // TESTING route to find a company with max employee count of query
//   describe('GET /companies?max_employees', async function() {
//     test('gets specific company(s) with query of max_employees', async function() {
//       const response = await request(app)
//         .get(`/companies?max_employees=101`)
//         .send({ _token: auth.token });
//       expect(response.statusCode).toBe(200);
//       expect(response.body.companies[0].name).toBe('testCompany');
//     });
//     // Testing for no results from query
//     test('Responds with 200 if no company of such requirements exists', async function() {
//       const response = await request(app)
//         .get(`/companies?max_employees=99`)
//         .send({ _token: auth.token });
//       expect(response.statusCode).toBe(200);
//       expect(response.body.companies).toEqual([]);
//     });
//   });

//   // TESTING route for both min and max employee count filter
//   describe('GET /companies/min_employees&max_employees', async function() {
//     test('gets specific company(s) with query of both min and max_employees', async function() {
//       const response = await request(app)
//         .get(`/companies?min_employees=99&max_employees=101`)
//         .send({ _token: auth.token });
//       expect(response.statusCode).toBe(200);
//       expect(response.body.companies[0].name).toBe('testCompany');
//     });
//     // Testing for failure if user error - min > max employee count
//     test('Responds with 400 if query params are incorrect', async function() {
//       const response = await request(app)
//         .get(`/companies?min_employees=101&max_employees=99`)
//         .send({ _token: auth.token });
//       expect(response.statusCode).toBe(400);
//     });
//   });
// });

// // TESTING route for getting specific company with a handle
// describe('GET /companies/handle', async function() {
//   test('gets specific company with specific handle', async function() {
//     const response = await request(app)
//       .get(`/companies/testHandle`)
//       .send({ _token: auth.token });
//     expect(response.statusCode).toBe(200);
//     console.log(
//       `Inside test for companies/handle GET, response is`,
//       response.body
//     );
//     expect(response.body.company.name).toBe('testCompany');
//   });
//   // Testing for failures if no company is found with handle provided
//   test('Responds with 404 if no company is found with handle provided', async function() {
//     const response = await request(app)
//       .get(`/companies/BADHANDLE`)
//       .send({ _token: auth.token });
//     expect(response.statusCode).toBe(404);
//   });

//   // TODO- more reqs for query string - what if they search for multiple query string params?
// });

// /***************** END OF GET companies tests *****************/

// // POST /companies - create company from data; return {company: companyData}
// describe('POST /companies', async function() {
//   test('creates a new company', async function() {
//     const response = await request(app)
//       .post(`/companies`)
//       .send({
//         handle: 'banana',
//         name: 'bananaCompany',
//         num_employees: 500,
//         description: 'this is bananas',
//         logo_url: 'https://bananalogo.com',
//         _token: auth.token
//       });
//     expect(response.statusCode).toBe(200);
//     expect(response.body.company.name).toBe('bananaCompany');
//     expect(response.body.company.handle).toBe('banana');
//     expect(response.body.company.num_employees).toBe(500);
//     expect(response.body.company.description).toBe('this is bananas');
//     // JSON schema validator will validate for bad user data
//   });
//   test('Responds with 409 if handle is not unique', async function() {
//     const response = await request(app)
//       .post(`/companies`)
//       .send({ handle: 'testHandle', name: 'testCompany', _token: auth.token });
//     expect(response.statusCode).toBe(409);
//   });
// });

// // PATCH /companies - updates company from specific handle provided in url, return {company: companyData}
// describe('PATCH /companies/:handle', async function() {
//   test('updates a company', async function() {
//     const response = await request(app)
//       .patch(`/companies/testHandle`)
//       .send({
//         handle: 'testHandle',
//         name: 'bananaCompany',
//         num_employees: 1000,
//         description: 'this is updated',
//         logo_url: 'https://bananalogo.com',
//         _token: auth.token
//       });
//     expect(response.statusCode).toBe(200);
//     expect(response.body.company.name).toBe('bananaCompany');
//     expect(response.body.company.num_employees).toBe(1000);
//     expect(response.body.company.description).toBe('this is updated');
//     // JSON schema validator will validate for bad user data
//   });
//   test('Responds with 404 if no company is found', async function() {
//     const response = await request(app)
//       .patch(`/companies/BADHANDLE`)
//       .send({ _token: auth.token });
//     expect(response.statusCode).toBe(404);
//   });
// });

// // DELETE /companies - deletes a company with matching handle provided returning {message: "Company deleted"}
// describe('DELETE /companies', async function() {
//   test('deletes a company', async function() {
//     const response = await request(app)
//       .delete(`/companies/testHandle`)
//       .send({ _token: auth.token });
//     expect(response.statusCode).toBe(200);
//     expect(response.body).toEqual({ message: 'Company deleted' });
//   });
//   test('Responds with 404 if no company is found', async function() {
//     const response = await request(app)
//       .delete(`/companies/BADHANDLE`)
//       .send({ _token: auth.token });
//     expect(response.statusCode).toBe(404);
//   });
// });
/***************** END OF POST/PATCH/DELETE companies tests *****************/

// Tear Down - removes records from test DB
afterEach(async function() {
  // await db.query('DELETE FROM responses');
  // await db.query('DELETE FROM questions');
  await db.query('DELETE FROM surveys WHERE id = 255');
});

afterAll(async function() {
  await db.end();
});
