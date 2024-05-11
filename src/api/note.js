import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  orderBy,
  query,
  doc,
  updateDoc,
  onSnapshot,
  where,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { FirebaseApp } from "utils/firebase";

export class NoteAPI {
  static async create(formValues) {
    const response = addDoc(collection(FirebaseApp.db, "notes"), {
      ...formValues,
      author: FirebaseApp.auth.currentUser.uid,
    });
    return {
      id: response.id,
      ...formValues,
    };
  }
  static async fetchAll() {
    const auth = getAuth()
    console.log()
    console.log(auth.currentUser)
    const q = query(
      collection(FirebaseApp.db, "notes"),
      where("author", "==", auth.currentUser.uid),
      orderBy("created_at", "asc")
    );
    const response = await getDocs(q);
    return response.docs.map((document) => {
      return {
        id: document.id,
        ...document.data(),
      };
    });
  }
  static async deleteById(noteId) {
    deleteDoc(doc(FirebaseApp.db, "notes", noteId));
  }
  static async updateById(id, values) {
    const query = doc(FirebaseApp.db, "notes", id);
    await updateDoc(query, values);
    return {
      id,
      ...values,
    };
  }

  static onShouldSynchronizeNotes(onChange) {
    const q = query(collection(FirebaseApp.db, "notes"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      const isUserPerformingChange = querySnapshot.metadata.hasPendingWrites;
      !isUserPerformingChange && onChange();
    });
    return unsub;
  }
}
