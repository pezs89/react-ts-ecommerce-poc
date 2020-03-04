import { createSelector } from 'reselect'
import { ApplicationState } from '../..'

const selectShop = ({ shop }: ApplicationState) => shop

export const selectCollections = createSelector(
  [selectShop],
  shop => shop.collections
)

export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  collections =>
    collections ? Object.keys(collections).map(key => collections[key]) : []
)

export const selectCollection = (collectionUrlParam: string) =>
  createSelector([selectCollections], collections =>
    collections ? collections[collectionUrlParam] : null
  )

export const selectIsCollectionLoading = createSelector(
  [selectShop],
  shop => shop.isLoading
)

export const selectIsCollectionLoaded = createSelector(
  [selectShop],
  shop => !!shop.collections
)
