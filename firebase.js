import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyARCiWX2kp7w65-L-n41b8k3IhjqcfIxXI",
  authDomain: "smart-budgeting-app-24c15.firebaseapp.com",
  projectId: "smart-budgeting-app-24c15",
  storageBucket: "smart-budgeting-app-24c15.appspot.app",
  messagingSenderId: "562612900819",
  appId: "1:562612900819:web:bcd691386be3907f229526"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);