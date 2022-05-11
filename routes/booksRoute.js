const express = require('express');
const fs = require('fs');
const { nanoid } = require('nanoid');

const router = express.Router();

router.get('/books', (req, res) => {
  fs.readFile('books.json', (err, data) => {
    if (err) {
      console.log(err);
    }
    const books = JSON.parse(data);
    res.render('books', { title: 'Our books', books });
  });
});

router.get('/books/:id', (req, res) => {
  const { id } = req.params;
  fs.readFile('books.json', (err, data) => {
    if (err) {
      console.log(err);
    }
    const selectedBook = JSON.parse(data).find(book => book.id === id);
    res.render('book', { title: 'Book details', selectedBook });
  });
});

router.get('/add', (req, res) => {
  res.render('add', { title: 'Add book' });
});

router.post('/add', (req, res) => {
  fs.readFile('books.json', (err, data) => {
    if (err) {
      console.log(err);
    }
    const books = JSON.parse(data);
    books.push({
      ...req.body,
      id: nanoid(),
      isAvailable: req.body.isAvailable === 'available' ? true : false,
    });
    fs.writeFile('books.json', JSON.stringify(books, null, 2), err => {
      if (err) {
        console.log(err);
      }
    });
    res.redirect('/books');
  });
});
module.exports = router;
