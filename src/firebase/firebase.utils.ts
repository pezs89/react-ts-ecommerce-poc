import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: 'AIzaSyAV-AagC6r7LenNkvtLej4vmom7nmd7YB8',
  authDomain: 'crwn-db-f9ded.firebaseapp.com',
  databaseURL: 'https://crwn-db-f9ded.firebaseio.com',
  projectId: 'crwn-db-f9ded',
  storageBucket: 'crwn-db-f9ded.appspot.com',
  messagingSenderId: '270341755968',
  appId: '1:270341755968:web:fd687adc6a871df7747ba5'
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({
  prompt: 'select_account'
})
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase;