import { useEffect } from "react";
import useNoteStore from "../stores/noteStore";
import Note from "./Note";

export default function AllNotes() {
    const store = useNoteStore();

    return (
        <div>
            {store.notes.map((note) => (
                <Note note={note} key={note?._id} />
            ))}
        </div>
    );
}
