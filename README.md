### Survey API
Allows anonymous taking of surveys, responds with JSON. This uses JSON-Server to mock a backend.

### Setup
1) npm i
2) npm start

### Endpoints
1) http://localhost:3000/ (get) To view directory
2) http://localhost:3000/surveys (post) To add a new survey
3) http://localhost:3000/surveys (get) To view all surveys
4) http://localhost:3000/surveys?id=1 (get) To view a survey by ID
5) http://localhost:3000/responses?id=1 (post) To take a survey by ID
6) http://localhost:3000/responses/ (get) To view results of all surveys
7) http://localhost:3000/responses?id=1 (get) To view results of a specific survey

###
In production I would use a relational DB like postgresQL with Express for routing. The schema will consist of three tables - Surveys, Questions, and Responses.

1) Surveys table will have columns - ID (primary key), survey_name.
2) Questions table has - ID (PK), survey_id (foreign_key references surveys), and question_text.
3) Responses table has - ID (PK), question_id (foreign_key references questions), answer (t/f).

This schema allows each survey to have multiple questions, and each question to have multiple anonymous responses. I would also use the JSON schema library to make sure new survey entries are valid. 
