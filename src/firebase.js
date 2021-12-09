import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBtERvLsphHLG4rNCoZ8Z4vzc3m6kAdI7I",
  authDomain: "digiventri.firebaseapp.com",
  projectId: "digiventri",
  storageBucket: "digiventri.appspot.com",
  messagingSenderId: "688628403248",
  appId: "1:688628403248:web:d1b1b6480d14c7dd8671f5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
