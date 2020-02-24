import { toggleCartHidden } from './actions'

export interface CartState {
  hidden: boolean
  items: Array<any>
}

export enum CartActionTypes {
  TOGGLE_CART_HIDDEN = '@@cart/TOGGLE_CART_HIDDEN'
}

export type CartActions = ReturnType<typeof toggleCartHidden>
