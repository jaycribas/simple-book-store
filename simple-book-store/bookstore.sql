DROP DATABASE IF EXISTS bookstore;
CREATE DATABASE bookstore;

\c bookstore;

CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(140),
  author VARCHAR(140),
  genre VARCHAR(140),
  subgenre VARCHAR(140),
  height INTEGER,
  publisher VARCHAR(140)
)
