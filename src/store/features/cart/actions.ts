import { createAction, createAsyncAction } from 'typesafe-actions'
import { CartActionTypes, IShopCollectionItem, IShopPayload } from './types'

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

export const getCartStatus = createAsyncAction(
  CartActionTypes.GET_CART_REQUEST,
  CartActionTypes.GET_CART_SUCCESS,
  CartActionTypes.GET_CART_FAILURE
)<number, IShopPayload>()

export const updateCartStatus = createAsyncAction(
  CartActionTypes.UPDATE_CART_REQUEST,
  CartActionTypes.UPDATE_CART_SUCCESS,
  CartActionTypes.UPDATE_CART_FAILURE
)<number>()

export const onPaymentSuccess = createAsyncAction(
  CartActionTypes.PAYMENT_REQUEST,
  CartActionTypes.PAYMENT_SUCCESS,
  CartActionTypes.PAYMENT_FAILURE
)<undefined, undefined, Error>()

export const clearCart = createAction(CartActionTypes.CLEAR_CART)()
