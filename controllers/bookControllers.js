const fs = require('fs');
const { nanoid } = require('nanoid');

const getAllBooks = (req, res) => {
  fs.readFile('books.json', (err, data) => {
    if (err) {
      console.log(err);
    }
    const books = JSON.parse(data);
    res.render('books', { title: 'Our books', books });
  });
};

getBookById = (req, res) => {
  const { id } = req.params;
  fs.readFile('books.json', (err, data) => {
    if (err) {
      console.log(err);
    }
    const selectedBook = JSON.parse(data).find(book => book.id === id);
    res.render('book', { title: selectedBook.title, selectedBook });
  });
};

const borrowBook = (req, res) => {
  const { id } = req.params;
  fs.readFile('books.json', (err, data) => {
    if (err) {
      console.log(err);
    }
    let books = JSON.parse(data);
    let selectedBook = JSON.parse(data).find(book => book.id === id);
    selectedBook = {
      ...selectedBook,
      isAvailable: !selectedBook.isAvailable,
    };
    books = books.filter(book => book.id !== id);
    books = [...books, selectedBook];
    fs.writeFile('books.json', JSON.stringify(books, null, 2), err => {
      if (err) {
        console.log(err);
      }
      res.redirect('/books');
    });
  });
};

const addBook = (req, res) => {
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
      res.redirect('/books');
    });
  });
};

module.exports = {
  getAllBooks,
  getBookById,
  borrowBook,
  addBook,
};
