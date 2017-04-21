import React from 'react';
import {BrowserRouter, Route, NavLink} from 'react-router-dom';
import Search from './Search.js';
import SingleAlbum from './albums/Single.js';
import SingleArtist from './artists/Single.js';
import Playlist from './Player/Playlist.js';
import Home from './Home.js';
import Player from './Player/Player.js';
import './app.css';

import history from './history';

import logo from '../images/logo.png';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			playlist: [],
			current: {},
			currentIndex: 0
		}

		this.playTrack = this.playTrack.bind(this);
		this.addPlaylist = this.addPlaylist.bind(this);
		this.prevTrack = this.prevTrack.bind(this);
		this.nextTrack = this.nextTrack.bind(this);
	}

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

	renderPlayer(){
		if (this.state.current.name) {
			return <Player prevTrack={this.prevTrack} nextTrack={this.nextTrack} {...this.state} />
		}
	}

	render(){
		return(
			<BrowserRouter>
				<div className="container">
					<div className="content-wrap">
						<Links></Links>
						<div className="main-content">
							{this.renderPlayer()}

							<Route path="/queue" render={ routeProps => (
								<Playlist 
								{...this.state} 
								{...routeProps} 
								addPlaylist={this.addPlaylist} />
								)} />

							<Main playlist={this.state.playlist} current={this.state.current} currentIndex={this.state.currentIndex}  playTrack={this.playTrack} addPlaylist={this.addPlaylist} />
						</div>
					</div>
				</div>
			</BrowserRouter>
		);
	}
}


class Main extends React.Component {
	
	// shouldComponentUpdate(nextProps, nextState) {
	// 	if (nextProps.current === this.props.current) {
	// 		return true;
	// 	}
	// 	return false;
	// }

	render(){
		return(
			<div>
				<Route exact path="/" component={Home} />
				<Route path="/search/:type?" component={Search} />
				<Route path="/album/:id?" render={ routeProps => <SingleAlbum current={this.props.current} {...routeProps} addPlaylist={this.props.addPlaylist} /> } />
				<Route path="/artist/:id?" render={ routeProps => <SingleArtist current={this.props.current} {...routeProps} addPlaylist={this.props.addPlaylist} /> } />
			</div>
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

// const Router = () => (
// 	<BrowserRouter>
// 		<App className="container" />
// 	</BrowserRouter>
// );

export default App;