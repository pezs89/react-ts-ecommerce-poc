import { takeLatest, call, all, put } from 'redux-saga/effects'

import { signInAsync, signOutAsync, signUpAsync } from './actions'
import { UserActionTypes, IUser } from './types'
import {
  auth,
  provider,
  createUserProfileDoc,
  getCurrentUser
} from '../../../firebase/firebase.utils'

export function* getSnapshotFromUserAuth(userAuth: firebase.User) {
  try {
    const userRef = yield call(createUserProfileDoc, userAuth, {
      displayName: userAuth.displayName
    })
    const userSnapshot = yield userRef.get()
    const currentUser = { id: userSnapshot.id, ...userSnapshot.data() } as IUser
    yield put(signInAsync.success(currentUser))
  } catch (error) {
    yield put(signInAsync.failure(error.message))
  }
}

export function* signIn(action: ReturnType<typeof signInAsync.request>) {
  try {
    let firebaseUserAccount: firebase.User
    if (action.payload) {
      const { email, password } = action.payload
      const { user } = yield auth.signInWithEmailAndPassword(email, password)
      firebaseUserAccount = { ...user }
    } else {
      const { user } = yield auth.signInWithPopup(provider)
      firebaseUserAccount = { ...user }
    }
    yield getSnapshotFromUserAuth(firebaseUserAccount)
  } catch (err) {
    yield put(signInAsync.failure(err.message))
  }
}

export function* isAuthenticated() {
  try {
    const userAuth = yield getCurrentUser()
    if (userAuth) {
      yield getSnapshotFromUserAuth(userAuth)
    }
  } catch (error) {
    yield put(signInAsync.failure(error.message))
  }
}

export function* signOut() {
  try {
    yield auth.signOut()
    yield put(signOutAsync.success())
  } catch (error) {
    yield put(signOutAsync.failure(error.message))
  }
}

export function* onSignInStart() {
  yield takeLatest(
    [
      UserActionTypes.GOOGLE_SIGN_IN_REQUEST,
      UserActionTypes.EMAIL_SIGN_IN_REQUEST
    ],
    signIn
  )
}

export function* signUp({ payload }: ReturnType<typeof signUpAsync.request>) {
  try {
    const { email, password, displayName } = payload
    const { user } = yield auth.createUserWithEmailAndPassword(email, password)
    yield put(signUpAsync.success({ ...user, displayName }))
  } catch (error) {
    yield put(signUpAsync.failure(error.message))
  }
}

export function* signInOnSignUpSuccess({
  payload
}: ReturnType<typeof signUpAsync.success>) {
  try {
    yield getSnapshotFromUserAuth(payload)
  } catch (error) {
    yield put(signUpAsync.failure(error.message))
  }
}

export function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_REQUEST, signOut)
}

export function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_REQUEST, signUp)
}

export function* onSignUpSuccess() {
  yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInOnSignUpSuccess)
}

export function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isAuthenticated)
}

export function* userSagas() {
  yield all([
    call(onSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onSignUpStart),
    call(onSignUpSuccess)
  ])
}
