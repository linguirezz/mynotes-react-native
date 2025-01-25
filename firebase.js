// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQqCF4toQfjkv4r4xV8j36Mf_FdCTk-ZU",
  authDomain: "notes-app-react-native-6b051.firebaseapp.com",
  projectId: "notes-app-react-native-6b051",
  storageBucket: "notes-app-react-native-6b051.firebasestorage.app",
  messagingSenderId: "879093687637",
  appId: "1:879093687637:web:fa7e4cbbf2bd6d2c58bbdc",
  measurementId: "G-CW7VCSDSYD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app
