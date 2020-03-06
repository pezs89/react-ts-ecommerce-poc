import {
  signInAsync,
  checkUserSession,
  signOutAsync,
  signUpAsync
} from './actions'

export enum UserActionTypes {
  SET_CURRENT_USER = '@@user/SET_CURRENT_USER',
  GOOGLE_SIGN_IN_REQUEST = '@@user/GOOGLE_SIGN_IN_REQUEST',
  SIGN_IN_SUCCESS = '@@user/SIGN_IN_SUCCESS',
  SIGN_IN_FAILURE = '@@user/SIGN_IN_FAILURE',
  EMAIL_SIGN_IN_REQUEST = '@@user/EMAIL_SIGN_IN_REQUEST',
  CHECK_USER_SESSION = '@@user/CHECK_USER_SESSION',
  SIGN_OUT_REQUEST = '@@user/SIGN_OUT_REQUEST',
  SIGN_OUT_SUCCESS = '@@user/SIGN_OUT_SUCCESS',
  SIGN_OUT_FAILURE = '@@user/SIGN_OUT_FAILURE',
  SIGN_UP_REQUEST = '@@user/SIGN_UP_REQUEST',
  SIGN_UP_SUCCESS = '@@user/SIGN_UP_SUCCESS',
  SIGN_UP_FAILURE = '@@user/SIGN_UP_FAILURE'
}

export interface ICredentials {
  email: string
  password: string
  displayName?: string
}

export interface IUser {
  id: string
  displayName: string
  createdAt: Date
  email: string
}

export interface UserState {
  currentUser: IUser | null
  error: string | null
}

export type UserAction =
  | ReturnType<typeof signInAsync.request>
  | ReturnType<typeof signInAsync.success>
  | ReturnType<typeof signInAsync.failure>
  | ReturnType<typeof checkUserSession>
  | ReturnType<typeof signOutAsync.request>
  | ReturnType<typeof signOutAsync.success>
  | ReturnType<typeof signOutAsync.failure>
  | ReturnType<typeof signUpAsync.request>
  | ReturnType<typeof signUpAsync.success>
  | ReturnType<typeof signUpAsync.failure>
