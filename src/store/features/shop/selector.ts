import { createSelector } from 'reselect'
import { ApplicationState } from '../..'

const selectShop = ({ shop }: ApplicationState) => shop

export const selectShopItems = createSelector(
  [selectShop],
  shop => shop.collections
)
