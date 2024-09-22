// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-f561d.firebaseapp.com",
  projectId: "mern-blog-f561d",
  storageBucket: "mern-blog-f561d.appspot.com",
  messagingSenderId: "685846090018",
  appId: "1:685846090018:web:48f717a5e00919d952957b",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
