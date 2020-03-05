import { all, takeLatest, put, call } from 'redux-saga/effects'

import { UserActionTypes } from '../user/types'
import { clearCart } from './actions'

export function* clearCartOnSignOut() {
  yield put(clearCart())
}

export function* onSignOutSuccess() {
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut)
}

export function* cartSagas() {
  yield all([call(onSignOutSuccess)])
}
