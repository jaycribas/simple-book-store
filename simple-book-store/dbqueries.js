var pgp = require('pg-promise')()
var connectionString = 'postgres://localhost:5432/bookstore'
var db = pgp(connectionString)


//add books - one:
const addBook = (book) => {
  return db.none(`
    INSERT INTO
      books (title, author, genre, subgenre, height, publisher)
    VALUES
      ($1, $2)
  `)
}

//see a list of books - any:
const listBooks = () => {
  return db.any(`
    SELECT
      *
    FROM
      books
  `)
}


//edit books - one:
const editBook = (id, title, author, genre, subgenre, height, publisher) => {
  return db.one(`
    UPDATE
      books
    SET
      title = ${title}, author = ${author}, genre = ${genre}, subgenre = ${subgenre}, height = ${height}, publisher = ${publisher}
    WHERE
      id = ${id};
  `)
}


//delete a book - one:
const deleteBook = (id) => {
  return db.any(`
    DELETE FROM
      books
    WHERE
      id = ${id}
  `)
}


//search for books - any:
const searchTitles = (title) => {
  return db.any(`
    SELECT
      *
    FROM
      books
    WHERE
      title = ${title}
  `)
}

const searchAuthors = (author) => {
  return db.any(`
    SELECT
      *
    FROM
      books
    WHERE
      author = ${author}
  `)
}

const searchGenres = (genre) => {
  return db.any(`
    SELECT
      *
    FROM
      books
    WHERE
      genre = ${genre}
  `)
}


//view book details - one:
const viewBook = (id) => {
  return db.one(`
    SELECT
      *
    FROM
      books
    WHERE
      id = ${id}
  `)
}

module.exports = {
  addBook, listBooks, editBook, deleteBook, searchTitles, searchAuthors, searchGenres, viewBook
}
