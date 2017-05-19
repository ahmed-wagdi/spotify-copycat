import {SEARCH, CLEAR_RESULTS} from './types';
import axios from 'axios';

export function search(url, type, paginate){
	return function(dispatch){
		axios.get(url).then(response => {
			dispatch({
				type: SEARCH, 
				items: response.data[type].items, 
				next:response.data[type].next,
				paginate
			});
		});
	}
}

export function clearResults(){
	return { type: CLEAR_RESULTS };
}