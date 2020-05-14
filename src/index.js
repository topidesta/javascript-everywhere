const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const app = express();
const port = process.env.PORT || 4000;

app.get("/", (req, res) => res.send("Hello world"));

app.listen(port, () => console.log(`Listening on port ${port}`));
