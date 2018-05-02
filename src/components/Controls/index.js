import React from 'react';

class Controls extends React.Component {

	handleSelect = (evt) => {
		this.props.gridSize(evt);
	}

	render() {
		return (
			<div className="center">
					<button
						onClick={this.props.paused ? this.props.playButton : this.props.pauseButton}
						title={this.props.paused ? 'play' : 'pause'}>
						<i className="material-icons">{this.props.paused ? 'play_arrow' : 'pause'}</i>
					</button>
					<button
						onClick={this.props.speed ? this.props.slow : this.props.fast}
						title={this.props.speed ? 'slow' : 'fast'}>
						<i className="material-icons">{this.props.speed ? 'skip_next' : 'fast_forward'}</i>
					</button>
					<button onClick={this.props.seed} title="renew">
						<i className="material-icons">add</i>
					</button>
					<button onClick={this.props.clear} title="clear">
						<i className="material-icons">clear</i>
					</button>
			</div>
		);
	}
}

export default Controls;
