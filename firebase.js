// Firebase Web SDK (modular) for the AYUSHlabs contact form.
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// These values are from the Firebase Web App configuration supplied by you.
const firebaseConfig = {
  apiKey: "AIzaSyBIaZgmLMopOngK89vH2Al0XUP2C8G62VI",
  authDomain: "its-ayush.firebaseapp.com",
  projectId: "its-ayush",
  storageBucket: "its-ayush.firebasestorage.app",
  messagingSenderId: "202562710951",
  appId: "1:202562710951:web:12028edf47daa6a9c09a82",
  measurementId: "G-BWD513M2RN"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/** Save a contact/project request to Firestore. */
export async function sendMessage(name, email, message) {
  const cleanName = String(name ?? "").trim();
  const cleanEmail = String(email ?? "").trim();
  const cleanMessage = String(message ?? "").trim();

  if (!cleanName || cleanName.length > 100) {
    throw new Error("Name must be between 1 and 100 characters.");
  }
  if (!cleanEmail || cleanEmail.length > 254) {
    throw new Error("Please enter a valid email address.");
  }
  if (!cleanMessage || cleanMessage.length > 3000) {
    throw new Error("Message must be between 1 and 3000 characters.");
  }

  return addDoc(collection(db, "contactMessages"), {
    name: cleanName,
    email: cleanEmail,
    message: cleanMessage,
    createdAt: serverTimestamp()
  });
}

// Expose the function for the existing classic script.js file.
window.sendMessage = sendMessage;
