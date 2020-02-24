import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { connectRouter } from 'connected-react-router'
import { History } from 'history'
import { notificationsReducer } from './features/notification/reducer'
import { userReducer } from './features/user/reducer'

export const createRootReducer = (history: History) =>
  combineReducers({
    user: userReducer,
    notifications: notificationsReducer,
    form: formReducer,
    router: connectRouter(history),
  })
