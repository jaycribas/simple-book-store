var express = require('express');
var router = express.Router();
var db = require('../dbqueries');

/* GET home page. */
router.get('/', function(req, res, next) {
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
//PUT
//DELETE
module.exports = router;
