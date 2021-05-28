import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const app = firebase.initializeApp({
  apiKey: "AIzaSyBrKILPmkEKc-6Eg2UIo_iFUzKi2gZimmo",
  authDomain: "clone-43c2b.firebaseapp.com",
  projectId: "clone-43c2b",
  storageBucket: "clone-43c2b.appspot.com",
  messagingSenderId: "171286111935",
  appId: "1:171286111935:web:275f8cd4b14de09b25880a",
  measurementId: "G-M122LTQ4WZ",
});

export const auth = app.auth();
export const firestore = app.firestore();
export const storage = app.storage();
export default app;
