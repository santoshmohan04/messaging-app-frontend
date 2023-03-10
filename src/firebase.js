// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"; // for authentication
import "firebase/storage"; // for storage
import "firebase/database"; // for realtime database
import { getFirestore } from "firebase/firestore"; // for cloud firestore
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAE4RrIq_lYB4HC5g1E0PLhjp0lJ8xWBdo",
  authDomain: "messaging-app-mern-c6d9a.firebaseapp.com",
  projectId: "messaging-app-mern-c6d9a",
  storageBucket: "messaging-app-mern-c6d9a.appspot.com",
  messagingSenderId: "428336139614",
  appId: "1:428336139614:web:8bffbddeb02a01361f53cf",
  measurementId: "G-367DPJ4MNC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();
export { auth, provider, signInWithPopup };
export default db;
