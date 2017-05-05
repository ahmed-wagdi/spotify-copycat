import React from 'react';
import {BrowserRouter, Route, NavLink} from 'react-router-dom';
import Search from './Search.js';
import SingleAlbum from './albums/Single.js';
import SingleArtist from './artists/Single.js';
import Playlist from './Player/Playlist.js';
import Home from './Home.js';
import Player from './Player/Player.js';
import Notifications from './Notifications/Notifications.js';
import history from './history';


import logo from '../images/logo.png';

class App extends React.Component {


	addPlaylist(playlist, currentIndex){
		this.setState({playlist, current: playlist[currentIndex], currentIndex});
	}

	playTrack(track){
		if (track.id !== this.state.current.id) {
			this.setState({current: track});
		}
	}

	prevTrack(){
		if (this.state.currentIndex > 0) {
			this.setState({
				currentIndex: this.state.currentIndex - 1,
				current: this.state.playlist[this.state.currentIndex - 1]
			})
		}
	}

	nextTrack(){
		if (this.state.currentIndex < this.state.playlist.length - 1) {
			this.setState({
				currentIndex: this.state.currentIndex + 1,
				current: this.state.playlist[this.state.currentIndex + 1]
			})
		}
	}

	render(){
		return(
			<BrowserRouter history={history}>
				<div className="container">
					<div className="content-wrap">
						<Links></Links>
						<Notifications />
						<div className="main-content">
							<Route exact path="/" component={Home} />
							<Player />
	                        <Route path="/queue" component={Playlist} />
							<Route path="/search/:type?" component={Search} />
							<Route path="/album/:id?" component={SingleAlbum} />
							<Route path="/artist/:id?" component={SingleArtist} />
						</div>
					</div>
				</div>
			</BrowserRouter>
		);
	}
}

const Links = () => (
	<nav className="sidebar">
		<div>
			<img className="logo" src={logo} alt=""/>
			<ul className="main-menu">
				<li className="main-menu__item"><NavLink exact activeClassName="active" className="main-menu__link" to="/">Home</NavLink></li>
				<li className="main-menu__item"><NavLink exact activeClassName="active" className="main-menu__link" to="/search/albums">Albums</NavLink></li>
				<li className="main-menu__item"><NavLink exact activeClassName="active" className="main-menu__link" to="/search/artists">Artists</NavLink></li>
				<li className="main-menu__item"><NavLink exact activeClassName="active" className="main-menu__link" to="/queue">Queue</NavLink></li>
			</ul>
		</div>

		<a className="sidebar__user"><i className="fa fa-user-o" aria-hidden="true"></i> Ahmed Wagdi</a>
	</nav>
);

export default App;