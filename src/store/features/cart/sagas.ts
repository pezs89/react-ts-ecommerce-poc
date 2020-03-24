import { all, takeLatest, put, call, select } from 'redux-saga/effects'

import { getUserCart } from '../../../firebase/firebase.utils'
import { clearCart, getCartStatus, onPaymentSuccess } from './actions'
import { UserActionTypes, IUser } from '../user/types'
import { signInAsync } from '../user/actions'
import { selectCurrentUser } from '../user/selectors'
import { CartActionTypes } from './types'
import { selectCartItems } from './selectors'

export function* clearCartOnSignOutOrPayment() {
  yield put(clearCart())
}

export function* getCartItemsOnSuccess({
  payload
}: ReturnType<typeof signInAsync.success>) {
  try {
    const cartRef = yield getUserCart(payload.id)
    const snapShot = yield cartRef.get()
    const { cartItems } = snapShot.data()
    yield put(getCartStatus.success({ items: cartItems }))
  } catch (error) {
    console.log(error.message)
  }
}

export function* updateCartItems() {
  const currentUser: IUser = yield select(selectCurrentUser)
  try {
    const cartRef = yield getUserCart(currentUser.id)
    const cartItems = yield select(selectCartItems)
    yield cartRef.update({ cartItems, isDone: false })
  } catch (error) {
    console.log(error.message)
  }
}

export function* clearCartOnSuccessfullPayment() {
  const currentUser: IUser = yield select(selectCurrentUser)
  try {
    const cartRef = yield getUserCart(currentUser.id)
    yield cartRef.update({ isDone: true })
    yield put(onPaymentSuccess.success())
  } catch (error) {
    console.log(error.message)
  }
}

export function* onSignOutSuccess() {
  yield takeLatest(
    [UserActionTypes.SIGN_OUT_SUCCESS, CartActionTypes.PAYMENT_SUCCESS],
    clearCartOnSignOutOrPayment
  )
}

export function* onSignInSuccess() {
  yield takeLatest(UserActionTypes.SIGN_IN_SUCCESS, getCartItemsOnSuccess)
}

export function* onCartItemsChange() {
  yield takeLatest(
    [
      CartActionTypes.ADD_TO_CART,
      CartActionTypes.REMOVE_ITEM_FROM_CART,
      CartActionTypes.CLEAR_CART
    ],
    updateCartItems
  )
}

export function* onStripePaymentSuccess() {
  yield takeLatest(
    CartActionTypes.PAYMENT_REQUEST,
    clearCartOnSuccessfullPayment
  )
}

export function* cartSagas() {
  yield all([
    call(onSignOutSuccess),
    call(onSignInSuccess),
    call(onCartItemsChange),
    call(onStripePaymentSuccess)
  ])
}
