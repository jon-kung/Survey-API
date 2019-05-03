//Survey model
const db = require('../db');
const APIError = require('../helpers/APIError');

class Survey {
  // Users should be able to create a survey
  static async create({ category, question, choices }) {
    const result = await db.query(
      `INSERT INTO surveys (category, question, choices) VALUES ($1, $2, $3) RETURNING *`,
      [category, question, choices]
    );
    return result.rows[0];
  }

  // Users should be able to view all surveys
  static async getSurveys() {
    const result = await db.query(
      `SELECT category, question, choices FROM surveys`
    );
    // This will catch errors if there are no results
    if (result.rows.length === 0) {
      throw new APIError(`No surveys found, please create a survey.`);
    }
    return result.rows[0];
  }

  // Users should be able to get a survey by ID
  static async getSurveyById(id) {
    const result = await db.query(`SELECT * FROM surveys WHERE id=$1`, [id]);
    // This will catch errors if there are no results
    if (result.rows.length === 0) {
      throw new APIError(`No survey found with that id :(`);
    }
    return result.rows[0];
  }

  // Users should be able to take survey
  static async updateSurveyAnswers({ questionId, answer }) {
    const result = await db.query(
      `INSERT INTO responses (question_id, answer) VALUES( $1, $2 ) RETURNING *`,
      [questionId, answer]
    );
    if (result.rows.length === 0) {
      throw new APIError(`No survey could be updated, no survey found :(`);
    }
    return result.rows[0];
  }

  // Users should be able to view survey results
  // { id : 1 , yes : 0 , no : 5 }

  static async getSurveyResults() {
    const result = await db.query(
      `SELECT question_id, COUNT(answer), answer FROM responses GROUP BY question_id, answer`
    );
    // This will catch errors if there are no results
    if (result.rows.length === 0) {
      throw new APIError(`No responses found, please take a survey :)`);
    }
    return result.rows[0];
  }

  ///////// TEST THIS //////////////////
  static async getSurveyResultById(questionId) {
    let result;
    if (!Object.keys(questionId)) {
      // Returns category question and answers for all surveys
      result = await db.query(
        `SELECT question_id, COUNT(answer), answer FROM responses GROUP BY question_id, answer
        `
      );
      return result.rows;
    }
    //Else returns  question ID and answers based on question ID provided
    result = await db.query(
      `SELECT question_id, COUNT(answer), answer FROM responses WHERE question_id = $1 GROUP BY question_id, answer
      `,
      [questionId]
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
