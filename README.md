### Survey API
Allows anonymous taking of surveys, responds with JSON
Uses Postgresql

### Setup for Postgresql
1) Install Homebrew if needed:

$/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

2) Install Postgresql
$brew install postgresql

3) Make sure postgres is started and running
$pg_ctl -D /usr/local/var/postgres start && brew services start postgresql

4) psql createdb survey-test
5) psql survey-test < data.sql

### Setup
1) npm i
2) npm start

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

## Running Tests
$npm test