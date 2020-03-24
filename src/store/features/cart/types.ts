import {
  toggleCartHidden,
  addToCart,
  clearItemFromCart,
  removeItemFromCart,
  clearCart,
  getCartStatus,
  updateCartStatus,
  onPaymentSuccess
} from './actions'

export interface CartState {
  hidden: boolean
  items: Array<IShopCollectionItem>
}

export interface IShopPayload {
  items: Array<IShopCollectionItem>
}

export interface IShopItems {
  [key: string]: IShopCollection
}

export interface IShopCollection {
  id: string
  title: string
  routeName: string
  items: Array<IShopCollectionItem>
}

export interface IShopCollectionItem {
  id: number
  name: string
  price: number
  imageUrl?: string
  quantity?: number
}

export enum CartActionTypes {
  TOGGLE_CART_HIDDEN = '@@cart/TOGGLE_CART_HIDDEN',
  ADD_TO_CART = '@@cart/ADD_TO_CART',
  CLEAR_ITEM_FROM_CART = '@@cart/CLEAR_ITEM_FROM_CART',
  REMOVE_ITEM_FROM_CART = '@@cart/REMOVE_ITEM_FROM_CART',
  CLEAR_CART = '@@cart/CLEAR_CART',
  UPDATE_CART_REQUEST = '@@cart/UPDATE_CART_REQUEST',
  UPDATE_CART_SUCCESS = '@@cart/UPDATE_CART_SUCCESS',
  UPDATE_CART_FAILURE = '@@cart/UPDATE_CART_FAILURE',
  GET_CART_REQUEST = '@@cart/GET_CART_REQUEST',
  GET_CART_SUCCESS = '@@cart/GET_CART_SUCCESS',
  GET_CART_FAILURE = '@@cart/GET_CART_FAILURE',
  PAYMENT_REQUEST = '@@cart/PAYMENT_REQUEST',
  PAYMENT_SUCCESS = '@@cart/PAYMENT_SUCCESS',
  PAYMENT_FAILURE = '@@cart/PAYMENT_FAILURE'
}

export type CartActions =
  | ReturnType<typeof toggleCartHidden>
  | ReturnType<typeof addToCart>
  | ReturnType<typeof clearItemFromCart>
  | ReturnType<typeof removeItemFromCart>
  | ReturnType<typeof clearCart>
  | ReturnType<typeof getCartStatus.request>
  | ReturnType<typeof getCartStatus.success>
  | ReturnType<typeof getCartStatus.failure>
  | ReturnType<typeof updateCartStatus.request>
  | ReturnType<typeof updateCartStatus.success>
  | ReturnType<typeof updateCartStatus.failure>
  | ReturnType<typeof onPaymentSuccess.request>
  | ReturnType<typeof onPaymentSuccess.success>
  | ReturnType<typeof onPaymentSuccess.failure>
