### Survey API
Allows anonymous taking of surveys, responds with JSON
Uses Postgresql

### Setup
1) npm i
2) nodemon

### Endpoints
/surveys (get) To view all surveys
/surveys (post) To add a new survey
/surveys/:id (get) To view one survey by ID
/surveys/take/:id (post) To take a survey by ID
/surveys/results (get) To view results of all surveys
/surveys/results/:id (get) To view results of a specific survey
/surveys/:id (delete) To remove a survey