import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7i2Ls_Grtjqk-07IxPOKSA8egZGE4rHg",
  authDomain: "orphansaroundtheworld-110e1.firebaseapp.com",
  projectId: "orphansaroundtheworld-110e1",
  storageBucket: "orphansaroundtheworld-110e1.appspot.com",
  messagingSenderId: "755416638534",
  appId: "1:755416638534:web:b310a3726c1ea3c1a5d647",
  measurementId: "G-D633GNQ1B7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
