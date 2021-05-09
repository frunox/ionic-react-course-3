import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAMrBhlzOVE2AJjjkL10xB0JJxBnNGMkQU',
  authDomain: 'daily-moments-df7aa.firebaseapp.com',
  projectId: 'daily-moments-df7aa',
  storageBucket: 'daily-moments-df7aa.appspot.com',
  messagingSenderId: '757112058055',
  appId: '1:757112058055:web:80282e2be0c04aeda54ee2',
};

const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
export const firestore = app.firestore();
export const storage = app.storage();
