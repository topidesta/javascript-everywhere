const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const port = process.env.PORT || 4000;

let notes = [
  { id: "1", content: "The First Content", author: "Topidesta" },
  { id: "2", content: "The Second Content", author: "Desta" },
  { id: "3", content: "The Third Content", author: "Fadilah" },
];

// buat sebuah skema dengan GraphQL
const typeDefs = gql`
  type Query {
    hello: String!
    notes: [Note!]!
  }
  type Note {
    id: ID!
    content: String!
    author: String!
  }
`;

// fungsi untuk menampilkan schema yang dibuat
const resolvers = {
  Query: {
    hello: () => "Hello world",
    notes: () => notes,
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
