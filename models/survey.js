//Survey model
const db = require('../db');
const app = require('../app');
const sqlForPartialUpdate = require('../helpers/sqlForPartialUpdate');
const APIError = require('../helpers/APIError');

class Survey {
  // This method creates a new job for our jobs table, returning the new job record
  static async create({ title, question, choices }) {
    const result = await db.query(
      `INSERT INTO surveys (title, question, choices) VALUES ($1, $2, $3) RETURNING *`,
      [title, question, choices]
    );
    return result.rows[0];
  }

  // getSurveys hsould return all surveys - title, question, choices
  static async getSurveys() {
    const result = await db.query(
      `SELECT title, question, choices FROM surveys`
    );
    // This will catch errors if there are no results
    if (result.rows.length === 0) {
      throw new APIError(`No surveys found, please create a survey.`);
    }
    return result.rows[0];
  }

  // getSurveyById returns a single survey found by its unique id
  static async getSurveyById(id) {
    const result = await db.query(`SELECT * FROM surveys WHERE id=$1`, [id]);
    // This will catch errors if there are no results
    if (result.rows.length === 0) {
      throw new APIError(`No survey found with that id :(`);
    }
    return result.rows[0];
  }

  // Users should be able to take survey
  static async updateSurveyAnswers({ id, answers }) {
    let items = { id, answers };
    let createdSQL = sqlForPartialUpdate('surveys', items, 'id', items.id);
    const result = await db.query(createdSQL.query, createdSQL.values);
    // const result = await db.query(`INSERT INTO surveys (answers) VALUES $1`, [answers])

    if (result.rows.length === 0) {
      throw new APIError(`No survey could be updated, no survey found :(`);
    }
    return result.rows[0];
  }

  static async getSurveyResults() {

    const result = await db.query(
      `SELECT title, question, answers FROM surveys`
    );
    // This will catch errors if there are no results
    if (result.rows.length === 0) {
      throw new APIError(`No surveys found, please create a survey.`);
    }
    return result.rows[0];
  }

  // This method searches for jobs based on query string, or returns all jobs
  // Should return JSON of {jobs: [jobData, ...]}
  static async getSurveyResultById(id) {
    let result;

    if (!Object.keys(id)) {
      // Returns title question and choices for all surveys
      result = await db.query(`SELECT title, question, choices FROM surveys`);
      return result.rows;
    }

    //Else returns title, question, and answers where search string matches title
    result = await db.query(
      `SELECT title, question, answers FROM surveys WHERE id=$1`,
      [id]
    );

    return result.rows;
  }

  // delete should remove a survey from the database
  static async delete(id) {
    const result = await db.query(
      `DELETE FROM surveys WHERE id=$1 RETURNING *`,
      [id]
    );
    if (result.rows.length === 0) {
      throw new APIError(`Survey doesn't exist, or already deleted? :(`);
    }
    return result.rows[0];
  }
}

module.exports = Survey;
