const { Book, Author } = require("./models")

const resolvers = {
  Query: {
    books: async () => await Book.find(),
    authors: async() => await Author.find(),
    book: async (_, { id }) => await Book.findById(id),
    author: async (_, { id }) => await Author.findById(id),
  },
  Mutation: {
    addBook: async (_, { title, authorId, publishedDate, imageUrl, downloadUrl }) => {
      const book = new Book({ title, authorId, publishedDate, imageUrl, downloadUrl })
      await book.save()
      return book
    },

    editBook: async (_, { id, title, authorId, publishedDate, imageUrl, downloadUrl }) => {
      const book = await Book.findById(id)
      if (!book) {
        throw new Error('Book not found')
      }

      const updatedFields = {}

      if (title != null) { updatedFields.title = title }
      if (authorId != null) { updatedFields.authorId = authorId }
      if (publishedDate != null) { updatedFields.publishedDate = publishedDate }
      if (imageUrl != null) { updatedFields.imageUrl = imageUrl }
      if (downloadUrl != null) { updatedFields.downloadUrl = downloadUrl }

      await Book.updateOne(
        { _id: id }, 
        { $set: updatedFields }
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