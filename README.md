### Survey API
Allows anonymous taking of surveys, responds with JSON
Uses JSON server

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
