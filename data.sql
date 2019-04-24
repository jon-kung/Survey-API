DROP TABLE IF EXISTS surveys;

CREATE TABLE surveys (
    id SERIAL PRIMARY KEY,
    title text NOT NULL,
    questions text NOT NULL,
    choices BOOLEAN NOT NULL,
    answers BOOLEAN
);