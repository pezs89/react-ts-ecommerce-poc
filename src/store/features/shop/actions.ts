import { createAsyncAction } from 'typesafe-actions'

import { ShopActionTypes } from './types'
import { IShopItems } from '../cart/types'

export const fetchShopDataAsync = createAsyncAction(
  ShopActionTypes.FETCH_SHOP_DATA_REQUEST,
  ShopActionTypes.FETCH_SHOP_DATA_SUCCESS,
  ShopActionTypes.FETCH_SHOP_DATA_FAILURE
)<undefined, IShopItems, string>();
