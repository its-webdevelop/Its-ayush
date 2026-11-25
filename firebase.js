
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBIaZgmLMopOngK89vH2Al0XUP2C8G62VI",
  authDomain: "its-ayush.firebaseapp.com",
  projectId: "its-ayush",
  storageBucket: "its-ayush.firebasestorage.app",
  messagingSenderId: "202562710951",
  appId: "1:202562710951:web:2f77e4ae313b15bec09a82",
  measurementId: "G-TM04Y1T3J6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function sendMessage(name, email, message) {
  name = name.trim();
  email = email.trim();
  message = message.trim();

  if (!name || !email || !message) {
    throw new Error("Please fill in all fields.");
  }

  if (name.length > 100 || email.length > 254 || message.length > 5000) {
    throw new Error("One or more fields are too long.");
  }

  return addDoc(collection(db, "contactMessages"), {
    name,
    email,
    message,
    createdAt: serverTimestamp()
  });
}
