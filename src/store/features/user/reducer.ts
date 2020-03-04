import { createReducer } from 'typesafe-actions'
import { UserState, UserAction } from './types'
import {
  setCurrentUser,
  googleSignInAsync,
  emailSignInAsync
} from './actions'

export const initialState: UserState = {
  currentUser: null,
  error: null
}

export const userReducer = createReducer<UserState, UserAction>(initialState)
  .handleAction(setCurrentUser, (state, action) => ({
    ...state,
    currentUser: action.payload
  }))
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
