var express = require('express');
var router = express.Router();
var db = require('../dbqueries');

/* GET home page. */
router.get('/', (req, res, next) => {
  db.listBooks()
  .then(books => {
    res.render('index', { books: books });
  }).catch(error => {
    res.render(error)
  })
});

//GET single book
router.get('/book/:id', (req, res) => {
  const id = req.params.id
  db.viewBook(id)
  .then(books => {
    res.render('bookdetail', { books: books})
  } )
})

//POST
router.get('/addbook', (req, res, next) => {
  res.render('addbook');
});

router.post('/addbook', (req, res) => {
  let book = req.body
  db.addBook(book)
  .then(() =>
  res.redirect('/'))
  .catch(error => {
    res.status(500).render('error', {
      error: error,
      message: error.message,
    })
  })
})

//PUT
router.post('/editbook/:id', (req, res) => {
  const id = req.params.id
  const book = req.body
  db.editBook( id, book )
    .then( () =>
      // res.status(201).json({
      //   status: 'success',
      //   message: 'Edited book'
      // })
      res.redirect('/book/' + id)
     )
    .catch( error => {
      res.status(500).render('error', {
        error: error,
        message: error.message,
      })
  })
})


//DELETE
router.post('/book/deletebook/:id', (req, res) => {
  const id  = req.params.id
  db.deleteBook(id)
  .then(() => {
    res.redirect('/')
  }).catch(error => {
    res.status(500).render('error', {
      error: error,
      message: error.message,
    })
  })
})

router.post('/api/test/reset-db') => {

}

module.exports = router;
