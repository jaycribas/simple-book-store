const expect = require ('chai').expect
const index = require ('../routes/index.js')
const db = require('../dbqueries')


describe('listBooks', () => {
  it( 'returns a Promise that resolves with all books in the database', () => {
    return db.listBooks()
      .then( (books) => {
        expect(books).to.be.a('array')
      })
  })
})
