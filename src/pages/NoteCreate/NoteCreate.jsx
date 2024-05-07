import { NoteAPI } from "api/note";
import NoteForm from "components/NoteForm/NoteForm";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addNote } from "store/notes/notes-slice";

const NoteCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submit = async (formValues) => {
    const createdNote = await NoteAPI.create({
      ...formValues,
      created_at: new Date().toLocaleDateString(),
    });
    dispatch(addNote(createdNote))
    navigate("/");
  };

  return <NoteForm title="New note" onSubmit={submit} />;
};

export default NoteCreate;
