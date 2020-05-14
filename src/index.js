const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");

require("dotenv").config();
const db = require("./db");

const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

// load model
const models = require("./models");

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
    note(id: ID!): Note!
  }
  type Note {
    id: ID!
    content: String!
    author: String!
  }
  type Mutation {
    newNote(content: String!): Note!
  }
`;

// fungsi untuk menampilkan schema yang dibuat
const resolvers = {
  Query: {
    hello: () => "Hello world",
    notes: async () => {
      return await models.Note.find();
    },
    note: (parent, args) => {
      return notes.find((note) => note.id === args.id);
    },
  },
  Mutation: {
    newNote: async (parent, args) => {
      return await models.Note.create({
        content: args.content,
        author: "Desta Fadilah Topidesta",
      });
    },
  },
};

const app = express();

// connect to database
db.connect(DB_HOST);

// setup server apollo
const server = new ApolloServer({ typeDefs, resolvers });

// Applikasikan GraphQL middleware dan set ke /api
server.applyMiddleware({ app, path: "/api" });

app.listen({ port }, () =>
  console.log(`Listening on port ${port}${server.graphqlPath}`)
);
