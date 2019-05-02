DROP TABLE IF EXISTS surveys;

CREATE TABLE surveys (
    id SERIAL PRIMARY KEY,
    title text,
    question text NOT NULL,
    choices BOOLEAN NOT NULL,
    answers BOOLEAN[]
);