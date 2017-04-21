import React from 'react';
// import ReactPlayer from 'react-player';
import axios from 'axios';
import Tracklist from '../tracks/Tracklist';
import Albums from '../albums/Albums';

import API_URL from '../../api';

import './artist.css';

export default class SingleArtist extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			artist: {},
			tracks: [],
			albums: []
		}
			
	}

	shouldComponentUpdate(nextProps, nextState) {
		console.log(this.state);
		console.log(nextState);
		return true;
// 		return this.state.tracks.length < nextState.tracks.length || this.state.albums.length <
// nextState.albums.length;
	}

	componentDidMount() {
		const artist_id = this.props.match.params.id;
		const url = `${API_URL}/artists/${artist_id}`;
		axios.get(url).then(response => {
			this.setState({artist: response.data})
		})

		this.getTopTracks();
	}

	getTopTracks(){
		const artist_id = this.props.match.params.id;
		const url = `${API_URL}/artists/${artist_id}/top-tracks?country=SE`;
		axios.get(url).then(response => {
			this.setState({tracks: response.data.tracks})
			this.getAlbums();
		})
	}

	getAlbums(){
		const artist_id = this.props.match.params.id;
		const url = `${API_URL}/artists/${artist_id}/albums`;
		axios.get(url).then(response => {
			this.setState({albums: response.data.items})
		})
	}

	render(){
		const artist = this.state.artist;
		if (!artist.name) {
			return <h1>Loading</h1>
		}

		return(
			<div>
				<div className="artist">
					<div className="artist__image" style={{backgroundImage: `url(${artist.images.length && artist.images[0].url})`}}>
						<div className="artist__details">
							<p className="artist__followers">{artist.followers.total} Followers</p>
							<h1 className="artist__title">{artist.name}</h1>
							<a className="button">Follow</a>
							<a className="button button--transparent">Play All</a>
						</div>
					</div>
				</div>
				<div className="artist-content">
					<h2 className="section-title">Top Tracks</h2>
					{this.state.tracks.length > 0 && <Tracklist current={this.props.current} playTrack={this.props.playTrack} addPlaylist={this.props.addPlaylist} tracks={this.state.tracks} />}
				</div>
				<div className="artist-albums">
					<h2 className="section-title">Albums</h2>
					{this.state.albums.length > 0 && <Albums albums={this.state.albums} />}
				</div>
			</div>
		)
	}
}