import { takeLatest, call, all, put } from 'redux-saga/effects'

import {
  googleSignInAsync,
  emailSignInAsync,
  checkUserSession
} from './actions'
import { UserActionTypes, IUser } from './types'
import {
  auth,
  provider,
  createUserProfileDoc,
  getCurrentUser
} from '../../../firebase/firebase.utils'

export function* getSnapshotFromUserAuth(
  userAuth: firebase.User,
  asyncAction: typeof googleSignInAsync | typeof emailSignInAsync
) {
  try {
    const userRef = yield call(createUserProfileDoc, userAuth)
    const userSnapshot = yield userRef.get()
    const currentUser = { id: userSnapshot.id, ...userSnapshot.data() } as IUser
    yield put(asyncAction.success(currentUser))
  } catch (error) {
    yield put(asyncAction.failure(error.message))
  }
}

export function* signInWithGoogle() {
  try {
    const { user }: { user: firebase.User } = yield auth.signInWithPopup(
      provider
    )
    yield getSnapshotFromUserAuth(user, googleSignInAsync)
  } catch (err) {
    yield put(googleSignInAsync.failure(err.message))
  }
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
    yield getSnapshotFromUserAuth(user, emailSignInAsync)
  } catch (error) {
    yield put(emailSignInAsync.failure(error.message))
  }
}

export function* isAuthenticated() {
  try {
    const userAuth = yield getCurrentUser()
    if (userAuth) {
      yield getSnapshotFromUserAuth(userAuth, googleSignInAsync)
    }
  } catch (error) {
    yield put(emailSignInAsync.failure(error.message))
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_REQUEST, signInWithGoogle)
}

export function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_REQUEST, signInWithEmail)
}

export function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isAuthenticated)
}

export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(checkUserSession)
  ])
}
