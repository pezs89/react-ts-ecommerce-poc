import { createAction } from 'typesafe-actions'

import { ShopActionTypes } from './types'
import { IShopItems } from '../cart/types'

export const loadShopData = createAction(
  ShopActionTypes.LOAD_SHOP_DATA,
  (payload: IShopItems) => ({ ...payload })
)<IShopItems>()
