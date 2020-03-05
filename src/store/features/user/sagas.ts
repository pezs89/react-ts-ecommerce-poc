import { takeLatest, call, all, put } from 'redux-saga/effects'

import { googleSignInAsync, emailSignInAsync } from './actions'
import { UserActionTypes, IUser } from './types'
import {
  auth,
  provider,
  createUserProfileDoc
} from '../../../firebase/firebase.utils'

export function* getSnapshotFromUserAuth(
  userAuth: firebase.User,
  actionType: UserActionTypes
) {
  try {
    const userRef = yield call(createUserProfileDoc, userAuth)
    const userSnapshot = yield userRef.get()
    const currentUser = { id: userSnapshot.id, ...userSnapshot.data() } as IUser
    actionType === UserActionTypes.GOOGLE_SIGN_IN_REQUEST
      ? yield put(googleSignInAsync.success(currentUser))
      : yield put(emailSignInAsync.success(currentUser))
  } catch (error) {
    actionType === UserActionTypes.GOOGLE_SIGN_IN_REQUEST
      ? yield put(googleSignInAsync.failure(error.message))
      : yield put(emailSignInAsync.failure(error.message))
  }
}

export function* signInWithGoogle() {
  try {
    const { user }: { user: firebase.User } = yield auth.signInWithPopup(
      provider
    )
    yield getSnapshotFromUserAuth(user, UserActionTypes.GOOGLE_SIGN_IN_REQUEST)
  } catch (err) {
    yield put(googleSignInAsync.failure(err.message))
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_REQUEST, signInWithGoogle)
}

export function* signInWithEmail({
  payload: { email, password }
}: ReturnType<typeof emailSignInAsync.request>) {
  try {
    const {
      user
    }: { user: firebase.User } = yield auth.signInWithEmailAndPassword(
      email,
      password
    )
    yield getSnapshotFromUserAuth(user, UserActionTypes.EMAIL_SIGN_IN_REQUEST)
  } catch (err) {
    yield put(emailSignInAsync.failure(err.message))
  }
}

export function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_REQUEST, signInWithEmail)
}

export function* userSagas() {
  yield all([call(onGoogleSignInStart), call(onEmailSignInStart)])
}
