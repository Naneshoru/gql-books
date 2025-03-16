const { Book, Author } = require("./models")

const resolvers = {
  Query: {
    hello: () => "Olá, mundo GraphQL",
    authors: async() => await Author.find(),
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
  }
}

module.exports = resolvers