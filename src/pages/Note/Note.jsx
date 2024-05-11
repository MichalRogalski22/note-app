import { NoteAPI } from "api/note";
import NoteForm from "components/NoteForm/NoteForm";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteNote, updateNote } from "store/notes/notes-slice";

export function Note() {
  const [isEditable, setIsEditable] = useState(false);
  const { noteId } = useParams();
  const navigate = useNavigate();
  const note = useSelector((store) =>
    store.notesSlice.noteList.find((note) => note.id === noteId)
  );
  const dispatch = useDispatch();

  const submit = async (formValues) => {
    const updatedNote = await NoteAPI.updateById(note.id, formValues);
    dispatch(updateNote(updatedNote));
    setIsEditable(false);
  };

  const deleteNote_ = async () => {
    if (window.confirm("Are you sure you want to delete this")) {
      NoteAPI.deleteById(note.id);
      dispatch(deleteNote(note));
      navigate("/");
    }
  };

  return (
    <>
      {note && (
        <NoteForm
          isEditable={isEditable}
          title={isEditable ? "Edit note" : note.title}
          note={note}
          onClickDelete={deleteNote_}
          onClickEdit={() => setIsEditable(!isEditable)}
          onSubmit={isEditable && submit}
        />
      )}
    </>
  );
}
