DROP TABLE IF EXISTS surveys;
DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS responses;

CREATE TABLE surveys (
    id SERIAL PRIMARY KEY,
    survey_name text
);

CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    survey_id int NOT NULL FOREIGN KEY REFERENCES surveys ON DELETE CASCADE,
    question text
);

CREATE TABLE responses (
    id SERIAL PRIMARY KEY,
    question_id int NOT NULL FOREIGN KEY REFERENCES questions,
    answer BOOLEAN 
);

