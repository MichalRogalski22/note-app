import SearchBar from "components/SearchBar/SearchBar";
import NoteList from "containers/NoteList";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export function NoteBrowse() {
  const noteList = useSelector((store) => store.notesSlice.noteList);
  const [searchTerm, setSearchTerm] = useState("");
  const filteredNoteList = noteList.filter((note) => {
    const containsTitle = note.title
      .toUpperCase()
      .includes(searchTerm.trim().toUpperCase());
    const containsContent = note.content
      .toUpperCase()
      .includes(searchTerm.trim().toUpperCase());
    return containsTitle || containsContent;
  });
  return (
    <>
      <div className="row justify-content-center mb-5">
        <div className="col-sm-12 col-md-8 col-lg-6">
          <SearchBar
            onTextChange={setSearchTerm}
            placeholder="Search your notes..."
          />
        </div>
      </div>
      {noteList?.length === 0 && (
        <div className="d-flex justify-content-center">
          <span>
            You don't have any note, do you want to{" "}
            <Link to="/note/new">create one</Link>?
          </span>
        </div>
      )}
      <NoteList noteList={filteredNoteList} />
    </>
  );
}
