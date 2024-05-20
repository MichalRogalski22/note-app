import { NoteAPI } from "api/note";
import { Header } from "components/Header/Header";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { setNoteList } from "store/notes/notes-slice";
import s from "./style.module.css";
import { withAuthRequired } from "hoc/withAuthRequired";
import { ButtonPrimary } from "components/ButtonPrimary/ButtonPrimary";
import { FirebaseApp } from "utils/firebase";

export function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isIndexPage = window.location.pathname === "/";

  async function fetchNotes() {
    const noteList = await NoteAPI.fetchAll();
    dispatch(setNoteList(noteList));
  }

  useEffect(() => {
    FirebaseApp.auth.onAuthStateChanged((user) => {
      if (user.uid) {
        const unsub = NoteAPI.onShouldSynchronizeNotes(fetchNotes);
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
        onClick={() => navigate(isIndexPage ? "/note/new" : "/")}
      >
        {isIndexPage ? "+" : "<"}
      </ButtonPrimary>
      <div className={s.workspace}>
        <Outlet />
      </div>
    </div>
  );
}

export const ProtectedApp = withAuthRequired(App);
