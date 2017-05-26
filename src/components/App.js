import React from 'react';
import {BrowserRouter, HashRouter, Route, NavLink} from 'react-router-dom';
import Search from './Search.js';
import Genres from './Genres.js';
import SingleAlbum from './albums/Single.js';
import SingleArtist from './artists/Single.js';
import Playlist from './Player/Playlist.js';
import Home from './Home.js';
import Player from './Player/Player.js';
import Notifications from './Notifications/Notifications.js';
import {connect} from 'react-redux';



import logo from '../images/logo.png';
import logo_small from '../images/logo-small.png';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			small_menu: false
		}
		this.toggleMenu = this.toggleMenu.bind(this);
	}
	componentDidMount() {
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