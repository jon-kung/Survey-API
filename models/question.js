//Questions model
const db = require('../db');
const APIError = require('../helpers/APIError');

class Question {
  // Users should be able to create a question for a survey
  static async create({ surveyId, question }) {
    const result = await db.query(
      `INSERT INTO questions (survey_id, question) VALUES ($1, $2) RETURNING *`,
      [surveyId, question]
    );
    return result.rows[0];
  }

  // // Users should be able to view all questions
  // static async getQuestions() {
  //   const result = await db.query(
  //     `SELECT * FROM questions`
  //   );
  //   // This will catch errors if there are no results
  //   if (result.rows.length === 0) {
  //     throw new APIError(`No questions found, please create a survey.`);
  //   }
  //   return result.rows;
  // }

  // Users should be able to see all questions from a specific survey
  static async getQuestionsFromSurvey(surveyId) {
    const result = await db.query(`SELECT * FROM questions WHERE survey_id=$1`, [surveyId]);
    // This will catch errors if there are no results
    if (result.rows.length === 0) {
      throw new APIError(`No survey found with that id :(`);
    }
    return result.rows;
  }

  // Users should be able to answer a survey's questions
  static async answerQuestion( questionId, answer ) {
    const result = await db.query(
      `INSERT INTO responses (question_id, answer) VALUES( $1, $2 ) RETURNING *`,
      [questionId, answer]
    );
    if (result.rows.length === 0) {
      throw new APIError(`No question found with that ID :(`);
    }
    return result.rows[0];
  }

  // delete should remove a question from the database
  static async delete(id) {
    const result = await db.query(
      `DELETE FROM questions WHERE id=$1 RETURNING *`,
      [id]
    );
    if (result.rows.length === 0) {
      throw new APIError(`Question doesn't exist, or already deleted? :(`);
    }
    return result.rows[0];
  }
}

module.exports = Question;
