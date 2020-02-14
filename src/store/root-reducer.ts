import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { connectRouter } from 'connected-react-router'
import { History } from 'history'
import { notificationsReducer } from './features/notification/reducer'

export const createRootReducer = (history: History) =>
  combineReducers({
    form: formReducer,
    notifications: notificationsReducer,
    router: connectRouter(history),
  })
