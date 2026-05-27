import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage"; // Importă modulul Firebase Storage
import "firebase/compat/firestore";
import { FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN, FIREBASE_PROJECT_ID, FIREBASE_STORAGE_BUCKET, FIREBASE_MESSAGING_SENDER_ID, FIREBASE_APP_ID } from '@env';

// Configurația Firebase
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID
};

// Inițializarea Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

// Exportarea obiectului auth și a obiectului storage
const auth = app.auth();
const storage = app.storage(); // Inițializarea modulului Firebase Storage




const firestore = firebase.firestore(); // <--- 2. INIȚIALIZĂM FIRESTORE AICI

// <--- 3. EXPORTĂM ȘI FIRESTORE
export { auth, storage, firestore };
