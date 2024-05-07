import { useDispatch } from "react-redux";
import s from "./style.module.css";
import { TextCard } from "components/TextCard/TextCard";
import { useNavigate } from "react-router-dom";
import { NoteAPI } from "api/note";
import { deleteNote } from "store/notes/notes-slice";

const NoteList = ({ noteList }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deleteNote_ = async (note) => {
    if (window.confirm("Are you sure you want to delete this")) {
      NoteAPI.deleteById(note.id);
      dispatch(deleteNote(note));
    }
  };

  return (
    <div className={`row justify-content-center`}>
      {noteList.map((note) => {
        return (
          <div className={s.card_container} key={note.id}>
            <TextCard
              title={note.title}
              content={note.content}
              subtitle={note.created_at}
              onClick={() => navigate("/note/" + note.id)}
              onClickTrash={() => deleteNote_(note)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default NoteList;
