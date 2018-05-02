import React, {Component} from 'react';
import './Stat.css';

export default class Stat extends Component {
  format = (value) => {
    if (value > 1000000) {
      let val = value / 100000;
      return `${val.toFixed(2)}m`;
    }
    else if(value > 1000) {
      let val = value / 1000;
      return `${val.toFixed(2)}k`;
    }
    else {
      return value;
    }
  }

  render() {
    return (
      <div className="wrapper">
        <h2 className="label">{this.format(this.props.label)}</h2>
        <h2 className={this.props.highlight ? "stat highlight" : "stat"}>{this.format(this.props.stat)}</h2>
      </div>
    );
  }
}
