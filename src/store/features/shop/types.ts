import { IShopItems } from '../cart/types'
import { loadShopData } from './actions'

export interface ShopState {
  collections: IShopItems | null
  isLoading: boolean
}

export enum ShopActionTypes {
  LOAD_SHOP_DATA = '@@shop/LOAD_SHOP_DATA'
}

export type ShopActions = ReturnType<typeof loadShopData>
