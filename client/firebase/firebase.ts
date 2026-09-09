import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBy-DinJYTfqExJ25u4K1rUVJNLDFYHxkc",
  authDomain: "hitechwoodhandicrafts.firebaseapp.com",
  projectId: "hitechwoodhandicrafts",
  storageBucket: "hitechwoodhandicrafts.firebasestorage.app",
  messagingSenderId: "89385502953",
  appId: "1:89385502953:web:830ae9f6fe31bba48bc878",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore Database
export const db = getFirestore(app);

// Firebase Storage
export const storage = getStorage(app);

// Firebase Authentication
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Export App
export default app;