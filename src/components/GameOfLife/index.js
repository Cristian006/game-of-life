import React from 'react';
import Cell from './Cell';

class GameOfLife extends React.Component {
	render() {
		const width = (this.props.cols * 14);
		var rowsArr = [];

		var boxClass = "";
		for (var i = 0; i < this.props.rows; i++) {
			for (var j = 0; j < this.props.cols; j++) {
				let boxId = i + "_" + j;

				if (this.props.gridFull[i][j].visited) {
					if (this.props.gridFull[i][j].active) {
						boxClass = "box on";
					}
					else {
						boxClass = "box visited";
					}
				} else {
					boxClass = "box";
				}

				rowsArr.push(
					<Cell
						boxClass={boxClass}
						key={boxId}
						boxId={boxId}
						row={i}
						col={j}
						selectBox={this.props.selectBox}
					/>
				);
			}
		}

		return (
			<div className="grid" style={{width: width}}>
				{rowsArr}
			</div>
		);
	}
}

export default GameOfLife;
