import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBMswNBCnUtkGwCpnEAK42O3Dx-VAsnnoI",
  authDomain: "test-7ed83.firebaseapp.com",
  databaseURL: "https://test-7ed83-default-rtdb.firebaseio.com",
  projectId: "test-7ed83",
  storageBucket: "test-7ed83.firebasestorage.app",
  messagingSenderId: "440695902173",
  appId: "1:440695902173:web:2669b854cdda6500457034",
  measurementId: "G-V2EF7DEGGB"
};






export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
