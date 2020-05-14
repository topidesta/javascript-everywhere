const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const port = process.env.PORT || 4000;

// buat sebuah skema dengan GraphQL
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// fungsi untuk menampilkan schema yang dibuat
const resolvers = {
  Query: {
    hello: () => "Hello world",
  },
};

const app = express();

// setup server apollo
const server = new ApolloServer({ typeDefs, resolvers });

// Applikasikan GraphQL middleware dan set ke /api
server.applyMiddleware({ app, path: "/api" });

app.listen({ port }, () =>
  console.log(`Listening on port ${port}${server.graphqlPath}`)
);
