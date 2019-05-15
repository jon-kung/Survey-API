### Survey API
Allows anonymous taking of surveys, responds with JSON
Uses Postgresql

### Setup
1) npm i
2) nodemon

### Endpoints
1) /surveys (GET) To view all available surveys
2) /surveys/:id (GET) To view all questions from a specific survey using a survey id
3) /surveys/results (GET) To view results of all surveys
4) /surveys/results/:id (GET) To view results of a specific survey using a survey id

5) /surveys (POST) To add a new survey
6) /surveys/:id (POST) To add a question under a specific survey's id
7) /surveys/take/:id (POST) To take a survey's question using a question id

8) /surveys/:id (DELETE) To remove a survey
9) /surveys/question/:id (DELETE) To remove a question

## Pending features
Integration tests for routes
Seed file for dummy/test data