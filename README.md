# John Conway's Game Of Life - Live, Die or Multiply

> GUI &amp; Graphics Final Project. React App implementing Conway's Game of Life using three.js.

## The Game

The game's theory is based on cellular automation abiding by four simple rules that govern each entity's replication and destruction.

The game itself starts with an initial configuration of live and dead cells on a two dimensional grid.

Each cell on the grid can be in any of two possible states: dead or alive.

Each iteration or tick in the game is considered the next generation of life where the rules of the game are applied to all cells on the grid simultaneously.

## Fundamental Rules

### Populated/Live Cells

#### 1 - Underpopulation/Solitude

Any live cell with fewer than two live neighbors dies

#### 2 - Overpopulation

Any live cell with more than three live neighbors dies

#### 3 - Life

Any live cell with two or three live neighbors lives on to the next generation

### Unpopulated/Dead Cells

#### 4 - Reproduction

Any dead cell with exactly three live neighbors becomes a live cell

## Implementation

### React

It's not at all necessary to use the react library, it's really just preference because of how clean and readable it keeps my code by splitting everything up into separate components while still being able to use three.js.

### Three JS

three js implementation: 
https://github.com/Cristian006/game-of-life/tree/threejs
