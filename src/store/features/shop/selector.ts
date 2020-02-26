import { createSelector } from 'reselect'
import { ApplicationState } from '../..'

const selectShop = ({ shop }: ApplicationState) => shop

export const selectCollections = createSelector(
  [selectShop],
  shop => shop.collections
)

export const selectCollection = (collectionUrlParam: string) =>
  createSelector(
    [selectCollections],
    collections => collections[collectionUrlParam]
  )
