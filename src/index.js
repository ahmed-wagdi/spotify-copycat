import React from 'react';
import ReactDOM from 'react-dom';
import Router from './components/App';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import './fontello/css/fontello.css';
import './foundation.css';
import './index.css';
import './components/app.css';
import reducers from './reducers';

const store = createStore(reducers);

ReactDOM.render(
  <Provider store={store}>
  	<Router />
  </Provider>,
  document.getElementById('root')
);
