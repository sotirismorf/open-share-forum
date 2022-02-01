CREATE DATABASE thmmy;

CREATE TABLE users (
    id        SERIAL  PRIMARY KEY,
    username  TEXT    NOT NULL UNIQUE,
	name      TEXT    NOT NULL
);

CREATE TABLE posts (
    id       SERIAL    PRIMARY KEY,
	title    TEXT      NOT NULL,
	date     TIMESTAMP NOT NULL DEFAULT NOW(),
    author   INT       NOT NULL REFERENCES users,
    body     TEXT      NOT NULL
);

CREATE TABLE comments (
	id       SERIAL     PRIMARY KEY,
	post     INT        NOT NULL  REFERENCES posts,
	date     TIMESTAMP  NOT NULL  DEFAULT NOW(),
    author   INT        NOT NULL  REFERENCES users,
    body     TEXT      	NOT NULL
);

CREATE TABLE passwords (
	id       SERIAL     PRIMARY KEY,
    password TEXT      	NOT NULL
);

CREATE TABLE files (
	id            SERIAL     PRIMARY KEY,
    author        INT        NOT NULL  REFERENCES users,
	date          TIMESTAMP  NOT NULL  DEFAULT NOW(),
    name          TEXT       NOT NULL,
    filetype      TEXT       NOT NULL,
    description   TEXT,
    detail        TEXT,
    course        INT        NOT NULL REFERENCES courses,
	year          INT,
	is_exam       BOOLEAN   NOT NULL DEFAULT false,
	exam_semester INT,
	has_solutions BOOLEAN   NOT NULL DEFAULT false
);

CREATE TABLE courses (
	id              SERIAL PRIMARY KEY,
	name            TEXT   NOT NULL,
	semester        INT    NOT NULL,
	study_cycle     INT    NOT NULL,
	description     TEXT
);

CREATE TABLE professors (
	id  SERIAL PRIMARY KEY,
	name TEXT NOT NULL,
	email TEXT NOT NULL,
	bio TEXT
);

INSERT INTO users(username, name)
VALUES ('sotirismorf', 'Sotiris Morfakidis')
RETURNING *;

INSERT INTO posts(title, author, body)
VALUES ('First post', 1, 'this is the first post of the database')
RETURNING *;

INSERT INTO comments (post, author, body)
VALUES (1, 1, 'this is the first comment of the database')
RETURNING *;

INSERT INTO files
(author,name,filetype,description,detail,course,year,is_exam,exam_semester,has_solutions)
VALUES (1,'first post','pdf','simple descr','omadaA',3,2022,false,0,false)
RETURNING *;

INSERT INTO courses (name, semester, study_cycle, description)
VALUES ('Εφαρμοσμένα Μαθηματικά', 1, 3, 'maths')
RETURNING *;
