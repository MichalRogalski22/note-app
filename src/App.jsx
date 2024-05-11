import { NoteAPI } from "api/note";
import { Header } from "components/Header/Header";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { setNoteList } from "store/notes/notes-slice";
import s from "./style.module.css";
import { withAuthRequired } from "hoc/withAuthRequired";
import { ButtonPrimary } from "components/ButtonPrimary/ButtonPrimary";
import { getAuth } from "firebase/auth";
import { FirebaseApp } from "utils/firebase";

export function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function fetchNotes() {
    const noteList = await NoteAPI.fetchAll();
    dispatch(setNoteList(noteList));
  }

  useEffect(() => {
    FirebaseApp.auth.onAuthStateChanged((user) => {
      if (user.uid) {
        console.log("Firebase");
        const unsub = NoteAPI.onShouldSynchronizeNotes(fetchNotes());
        return () => {
          unsub();
        };
      }
    });
  }, []);

  return (
    <div>
      <Header />
      <ButtonPrimary
        className={s.buttonAdd}
        onClick={() => navigate("/note/new")}
      >
        +
      </ButtonPrimary>
      <div className={s.workspace}>
        <Outlet />
      </div>
    </div>
  );
}

export const ProtectedApp = withAuthRequired(App);
