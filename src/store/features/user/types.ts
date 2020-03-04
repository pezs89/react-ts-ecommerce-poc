import {
  setCurrentUser,
  googleSignInAsync,
  emailSignInAsync
} from './actions'

export enum UserActionTypes {
  SET_CURRENT_USER = '@@user/SET_CURRENT_USER',
  GOOGLE_SIGN_IN_REQUEST = '@@user/GOOGLE_SIGN_IN_REQUEST',
  GOOGLE_SIGN_IN_SUCCESS = '@@user/GOOGLE_SIGN_IN_SUCCESS',
  GOOGLE_SIGN_IN_FAILURE = '@@user/GOOGLE_SIGN_IN_FAILURE',
  EMAIL_SIGN_IN_REQUEST = '@@user/EMAIL_SIGN_IN_REQUEST',
  EMAIL_SIGN_IN_SUCCESS = '@@user/EMAIL_SIGN_IN_SUCCESS',
  EMAIL_SIGN_IN_FAILURE = '@@user/EMAIL_SIGN_IN_FAILURE'
}

export interface ICredentials {
  email: string
  password: string
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
  | ReturnType<typeof setCurrentUser>
  | ReturnType<typeof googleSignInAsync.request>
  | ReturnType<typeof googleSignInAsync.success>
  | ReturnType<typeof googleSignInAsync.failure>
  | ReturnType<typeof emailSignInAsync.request>
  | ReturnType<typeof emailSignInAsync.success>
  | ReturnType<typeof emailSignInAsync.failure>
