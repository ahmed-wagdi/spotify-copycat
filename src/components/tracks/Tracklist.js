import React from 'react';

import './tracks.css';

export default function Tracklist(props){
	console.log(props);
	const { tracks, playTrack, addPlaylist, current } = props;
	return(
		<table className="tracklist">
			<tbody>
				{tracks.map((track, i) => (
					<tr onClick={() => addPlaylist(tracks, i)} key={i} className={`tracklist__item ${current.id === track.id ? "active" : ""}`}>
						<td className="tracklist__cell tracklist__number">{i+1}.</td>
						<td className="tracklist__cell tracklist__title">{track.name}</td>
						<td className="tracklist__cell tracklist__time">{track.duration_ms}</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}