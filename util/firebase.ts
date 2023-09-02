// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApX6MAapCCw6RTTCWV8B7oKAyZrFYMNiA",
  authDomain: "portfolio-website-dondycles.firebaseapp.com",
  projectId: "portfolio-website-dondycles",
  storageBucket: "portfolio-website-dondycles.appspot.com",
  messagingSenderId: "1092833035604",
  appId: "1:1092833035604:web:439ced2d8696eff805f4c1",
  measurementId: "G-24SMLGRRP0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
// const analytics = getAnalytics(app);
