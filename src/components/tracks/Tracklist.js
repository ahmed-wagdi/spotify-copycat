import React from 'react';
import {connect} from 'react-redux';
import './tracks.css';
import {addPlaylist} from '../../actions';

function Tracklist(props){
	const { tracks, addPlaylist, current } = props;
	return(
		<table className="tracklist">
			<tbody>
				{tracks.map((track, i) => (
					<tr onClick={() => addPlaylist(tracks, i)} key={i} className={`tracklist__item ${current && current.id === track.id ? "active" : ""}`}>
						<td className="tracklist__cell tracklist__number">{i+1}.</td>
						<td className="tracklist__cell tracklist__title">{track.name}</td>
						<td className="tracklist__cell tracklist__title no_preview">{track.preview_url === null && "No track preview"}</td>
						<td className="tracklist__cell tracklist__full"><a href={track.external_urls.spotify} target="_blank" className="button button--gray button--small">Full Track</a></td>
					</tr>
				))}
			</tbody>
		</table>
	)
}


function mapStateToProps(state){
	return {
		queue: state.player.queue,
		index: state.player.index,
		current: state.player.queue[state.player.index]
	}
}

export default connect(mapStateToProps, {addPlaylist})(Tracklist);