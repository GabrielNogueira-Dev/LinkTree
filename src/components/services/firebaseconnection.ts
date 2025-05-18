
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBBiKDfufl4RXR8TBxaer7kgLFWo_lKcp8",
  authDomain: "link-bdacf.firebaseapp.com",
  projectId: "link-bdacf",
  storageBucket: "link-bdacf.firebasestorage.app",
  messagingSenderId: "516330292402",
  appId: "1:516330292402:web:70899c5016e16140a0f5ab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)


export {auth,db};