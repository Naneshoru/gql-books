const express = require("express")

require("dotenv").config()

const connectDB = require("./src/db.js")
connectDB()

const cors = require("cors");

const proxy = require("./src/proxy.js")

const app = express()

app.use(cors())

app.use(express.json())

app.use('/proxy', proxy)

const { ApolloServer } = require("apollo-server-express")

const typeDefs = require("./src/schemas.js")

const resolvers = require("./src/resolvers.js")

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers
  })
  await server.start()
  server.applyMiddleware({ app })

  app.listen('3000', () => {
    console.log('Listening port 3000')
  })
}

startServer()