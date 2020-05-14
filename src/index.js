const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");

// load model
const models = require("./models");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

require("dotenv").config();
const db = require("./db");

const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

let notes = [
  { id: "1", content: "The First Content", author: "Topidesta" },
  { id: "2", content: "The Second Content", author: "Desta" },
  { id: "3", content: "The Third Content", author: "Fadilah" },
];

const app = express();

// connect to database
db.connect(DB_HOST);

// setup server apollo
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    // add db models
    return { models };
  },
});

// Applikasikan GraphQL middleware dan set ke /api
server.applyMiddleware({ app, path: "/api" });

app.listen({ port }, () =>
  console.log(`Listening on port ${port}${server.graphqlPath}`)
);
