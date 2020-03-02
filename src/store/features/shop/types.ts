import { IShopItems } from '../cart/types'
import { loadShopData } from './actions'

export interface ShopState {
  collections: IShopItems
}

export enum ShopActionTypes {
  LOAD_SHOP_DATA = '@@shop/LOAD_SHOP_DATA'
}

export type ShopActions = ReturnType<typeof loadShopData>
