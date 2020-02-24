import { createAction } from 'typesafe-actions'
import { CartActionTypes } from './types'

export const toggleCartHidden = createAction(
  CartActionTypes.TOGGLE_CART_HIDDEN,
  () => undefined
)()
