var pgp = require('pg-promise')()
var connectionString = 'postgres://localhost:5432/bookstore'
var db = pgp(connectionString)

//see a list of books - any:
const listBooks = () => {
  // return Promise.resolve(5)
  return db.any(`
    SELECT
      *
    FROM
      books
  `)
}

// const allBooks = () => `
//     SELECT
//       *
//     FROM
//       books
//   `

const addBook = (book) => {
  return db.one(`
    INSERT INTO
      books (title, author, genre, subgenre, height, publisher)
    VALUES
      ($/title/, $/author/, $/genre/, $/subgenre/, $/height/, $/publisher/)
    RETURNING
      *
  `, book )
}

// const addBook = ({ title, author, genre, subgenre, height, publisher }) => {
//   return db.one(`
//     INSERT INTO
//       books (title, author, genre, subgenre, height, publisher)
//     VALUES
//       ($1, $2, $3, $4, $5, $6)
//     RETURNING
//       *
//   `, [title, author, genre, subgenre, height, publisher])
// }

//edit books - original one:
// const editBook = (id, title, author, genre, subgenre, height, publisher) => {
//   return db.one(`
//     UPDATE
//       books  (title, author, genre, subgenre, height, publisher)
//     SET
//       title = ${title}, author = ${author}, genre = ${genre}, subgenre = ${subgenre}, height = ${height}, publisher = ${publisher}
//     WHERE
//       id = ${id};
//   `)
// }
//new edit book WIP
const editBook = ( id, book ) =>
  db.one(
    pgp.helpers.update( book, null, 'books' ) + ` WHERE id=${id} RETURNING *`
  )

  // const setItems = Object.keys( books ).reduce( (memo, key) => {
  //   memo.push( `${key}=${book[key]}` )
  //
  //   return memo
  // }, []).join( ', ' )
  //
  // const query = `UPDATE books SET ${setItems} WHERE id=${id} RETURNING *`
// return db.one(`
//   UPDATE
//     books
//   SET
//     title = $/title/, author = $/author/, genre = $/genre/, subgenre = $/subgenre/, height = $/height/, publisher = $/publisher/
//   WHERE
//     id = $/id/
//   RETURNING
//     *
// `, book )

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
      title = $1
  `, title)
}

const searchAuthors = (author) => {
  return db.any(`
    SELECT
      *
    FROM
      books
    WHERE
      author = $1
  `, author)
}

const searchGenres = (genre) => {
  return db.any(`
    SELECT
      *
    FROM
      books
    WHERE
      genre = $1
  `, genre)
}


//view book details - one:
const viewBook = (id) => {
  return db.any(`
    SELECT
      *
    FROM
      books
    WHERE
      id = $1
  `, id )
}

module.exports = {
  addBook, listBooks, editBook, deleteBook, searchTitles, searchAuthors, searchGenres, viewBook
}
