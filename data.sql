DROP TABLE IF EXISTS surveys;
DROP TABLE IF EXISTS responses;

CREATE TABLE surveys (
    id SERIAL PRIMARY KEY,
    category text,
    question text NOT NULL,
    choices BOOLEAN[] NOT NULL
);

CREATE TABLE responses (
    id SERIAL PRIMARY KEY,
    question_id int NOT NULL,
    answer BOOLEAN NOT NULL 
);