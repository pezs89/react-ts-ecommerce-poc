import { call, put, takeLatest } from 'redux-saga/effects'

import {
  firestore,
  converCollectionsSnapshotToMap,
  ICollectionSnapshotData
} from '../../../firebase/firebase.utils'
import { fetchShopDataAsync } from './actions'
import { IShopItems } from '../cart/types'
import { ShopActionTypes } from './types'

export function* fetchCollectionAsync() {
  try {
    const collectionRef = firestore.collection('collections')
    const snapshot = yield collectionRef.get()
    const collectionsMap: IShopItems = yield call(
      converCollectionsSnapshotToMap,
      snapshot as firebase.firestore.QuerySnapshot<ICollectionSnapshotData>
    )
    yield put(fetchShopDataAsync.success(collectionsMap))
  } catch (error) {
    yield put(fetchShopDataAsync.failure(error.message))
  }
}

export function* fetchCollectionStart() {
  yield takeLatest(
    ShopActionTypes.FETCH_SHOP_DATA_REQUEST,
    fetchCollectionAsync
  )
}
