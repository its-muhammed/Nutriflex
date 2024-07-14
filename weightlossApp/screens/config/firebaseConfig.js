// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";  
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZTdk4827QS3Icwo1TiFhqv00zsp98IhI",
  authDomain: "nutriflex-cc423.firebaseapp.com",
  projectId: "nutriflex-cc423",
  storageBucket: "nutriflex-cc423.appspot.com",
  messagingSenderId: "82928309429",
  appId: "1:82928309429:web:3ff71e6c7f3d5212d41afc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);


export {db,auth}