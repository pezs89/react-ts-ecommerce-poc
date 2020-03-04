import { IShopItems } from '../cart/types'
import { fetchShopDataAsync } from './actions'

export interface ShopState {
  collections: IShopItems | null
  isLoading: boolean
  errorMsg: string | null
}

export enum ShopActionTypes {
  FETCH_SHOP_DATA_REQUEST = '@@shop/FETCH_SHOP_DATA_REQUEST',
  FETCH_SHOP_DATA_SUCCESS = '@@shop/FETCH_SHOP_DATA_SUCCESS',
  FETCH_SHOP_DATA_FAILURE = '@@shop/FETCH_SHOP_DATA_FAILURE'
}

export type ShopActions =
  | ReturnType<typeof fetchShopDataAsync.request>
  | ReturnType<typeof fetchShopDataAsync.success>
  | ReturnType<typeof fetchShopDataAsync.failure>
