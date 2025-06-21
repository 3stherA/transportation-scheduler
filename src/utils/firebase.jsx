// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import {getFirestore} from "@firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7sOp1LBlw_kJBNrgB5BCZFZxdg7Fpldc",
  authDomain: "transportation-scheduler-6454a.firebaseapp.com",
  projectId: "transportation-scheduler-6454a",
  storageBucket: "transportation-scheduler-6454a.firebasestorage.app",
  messagingSenderId: "1073809506789",
  appId: "1:1073809506789:web:64352aedcaae2ba6582f0c",
  measurementId: "G-LRPYHMD8EF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);

const analytics = getAnalytics(app);
