// GetNote.js
import { useState, useEffect } from "react";
import axios from "axios";

function GetNote({ refreshNotes }) {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        fetchNotes();
    }, []);

    async function fetchNotes() {
        try {
            const res = await axios.get("http://localhost:3000/notes");
            setNotes(...res.data.note);
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    }

    return (
        <div>
            <h2>===Notes===</h2>
            {notes.map((note) => (
                <div key={note._id}>
                    <h3>{note.title}</h3>
                </div>
            ))}
        </div>
    );
}

export default GetNote;
