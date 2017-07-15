import React from 'react';
import {HashRouter, Route, NavLink} from 'react-router-dom';
import Search from './Search.js';
import Genres from './Genres.js';
import SingleAlbum from './albums/Single.js';
import SingleArtist from './artists/Single.js';
import Playlist from './Player/Playlist.js';
import Home from './Home.js';
import Player from './Player/Player.js';
import Notifications from './Notifications/Notifications.js';
import {connect} from 'react-redux';
import firebase from 'firebase';

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBp6K4-MlkWZsVSQoFKDZOpMP-0cACwCTY",
    authDomain: "spoticat-5e7a2.firebaseapp.com",
    databaseURL: "https://spoticat-5e7a2.firebaseio.com",
    projectId: "spoticat-5e7a2",
    storageBucket: "",
    messagingSenderId: "817416667933"
  };
  firebase.initializeApp(config);
var database = firebase.database();
console.log(database);
database.ref('access').set('helllooo');
import axios from 'axios';


const client_id = "58badec970054680a1d3ca7de64f0ff1";
const client_secret = "deed1bc1e1284a98b2d6cc00e13f1f73";
const redirect_uri = 'http:%2F%2Flocalhost:3000';



// axios.interceptors.response.use(function (response) {
// 	console.log("everything is fine");
// 	return response;
// }, function (error) {
// 	console.log("++++", error);
// 	console.log(Promise);
// 	// Do something with response error
// 	return Promise.reject(error);
// });

import logo from '../images/logo.png';
import logo_small from '../images/logo-small.png';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			small_menu: false,
			access_token: null
		}
		this.toggleMenu = this.toggleMenu.bind(this);
	}
	componentDidMount() {
		axios.get("https://spoticat-node.herokuapp.com/").then(response => {
			console.log(response)
			const access_token = response.data;
			this.setState({access_token});
			axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
		});
		window.addEventListener("resize",this.handleResize)
	}

	// handleResize(e){
	// 	const size = e.target.innerWidth;
	// }

	addPlaylist(playlist, currentIndex){
		this.setState({playlist, current: playlist[currentIndex], currentIndex});
	}

	toggleMenu(close){
		this.setState({small_menu: close === true ? false : !this.state.small_menu});
	}

	render(){
		if(!this.state.access_token) return null;

		return(
			<HashRouter>
				<div className="container">
					<div className="content-wrap">
						<Menu toggleMenu={this.toggleMenu} open={this.state.small_menu} />
						<Notifications />
						<div className={`main-content ${this.state.small_menu ? 'menu-open' : ''} ${this.props.queue.length ? 'player-active' : ""}`}>
							<Route exact path="/" component={Home} />
							<Player />
	                        <Route path="/queue" component={Playlist} />
							<Route path="/search/:type?" component={Search} />
							<Route path="/genres/:genre?" component={Genres} />
							<Route path="/album/:id?" component={SingleAlbum} />
							<Route path="/artist/:id?" component={SingleArtist} />
						</div>
					</div>
				</div>
			</HashRouter>
		);
	}
}

const Menu = (props) => (
	<div className={`menu-wrapper ${props.open ? 'open' : ''}`}>
		<a onClick={props.toggleMenu} className="menu-icon"><div className="hamburger"></div></a>
		{props.open && <div onClick={props.toggleMenu} className="menu-overlay"></div>}
		<nav className="sidebar">
			<div className="small_menu">
				<img className="logo_small" src={logo_small} alt=""/>
			</div>

			<div>
				<img className="logo" src={logo} alt=""/>
				<ul className="main-menu" onClick={(e) => props.toggleMenu(true)}>
					<li className="main-menu__item"><NavLink exact activeClassName="active" className="main-menu__link" to="/">Home</NavLink></li>
					<li className="main-menu__item"><NavLink exact activeClassName="active" className="main-menu__link" to="/search/albums">Albums</NavLink></li>
					<li className="main-menu__item"><NavLink exact activeClassName="active" className="main-menu__link" to="/search/artists">Artists</NavLink></li>
					<li className="main-menu__item"><NavLink exact activeClassName="active" className="main-menu__link" to="/queue">Queue</NavLink></li>
				</ul>
			</div>

			<a href="https://github.com/ahmed-wagdi" className="sidebar__user"><i className="fa fa-user-o" aria-hidden="true"></i> Ahmed Wagdi</a>
		</nav>
	</div>
);


function mapStateToProps(state){
	return {
		queue: state.player.queue,
	}
}

export default connect(mapStateToProps)(App);