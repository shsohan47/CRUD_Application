import useNoteStore from "../stores/noteStore";
import Note from "./Note";
export default function AllNotes()
{
    const store = useNoteStore();
    return(
        <div>
        <h2>===Notes===</h2>
              {store.notes.map((note) => (
                <Note note = {note} key={note._id}/>
              ))}
            </div>
    )
}