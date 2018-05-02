import React from 'react';

class Cell extends React.Component {
	selectBox = () => {
		this.props.selectBox(this.props.row, this.props.col);
	}

	dragOverBox = (e) => {
		if(e.buttons === 1)
			this.props.selectBox(this.props.row, this.props.col);
	}

	render() {
		return (
			<div
				className={this.props.boxClass}
				id={this.props.id}
				onClick={this.selectBox}
				onMouseMove={this.dragOverBox}
				style={{
					borderRadius: this.props.box ? '' : '50%',
				}}
			/>
		);
	}
}

export default Cell;
