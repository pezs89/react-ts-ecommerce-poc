import { createAsyncAction, createAction } from 'typesafe-actions'
import { UserActionTypes, IUser, ICredentials } from './types'

export const signInAsync = createAsyncAction(
  UserActionTypes.GOOGLE_SIGN_IN_REQUEST ||
    UserActionTypes.EMAIL_SIGN_IN_REQUEST,
  UserActionTypes.SIGN_IN_SUCCESS,
  UserActionTypes.SIGN_IN_FAILURE
)<undefined | ICredentials, IUser, string>()

export const checkUserSession = createAction(
  UserActionTypes.CHECK_USER_SESSION
)()

export const signOutAsync = createAsyncAction(
  UserActionTypes.SIGN_OUT_REQUEST,
  UserActionTypes.SIGN_OUT_SUCCESS,
  UserActionTypes.SIGN_OUT_FAILURE
)<undefined, undefined, string>()

export const signUpAsync = createAsyncAction(
  UserActionTypes.SIGN_UP_REQUEST,
  UserActionTypes.SIGN_UP_SUCCESS,
  UserActionTypes.SIGN_UP_FAILURE
)<ICredentials, firebase.User, string>()
