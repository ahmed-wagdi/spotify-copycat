import React from 'react';
import axios from 'axios';

import ArtistList from './artists/ArtistList';
import API_URL from '../api';



export default class Home extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			artists: [],
		}
	}

	componentDidMount() {
		const limit = 50;
		const url = `${API_URL}/search?q=j&type=artist&limit=${limit}`;
		axios.get(url).then(response => this.setState({artists: response.data.artists.items}));
	}


	render(){
		return(
			
			<div className="main-wrap">
				<h1 className="main-title">Top Artists</h1>
				<ArtistList artists={this.state.artists} />
			</div>
		)
	}
}