import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';

class World extends Component {
  constructor(props){
    super(props);
    this.cameraPosition = new THREE.Vector3(0, 0, 1);
    
    this.camera = new THREE.OrthographicCamera(0,0,0,0, 1, 1000);

    this.renderer = new THREE.WebGLRender({
      perserveDrawingBuffer: true
    });

    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(0x665544, 1);

    this.theme = {
      background: [30, 38, 48],
      entity: [251, 53, 80]
    };

    let geo = new THREE.PlaneBufferGeometry(2, 2);

    let uniforms = {
      resolution: {
        type: 'v2',
        valu: new THREE.Vector2(this.props.width, this.props.height)
      }
    }

  }

  onAnimate = () => {
    console.log('animate me');
  };

  render() {
    const {
      width,
      height
    } = this.props;

    return this.renderer.domElement;
  }
}

World.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};

export default World;
