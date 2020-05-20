import React from "react";
import Pages from "./pages";

// global styled
import GlobalStyles from "./components/GlobalStyle";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const uri = process.env.API_URI;
const cache = new InMemoryCache();

// config applo clinet
const client = new ApolloClient({
  uri,
  cache,
  connectToDevTools: true,
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <GlobalStyles />
      <Pages />
    </ApolloProvider>
  );
};

export default App;
