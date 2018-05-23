import React, { Component } from 'react';
import Board from '../board/Board'
import './App.css';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Minesweeper</h1>
        </header>
        <Board></Board>
      </div>
    );
  }
}
