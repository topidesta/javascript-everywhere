const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const db = require("./db");
const models = require("./models");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;
const helmet = require("helmet");
const cors = require("cors");
const depthLimit = require("graphql-depth-limit");
const { createComplexityLimitRule } = require("graphql-validation-complexity");

const app = express();
app.use(helmet());
app.use(cors());

// connect to database
db.connect(DB_HOST);

const getUser = (token) => {
  if (token) {
    try {
      // return jwt token
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      throw new Error("Session Salah");
    }
  }
};

// setup server apollo
const server = new ApolloServer({
  typeDefs,
  resolvers,
  validationRules: [depthLimit(5), createComplexityLimitRule(1000)],
  context: ({ req }) => {
    // get token from headers
    const token = req.headers.authorization;
    // ambil token dari user
    const user = await getUser(token);
    // console.log(user);
    // add db models
    return { models, user };
  },
});

// Applikasikan GraphQL middleware dan set ke /api
server.applyMiddleware({ app, path: "/api" });

app.listen({ port }, () =>
  console.log(`Listening on port ${port}${server.graphqlPath}`)
);
