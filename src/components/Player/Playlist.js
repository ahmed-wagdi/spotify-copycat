import React from 'react';
import Tracklist from '../tracks/Tracklist'

export default class Playlist extends React.Component{
	render(){
		if (!this.props.playlist.length) {
			return (
				<div className="empty-queue">
					<p className="empty">Queue is empty</p>
					<small>Try playing some tracks.</small>
				</div>
			)
		}
		return(
			<Tracklist 
			tracks={this.props.playlist} 
			addPlaylist={this.props.addPlaylist} 
			current={this.props.current} 
			/>
		)
	}
}