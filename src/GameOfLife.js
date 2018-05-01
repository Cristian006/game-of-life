import React, { Component } from 'react';
import * as THREE from 'three';
import World from './World';

class GameOfLife extends Component {
  constructor(props){
    super(props);

    this.state = {
      width: window.innerWidth,
      height: window.innerHeight
    }
  }

  onWindowResize = () => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    })
  };

  componentDidMount(){
    window.addEventListener('resize', this.onWindowResize);
  }

  componentWillUnMount(){
    window.removeEventListener('resize', this.onWindowResize);
  }


  render() {
    const {
      width,
      height
    } = this.state;

    return (
      <World
        width={width}
        height={height}
      />
    );
  }
}

export default GameOfLife;
