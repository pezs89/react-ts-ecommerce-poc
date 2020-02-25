import { createSelector } from 'reselect'
import { ApplicationState } from '../..'

const selectUser = ({ user }: ApplicationState) => user

export const selectCurrentUser = createSelector(
  [selectUser],
  user => user.currentUser
)


