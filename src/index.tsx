import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'

import App from './App';
import history from './utils/history';
import { store, persistor } from './store/index';

import './assets/scss/_main.scss';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App history={history} />
    </PersistGate>
  </Provider>,
  document.querySelector('#root')
);