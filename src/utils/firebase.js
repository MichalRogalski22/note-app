import { firebaseConfig } from "config";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export class FirebaseApp {
  static firebaseApp = undefined;
  static auth = undefined;
  static db = undefined;
  static storage = undefined;
  static init() {
    this.firebaseApp = initializeApp(firebaseConfig);
    this.auth = getAuth();
    this.db = getFirestore(this.firebaseApp);
    this.storage = getStorage(this.firebaseApp);
  }
}
