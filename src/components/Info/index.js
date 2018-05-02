import React, { Component } from 'react';
import './Info.css';

export default class Info extends Component {
  render() {
    return (
      <div className="info-wrapper">
        <h1 className="sub">Cellular Automation</h1>
        <h3>
        The game's theory is based on <span className="sub">cellular automation</span> abiding by <span className="sub">four</span> simple rules that govern each cell's reproduction and destruction.
        <br/><br/>
        The game itself starts with an initial configuration of live and dead cells on a two dimensional grid.
        <br/><br/>
        Each cell on the grid can be in any of two possible states: <span className="sub">dead</span> or <span className="sub">alive</span>.
        <br/><br/>
        Each iteration or tick in the game is considered the next <span className="sub">generation</span> of life where the rules of the game are applied to all cells on the grid <span className="sub">simultaneously</span>.
        </h3>
        <h1 className="sub">Fundamental Rules</h1>
        <h3 className="sub">Populated/Live Cells</h3>
        <ul>
          <li>
            <strong className="sub">Underpopulation/Solitude</strong>
            <ul>
              <li><h3>Any live cell with fewer than <span className="sub">two live neighbors dies</span></h3></li>
            </ul>
          </li>

          <li>
            <strong className="sub">Overpopulation</strong>
            <ul>
              <li><h3>Any live cell with more than <span className="sub">three live neighbors dies</span></h3></li>
            </ul>
          </li>

          <li>
            <strong className="sub">Life</strong>
            <ul>
              <li><h3>Any live cell with <span className="sub">two or three live neighbors lives</span> on to the next generation</h3></li>
            </ul>
          </li>
        </ul>
        <h3 className="sub">Unpopulated/Dead Cells</h3>
        <ul>
          <li>
            <strong className="sub">Reproduction</strong>
            <ul>
              <li><h3>Any dead cell with <span className="sub">exactly three live neighbors</span> becomes a <span className="sub">live cell</span></h3></li>
            </ul>
          </li>
        </ul>
      </div>
    );
  }
}
