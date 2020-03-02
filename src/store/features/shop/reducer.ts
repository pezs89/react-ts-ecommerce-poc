import SHOP_DATA from './shop.data'
import { ShopState, ShopActions } from './types'
import { createReducer } from 'typesafe-actions'
import { loadShopData } from './actions'

const initialState: ShopState = {
  collections: SHOP_DATA
}

export const shopReducer = createReducer<ShopState, ShopActions>(
  initialState
).handleAction(loadShopData, (state, action) => ({
  ...state,
  collections: action.payload
}))
