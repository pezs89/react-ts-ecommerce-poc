import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import history from './utils/history';
import App from './App';
import { configureStore, ApplicationState } from './store';

import './assets/scss/_main.scss';


const initialState: ApplicationState = {
  auth: {
    isLoggedIn: false,
    userId: '',
    profileImg: null
  },
  streams: {
    streamList: []
  }
};

const store = configureStore(history, initialState);

ReactDOM.render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  document.querySelector('#root')
);