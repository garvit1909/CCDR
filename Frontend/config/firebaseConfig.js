// config/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyASJ7YnuSpLZHWbHnlC5xDuRsWehmiouo4",
  authDomain: "prorep-37a3c.firebaseapp.com",
  projectId: "prorep-37a3c",
  storageBucket: "prorep-37a3c.appspot.com",
  messagingSenderId: "328070846557",
  appId: "1:328070846557:web:c30cb76c6201f3d673d5b4",
  measurementId: "G-Z7HLE34EZW",
  databaseURL: "https://prorep-37a3c-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const app = !getApp() ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);


export { app, db, auth, storage};

