import { createAction } from 'typesafe-actions'
import { CartActionTypes, IShopCollectionItem } from './types'

export const toggleCartHidden = createAction(
  CartActionTypes.TOGGLE_CART_HIDDEN,
  () => undefined
)()

export const addToCart = createAction(
  CartActionTypes.ADD_TO_CART,
  (payload: IShopCollectionItem) => ({ ...payload })
)<IShopCollectionItem>()

export const clearItemFromCart = createAction(
  CartActionTypes.CLEAR_ITEM_FROM_CART,
  (id: number) => id
)<number>()

export const removeItemFromCart = createAction(
  CartActionTypes.REMOVE_ITEM_FROM_CART,
  (id: number) => id
)<number>()

export const clearCart = createAction(CartActionTypes.CLEAR_CART)()
