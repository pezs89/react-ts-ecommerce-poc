import { createReducer } from 'typesafe-actions'
import { UserState, UserAction } from './types'
import { setCurrentUser } from './actions'

export const initialState: UserState = {
  currentUser: null
}

export const userReducer = createReducer<UserState, UserAction>(
  initialState
).handleAction(setCurrentUser, (state, action) => ({
  ...state,
  currentUser: action.payload
}))
