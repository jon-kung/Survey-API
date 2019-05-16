DROP TABLE IF EXISTS responses;
DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS surveys;

CREATE TABLE surveys (
    id SERIAL PRIMARY KEY,
    survey_name text
);

CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    survey_id int NOT NULL REFERENCES surveys ON DELETE CASCADE,
    question text
);

CREATE TABLE responses (
    id SERIAL PRIMARY KEY,
    question_id int NOT NULL REFERENCES questions ON DELETE CASCADE,
    answer BOOLEAN 
);

