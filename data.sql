DROP TABLE IF EXISTS surveys;

CREATE TABLE surveys (
    id SERIAL PRIMARY KEY,
    question text NOT NULL,
    choices BOOLEAN NOT NULL,
    answers BOOLEAN[]
);