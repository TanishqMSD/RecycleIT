// src/firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult, signOut } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC5FvVF9IrKx1mbnph4prPetIA6W8Z6yE8",
    authDomain: "ewaste-2e9ba.firebaseapp.com",
    projectId: "ewaste-2e9ba",
    storageBucket: "ewaste-2e9ba.firebasestorage.app",
    messagingSenderId: "899407091188",
    appId: "1:899407091188:web:61df625a85bc9c49d4d5a1",
    measurementId: "G-7N00PDQWVF"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

const signInWithGoogle = async () => {
  try {
    return await signInWithPopup(auth, googleProvider);
  } catch (error) {
    if (error.code === 'auth/cancelled-popup-request' || error.code === 'auth/popup-blocked') {
      console.log('Popup was blocked, trying redirect method...');
      await signInWithRedirect(auth, googleProvider);
    } else {
      throw error;
    }
  }
};

export { auth, googleProvider, signInWithGoogle, getRedirectResult, signOut };
