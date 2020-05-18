import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// Layout
import Layout from "../components/Layout";

// komponen
import Home from "./home";
import MyNotes from "./mynotes";
import Favorites from "./favorites";

export default class index extends Component {
  render() {
    return (
      <Router>
        <Layout>
          <Route exact path="/" component={Home} />
          <Route path="/mynotes" component={MyNotes} />
          <Route path="/favorites" component={Favorites} />
        </Layout>
      </Router>
    );
  }
}
