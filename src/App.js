import React, { Component } from 'react';
import { Header, Logo, Tips } from "./Utils";
import './App.css';
import Grid from './grid/Grid.js';
import Query from './query/Query.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <Header /> */}
        <div>
          <Query />
          <Grid />
        </div>
        <Tips />
        <Logo />
      </div>
    );
  }
}

export default App;
