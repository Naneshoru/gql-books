const { gql } = require("apollo-server-express")

const typeDefs = gql`
  type Query {
    hello: String
  }

  type Book {
    id: ID!
    title: String!
    author: Author!
    publishedDate: String!
    imageUrl: String
  }

  type Author {
    id: ID!
    name: String!
    books: [Book]
  }

  type Query {
    books: [Book]
    authors: [Author]
    book(id: ID!): Book
    author(id: ID!): Author
  }

  type Mutation {
    addBook(title: String!, authorId: ID!, publishedDate: String!, imageUrl: String): Book
    addAuthor(name: String!): Author
    editBook(id: ID!, title: String, authorId: ID, publishedDate: String, imageUrl: String): Book
  }
`
module.exports = typeDefs;