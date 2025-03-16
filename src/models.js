const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: String,
  authorId: String,
});

const AuthorSchema = new mongoose.Schema({
  name: String,
});

const Book = mongoose.model('Book', BookSchema);
const Author = mongoose.model('Author', AuthorSchema);

module.exports = { Book, Author };
