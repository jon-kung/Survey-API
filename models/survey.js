//Survey model
const db = require('../db');
const APIError = require('../helpers/APIError');

class Survey {
  // Users should be able to create a survey
  static async create( surveyName ) {
    const result = await db.query(
      `INSERT INTO surveys (survey_name) VALUES ($1) RETURNING *`,
      [surveyName]
    );
    return result.rows[0];
  }

  // Users should be able to view all surveys
  static async getSurveys() {
    const result = await db.query(
      `SELECT * FROM surveys`
    );
    // This will catch errors if there are no results
    if (result.rows.length === 0) {
      throw new APIError(`No surveys found, please create a survey.`);
    }
    return result.rows;
  }

  // // Users should be able to get a survey by ID
  // static async getSurveyById(id) {
  //   const result = await db.query(`SELECT * FROM surveys WHERE id=$1`, [id]);
  //   // This will catch errors if there are no results
  //   if (result.rows.length === 0) {
  //     throw new APIError(`No survey found with that id :(`);
  //   }
  //   return result.rows[0];
  // }

  // Users should be able to view all survey results
  static async getSurveyResults() {
    const result = await db.query(
      `SELECT survey_id, responses.id, question_id, COUNT(answer), answer FROM responses 
      JOIN questions ON questions.id = responses.question_id
      JOIN surveys ON surveys.id = questions.survey_id
      GROUP BY responses.id, question_id, survey_id, answer
      ORDER BY survey_id;
      `   );
    // This will catch errors if there are no results
    if (result.rows.length === 0) {
      throw new APIError(`No responses found, please take a survey :)`);
    }
    return result.rows;
  }

  // TESTING -- should return all survey responses from a survey
  static async getSurveyResultById(id) {
    let result;
    if (!Object.keys(id)) {
      // If no ID is provided, returns category question and answers for all surveys
      result = await db.query(
        `SELECT survey_id, responses.id, question_id, COUNT(answer), answer FROM responses 
        JOIN questions ON questions.id = responses.question_id
        JOIN surveys ON surveys.id = questions.survey_id
        GROUP BY responses.id, question_id, survey_id, answer
        ORDER BY survey_id;
        `
      );
      return result.rows;
    }
    //Else returns question ID and number of True/False answers based on question ID provided
    result = await db.query(
      `SELECT survey_id, responses.id, question_id, COUNT(answer), answer FROM responses 
      JOIN questions ON questions.id = responses.question_id
      JOIN surveys ON surveys.id = questions.survey_id
      WHERE survey_id = $1
      GROUP BY responses.id, question_id, survey_id, answer
      `,
      [id]
    );
    if (result.rows.length === 0) {
      throw new APIError(`No survey found with that ID :(`);
    }
    return result.rows;
  }

  // remove a survey from the database
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
