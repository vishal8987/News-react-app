// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCyCB3rYwz9Uwtqfb0ARHcniDO3IKv9iCs",
    authDomain: "news-app-a72f5.firebaseapp.com",
    projectId: "news-app-a72f5",
    storageBucket: "news-app-a72f5.appspot.com",
    messagingSenderId: "952139385231",
    appId: "1:952139385231:web:35f536a94f0088bbdea3fa",
    measurementId: "G-B9QL6W0YZS"
  };


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDb = getFirestore(app);
const auth = getAuth(app);
const storage  = getStorage(app);

export {fireDb, auth, storage}