import { createReducer } from 'typesafe-actions'
import { NotificationState, NotificationAction } from './types'
import { showNotification, hideNotification } from './actions'

export const initialState: NotificationState = {
  type: null,
  message: ''
}

export const notificationsReducer = createReducer<
  NotificationState,
  NotificationAction
>(initialState)
  .handleAction(showNotification, (state, action) => ({
    ...state,
    ...action.payload
  }))
  .handleAction(hideNotification, state => ({
    ...state,
    type: null,
    message: ''
  }))
