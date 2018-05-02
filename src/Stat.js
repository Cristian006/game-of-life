import React, {Component} from 'react';
import './Stat.css';

export default class Stat extends Component {
  render() {
    return (
      <div className="wrapper">
        <h2 className="label">{this.props.label}</h2>
        <h2 className="stat">{this.props.stat}</h2>
      </div>
    );
  }
}
