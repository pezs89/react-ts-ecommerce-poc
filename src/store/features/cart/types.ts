import { toggleCartHidden, addToCart, clearItemFromCart } from './actions'

export interface CartState {
  hidden: boolean
  items: Array<IShopItem>
}

export interface IShopItems {
  id: number
  title: string
  routeName: string
  items: Array<IShopItem>
}

export interface IShopItem {
  id: number
  name: string
  price: number
  imageUrl?: string
  quantity?: number
}

export enum CartActionTypes {
  TOGGLE_CART_HIDDEN = '@@cart/TOGGLE_CART_HIDDEN',
  ADD_TO_CART = '@@cart/ADD_TO_CART',
  CLEAR_ITEM_FROM_CART = '@@cart/CLEAR_ITEM_FROM_CART'
}

export type CartActions =
  | ReturnType<typeof toggleCartHidden>
  | ReturnType<typeof addToCart>
  | ReturnType<typeof clearItemFromCart>
