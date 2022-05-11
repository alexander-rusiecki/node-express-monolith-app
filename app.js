const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const booksRoute = require('./routes/booksRoute');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(morgan('tiny'));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(booksRoute);

app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

app.use((req, res) => {
  res.status(404).render('404', { title: '404 - Not found' });
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
