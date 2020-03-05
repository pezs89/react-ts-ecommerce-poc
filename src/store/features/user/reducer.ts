import { createReducer } from 'typesafe-actions'
import { UserState, UserAction } from './types'
import { googleSignInAsync, emailSignInAsync } from './actions'

export const initialState: UserState = {
  currentUser: null,
  error: null
}

export const userReducer = createReducer<UserState, UserAction>(initialState)
  .handleAction(
    [googleSignInAsync.success, emailSignInAsync.success],
    (state, action) => ({
      ...state,
      currentUser: action.payload,
      error: null
    })
  )
  .handleAction(
    [googleSignInAsync.failure, emailSignInAsync.failure],
    (state, action) => ({
      ...state,
      error: action.payload
    })
  )
