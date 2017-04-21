import React from 'react';
import {Link} from 'react-router-dom';

const AlbumItem = props => {
	return (
	<div className="item-list__item album">
		<Link to={`/album/${props.album.id}`}>
			<img src={props.album.images[0].url} alt=""/>
			<h6>{props.album.name}</h6>
		</Link>
	</div>
)};

export default AlbumItem;