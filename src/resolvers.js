const { Book, Author } = require("./models")

const resolvers = {
  Query: {
    books: async () => await Book.find(),
    authors: async() => await Author.find(),
    book: async (_, { id }) => await Book.findById(id),
    author: async (_, { id }) => await Author.findById(id),
  },
  Mutation: {
    addBook: async (_, { title, authorId, publishedDate, imageUrl }) => {
      const book = new Book({ title, authorId, publishedDate, imageUrl })
      await book.save()
      return book
    },

    editBook: async (_, { id, title, authorId, publishedDate, imageUrl }) => {
      const book = await Book.findById(id)
      if (!book) {
        throw new Error('Book not found')
      }
      await Book.updateOne(
        { _id: id }, 
        { title, authorId, publishedDate, imageUrl }
      )

      const updatebook = await Book.findById(id)

      return updatebook
    },

    addAuthor: async (_, { name }) => {
      const author = new Author({ name })
      await author.save()
      return author
    }
  },

  Book: {
    author: async (book) => await Author.findById(book.authorId)
  },
  Author: {
    books: async (author) => await Book.find({ authorId: author.id })
  }
}

module.exports = resolvers