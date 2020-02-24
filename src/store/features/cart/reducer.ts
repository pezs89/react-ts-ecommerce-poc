import { CartState, CartActions } from './types'
import { createReducer } from 'typesafe-actions'
import { toggleCartHidden } from './actions'

const initialState: CartState = {
  hidden: true,
  items: []
}

export const cartReducer = createReducer<CartState, CartActions>(
  initialState
).handleAction(toggleCartHidden, state => ({
  ...state,
  hidden: !state.hidden
}))
