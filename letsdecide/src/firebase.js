import firebase from 'firebase'

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'let-s-decide-3750d.firebaseapp.com',
  projectId: 'let-s-decide-3750d',
  storageBucket: 'let-s-decide-3750d.appspot.com',
  messagingSenderId: '168172785383',
  appId: '1:168172785383:web:a0e0736cb4cfc71b9c9c42',
  measurementId: 'G-9RHDMD2P4T'
}

firebase.initializeApp(firebaseConfig)

export default firebase
