// import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
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
export const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const dataBase = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  otherInfos = {},
  questions = [],
  conjugations = []
) => {
  // if (!userAuth) return;
  const userDocRef = doc(dataBase, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        ...otherInfos,
        questions,
        conjugations,
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  return userDocRef;
};

export const createUserMailnPass = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInUserMailnPass = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};
export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
