
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDYitdW6d2A6d6mwXjkCGvnwg-OPJG3CU4",
  authDomain: "quora-c5bb9.firebaseapp.com",
  projectId: "quora-c5bb9",
  storageBucket: "quora-c5bb9.appspot.com",
  messagingSenderId: "361029130883",
  appId: "1:361029130883:web:67bef52100d70d091d59b6",
  measurementId: "G-F5TTFYLWHH",
};


const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
export { auth, provider };