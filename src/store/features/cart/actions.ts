import { createAction } from 'typesafe-actions'
import { CartActionTypes, IShopItem } from './types'

export const toggleCartHidden = createAction(
  CartActionTypes.TOGGLE_CART_HIDDEN,
  () => undefined
)()

export const addToCart = createAction(
  CartActionTypes.ADD_TO_CART,
  (payload: IShopItem) => ({ ...payload })
)<IShopItem>()

export const clearItemFromCart = createAction(
  CartActionTypes.CLEAR_ITEM_FROM_CART,
  (payload: number) => payload
)<number>()
