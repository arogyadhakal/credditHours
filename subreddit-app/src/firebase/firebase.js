// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4VqSBFzrdXK0QCVC5RD8yGZOFvjT9NKw", //Should make an .env file here and use env variables instead but this works for now
  authDomain: "creddit-hours.firebaseapp.com",
  projectId: "creddit-hours",
  storageBucket: "creddit-hours.appspot.com",
  messagingSenderId: "811972054379",
  appId: "1:811972054379:web:fba73c398eb16632da502e",
  measurementId: "G-CQ4LMSY6WY"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);