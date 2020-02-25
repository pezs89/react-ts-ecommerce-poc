import { createSelector } from 'reselect'
import { ApplicationState } from '../..'

const selectCart = ({ cart }: ApplicationState) => cart

export const selectCartItems = createSelector(
  [selectCart],
  ({ items }) => items
)

export const selectCartHidden = createSelector(
  [selectCart],
  cart => cart.hidden
)

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  cartItems =>
    cartItems.reduce((acc, cartItem) => {
      if (cartItem && cartItem.quantity) {
        return acc + cartItem.quantity
      }
      return acc
    }, 0)
)

export const selectCartTotal = createSelector([selectCartItems], cartItems =>
  cartItems.reduce(
    (acc, cartItem) =>
      cartItem.quantity ? acc + cartItem.quantity * cartItem.price : acc,
    0
  )
)
