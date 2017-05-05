import React from 'react';
import ReactPlayer from 'react-player';
import {connect} from 'react-redux';
import Progress from './Progress';
import {nextTrack, prevTrack, addNotification} from '../../actions';

import './player.css';

class Player extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			playing: true,
			played: 0,
			progress: 0,
			duration: 30
		}

		this.onProgress = this.onProgress.bind(this);
		this.playPause = this.playPause.bind(this);
		this.seekTrack = this.seekTrack.bind(this);
		this.handleEnded = this.handleEnded.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.current && nextProps.current.id !== this.props.current.id) {
			this.setState({playing: true});
			clearTimeout(this.autoNext);
		}

		if (!nextProps.current.preview_url) this.noTrack();

		const count = nextProps.current.album.images.length;
		if (count > 0) {
			this.image = nextProps.current.album.images[count-1].url;
		}
	}

	onProgress({played}, loaded){
		if (played !== undefined) this.setState({played});
		
	}

	playPause(){
		this.setState({playing: !this.state.playing});
	}

	seekTrack(target){
		this.player.seekTo(target);
	}

	handleEnded(){
		if (this.props.index === this.props.queue.length -1) {
			this.player.seekTo(0);
			this.setState({playing: false, played: 0, progress: 0});
		}
		else{
			this.props.nextTrack()
		}
	}

	noTrack(){
		this.props.addNotification({
			type: "error",
			text: "This track has no preview"
		});
		this.autoNext = setTimeout(this.props.nextTrack, 2000);
	}

	render(){
		const { current } = this.props;
		if (!current) return null;


		return(
			<div className="player-wrapper">
				<div className="music-player">
					<div className="current-track">
						<div className="current-track__image">
							<div className="image-container" style={{backgroundImage: `url(${this.image})`}}></div>
						</div>
						<div className="current-track__details">
							<h6>{current.name}</h6>
							<h6>{current.artists[0].name}</h6>
						</div>
					</div>
					<div className="player-controls">
						<div className="player-controls__buttons">
							
							<a className="player-controls__button" onClick={this.props.prevTrack}><i className="icon-to-start" aria-hidden="true"></i>
							</a>

							<a className="player-controls__button" onClick={this.playPause}><i className={`icon-${this.state.playing ? "pause" : "play"}`} aria-hidden="true"></i>
							</a>

							<a className="player-controls__button" onClick={this.props.nextTrack}><i className="icon-to-end" aria-hidden="true"></i>
							</a>
						
						</div>
						<Progress seekTrack={this.seekTrack} played={this.state.played} duration={this.state.duration} />
					</div>
					
					<ReactPlayer 
					ref={player => { this.player = player }} 
					playing={this.state.playing} 
					url={current.preview_url} 
					onEnded={this.handleEnded}
					onProgress={this.onProgress} 
					progressFrequency={10}
					hidden
					height="auto" />
				</div>
			</div>
		)
	}
}

function mapStateToProps(state){
	return {
		queue: state.player.queue,
		index: state.player.index,
		current: state.player.queue[state.player.index]
	}
}

export default connect(mapStateToProps, {nextTrack, prevTrack, addNotification})(Player);