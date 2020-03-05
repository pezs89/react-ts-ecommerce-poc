import { createReducer } from 'typesafe-actions'
import { UserState, UserAction } from './types'
import { signInAsync } from './actions'

export const initialState: UserState = {
  currentUser: null,
  error: null
}

export const userReducer = createReducer<UserState, UserAction>(initialState)
  .handleAction(signInAsync.success, (state, action) => ({
    ...state,
    currentUser: action.payload,
    error: null
  }))
  .handleAction(signInAsync.failure, (state, action) => ({
    ...state,
    error: action.payload
  }))
