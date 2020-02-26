import { createSelector } from 'reselect'
import { ApplicationState } from '../..'

const selectDirectory = ({ directory }: ApplicationState) => directory

export const selectDirectorySections = createSelector(
  [selectDirectory],
  directory => directory.sections
)
