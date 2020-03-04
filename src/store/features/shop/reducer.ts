import { ShopState, ShopActions } from './types'
import { createReducer } from 'typesafe-actions'
import { fetchShopDataAsync } from './actions'

const initialState: ShopState = {
  collections: null,
  isLoading: false,
  errorMsg: null
}

export const shopReducer = createReducer<ShopState, ShopActions>(initialState)
  .handleAction(fetchShopDataAsync.request, state => ({
    ...state,
    isLoading: true,
    errorMsg: null
  }))
  .handleAction(fetchShopDataAsync.success, (state, action) => ({
    ...state,
    isLoading: false,
    collections: action.payload
  }))
  .handleAction(fetchShopDataAsync.failure, (state, action) => ({
    ...state,
    isLoading: false,
    collections: {},
    errorMsg: action.payload
  }))
