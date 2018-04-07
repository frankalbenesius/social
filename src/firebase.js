import * as firebase from 'firebase'
import 'firebase/firestore' // needed to call firebase.firestore

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
}
firebase.initializeApp(config)

// now all application bits can use the same firebase instance
export const db = firebase.firestore()
export default firebase
