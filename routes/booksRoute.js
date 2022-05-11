const express = require('express');

const {
  getAllBooks,
  getBookById,
  borrowBook,
  addBook,
} = require('../controllers/bookControllers');

const router = express.Router();

router.get('/books', getAllBooks);
router.get('/books/:id', getBookById);
router.post('/borrow/:id', borrowBook);
router.post('/add', addBook);

module.exports = router;
