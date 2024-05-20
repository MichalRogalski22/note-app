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
  getDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { FirebaseApp } from "utils/firebase";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

export class NoteAPI {
  // Private methods
  static async #uploadImage(formValues) {
    const uid = getAuth().currentUser.uid;
    const storageRef = ref(FirebaseApp.storage, `images/${uid}/${Date.now()}`);
    return await uploadBytesResumable(storageRef, formValues.img).then(
      async (snapshot) => {
        console.log(snapshot);
        return await getDownloadURL(snapshot.ref).then((url) => {
          console.log(url);
          return url;
        });
      }
    );
  }

  static async #deleteNoteImg(noteDoc) {
    if (noteDoc.data().img !== "") {
      const imgToDeleteRef = ref(FirebaseApp.storage, noteDoc.data().img);
      deleteObject(imgToDeleteRef)
        .then(() => console.log())
        .catch((err) => console.log(err));
    }
  }

  // Public methods
  static async create(formValues) {
    let noteCreationResponse;
    let url;
    try {
      if (formValues.img) {
        url = await this.#uploadImage(formValues);
      }
      formValues.img = url ? url : "";
      noteCreationResponse = await addDoc(collection(FirebaseApp.db, "notes"), {
        ...formValues,
        author: FirebaseApp.auth.currentUser.uid,
      });
      return {
        status: "success",
        note: {
          id: noteCreationResponse?.id,
          ...formValues,
        },
      };
    } catch (error) {
      console.log(error);
      return {
        status: "error",
        error: error.message,
      };
    }
  }
  static async fetchAll() {
    const auth = getAuth();
    console.log(auth.currentUser);
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
    const noteToDelete = await getDoc(doc(FirebaseApp.db, "notes", noteId));
    try {
      this.#deleteNoteImg(noteToDelete);
      deleteDoc(doc(FirebaseApp.db, "notes", noteId));
    } catch (err) {
      console.log(err);
    }
  }

  static async updateById(id, values) {
    const docToUpdate = await getDoc(doc(FirebaseApp.db, "notes", id));
    const shouldImageBeUpdated = values.img || typeof values.img !== "string";

    if (shouldImageBeUpdated) {
      this.#deleteNoteImg(docToUpdate);
      const url = await this.#uploadImage(values);
      values.img = url;
    }
    const query = doc(FirebaseApp.db, "notes", id);
    await updateDoc(query, values);
    return {
      id,
      ...values,
    };
  }

  static onShouldSynchronizeNotes(onChange) {
    const auth = getAuth();
    const q = query(
      collection(FirebaseApp.db, "notes"),
      where("author", "==", auth.currentUser.uid)
    );
    const unsub = onSnapshot(q, (querySnapshot) => {
      const isUserPerformingChange = querySnapshot.metadata.hasPendingWrites;
      !isUserPerformingChange && onChange();
    });
    return unsub;
  }
}
