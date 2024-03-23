import { useState } from "react";
import "./AllNotes.css"
import useNoteStore from "../stores/noteStore";

<script src="https://cdnjs.cloudflare.com/ajax/libs/jQuery-slimScroll/1.3.8/jquery.slimscroll.min.js" integrity="sha512-cJMgI2OtiquRH4L9u+WQW+mz828vmdp9ljOcm/vKTQ7+ydQUktrPVewlykMgozPP+NUBbHdeifE6iJ6UVjNw5Q==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
export default function Note({ note }) {
  const [isDeleted, setIsDeleted] = useState(false);
  const store = useNoteStore((store) => ({
    Deletenote: store.Deletenote,
    toggleUpdate: store.toggleUpdate,
  }));

  const handleDelete = async () => {
    setIsDeleted(true);
    await store.Deletenote(note._id);
  };
  console.log("notes:",note)

  return (
    <div key={note._id} className={`note-card ${isDeleted ? "deleted" : ""}`}>
      <div className="note-header">
        <h3 className="note-title">{note.title}</h3>
        <div className="note-buttons">
          <button onClick={handleDelete} className="delete-btn">
            Delete
          </button>
          <button onClick={() => store.toggleUpdate(note)} className="update-btn">
            Update
          </button>
        </div>
      </div>
      <p className="note-body">{note.body}</p>
      <div className="note-type">
      {note.type === "note" && <span className="note-type idea">{note.type}</span>}
      {note.type === "quickNote" && <span className="note-type to-do">{note.type}</span>}</div>
    </div>
  );
}
