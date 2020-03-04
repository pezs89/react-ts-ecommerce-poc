import { takeLatest, call, all, put } from 'redux-saga/effects'

import { googleSignInAsync, emailSignInAsync } from './actions'
import { UserActionTypes, IUser } from './types'
import {
  auth,
  provider,
  createUserProfileDoc
} from '../../../firebase/firebase.utils'

export function* signInWithGoogle() {
  try {
    const { user } = yield auth.signInWithPopup(provider)
    const userRef = yield call(createUserProfileDoc, user)
    const userSnapshot = yield userRef.get()
    const currentUser = { id: userSnapshot.id, ...userSnapshot.data() } as IUser
    yield put(googleSignInAsync.success(currentUser))
  } catch (err) {
    yield put(googleSignInAsync.failure(err.message))
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_REQUEST, signInWithGoogle)
}

export function* userSagas() {
  yield all([call(onGoogleSignInStart)])
}
