// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABeXTC8ImayUjC5KbEKaXFHHul6jRcEZw",
  authDomain: "works-pms.firebaseapp.com",
  projectId: "works-pms",
  storageBucket: "works-pms.firebasestorage.app",
  messagingSenderId: "947648581820",
  appId: "1:947648581820:web:4f37bf02248f6e7d4f00b9",
  measurementId: "G-FEFKHFMXE8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);