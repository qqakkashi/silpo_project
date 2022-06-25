import { initializeApp, getApp } from "firebase/app";
import { firebaseConfig } from "../config";

let firebaseApp;

try {
  firebaseApp = getApp();
} catch (e) {
  firebaseApp = initializeApp(firebaseConfig);
}

export default firebaseApp;
