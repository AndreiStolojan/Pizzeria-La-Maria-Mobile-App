import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// Configurația Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBqhRSyRHkkWfdD94tgYCSsrHtQWzu__cM",
  authDomain: "fir-auth-318b2.firebaseapp.com",
  projectId: "fir-auth-318b2",
  storageBucket: "fir-auth-318b2.appspot.com",
  messagingSenderId: "997153372756",
  appId: "1:997153372756:web:d8bbe20a367a59d8e28bc1"
};

// Inițializarea Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

// Exportarea obiectului auth
const auth = app.auth();
export { auth };
