import { all, call } from 'redux-saga/effects'
import { fetchCollectionStart } from './features/shop/sagas'
import { userSagas } from './features/user/sagas'

export function* rootSaga() {
  yield all([call(fetchCollectionStart), call(userSagas)])
}
