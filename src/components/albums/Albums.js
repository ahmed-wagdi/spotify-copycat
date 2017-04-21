import React from 'react';
import AlbumItem from './AlbumItem.js';
import './albums.css';

const Albums = props => {

	return (
		<ul className="albums item-list">
			{props.albums.map((item, i) => (
				<AlbumItem album={item} key={i} />
			)
			)}
		</ul>
	)
}

export default Albums;