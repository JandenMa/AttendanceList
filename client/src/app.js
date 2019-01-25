import React, { Component } from "react";
import List from "./components/List.component";
import HeadBar from "./components/HeadBar.component";

export default class App extends Component {
  render() {
    return (
      <div>
        <HeadBar />
        <List />
      </div>
    );
  }
}
