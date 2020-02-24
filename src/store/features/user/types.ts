import { setCurrentUser } from './actions'

export enum UserActionTypes {
  SET_CURRENT_USER = '@@user/SET_CURRENT_USER'
}

export interface IUser {
  id: string
  displayName: string
  createdAt: Date
  email: string
}

export interface UserState {
  currentUser: IUser | null
}

export type UserAction = ReturnType<typeof setCurrentUser>
