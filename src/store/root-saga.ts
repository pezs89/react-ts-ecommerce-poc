import { all, call } from 'redux-saga/effects'
import { shopSagas } from './features/shop/sagas'
import { userSagas } from './features/user/sagas'
import { cartSagas } from './features/cart/sagas'

export function* rootSaga() {
  yield all([call(shopSagas), call(userSagas), call(cartSagas)])
}
