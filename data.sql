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

INSERT INTO surveys (id, survey_name) VALUES( 1, 'First Survey' );
INSERT INTO surveys (id, survey_name) VALUES( 2, 'Second Survey' );

INSERT INTO questions (id, survey_id, question) VALUES( 1, 1, 'Do you like testing?');
INSERT INTO questions (id, survey_id, question) VALUES( 2, 1, 'Do you like not testing?');
INSERT INTO questions (id, survey_id, question) VALUES( 3, 2, 'Do you like cake?');
INSERT INTO questions (id, survey_id, question) VALUES( 4, 2, 'Do you like pie?');

INSERT INTO responses (id, question_id, answer) VALUES( 1, 1, false );
INSERT INTO responses (id, question_id, answer) VALUES( 2, 2, true );
INSERT INTO responses (id, question_id, answer) VALUES( 3, 3, true );
INSERT INTO responses (id, question_id, answer) VALUES( 4, 4, true );
