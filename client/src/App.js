import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          <form method="post" action="http://localhost:8080/api/bears">
            <input type="name" name="name" />
            <button type="submit">Submit</button>
          </form>
        </p>
      </div>
    );
  }
}

export default App;
