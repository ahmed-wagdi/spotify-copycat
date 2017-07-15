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
		
		const artists = `4tZwfgrHOc3mvqYlEYSvVi,4gzpq5DPGxSnKTe4SA8HAU,4Z8W4fKeB5YxbusRsdQVPb,1ZwdS5xdxEREPySFridCfh,3WrFJ7ztbogyGnTHbHJFl2,711MCceyCBcFnzjGY4Q7Un,0du5cEVh5yTK9QJze8zA0C,6l3HvQ5sa6mXTsMTB19rO5,6FQqZYVfTNQ1pCqfkwVFEa,3kjuyTCjPG1WMFCiyc5IuB,6eUKZXaKkcviH0Ku9w2n3V,7jdFEYD2LTYjfwxOdlVjmc`
		const url = `${API_URL}/artists?ids=${artists}&limit=${limit}`;
		
		
		// axios.get(`https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=http:%2F%2Flocalhost:3000`).then(response => console.log(response));
		// window.location = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}`
		// axios({
		// method: 'post',
		// url: 'https://cors-anywhere.herokuapp.com/https://accounts.spotify.com/api/token',
		// headers: {
		// 	'Content-Type':'application/x-www-form-urlencoded'
		// },
		// data: {
		// 	grant_type: "authorization_code",
		// 	code: "AQASXcm6zwiTGdCFXoCdY9gVNTG99n8khYCu0F1MlcxCwkWqQUxPSpiAdkJFBzwX7SFT10dXOLMgg3P-drUGL6bhCf6boVsho-QzO_Qv14z5oo7NUrqgAtuNjvOBVzr48f6_zRnXYrjpW3seWb1wBjLO1jFs7fhPQVXoZsRDwCEXOAm6qsBCsjNQOw",
		// 	client_id,
		// 	client_secret,
		// 	redirect_uri
		// }
		// }).then(response => console.log(response));
		
		axios.get(url).then(response => this.setState({artists: response.data.artists}));
		// axios.get(url).then(response => this.setState({artists: response.data.artists}));
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