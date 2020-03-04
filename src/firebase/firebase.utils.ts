import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import {
  IShopCollectionItem,
  IShopItems,
  IShopCollection
} from '../store/features/cart/types'

const config = {
  apiKey: 'AIzaSyAV-AagC6r7LenNkvtLej4vmom7nmd7YB8',
  authDomain: 'crwn-db-f9ded.firebaseapp.com',
  databaseURL: 'https://crwn-db-f9ded.firebaseio.com',
  projectId: 'crwn-db-f9ded',
  storageBucket: 'crwn-db-f9ded.appspot.com',
  messagingSenderId: '270341755968',
  appId: '1:270341755968:web:fd687adc6a871df7747ba5'
}

export interface ICollectionSnapshotData {
  title: string
  items: Array<IShopCollectionItem>
}

export const createUserProfileDoc = async <T>(
  user: firebase.User,
  additionalData?: T
) => {
  if (user) {
    const userRef = firestore.doc(`users/${user.uid}`)
    const snapShot = await userRef.get()

    if (!snapShot.exists) {
      const { displayName, email } = user
      const createdAt = new Date()
      try {
        await userRef.set({ displayName, email, createdAt, ...additionalData })
      } catch (error) {
        console.log(error.message)
      }
    }
    return userRef
  }
}

export const addCollectionAndDocuments = async <T>(
  collectionKey: string,
  objectsToAdd: Array<T>
): Promise<void> => {
  const collectionRef = firestore.collection(collectionKey)
  const batch = firestore.batch()
  objectsToAdd.forEach(item => {
    const newDocRef = collectionRef.doc()
    batch.set(newDocRef, item)
  })
  return await batch.commit()
}

export const converCollectionsSnapshotToMap = (
  collections: firebase.firestore.QuerySnapshot<ICollectionSnapshotData>
): IShopItems => {
  const transformedCollection: Array<IShopCollection> = collections.docs.map(
    doc => {
      const {
        title,
        items
      }: { title: string; items: IShopCollectionItem[] } = doc.data()
      return {
        routeName: encodeURI(title.toLowerCase()),
        id: doc.id,
        title,
        items
      }
    }
  )

  return transformedCollection.reduce((acc, collection) => {
    const { title } = collection
    acc[title.toLowerCase()] = collection
    return acc
  }, {} as IShopItems)
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()
export const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({
  prompt: 'select_account'
})
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase
