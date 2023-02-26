// import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyADFAyKkPx_QaI4OeGRQGOmer6JXzd1Vus",
  authDomain: "pardon-my-french-b28a8.firebaseapp.com",
  projectId: "pardon-my-french-b28a8",
  storageBucket: "pardon-my-french-b28a8.appspot.com",
  messagingSenderId: "994546034592",
  appId: "1:994546034592:web:4d6f2a56c637b2bab0e6c5",
  measurementId: "G-YXG92FKDFP",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const googleProvider = new GoogleAuthProvider();

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const dataBase = getFirestore();
export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(dataBase, "users", userAuth.uid);
};
