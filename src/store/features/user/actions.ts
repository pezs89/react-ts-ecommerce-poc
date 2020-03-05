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
