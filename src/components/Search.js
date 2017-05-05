import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

import Albums from './albums/Albums';
import ArtistList from './artists/ArtistList';
import {addNotification} from '../actions';
import API_URL from '../api';

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
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
		if (!keyword) {
			this.props.addNotification({
				type: "error",
				text: "Enter a keyword first!"
			});
			return;
		}
		const type = this.state.type;
		let url = `${API_URL}/search/?q=${keyword}&type=`;
		url = type === "albums" ? url + "album" : url + "artist";
		axios.get(url).then(response => {
			this.setState({[type]: response.data[type].items});
		});
	}

	renderResults(){
		const items = this.state[this.state.type];
		if (items.length === 0 && this.refs.search && this.refs.search.value) return <p className="empty">No Results Found</p>
		if (items.length) {
			return (
				<div>
					{this.state.type === "albums" ? <Albums {...this.state} /> : <ArtistList {...this.state} />}
				</div>
			)
		}
	}


	render(){
		return(
			<div className="main-wrap">
				<h5>Search for {this.state.type}</h5>
				<form className="search-form" onSubmit={(event) => this.handleSubmit(event)}>
					<input type="text" placeholder="Search..." ref="search"  />
				</form>
				{this.renderResults()}
			</div>
		);
	}
}

export default connect(null, {addNotification})(Search);