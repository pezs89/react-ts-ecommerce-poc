import SHOP_DATA from './shop.data'
import { ShopState } from './types'
import { createReducer } from 'typesafe-actions'

const initialState: ShopState = {
  collections: SHOP_DATA
}

export const shopReducer = createReducer<ShopState>(initialState)
