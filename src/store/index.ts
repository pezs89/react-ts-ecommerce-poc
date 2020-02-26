import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import { RouterState, routerMiddleware } from 'connected-react-router'
import { History } from 'history'
import { FormStateMap } from 'redux-form'
import { persistStore } from 'redux-persist'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import history from '../utils/history'
import { NotificationState } from './features/notification/types'
import { createRootReducer } from './root-reducer'
import { UserState } from './features/user/types'
import { CartState } from './features/cart/types'
import { DirectoryState } from './features/directory/types'
import { ShopState } from './features/shop/types'

export interface ApplicationState {
  user: UserState
  notifications: NotificationState
  cart: CartState
  directory: DirectoryState
  shop: ShopState
  form?: FormStateMap
  router?: RouterState
}

const initialState = window.INITIAL_REDUX_STATE

const persistConfiguration = {
  key: 'root',
  storage,
  whitelist: ['cart']
}

const configureStore = (history: History, initialState: ApplicationState) => {
  const composeEnhancers = composeWithDevTools({})
  const sagaMiddleware = createSagaMiddleware()
  const enhancer = composeEnhancers(
    applyMiddleware(routerMiddleware(history), sagaMiddleware)
  )
  const store = createStore(
    persistReducer(persistConfiguration, createRootReducer(history)),
    initialState,
    enhancer
  )
  return store
}

export const store = configureStore(history, initialState)

export const persistor = persistStore(store)
