import {combineReducers} from 'redux';
import playerReducer from './playerReducer';
import notificationsReducer from './notificationsReducer';

export default combineReducers({
	player: playerReducer,
	notifications: notificationsReducer
});

