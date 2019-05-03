### Survey API
Allows anonymous taking of surveys, responds with JSON
Uses Postgresql

### Setup
1) npm i
2) nodemon

### Endpoints
1) /surveys (get) To view all surveys
2) /surveys (post) To add a new survey
3) /surveys/:id (get) To view one survey by ID
4) /surveys/take/:id (post) To take a survey by ID
5) /surveys/results (get) To view results of all surveys
6) /surveys/results/:id (get) To view results of a specific survey
7) /surveys/:id (delete) To remove a survey