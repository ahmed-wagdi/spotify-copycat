import React from 'react';
import Albums from './albums/Albums';
import ArtistList from './artists/ArtistList';
import axios from 'axios';

import API_URL from '../api';

export default class Search extends React.Component {
	constructor(props) {
		super(props);
		console.log(props);
		this.state = {
			keyword: "",
			type: props.match.params.type,
			albums: [],
			artists: [],
		}
	}

	componentWillReceiveProps(nextProps) {
		const type = nextProps.match.params.type;
		if (this.state.type !== type) {
			this.setState({type});
		}
	}

	handleSubmit(event){
		event.preventDefault();
		const keyword = this.refs.search.value;
		const type = this.state.type;
		let url = `${API_URL}/search/?q=${keyword}&type=`;
		url = type === "albums" ? url + "album" : url + "artist";
		axios.get(url).then(response => {
			this.setState({[type]: response.data[type].items});
		});
	}

	renderResults(){
		const items = this.state[this.state.type];
		if (items.length) {

		return (
			<div>
				<h3>Search Results for: {this.state.keyword}</h3>
				{this.state.type === "albums" ? <Albums {...this.state} /> : <ArtistList {...this.state} />}
			</div>
		)
	}
	}


	render(){
		return(
			<div className="main-wrap">
				<h5>Search for {this.state.type}</h5>
				<form onSubmit={(event) => this.handleSubmit(event)}>
					<input type="text" ref="search" defaultValue={this.state.keyword} />
					<input type="submit"/>
				</form>
				{this.renderResults()}
			</div>
		);
	}
}
