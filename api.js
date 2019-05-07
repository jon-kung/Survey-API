import axios from 'axios';
const BASE_API_URL = 'http://localhost:3000';

// API Should Support:
// Creating a survey
// Taking a Survey
// Getting Results of a Survey
// A survey should consist of survey questions and each question should have yes/no (true/false) answers

class SurveyApi {
  // Create a survey
  static async addSurvey(surveyName, questions) {
    let data = {surveyName, questions}
    const result = await axios.post(`${BASE_API_URL}/surveys`, data, 'post');
    return result.data;
  }

  // Show all surveys
  static async getSurveys() {
    const result = await axios.get(`${BASE_API_URL}/surveys`);
    return result.data;
  }
  // Show one survey with all its questions
  static async getSurveyById(surveyId){
    const result = await axios.get(`${BASE_API_URL}/surveys?id=${surveyId}`);
    return result.data;
  }
  // Take a survey - adds data to responses
  static async takeSurvey(surveyId, questionId, answer) {
    let data = {surveyId, questionId, answer}
    const result = await axios.post(`${BASE_API_URL}/responses`, data, 'post');
    return result.data;
  }

  // Shows all survey responses
  static async getAllResults() {
    const result = await axios.get(`${BASE_API_URL}/responses`);
    return result.data;
  }

  // Shows a specific response by survey id
  static async getResult(surveyId) {
    const result = await axios.get(`${BASE_API_URL}/responses?id=${surveyId}`);
    return result.data;
  }

}

export default SurveyApi;