import { createAsyncAction } from 'typesafe-actions'
import { UserActionTypes, IUser, ICredentials } from './types'

export const googleSignInAsync = createAsyncAction(
  UserActionTypes.GOOGLE_SIGN_IN_REQUEST,
  UserActionTypes.SIGN_IN_SUCCESS,
  UserActionTypes.SIGN_IN_FAILURE
)<undefined, IUser, string>()

export const emailSignInAsync = createAsyncAction(
  UserActionTypes.EMAIL_SIGN_IN_REQUEST,
  UserActionTypes.SIGN_IN_SUCCESS,
  UserActionTypes.SIGN_IN_FAILURE
)<ICredentials, IUser, string>()
