import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GameOfLife from './GameOfLife';

class App extends Component {
  render() {
    return (
      <div className="App">
        <GameOfLife />
      </div>
    );
  }
}

export default App;
