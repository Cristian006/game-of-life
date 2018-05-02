import React from 'react';

class Controls extends React.Component {

	handleSelect = (evt) => {
		this.props.gridSize(evt);
	}

	render() {
		return (
			<div className="center">
					{
						!this.props.paused &&
							<button onClick={this.props.pauseButton} title="pause">
								<i className="material-icons">pause</i>
							</button>
					}
					{
						this.props.paused &&
							<button onClick={this.props.playButton} title="play">
								<i className="material-icons">play_arrow</i>
							</button>
					}
					{
						this.props.speed &&
							<button onClick={this.props.slow} title="slow down">
								<i className="material-icons">skip_next</i>
							</button>
					}
					{
						!this.props.speed &&
							<button onClick={this.props.fast} title="speed up">
								<i className="material-icons">fast_forward</i>
							</button>
					}
					<button onClick={this.props.seed} title="renew">
						<i className="material-icons">autorenew</i>
					</button>
					<button onClick={this.props.clear} title="clear">
						<i className="material-icons">layers_clear</i>
					</button>
			</div>
		);
	}
}

export default Controls;
