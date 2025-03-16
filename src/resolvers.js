const { Book, Author } = require("./models")

const resolvers = {
  Query: {
    hello: () => "Olá, mundo GraphQL",
    author: async (_, { id }) => await Author.findById(id),
    authors: async() => await Author.find(),
    book: async (_, { id }) => await Book.findById(id),
    books: async () => await Book.find(),
  },
  Mutation: {
    addBook: async (_, { title, authorId }) => {
      const book = new Book({ title, authorId })
      await book.save()
      return book
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