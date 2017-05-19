import {combineReducers} from 'redux';
import playerReducer from './playerReducer';
import notificationsReducer from './notificationsReducer';
import searchReducer from './searchReducer';

export default combineReducers({
	player: playerReducer,
	notifications: notificationsReducer,
	results: searchReducer
});

