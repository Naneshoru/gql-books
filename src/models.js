const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  authorId:  { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
  publishedDate: { type: Date, required: true },
  imageUrl: { type: String, required: false },
});

const authorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  books: [{ type: mongoose.Schema.Types.ObjectId }]
});

const Book = mongoose.model('Book', bookSchema);
const Author = mongoose.model('Author', authorSchema);

module.exports = { Book, Author };
