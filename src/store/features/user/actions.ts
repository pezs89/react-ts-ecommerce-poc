import { createAction } from 'typesafe-actions'
import { UserActionTypes, IUser } from './types'

export const setCurrentUser = createAction(
  UserActionTypes.SET_CURRENT_USER,
  (payload: IUser | null) => {
    return payload ? { ...payload } : null
  }
)<IUser>()
