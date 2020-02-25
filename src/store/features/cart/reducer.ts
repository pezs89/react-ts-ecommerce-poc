import { CartState, CartActions } from './types'
import { createReducer } from 'typesafe-actions'
import { toggleCartHidden, addToCart, clearItemFromCart } from './actions'
import { addItemToCart } from '../../../utils/helpers'

const initialState: CartState = {
  hidden: true,
  items: []
}

export const cartReducer = createReducer<CartState, CartActions>(initialState)
  .handleAction(toggleCartHidden, state => ({
    ...state,
    hidden: !state.hidden
  }))
  .handleAction(addToCart, (state, action) => ({
    ...state,
    items: addItemToCart(state.items, action.payload)
  }))
  .handleAction(clearItemFromCart, (state, action) => ({
    ...state,
    items: state.items.filter(item => item.id !== action.payload)
  }))
