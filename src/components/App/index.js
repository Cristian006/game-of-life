import React, { Component } from 'react';
import Stat from '../Stat';
import GameOfLife from '../GameOfLife';
import Controls from '../Controls';
import Info from '../Info';
import './App.css';

export default class App extends Component {
	constructor() {
		super();
		this.speed = 100;
		this.rows = 45;
		this.cols = 60;

		this.state = {
			generation: 0,
			gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill({
				active: false,
				visited: false,
			})),
			paused: false,
      speedup: true,
      current: 0,
			deaths: 0,
			converged: false,
		}
	}

	selectBox = (row, col) => {
		let gridCopy = arrayClone(this.state.gridFull);
		gridCopy[row][col] = { active: true, visited: true };
		this.setState({
			gridFull: gridCopy,
			current: this.state.current + 1,
		});
	}

	seed = () => {
    let living = this.state.current;
		let gridCopy = arrayClone(this.state.gridFull);

		for (let i = 0; i < this.rows; i++) {
			for (let j = 0; j < this.cols; j++) {
				if (Math.floor(Math.random() * 8) === 1) {
          gridCopy[i][j] = { active: true, visited: true };
          living += 1;
				}
			}
		}

		this.setState({
      gridFull: gridCopy,
      current: living,
		});
	}

	playButton = () => {
		clearInterval(this.intervalId);
		this.intervalId = setInterval(this.play, this.speed);
		this.setState({
			paused: false
		});
	}

	pauseButton = () => {
		clearInterval(this.intervalId);
		this.setState({
			paused: true
		});
	}

	slow = () => {
		this.speed = 1000;
		this.playButton();
		this.setState({
			speedup: false,
		});
	}

	fast = () => {
		this.speed = 100;
		this.playButton();
		this.setState({
			speedup: true,
		});
	}

	clear = () => {
		var grid = Array(this.rows).fill().map(() => Array(this.cols).fill({
			active: false,
			visited: false,
		}));
		this.setState({
			gridFull: grid,
			generation: 0,
			current: 0,
			deaths: 0
		});
	}

	gridSize = (size) => {
		switch (size) {
			case "1":
				this.cols = 20;
				this.rows = 10;
			break;
			case "2":
				this.cols = 50;
				this.rows = 30;
			break;
			default:
				this.cols = 70;
				this.rows = 50;
		}
		this.clear();

	}

	play = () => {
		let g = this.state.gridFull;
    let g2 = arrayClone(this.state.gridFull);
		let living = this.state.current;
		let last = this.state.current;
		let dying = this.state.deaths;

		for (let i = 0; i < this.rows; i++) {
		  for (let j = 0; j < this.cols; j++) {
		    let count = 0;
				
				// TOP
				if (i > 0) {
					if (g[i - 1][j].active) count++;
				}

				// TOP LEFT
		    if (i > 0 && j > 0){
					if (g[i - 1][j - 1].active) count++;
				}

				// TOP RIGHT
		    if (i > 0 && j < this.cols - 1) {
					if (g[i - 1][j + 1].active) count++;
				}

				// RIGHT
		    if (j < this.cols - 1) {
					if (g[i][j + 1].active) count++;
				}

				// LEFT
				if (j > 0) {
					if (g[i][j - 1].active) count++;
				}

				// BOTTOM
		    if (i < this.rows - 1) {
					if (g[i + 1][j].active) count++;
				}

				// BOTTOM LEFT
		    if (i < this.rows - 1 && j > 0) {
					if (g[i + 1][j - 1].active) count++;
				}

				// BOTTOM RIGHT
		    if (i < (this.rows - 1) && j < (this.cols - 1)) {
					if (g[i + 1][j + 1].active) count++;
				}

				// DIE
		    if (g[i][j].active && (count < 2 || count > 3)) {
          g2[i][j] = { active: false, visited: true };
          dying += 1;
          living -= 1;
				}

				// LIVE
		    if (!g[i][j].active && count === 3) {
					g2[i][j] = { active: true, visited: true };
          living += 1;
        }
		  }
		}
    
		this.setState({
		  gridFull: g2,
      generation: this.state.generation + 1,
      current: living,
			deaths: dying,
			converged: last === living,
		});
	}

	componentDidMount() {
		this.seed();
		this.playButton();
	}

	render() {
		return (
			<div>
				<h1 className="title">The Game of Life</h1>
				<Controls
					playButton={this.playButton}
					pauseButton={this.pauseButton}
					paused={this.state.paused}
					speed={this.state.speedup}
					slow={this.slow}
					fast={this.fast}
					clear={this.clear}
					seed={this.seed}
					gridSize={this.gridSize}
				/>
        <div className="center spacing">
          <Stat label="Generation" stat={this.state.generation} />
          <Stat label="Entities" stat={this.state.current} />
          <Stat label="Deaths" stat={this.state.deaths} />
          <Stat label="Converged" stat={this.state.converged.toString()} highlight={this.state.converged} />
        </div>
				<GameOfLife
					gridFull={this.state.gridFull}
					rows={this.rows}
					cols={this.cols}
					selectBox={this.selectBox}
				/>
				<Info />
			</div>
		);
	}
}

function arrayClone(arr) {
	//return arr.slice(0);
	return JSON.parse(JSON.stringify(arr));
}
