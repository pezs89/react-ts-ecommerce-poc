import { createAction } from 'typesafe-actions'
import { UserActionTypes, IUser } from './types'

export const setCurrentUser = createAction(
  UserActionTypes.SET_CURRENT_USER,
  (payload: IUser) => ({ ...payload })
)<IUser>()
