import { NoteAPI } from "api/note";
import { Header } from "components/Header/Header";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { setNoteList } from "store/notes/notes-slice";
import s from "./style.module.css";

export function App() {
  const dispatch = useDispatch();

  async function fetchNotes() {
    const noteList = await NoteAPI.fetchAll();
    dispatch(setNoteList(noteList));
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div>
      <Header />
      <div className={s.workspace}>
        <Outlet />
      </div>
    </div>
  );
}
