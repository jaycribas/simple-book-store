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
//GET
//POST
router.post('/addbook', (req, res) => {
  const book = req.body
  console.log('book --->', book)
  db.addBook(book)
  .then( id =>
    res.redirect(`/${id}`)
  ).catch(error => {
    res.status(500).render('error', {
      error: error,
      message: error.message,
    })
  })
})
//PUT
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
