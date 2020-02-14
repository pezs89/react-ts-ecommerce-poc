import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { RouterState, routerMiddleware } from 'connected-react-router';
import { History } from 'history';
import { FormStateMap } from 'redux-form';

import { NotificationState } from './features/notification/types';
import { createRootReducer } from './root-reducer';

export interface ApplicationState {
  notifications: NotificationState;
  form?: FormStateMap;
  router?: RouterState;
}

// create store
export const configureStore = (
  history: History,
  initialState: ApplicationState
): any => {
  const composeEnhancers = composeWithDevTools({});
  const sagaMiddleware = createSagaMiddleware();
  const enhancer = composeEnhancers(
    applyMiddleware(routerMiddleware(history), sagaMiddleware)
  );
  const store = createStore(createRootReducer(history), initialState, enhancer);
  return store;
};
