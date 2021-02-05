import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyB7zly9c9Bwr5Ktp0AOIWjKnR4MNmbfGL0',
  authDomain: 'liftinglog-43bcd.firebaseapp.com',
  projectId: 'liftinglog-43bcd',
  storageBucket: 'liftinglog-43bcd.appspot.com',
  messagingSenderId: '1032635810087',
  appId: '1:1032635810087:web:39e7812b6f6d28e4f3e902',
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export const db = firebase.firestore();
