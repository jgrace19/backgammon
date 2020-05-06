import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyDiLxxLA4KEhwfM7Cy_4TO2VzCjTeSoL-U",
  authDomain: "backgammon-8ad4b.firebaseapp.com",
  databaseURL: "https://backgammon-8ad4b.firebaseio.com",
  projectId: "backgammon-8ad4b",
  storageBucket: "backgammon-8ad4b.appspot.com",
  messagingSenderId: "640545938875",
  appId: "1:640545938875:web:378e2565828c9cfd57389e",
  measurementId: "G-YGREC4RLEV",
};

firebase.initializeApp(firebaseConfig);
export default firebase;
