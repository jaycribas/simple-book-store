var express = require('express');
var router = express.Router();
var db = require('../dbqueries');

/* GET home page. */
router.get('/', (req, res, next) => {
  db.listBooks()
  .then(books => {
    // console.log('books:', books)
    res.render('index', { books: books });
  }).catch(error => {
    res.render(error)
  })
});

//GET title
router.get('/title/:title', (req, res) => {
  const title = req.params.title
  console.log(title)
  db.searchTitles(title)
  .then(books => {
    res.render('index', { books: books})
  } )
})

//GET author
router.get('/author/:author', (req, res) => {
  const author = req.params.author
  console.log(author)
  db.searchAuthors(author)
  .then(books => {
    res.render('index', { books: books})
  } )
})

//GET genre
router.get('/genre/:genre', (req, res) => {
  const genre = req.params.genre
  console.log(genre)
  db.searchGenres(genre)
  .then(books => {
    res.render('index', { books: books})
  } )
})

//POST

router.post('/addbook', (req, res) => {
  let book = req.body
  console.log('book --->', book)
  db.addBook(book)
  .then(() =>
  res.status(200)
    .json({
      status: 'success',
      message: 'Added book'
    }))
  // res.redirect('/'))
  .catch(error => {
    res.status(500).render('error', {
      error: error,
      message: error.message,
    })
  })
})

//PUT
router.put('/editbook/:id', (req, res) => {
  let book = req.body
  const id = req.params.id
  console.log(book)
  db.editBook(id, book)
  .then(() =>
  res.status(200)
    .json({
      status: 'success',
      message: 'Edited book'
    }))
  .catch(error => {
    res.status(500).render('error', {
      error: error,
      message: error.message,
    })
  })
})


//DELETE

router.delete('/deletebook/:id', (req, res) => {
  const id  = req.params.id
  db.deleteBook(id)
  .then(() => {
    res.status(200)
      .json({
        status: 'success',
        message: `Removed book`
      })
  }).catch(error => {
    res.status(500).render('error', {
      error: error,
      message: error.message,
    })
  })
})
module.exports = router;
