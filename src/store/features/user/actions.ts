import { createAction, createAsyncAction } from 'typesafe-actions'
import { UserActionTypes, IUser, ICredentials } from './types'

export const setCurrentUser = createAction(
  UserActionTypes.SET_CURRENT_USER,
  (payload: IUser | null) => (payload ? { ...payload } : null)
)<IUser>()

export const googleSignInAsync = createAsyncAction(
  UserActionTypes.GOOGLE_SIGN_IN_REQUEST,
  UserActionTypes.GOOGLE_SIGN_IN_SUCCESS,
  UserActionTypes.GOOGLE_SIGN_IN_FAILURE
)<undefined, IUser, string>()

export const emailSignInAsync = createAsyncAction(
  UserActionTypes.EMAIL_SIGN_IN_REQUEST,
  UserActionTypes.EMAIL_SIGN_IN_SUCCESS,
  UserActionTypes.EMAIL_SIGN_IN_FAILURE
)<ICredentials, IUser, string>()