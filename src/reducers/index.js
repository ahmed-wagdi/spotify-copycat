import {combineReducers} from 'redux';
import playerReducer from './playerReducer';
import notificationsReducer from './notificationsReducer';
import searchReducer from './searchReducer';
import loadingReducer from './loadingReducer';
import artistsReducer from './artistsReducer';

export default combineReducers({
	player: playerReducer,
	notifications: notificationsReducer,
	results: searchReducer,
	loading: loadingReducer,
	artists: artistsReducer,
});

